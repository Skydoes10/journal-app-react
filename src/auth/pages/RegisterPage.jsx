import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
	displayName: '',
	email: '',
	password: '',
};

const formValidations = {
	displayName: [ ( value ) => value.length >= 1, 'Name is required' ],
	email: [ ( value ) => value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), 'Invalid email' ],
	password: [ ( value ) => value.length >= 6, 'Password must be longer than 6 characters' ]
}

export const RegisterPage = () => {
	const dispatch = useDispatch();

	const [formSubmitted, setFormSubmitted] = useState(false);

	const { status, errorMessage } = useSelector( (state) => state.auth );
	const isCheckingAuth = useMemo( () => status === 'checking', [status] );

	const { formState, displayName, email, password, onInputChage, isFormValid, displayNameValid, emailValid, passwordValid } = useForm( formData, formValidations );

	const onSubmit = (e) => {
		e.preventDefault();
		setFormSubmitted(true);
		if ( !isFormValid ) return;

		dispatch( startCreatingUserWithEmailPassword( formState ) );
	}

	return (
		<AuthLayout title="Create Account">
			<form 
				className='animate__animated animate__fadeIn animate__faster'
				onSubmit={ onSubmit }
			>
				<Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							laber="Fullname"
							type="text"
							placeholder="Fullname"
							fullWidth
							name="displayName"
							value={ displayName }
							onChange={ onInputChage }
							error={ !!displayNameValid && formSubmitted }
							helperText={ displayNameValid && formSubmitted ? displayNameValid : '' }
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							laber="Email"
							type="email"
							placeholder="Email"
							fullWidth
							name="email"
							value={ email }
							onChange={ onInputChage }
							error={ !!emailValid && formSubmitted }
							helperText={ emailValid && formSubmitted ? emailValid : '' }
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							laber="Password"
							type="password"
							placeholder="Password"
							fullWidth
							name="password"
							value={ password }
							onChange={ onInputChage }
							error={ !!passwordValid && formSubmitted }
							helperText={ passwordValid && formSubmitted ? passwordValid : '' }
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid 
							item 
							xs={12}
							display={ !!errorMessage ? '' : 'none' }	
						>
							<Alert severity="error">
								{ errorMessage }
							</Alert>
						</Grid>

						<Grid item xs={12}>
							<Button
								disabled={ isCheckingAuth }
								type="submit"
								variant="contained"
								fullWidth
							>
								Create Account
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }}>Do you have an account?</Typography>
						<Link
							component={RouterLink}
							background-color="inherit"
							to="/auth/login"
						>
							Login
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
