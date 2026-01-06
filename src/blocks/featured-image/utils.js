export const updateImageAttributes = ( media, controlValue ) => {
	const {
		media_details: { sizes },
	} = media;
	if ( controlValue === 'custom' ) {
		return {
			width: sizes.large?.width,
			height: sizes.large?.height,
			url: sizes.large?.source_url,
			objectFit: 'cover',
		};
	}
	const getMediaDetails = sizes[ controlValue ];
	const { width, height, source_url } = getMediaDetails;

	return { width, height, url: source_url };
};
