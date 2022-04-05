import * as React from "react";

// MUI
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Create GlobalContext
export const GlobalContext = React.createContext();

// Create hook useGlobal
export const useGlobal = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobal() only can be used with <GlobalContext.provider>"
    );
  }
  return context;
};

// Alert Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Create context provider
export function GlobalContextProvider(props) {
  // States snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarColor, setSnackbarColor] = React.useState("success");

  // Handle close snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const value = React.useMemo(
    () => ({
      setOpenSnackbar,
      setSnackbarMessage,
      setSnackbarColor,
    }),
    []
  );

  return (
    <GlobalContext.Provider value={value}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarColor}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {props.children}
    </GlobalContext.Provider>
  );
}
