export const resizeImage = ( image, targetWidth, targetHeight ) => {
	const canvas = document.createElement( 'canvas' );
	canvas.width = targetWidth;
	canvas.height = targetHeight;
	const ctx = canvas.getContext( '2d' );
	ctx.drawImage( image, 0, 0, targetWidth, targetHeight );
	return canvas.toDataURL( 'image/jpeg' );
};

// Helper function to convert base64 data to a Blob
const base64ToBlob = ( base64Data, contentType ) => {
	const byteCharacters = atob( base64Data.split( ',' )[ 1 ] );
	const byteNumbers = new Array( byteCharacters.length );
	for ( let i = 0; i < byteCharacters.length; i++ ) {
		byteNumbers[ i ] = byteCharacters.charCodeAt( i );
	}
	const byteArray = new Uint8Array( byteNumbers );
	return new Blob( [ byteArray ], { type: contentType } );
};

export const handleSelectImage = async (
	mediaValue,
	otherImage,
	setImage,
	setBalanceStatus,
	setLoading
) => {
	const img = new window.Image();
	img.src = mediaValue;

	img.onload = async () => {
		const otherImg = new window.Image();
		// check other image height and width, and set the same for the new image
		otherImg.src = otherImage;
		const targetWidth = otherImg.width;
		const targetHeight = otherImg.height;

		// height of current image
		const imgHeight = img.height;
		const imgWidth = img.width;

		if ( imgHeight === targetHeight && imgWidth === targetWidth ) {
			return;
		}

		const resizedImageBase64 = resizeImage(
			img,
			targetWidth,
			targetHeight
		);

		// Convert base64 image data to Blob for upload
		const resizedImageBlob = base64ToBlob(
			resizedImageBase64,
			'image/jpeg'
		);

		// Create form data for media upload
		const formData = new FormData();
		formData.append( 'file', resizedImageBlob, 'resized-image.jpg' );
		formData.append( 'title', mediaValue.title || 'Resized Image' );
		// eslint-disable-next-line
		formData.append('_wpnonce', wpApiSettings.nonce);

		let retryCount = 0;
		let success = false;
		const maxRetries = 3;

		while ( retryCount < maxRetries && ! success ) {
			try {
				// Upload the resized image to the WordPress media library
				const response = await fetch(
					// eslint-disable-next-line
					`${wpApiSettings.root}wp/v2/media`,
					{
						method: 'POST',
						headers: {
							// eslint-disable-next-line
							Authorization: `Bearer ${wpApiSettings.nonce}`,
						},
						body: formData,
					}
				);

				// Retry on server error (status 500)
				if ( response.status === 500 ) {
					retryCount++;
					continue; // Continue the loop to retry the upload
				}

				const data = await response.json();

				if ( data && data.id && data.source_url ) {
					setImage( data.source_url );
					success = true;
					setBalanceStatus( 'success' );
					setLoading( false );
				}
			} catch ( error ) {
				retryCount++;
			}
		}

		if ( ! success ) {
			setBalanceStatus( 'error' );
			setLoading( false );
		}
	};
};
