import React, { useRef, useState } from 'react';
import './Message.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirebaseConfig } from '../../firebase-config';

firebase.initializeApp(getFirebaseConfig());

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
        <AddNewChat />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <>
        <button className="sign-out" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      </>
    )
  );
}

function AddNewChat() {
  const usersRef = firestore.collection('users');
  const channelsRef = firestore.collection('channels');

  const query = usersRef.orderBy('name');
  const [searchValue, setSearchValue] = useState('');
  const [users] = useCollectionData(query, { idField: 'name' });
  const [dataSearchedUsers, setDataSearchedUsers] = React.useState([]);

  const addNewChannel = async () => {
    // e.preventDefault();

    const { uid, name, photoURL } = auth.currentUser;
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const channel = await channelsRef.add({
      name: searchValue,
    });

    const channelMessageRef = channel.collection('messages');
    const messageChannel = await channelMessageRef.add({
      createdAt: createdAt,
      photoUrl: null,
      senderId: uid,
      senderName: 'toto',
      text: 'test channel messge',
    });
  };

  function handleTextChange(text) {
    setSearchValue(text);
    setDataSearchedUsers(setFilterUsers(text));
  }

  function setFilterUsers(searchText) {
    return users.filter((user) => {
      if (user.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }

      return false;
    });
  }

  return (
    <>
      <SearchUserInput
        onTextChange={handleTextChange}
        onSubmit={addNewChannel}
        searchText={searchValue}
      />
      <Resultat data={dataSearchedUsers} />
    </>
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

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
