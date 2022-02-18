// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBTbjYAEsYyAy8M9_-aKibSFdh4B5eb6ic',
  authDomain: 'clone-tw.firebaseapp.com',
  projectId: 'clone-tw',
  storageBucket: 'clone-tw.appspot.com',
  messagingSenderId: '554791574832',
  appId: '1:554791574832:web:fc60754c54cdf72f9b3cf5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
