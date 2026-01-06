import { useState, useEffect } from '@wordpress/element';
import { objectUniqueCheck } from '@Utils/helper';
import { defaultWidthAndHeight } from './attributes';

export const onSelectImage = (
	media,
	attributes,
	setAttributes,
	deviceType
) => {
	const mediaAttributes = pickRelevantMediaFiles(
		media,
		attributes,
		deviceType
	);
	const {
		title,
		imgUrl,
		imgUrlTablet,
		imgUrlMobile,
		imgId: uploadedMediaImageId,
	} = mediaAttributes;

	const currentDesktopImgUrl = attributes?.imgUrl;
	const { imgId, imgIdTablet, imgIdMobile } = attributes || {};

	let imgURL;
	const imgOtherAttributes = {};
	let widthAndHeight;
	if ( deviceType === 'Tablet' ) {
		imgURL = {
			imgUrl: currentDesktopImgUrl || imgUrl,
			imgUrlTablet: imgUrlTablet || imgUrl,
		};

		if ( ! imgIdMobile ) {
			imgURL.imgUrlMobile = imgUrlMobile || imgUrl;
		}

		widthAndHeight = {
			...attributes?.widthHeightWidget,
		};
	} else if ( deviceType === 'Mobile' ) {
		imgURL = {
			imgUrl: currentDesktopImgUrl || imgUrl,
			imgUrlMobile: imgUrlMobile || imgUrlTablet || imgUrl,
		};
		widthAndHeight = {
			...attributes?.widthHeightWidget,
		};
	} else {
		imgURL = {
			imgUrl,
		};

		if ( ! imgIdTablet ) {
			imgURL.imgUrlTablet = imgUrlTablet || imgUrl;
		}

		if ( ! imgIdMobile ) {
			imgURL.imgUrlMobile = imgUrlMobile || imgUrl;
		}

		widthAndHeight = {
			...attributes?.widthHeightWidget,
		};
	}

	if ( ! imgId ) {
		imgOtherAttributes.imgId = uploadedMediaImageId;
	} else {
		imgOtherAttributes[ 'imgId' + deviceType ] = uploadedMediaImageId;
	}

	if ( ! deviceType && ( imgIdTablet || imgIdMobile ) ) {
		imgOtherAttributes.showNotice = true;
	}

	setAttributes( {
		...imgOtherAttributes,
		imgTitle: title,
		...imgURL,
		widthHeightWidget: objectUniqueCheck( defaultWidthAndHeight, {
			...defaultWidthAndHeight,
			...widthAndHeight,
		} ),
	} );
};

export const pickRelevantMediaFiles = ( image ) => {
	const { id, url, width, height, title } = image;
	let imageSize;

	if ( image?.sizes ) {
		imageSize = image?.sizes;
	} else {
		imageSize = image?.media_details?.sizes;
	}

	const largeWidth = imageSize?.large?.width;
	const largeHeight = imageSize?.large?.height;

	const attributes = {
		// Common properties
		imgId: id,
		title,
		imgNaturalWidth: largeWidth || width,
		imgNaturalHeight: largeHeight || height,
		// Desktop properties
		width: largeWidth || width,
		height: largeHeight || height,
		imgUrl: imageSize?.large?.url || url,
		// Tablet properties
		widthTablet: largeWidth || width,
		heightTablet: largeHeight || height,
		imgUrlTablet: url,
		// Mobile properties
		widthMobile: largeWidth || width,
		heightMobile: largeHeight || height,
		imgUrlMobile: url,
	};

	return attributes;
};

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

export const useClientWidth = ( ref, dependencies ) => {
	const [ clientWidth, setClientWidth ] = useState();
	useEffect( () => {
		setClientWidth( ref.current.offsetWidth );

		const onResize = () => {
			setClientWidth( ref.current.offsetWidth );
		};

		window.addEventListener( 'resize', onResize );

		return () => window.removeEventListener( 'resize', onResize );
	}, [ dependencies, ref ] );

	return clientWidth;
};

export const useClientHeight = ( ref, dependencies ) => {
	const [ clientHeight, setClientHeight ] = useState();
	useEffect( () => {
		setClientHeight( ref.current.offsetHeight );

		const onResize = () => {
			setClientHeight( ref.current.offsetHeight );
		};

		window.addEventListener( 'resize', onResize );

		return () => window.removeEventListener( 'resize', onResize );
	}, [ dependencies, ref ] );

	return clientHeight;
};

export const convertToObjectArray = ( imageObject ) => {
	const result = [];
	for ( const key in imageObject ) {
		if ( Object.hasOwnProperty.call( imageObject, key ) ) {
			const label = key
				.split( '_' )
				.map(
					( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 )
				)
				.join( ' ' );
			result.push( { label, value: key } );
		}
	}
	return result;
};
