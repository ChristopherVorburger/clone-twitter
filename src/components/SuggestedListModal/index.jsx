import { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Composants MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Tab, Tabs } from "@mui/material";

// Icones et images
import { icons } from "../../constants";

// Context
import { AuthContext } from "../../context/authContext";
import { ListsContext } from "../../context/listsContext";

// Hooks
import { useFirestore } from "../../utils/useFirestore";

// Composants React
import SuggestedMembers from "./SuggestedMembers";

// Styles
import useStyles from "./styles";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const SuggestedListModal = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  /* NavTab */
  // State pour la nav tab
  const [value, setValue] = useState(1);
  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* Modal */
  // States pour la modale
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  //Utilisation des contextes Auth et Lists
  const auth = useContext(AuthContext);
  const listsContext = useContext(ListsContext);

  const users = useFirestore("users");

  // Recherche de la liste séléctionnée
  const matchedList = listsContext?.lists?.filter((list) => {
    return list.id === id;
  });

  // Recherche des utilisateurs qui ne sont pas membres de cette liste
  const usersNotInTheList = users?.filter((user) => {
    if (!matchedList?.[0]?.members?.includes(user.id)) return user;
  });

  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ padding: 0 }}
      >
        <Box className={classes.modal}>
          <Box className={classes.container}>
            {/* Header */}
            <Box display="flex" alignItems="center" height="53px" p="0 1rem">
              <Box justifyContent="flex-start">
                <IconButton
                  onClick={() => navigate(`/${auth?.userData?.[0]?.username}`)}
                  sx={{ padding: "0.5rem", marginRight: "1rem" }}
                >
                  <icons.CloseIcon />
                </IconButton>
              </Box>
              <Box flexGrow={1}>
                <Typography fontSize="font.large" fontWeight="mainBold">
                  Add to your List
                </Typography>
              </Box>
              <Box>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  sx={{
                    fontSize: "font.small",
                    fontWeight: "mainBold",
                    backgroundColor: "black.main",
                    borderRadius: "50px",
                  }}
                  onClick={() =>
                    navigate(`/${auth.userData?.[0]?.username}/lists`)
                  }
                >
                  Done
                </Button>
              </Box>
            </Box>
            {/* NavTab */}
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              fontSize="font.main"
              textTransform="none"
              borderBottom="1px solid #eff3f4"
            >
              <Tabs value={value} onChange={handleChange} aria-label="nav tabs">
                <LinkTab
                  className={classes.notifications__link_nav}
                  to={`/lists/${id}/members`}
                  label="Members"
                />
                <LinkTab
                  className={classes.notifications__link_nav}
                  to={`/lists/${id}/members/suggested`}
                  label="Suggested"
                />
              </Tabs>
            </Box>
            {/* Liste des utilisateurs pouvant être ajoutés à la liste */}
            <Box>
              {usersNotInTheList?.map((user) => {
                return (
                  <SuggestedMembers
                    key={user?.id}
                    member={user}
                    matchedList={matchedList}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SuggestedListModal;
