import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Icons from '../../../constants/icons';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChannelAdd(users) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [dataSearchedUsers, setDataSearchedUsers] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleTextChange(text) {
    setSearchValue(text);
    setDataSearchedUsers(setFilterUsers(text));
  }

  function setFilterUsers(searchText) {
    return users?.filter((user) => {
      if (user.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }

      return false;
    });
  }

  return (
    <div>
      <Icons.AddCommentIcon onClick={handleOpen}>
        Open modal
      </Icons.AddCommentIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}

          <SearchUserInput
            onTextChange={handleTextChange}
            // onSubmit={addNewChannel}
            searchText={searchValue}
          />

          <Resultat data={dataSearchedUsers} />
        </Box>
      </Modal>
    </div>
  );
}

function SearchUserInput({ onTextChange, onSubmit, searchText }) {
  return (
    <>
      <input
        placeholder="Search for people"
        onChange={(e) => onTextChange(e.target.value)}
      />
      <button disabled={!searchText} onClick={(e) => onSubmit()}>
        +
      </button>
    </>
  );
}

function Resultat({ data = [] }) {
  return (
    <div>
      <ul>
        {data.map((user) => (
          <li key={user.id} onClick>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
