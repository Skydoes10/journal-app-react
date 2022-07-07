// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBcFfaKQ3j9JeGwMtNGDtKiXJjT1muZBhY',
	authDomain: 'journal-app-21eee.firebaseapp.com',
	projectId: 'journal-app-21eee',
	storageBucket: 'journal-app-21eee.appspot.com',
	messagingSenderId: '904740584513',
	appId: '1:904740584513:web:9ab053546401877e509ac0',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
