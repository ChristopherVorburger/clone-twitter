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

// Reducer snackbars
const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_INFO_SNACKBAR":
      return {
        openSnackbar: true,
        snackbarMessage: action.payload.message,
        snackbarColor: "info",
      };
    case "OPEN_ERROR_SNACKBAR":
      return {
        openSnackbar: true,
        snackbarMessage: action.payload.message,
        snackbarColor: "error",
      };
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        openSnackbar: false,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Create context provider
export function GlobalContextProvider(props) {
  // Initial State for the snackbar reducer
  const initialSnackbarValue = {
    openSnackbar: false,
    snackbarMessage: "",
    snackbarColor: "info",
  };
  // Using reducer
  const [state, dispatch] = React.useReducer(reducer, initialSnackbarValue);

  // Destructuring values from the state of the recucer
  const { openSnackbar, snackbarMessage, snackbarColor } = state;

  // Handle close snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "CLOSE_SNACKBAR" });
  };

  const value = React.useMemo(
    () => ({
      dispatch,
    }),
    []
  );

  return (
    <GlobalContext.Provider value={value}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
