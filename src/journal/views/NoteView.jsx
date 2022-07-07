import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store';

export const NoteView = () => {
	const dispatch = useDispatch();

	const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );

	const { title, body, date, onInputChage, formState } = useForm( note );

	const dateString = useMemo(() => {
		const newDate = new Date( date );
		return newDate.toUTCString();
	}, [date] );

	const fileInputRef = useRef();

	useEffect(() => {
		if ( messageSaved.length > 0 ) {
			Swal.fire({
				title: 'Note saved!',
				text: messageSaved,
				icon: 'success',
			});
	  	};
	}, [messageSaved])
	

	useEffect(() => {
		dispatch( setActiveNote( formState ) );
	}, [ formState ]);
	
	const onSaveNote = () => {
		dispatch( startSaveNote() );
	};

	const onFileInputChange = ({ target }) => {
		if ( target.files === 0 ) return;

		dispatch( startUploadingFiles( target.files ) );
	};

	const onDeleteNote = () => {
		dispatch( startDeletingNote() );
	};

	return (
		<Grid
			className='animate__animated animate__fadeIn animate__faster'
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{ dateString }
				</Typography>
			</Grid>

			<Grid item>

				<input 
					type="file" 
					multiple
					ref={ fileInputRef }
					onChange={ onFileInputChange }
					style={{ display: 'none' }}
				/>

				<IconButton
					color='primary'
					disabled={ isSaving }
					onClick={ () => fileInputRef.current.click() }
				>
					<UploadOutlined />
				</IconButton>

				<Button 
					disabled={ isSaving }
					onClick={ onSaveNote }
					color="primary" 
					sx={{ padding: 2 }}
				>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Save
				</Button>
			</Grid>

			<Grid container>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Type a title"
					label="Title"
					sx={{ border: 'none', mb: 1 }}
					name="title"
					value={ title }
					onChange={ onInputChage }
				/>

				<TextField
					type="text"
					variant="filled"
					fullWidth
                    multiline
					placeholder="What happened today?"
                    minRows={3}
					name="body"
					value={ body }
					onChange={ onInputChage }
				/>
			</Grid>

			<Grid container justifyContent="end">
				<Button
					onClick={ onDeleteNote }
					sx={{ mt: 2 }}
					color="error"
				>
					<DeleteOutline />
					Delete
				</Button>
			</Grid>

            <ImageGallery 
				images={ note.imageUrls }
			/>

		</Grid>
	);
};
