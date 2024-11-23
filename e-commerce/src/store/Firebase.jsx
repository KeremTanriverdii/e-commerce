import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import fireConfig from './Fire.json'
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: fireConfig.apiKey,
    authDomain: fireConfig.authDomain,
    projectId: fireConfig.projectId,
    storageBucket: fireConfig.storageBucket,
    messagingSenderId: fireConfig.messagingSenderId,
    appId: fireConfig.appId
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const provider = new GoogleAuthProvider()
export { db, auth, provider };