import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  pinned_list__avatar: {
    objectFit: "cover",
    borderRadius: "1rem",
  },
  pinned_list__name: {
    textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100px",
  },
}));
