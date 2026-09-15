import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
const e=import.meta.env;
export const configured=Boolean(e.VITE_FIREBASE_API_KEY&&e.VITE_FIREBASE_PROJECT_ID&&e.VITE_FIREBASE_APP_ID);
const app=configured?initializeApp({apiKey:e.VITE_FIREBASE_API_KEY,authDomain:e.VITE_FIREBASE_AUTH_DOMAIN,projectId:e.VITE_FIREBASE_PROJECT_ID,appId:e.VITE_FIREBASE_APP_ID,storageBucket:e.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:e.VITE_FIREBASE_MESSAGING_SENDER_ID}):null;
export const auth=app?getAuth(app):null;
export const db=app?getFirestore(app):null;
