import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9JEl1HOdz6tOgKD84Tcj-osDdsSWGgp8",
    authDomain: "crwn-clothing2-db-2842d.firebaseapp.com",
    projectId: "crwn-clothing2-db-2842d",
    storageBucket: "crwn-clothing2-db-2842d.appspot.com",
    messagingSenderId: "138125149069",
    appId: "1:138125149069:web:2fae2c2a5c44e26cf033c4"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
}