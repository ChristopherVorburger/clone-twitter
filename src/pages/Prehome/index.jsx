import React from "react";

import { Box, Stack, Button, Typography, Container } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

import { images } from "../../constants";

import useStyles from "./styles";

const NewHome = () => {
  const classes = useStyles();
  return (
    <main>
      <Box className={classes.box__main}>
        <Box p={2} className={classes.box__text}>
          <Container className={classes.container} maxWidth="md">
            <Stack direction="column" justifyContent="center">
              <TwitterIcon className={classes.icon__twitter} color="primary" />
              <Typography
                className={classes.title}
                fontSize="44px"
                fontWeight="bold"
              >
                Happening now
              </Typography>
              <Typography
                className={classes.subtitle}
                fontSize="23px"
                fontWeight="bold"
              >
                Join Twitter today.
              </Typography>
              <Stack width="300px" maxWidth="380px">
                <Button
                  sx={{ marginBottom: "0.5rem" }}
                  className={classes.button}
                  variant="outlined"
                >
                  <img
                    className={classes.button__logo}
                    src={images.logoGoogle}
                    width="20px"
                    alt="logo google"
                  />
                  <Typography fontSize="14px" color="black">
                    Sign up with Google
                  </Typography>
                </Button>
                <Button className={classes.button} variant="outlined">
                  <img
                    className={classes.button__logo}
                    src={images.logoApple}
                    width="20px"
                    alt="logo apple"
                  />
                  <Typography fontSize="15px" color="black" fontWeight="bold">
                    Sign up with Apple
                  </Typography>
                </Button>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  m="4px 0"
                >
                  <div className={classes.line} />
                  <Typography textAlign="center">or</Typography>
                  <div className={classes.line} />
                </Stack>
                <Button
                  sx={{ marginBottom: "0.5rem" }}
                  className={classes.button}
                  variant="contained"
                >
                  <Typography fontWeight="bold">
                    Sign up with phone or email
                  </Typography>
                </Button>
                <Typography fontSize="11px" mb="16px">
                  By signing up, you agree to the Terms of Service and Privacy
                  Policy, including Cookie Use.
                </Typography>
                <Typography
                  mt="2.5rem"
                  mb="1rem"
                  fontWeight="bold"
                  gutterBottom
                >
                  Already have an account?
                </Typography>
                <Button className={classes.button} variant="outlined">
                  <Typography fontWeight="bold">Sign in</Typography>
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
        <Box
          title="background with the twitter logo"
          className={classes.image}
        />
      </Box>
      <>
        <Typography p="12px 16px" textAlign="center">
          © 2022 Twitter, Inc.
        </Typography>
      </>
    </main>
  );
};

export default NewHome;
