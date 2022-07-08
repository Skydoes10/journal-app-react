import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'skydoes',
    api_key: '485415996651354',
    api_secret: 'tWzW39qiqyNUXXCctGYXSRwD5_w',
    secure: true
});

describe('Tests in fileUpload', () => {
	test('should upload a file correctly to cloudinary', async () => {
		const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&w=1000&q=80';
		const resp = await fetch(imageUrl);
		const blob = await resp.blob();
		const file = new File([blob], 'test.jpg', { type: 'image/jpeg' });

		const url = await fileUpload(file);
		expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });
	});

    test('should return null if the file is not an image', async () => {
        const file = new File([], 'test.jpg');
		const url = await fileUpload(file);
		expect( url ).toBe(null);
    });
});
