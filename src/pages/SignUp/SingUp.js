import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
import CloseButton from "../../components/CloseButton/CloseButton";
import LogoTwitter from "../../components/TwitterLogo/TwitterLogo";
import { Typography, Button, TextField, Box, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { selectMonth } from "./DataSelect";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

function SignUp() {
  const classes = useStyles();
  const [switchPhoneEmail, setSwitchPhoneEmail] = React.useState("Email");

  const [newName, setNewName] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newPhone, setNewPhone] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newMonth, setNewMonth] = React.useState("");
  const [newDay, setNewDay] = React.useState(0);
  const [newYear, setNewYear] = React.useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      email: newEmail,
      phone: newPhone,
      password: newPassword,
      age: {
        month: newMonth,
        day: newDay,
        year: newYear,
      },
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const [errorName, setErrorName] = React.useState(false);
  const [errorPhone, setErrorPhone] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [passwordIsOk, setPasswordIsOk] = React.useState(false);

  function SwitchPhoneEmail() {
    let switchRender;

    if (switchPhoneEmail === "Phone") {
      switchRender = (
        <Typography
          className={classes.switchPhoneEmail}
          onClick={() => setSwitchPhoneEmail("Email")}
          width={140}
        >
          Utiliser un téléphone
        </Typography>
      );
    } else if (switchPhoneEmail === "Email") {
      switchRender = (
        <Typography
          className={classes.switchPhoneEmail}
          onClick={() => setSwitchPhoneEmail("Phone")}
          width={110}
        >
          Utiliser un email
        </Typography>
      );
    }

    return <>{switchRender}</>;
  }

  const [month, setMonth] = React.useState("");
  const [day, setDay] = React.useState("");
  const selectDay = [];
  for (let i = 0; i < 32; i++) {
    selectDay.push({ value: `${i}`, label: `${i}` });
  }
  const [year, setYear] = React.useState("");
  const selectYear = [];
  for (let i = 2022; i > 1901; i--) {
    selectYear.push({ value: `${i}`, label: `${i}` });
  }

  function MMDDYYYYInput() {
    return (
      <Stack
        className="MM-DD-YYYYInput"
        direction="row"
        marginTop="15px"
        spacing={2}
      >
        <Box component="form" width="48%">
          <TextField
            select
            label="Mois"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              setNewMonth(e.target.value);
            }}
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {selectMonth.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box component="form" width="22%">
          <TextField
            select
            label="Jour"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
              setNewDay(e.target.value);
            }}
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {selectDay.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box component="form" width="30%">
          <TextField
            select
            label="Année"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setNewYear(e.target.value);
            }}
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {selectYear.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Stack>
    );
  }

  return (
    <div className={classes.mainContainer}>
      <Stack
        className={("box", classes.box)}
        heigth="100vh"
        width="83%"
        margin="0 auto"
        spacing={2.5}
      >
        <Stack className="logoAndClose" direction="row" alignItems="center">
          <Link to="/">
            <CloseButton role="button" />
          </Link>
          <Stack className={classes.logo}>
            <LogoTwitter role="logo" />
          </Stack>
        </Stack>
        <Stack
          className={classes.signupContainer}
          width="100%"
          justifyContent="center"
          spacing={2}
        >
          <Stack className="accountCreate" spacing={4}>
            <Typography className={classes.accountCreateTitle}>
              Créer votre compte
            </Typography>
            <Stack className="input" spacing={4}>
              <Box component="form">
                <TextField
                  type="text"
                  variant="outlined"
                  label="Nom et prénom"
                  fullWidth={true}
                  autoFocus={true}
                  onChange={(e) => {
                    e.target.value.length >= 2
                      ? setErrorName(false)
                      : setErrorName(true);
                    setNewName(e.target.value);
                  }}
                  error={errorName}
                  helperText={
                    errorName === true ? "Quel est votre nom ?" : null
                  }
                />
              </Box>
              {switchPhoneEmail === "Phone" ? (
                <Box component="form">
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Email"
                    fullWidth={true}
                    onChange={(e) => {
                      e.target.value.includes("@") &&
                      e.target.value.includes(".")
                        ? setErrorEmail(false)
                        : setErrorEmail(true);
                      setNewEmail(e.target.value);
                    }}
                    error={errorEmail}
                    helperText={
                      errorEmail === true
                        ? "Veuillez entrer un email valide."
                        : null
                    }
                  />
                </Box>
              ) : switchPhoneEmail === "Email" ? (
                <Box component="form">
                  <TextField
                    type="number"
                    variant="outlined"
                    label="Téléphone"
                    fullWidth={true}
                    onChange={(e) => {
                      e.target.value.length === 10
                        ? setErrorPhone(false)
                        : setErrorPhone(true);
                      setNewPhone(e.target.value);
                    }}
                    error={errorPhone}
                    helperText={
                      errorPhone === true
                        ? "Veuillez entrer un numéro de téléphone valide."
                        : null
                    }
                  />
                </Box>
              ) : null}
            </Stack>
            <SwitchPhoneEmail
              switchPhoneEmail={switchPhoneEmail}
              setSwitchPhoneEmail={setSwitchPhoneEmail}
            />
          </Stack>
          <Typography className={classes.birthdayPasswordTitle}>
            Créer votre mot de passe
          </Typography>
          <Box component="form">
            <TextField
              type="password"
              variant="outlined"
              label="Mot de passe"
              fullWidth={true}
              onChange={(e) => {
                e.target.value.length >= 6
                  ? setPasswordIsOk(false)
                  : setPasswordIsOk(true);
                setNewPassword(e.target.value);
              }}
              error={passwordIsOk}
              helperText={
                passwordIsOk === true
                  ? "Votre mot de passe est trop cour"
                  : null
              }
            />
          </Box>
          <Stack className="birthday">
            <Typography className={classes.birthdayPasswordTitle}>
              Date de naissance
            </Typography>
            <Typography className={classes.birthdayText}>
              Cette information ne sera pas affichée publiquement. Confirmez
              votre âge, même si ce compte est pour une entreprise, un animal de
              compagnie ou autre chose.
            </Typography>
            <MMDDYYYYInput />
          </Stack>
          <Stack className="nextButton" backgroundColor="white">
            <Button
              className={classes.nextButton}
              size="large"
              onClick={createUser}
            >
              Suivant
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default SignUp;
