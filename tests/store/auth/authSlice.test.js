import {
	authSlice,
	checkingCredentials,
	login,
	logout,
} from '../../../src/store/auth/authSlice';
import {
	authenticatedState,
	demoUser,
	initialState,
} from '../../fixtures/authFixtures';

describe('Tests in authSlice', () => {
	test('should return initial state and be named "auth"', () => {
		const state = authSlice.reducer(initialState, {});
		expect(state).toEqual(initialState);
		expect(authSlice.name).toBe('auth');
	});

	test('should perform authentication ', () => {
		const state = authSlice.reducer(initialState, login(demoUser));
		expect(state).toEqual({
			status: 'authenticated',
			uid: demoUser.uid,
			email: demoUser.email,
			displayName: demoUser.displayName,
			photoURL: demoUser.photoURL,
			errorMessage: null,
		});
	});

	test('should perform logout without error message', () => {
		const state = authSlice.reducer(authenticatedState, logout());
		expect(state).toEqual({
			status: 'not-authenticated',
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			errorMessage: undefined,
		});
	});

	test('should perform logout with error message', () => {
		const state = authSlice.reducer(
			authenticatedState,
			logout({ errorMessage: 'error' })
		);
		expect(state).toEqual({
			status: 'not-authenticated',
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			errorMessage: 'error',
		});
	});

	test('should change status to checking', () => {
		const state = authSlice.reducer(authenticatedState, checkingCredentials());
		expect(state.status).toEqual('checking');
	});
});
