import React from "react";

import { Stack, Button, Typography, Container } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

import { images } from "../../constants";

import useStyles from "./styles";

const Prehome = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container} direction="row">
        <div
          className={classes.image}
          role="img"
          aria-label="background with the twitter logo"
        />
        <Container maxWidth="md">
          <Stack
            className={classes.container__text}
            direction="column"
            justifyContent="center"
            spacing={1}
          >
            <TwitterIcon
              className={classes.logo}
              fontSize="large"
              color="primary"
            />
            <Typography
              className={classes.title}
              variant="h2"
              fontWeight="bold"
            >
              Happening now
            </Typography>
            <Typography
              className={classes.subtitle}
              variant="h4"
              fontWeight="bold"
            >
              Join Twitter today.
            </Typography>
            <Stack className={classes.texts} spacing={2}>
              <Button className={classes.button} variant="outlined">
                <img
                  className={classes.button__logo}
                  src={images.logoGoogle}
                  width="20px"
                  alt="logo google"
                />
                <Typography color="black">Sign up with Google</Typography>
              </Button>
              <Button className={classes.button} variant="outlined">
                <img
                  className={classes.button__logo}
                  src={images.logoApple}
                  width="20px"
                  alt="logo apple"
                />
                <Typography color="black" fontWeight="bold">
                  Sign up with Apple
                </Typography>
              </Button>
              <Typography textAlign="center">or</Typography>
              <Button className={classes.button} variant="contained">
                <Typography fontWeight="bold">
                  Sign up with phone or email
                </Typography>
              </Button>
              <Typography className={classes.caption} variant="caption">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </Typography>
              <Typography fontWeight="bold" gutterBottom>
                Already have an account?
              </Typography>
              <Button className={classes.button} variant="outlined">
                <Typography fontWeight="bold">Sign in</Typography>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </div>
      <Container>
        <Typography textAlign="center">© 2022 Twitter, Inc.</Typography>
      </Container>
    </>
  );
};

export default Prehome;