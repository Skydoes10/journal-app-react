import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store';

const formData = {
	email: '',
	password: ''
};

export const LoginPage = () => {

	const { status, errorMessage } = useSelector( state => state.auth );

	const dispatch = useDispatch();

	const { formState, email, password, onInputChage } = useForm( formData );

	const isAuthenticating = useMemo( () => status === 'checking', [status] );

	const onSubmit = (e) => {
		e.preventDefault();
		
		dispatch( startLoginWithEmailPassword( formState ) );
		
	}
	
	const onGoogleSignIn = () => {
		dispatch( startGoogleSignIn() );
	}

	return (
		<AuthLayout title="Login">
			<form 
				aria-label='submit-form'
				className='animate__animated animate__fadeIn animate__faster'
				onSubmit={ onSubmit }
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Email"
							type="email"
							placeholder="Email"
							fullWidth
							name="email"
							value={ email }
							onChange={ onInputChage }
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Password"
							type="password"
							placeholder="Password"
							fullWidth
							name="password"
							inputProps={{
								'data-testid': 'password'
							}}
							value={ password }
							onChange={ onInputChage }
						/>
					</Grid>

					<Grid
						container
						display={ !!errorMessage ? '' : 'none' }
						sx={{ mt: 1 }}
					>
						<Grid 
							item 
							xs={12}
						>
							<Alert severity="error">
								{ errorMessage }
							</Alert>
						</Grid>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6}>
							<Button 
								disabled={ isAuthenticating }
								type='submit'
								variant="contained"
								fullWidth
							>
								Login
							</Button>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Button 
								disabled={ isAuthenticating }
								variant="contained" 
								fullWidth
								aria-label='google-btn'
								onClick={ onGoogleSignIn }	
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Link
							component={RouterLink}
							background-color="inherit"
							to="/auth/register"
						>
							Create an account
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
