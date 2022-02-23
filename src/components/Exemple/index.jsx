import React from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// Import des fonctions du firestore
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  // getDoc,
  updateDoc,
} from "firebase/firestore";

// Import du context
import { AuthContext } from "../../context/authContext";

// Initialisation de firestore
const database = getFirestore();

// Référence des collections
const tweetsCollectionRef = collection(database, "tweets");
const usersCollectionRef = collection(database, "users");

// Utilisation de onSnapshot qui permet de rafraichir la page à
// chaque changement sur la collection choisie :
// - 1er param: la collection en question
// - 2ème param: fonction pour ajouter des tweets dans la collection
onSnapshot(tweetsCollectionRef, (snapshot) => {
  let tweets = [];
  snapshot.docs.forEach((doc) => {
    tweets.push({ ...doc.data(), id: doc.id });
  });
  console.log(tweets);
});

const Exemple = () => {
  // Utilisation du hook useContext pour récupérer le contexte
  const auth = React.useContext(AuthContext);

  // States pour les tweets
  const [text, setText] = React.useState("");
  const [idDelete, setIdDelete] = React.useState("");
  const [idUpdate, setIdUpdate] = React.useState("");

  // States pour la partie authentification
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // States pour le firestore
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [errorName, setErrorName] = React.useState();
  const [errorUsername, setErrorUsername] = React.useState();

  // States pour le login
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [errorLogin, setErrorLogin] = React.useState("");

  //
  // fonction pour ajouter un tweet
  const addTweet = (e) => {
    e.preventDefault();

    addDoc(tweetsCollectionRef, {
      text,
      // on utilise serverTimestamp() pour créer automatiquement la date de création du tweet
      created_at: serverTimestamp(),
    })
      .then(() => {
        // on nettoie l'input si ok
        setText("");
        console.log("Tweet created !");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //
  // fonction pour supprimer un tweet
  const deleteTweet = (e) => {
    e.preventDefault();

    // Ici on a besoin de l'id du tweet pour savoir lequel supprimer
    // Donc pour l'instant on le recupère dans les logs ou dans firebase
    const docRef = doc(database, "tweets", idDelete);

    deleteDoc(docRef)
      .then(() => {
        // on nettoie l'input si ok
        setIdDelete("");
        console.log("Delete tweet done");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //
  // Fonction pour mettre à jour un tweet
  const updateTweet = (e) => {
    e.preventDefault();

    // Référence au tweet (id) à mettre à jour
    const docRef = doc(database, "tweets", idUpdate);

    updateDoc(docRef, {
      text: "Je suis un texte à jour",
    }).then(() => {
      console.log();
    });
  };

  //
  // FIXME: À décommenter pour voir en console
  // Obtenir un seul tweet :
  // Référence du tweet (id) que l'on veut récupérer
  // const docRef = doc(database, "tweets", "Isz5P0tK7roQgL7vNLQy");

  // On utilise la référence avec la fonction getDoc
  // getDoc(docRef).then((doc) => {
  //   console.log(doc.data());
  // });

  // On peut aussi utiliser onSnapshot pour rafraichir la page
  // si un changement survient sur le tweet sélectionné
  // onSnapshot(docRef, (doc) => {
  //   console.log(doc.data(), doc.id);
  // });

  //
  // Fonction pour créer un user
  const signUp = (e) => {
    e.preventDefault();
    setErrorName("");
    setErrorUsername("");

    // Firebase vérifie la validité du champ email et password avec la fonction
    // createUserWithEmailAndPassword(). Non seulement il vérifie la forme
    // mais aussi si l'email est déjà prit ou non, sympa!
    // Pour les autres champs, pour l'instant on vérifie juste si ils ne sont pas vides
    // ou ne contiennent pas trop de caractères.

    if (name === "" || name.length > 100) {
      setErrorName("Veuillez entrer un nom (max. 100 caractères)");
    } else if (username === "" || name.length > 100) {
      setErrorUsername("Veuillez entrer un nom d'utilisateur");
    } else {
      // On utilise la fonction signUp du AuthContext afin de
      // créer un user dans la partie authentification de firebase
      auth
        .signUp(email, password)
        .then((cred) => {
          // on nettoie les inputs si ok
          setEmail("");
          setPassword("");
          console.log("User created in authentification : ", cred.user);
          // Puis, on utilise addDoc sur la collection 'users' de notre BDD pour ajouter
          // un user dans firestore
          addDoc(usersCollectionRef, {
            name,
            username,
            // on utilise serverTimestamp() pour créer automatiquement la date de création du user
            created_at: serverTimestamp(),
          })
            .then(() => {
              // on nettoie les inputs si ok
              setName("");
              setUsername("");
              console.log("User created in firestore !");
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // Fonction pour connecter un utilisateur
  const login = (e) => {
    e.preventDefault();
    setErrorLogin(false);
    if (!loginEmail || !loginPassword) {
      setErrorLogin("Veuillez entrer vos identifiants");
      return;
    }
    // On utilise la fonction signIn du AuthContext
    auth
      .signIn(loginEmail, loginPassword)
      .then((cred) => {
        // on nettoie les inputs si ok
        setLoginEmail("");
        setLoginPassword("");
        console.log("User logged in :", cred.user);
      })
      // On gère les erreurs en fonction de la réponse de firebase
      .catch((err) => {
        if (
          err.message === "Firebase: Error (auth/invalid-email)." ||
          err.message === "Firebase: Error (auth/user-not-found)." ||
          err.message === "Firebase: Error (auth/wrong-password)."
        ) {
          // Je laisse ce log pour l'instant pour la compréhension
          // mais il faudra le supprimer par sécurité
          // TODO: log à supprimer avant la prod
          console.log("error", err.message);
          setErrorLogin("Email ou mot de passe incorrect");
        }
      });
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    // On utilise la fonction signUserOut du AuthContext
    auth
      .signUserOut()
      .then(() => console.log("User signed out"))
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Typography variant="h4" m="1rem">
        Firebase firestore
      </Typography>
      {/* Formulaire pour ajouter un tweet */}
      <form action="submit" onSubmit={addTweet}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          sx={{ margin: "1rem" }}
        ></TextField>
        <Button type="submit" variant="contained" sx={{ margin: "1rem" }}>
          Nouveau Tweet
        </Button>
      </form>

      {/* Formulaire pour supprimer un tweet */}
      <form action="submit" onSubmit={deleteTweet}>
        <TextField
          value={idDelete}
          onChange={(e) => setIdDelete(e.target.value)}
          placeholder="Id du tweet"
          sx={{ margin: "1rem" }}
        ></TextField>
        <Button type="submit" variant="contained" sx={{ margin: "1rem" }}>
          Supprimer Tweet
        </Button>
      </form>

      {/* Formulaire pour mettre à jour un tweet */}
      <form action="submit" onSubmit={updateTweet}>
        <TextField
          value={idUpdate}
          onChange={(e) => setIdUpdate(e.target.value)}
          placeholder="Id du tweet"
          sx={{ margin: "1rem" }}
        ></TextField>
        <Button type="submit" variant="contained" sx={{ margin: "1rem" }}>
          Mettre à jour le Tweet
        </Button>
      </form>
      <Divider />
      <Typography variant="h4" m="1rem">
        Firebase auth
      </Typography>

      <Box display="flex">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth="300px"
          alignItems="center"
          m="1rem"
        >
          {/* Formulaire pour créer un user */}
          <form action="submit" onSubmit={signUp}>
            <Typography variant="h6" m="1rem 0">
              Création d'un user :
            </Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              sx={{ marginBottom: "1rem" }}
            ></TextField>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              sx={{ marginBottom: "1rem" }}
            ></TextField>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              sx={{ marginBottom: "1rem" }}
            ></TextField>
            <Typography color="error">{errorName}</Typography>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              sx={{ marginBottom: "1rem" }}
            ></TextField>
            <Typography color="error">{errorUsername}</Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginBottom: "1rem" }}
            >
              New user
            </Button>
          </form>
        </Box>
        {/* Formulaire pour se connecter */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth="300px"
          alignItems="center"
          m="1rem"
        >
          <form action="submit" onSubmit={login}>
            <Typography variant="h6" m="1rem 0">
              Connexion :
            </Typography>
            <TextField
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email"
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
              sx={{ marginBottom: "1rem" }}
            />
            <Typography color="error">{errorLogin}</Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginBottom: "1rem" }}
            >
              Login
            </Button>
          </form>
        </Box>
        {/* Bouton pour se déconnecter */}
        <Box>
          <Typography variant="h6" m="1rem 0">
            Déconnexion :
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Exemple;
