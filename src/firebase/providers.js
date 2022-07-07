import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const resp = await signInWithPopup(FirebaseAuth, googleProvider);
		// const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = resp.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        };

	} catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        };
	};
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        };

    } catch (error) { 
        if (error.code === 'auth/email-already-in-use') {
            return {
                ok: false,
                errorMessage: 'Email already in use',
            };
        };

        return {
            ok: false,
            errorMessage: error.message,
        };
    };
};

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;
        
        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        };

    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            return {
                ok: false,
                errorMessage: 'User not found',
            };
        };
        
        return {
            ok: false,
            errorMessage: error.message,
        };
    };
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};