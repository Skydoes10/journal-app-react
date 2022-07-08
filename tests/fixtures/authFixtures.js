export const initialState = {
	status: 'checking', // checking, not-authenticated, authenticated
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authenticatedState = {
	status: 'authenticated', // checking, not-authenticated, authenticated
	uid: '12345',
	email: 'demo@google.com',
	displayName: 'Demo User',
	photoURL: 'https://demo.jpg',
	errorMessage: null,
};

export const notAuthenticatedState = {
	status: 'not-authenticated', // checking, not-authenticated, authenticated
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const demoUser = {
	uid: '12345',
	email: 'demo@google.com',
	displayName: 'Demo User',
	photoURL: 'https://demo.jpg',
};
