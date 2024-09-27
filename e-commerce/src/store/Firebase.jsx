import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import fireConfig from './Fire.json'

const firebaseConfig = {
    apiKey: fireConfig.apiKey,
    authDomain: fireConfig.authDomain,
    projectId: fireConfig.projectId,
    storageBucket: fireConfig.storageBucket,
    messagingSenderId: fireConfig.messagingSenderId,
    appId: fireConfig.appId
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };