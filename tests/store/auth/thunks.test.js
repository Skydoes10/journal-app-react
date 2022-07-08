import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Tests in AuthThunks', () => {
	const dispatch = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test('should invoke checkingCredentials', async () => {
		await checkingAuthentication()( dispatch );
		expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
	});
    
    test('startGoogleSignIn should calls callscheckingCredentials and login - OK', async () => {
        
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );
        
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn should calls callscheckingCredentials and logout - Error', async () => {
        
        const loginData = { ok: false, errorMessage: 'Error' };
        await signInWithGoogle.mockResolvedValue( loginData );
        
        await startGoogleSignIn()( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
    });

    test('startCreatingUserWithEmailPassword should calls callscheckingCredentials and login - OK', async () => {
        
        const loginData = { ok: true, ...demoUser };
        const formData = { displayName: demoUser.displayName, email: demoUser.email, password: '123456' };
        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        
        await startCreatingUserWithEmailPassword( formData )( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });
    
    test('startCreatingUserWithEmailPassword should calls callscheckingCredentials and logout - Error', async () => {
        
        const loginData = { ok: false, errorMessage: 'Error' };
        const formData = { displayName: demoUser.displayName, email: demoUser.email, password: '123456' };
        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        
        await startCreatingUserWithEmailPassword( formData )( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
    });

    test('startLoginWithEmailPassword should calls callscheckingCredentials and login - OK', async () => {
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };
        await loginWithEmailPassword.mockResolvedValue( loginData );
        
        await startLoginWithEmailPassword( formData )( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });
    
    test('startLoginWithEmailPassword should calls callscheckingCredentials and logout - Error', async () => {
        
        const loginData = { ok: false, errorMessage: 'Error' };
        const formData = { email: demoUser.email, password: '123456' };
        await loginWithEmailPassword.mockResolvedValue( loginData );
        
        await startLoginWithEmailPassword( formData )( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
    });

    test('startLogout should calls logoutFirebase, clearNotesLogout and logout', async () => {

        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
    });

});
