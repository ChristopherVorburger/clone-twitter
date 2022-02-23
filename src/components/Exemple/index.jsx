import React from "react";
import { Button, Divider, TextField, Typography } from "@mui/material";

// import des fonctions du firestore
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

// import du context
import { AuthContext } from "../../context/authContext";

// initialisation de firestore
const database = getFirestore();

// sélection de la collection tweets
const tweetsCollectionRef = collection(database, "tweets");

// utilisation de onSnapshot qui permet de rafraichir la page à
// chaque changement sur la collection choisie
// 1er param: la collection en question
// 2ème param: fonction pour ajouter des tweets dans la collection
onSnapshot(tweetsCollectionRef, (snapshot) => {
  let tweets = [];
  snapshot.docs.forEach((doc) => {
    tweets.push({ ...doc.data(), id: doc.id });
  });
  console.log(tweets);
});

const Exemple = () => {
  // Utilisation du hook useContext pour récuperer le contexte
  const auth = React.useContext(AuthContext);

  const [text, setText] = React.useState("");
  const [id, setId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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

  // fonction pour supprimer un tweet
  const deleteTweet = (e) => {
    e.preventDefault();

    // Ici on a besoin de l'id du tweet pour savoir lequel supprimer
    // Donc pour l'instant on le recupère dans les logs ou dans firebase
    const docRef = doc(database, "tweets", id);

    deleteDoc(docRef)
      .then(() => {
        // on nettoie l'input si ok
        setId("");
        console.log("Delete tweet done");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // fonction pour créer un user
  const signUp = (e) => {
    e.preventDefault();
    // on utilise la fonction signUp du AuthContext
    auth
      .signUp(email, password)
      .then((cred) => {
        // on nettoie les inputs si ok
        setEmail("");
        setPassword("");
        console.log("user created : ", cred.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Typography variant="h4" m="1rem">
        Firebase firestore
      </Typography>
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

      <form action="submit" onSubmit={deleteTweet}>
        <TextField
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Id du tweet"
          sx={{ margin: "1rem" }}
        ></TextField>
        <Button type="submit" variant="contained" sx={{ margin: "1rem" }}>
          Supprimer Tweet
        </Button>
      </form>
      <Divider />
      <Typography variant="h4" m="1rem">
        Firebase auth
      </Typography>

      <Typography variant="h6" m="1rem">
        Création d'un user :
      </Typography>

      <form action="submit" onSubmit={signUp}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          sx={{ margin: "1rem" }}
        ></TextField>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          sx={{ margin: "1rem" }}
        ></TextField>
        <Button type="submit" variant="contained" sx={{ margin: "1rem" }}>
          New user
        </Button>
      </form>
    </div>
  );
};

export default Exemple;
