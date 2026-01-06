import React from 'react';
import { onSelectImage } from './utils';
import getDeviceType from '@Utils/get-device-type';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import {
	BlockControls,
	MediaReplaceFlow,
	// eslint-disable-next-line
} from '@wordpress/block-editor';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
export default function Toolbar( props ) {
	const { attributes, setAttributes, isSelected, block_id } = props;
	const { imgId, imgIdTablet, imgIdMobile, imgUrl, alignment } = attributes;
	const deviceType = getDeviceType();
	let responsiveImageId;
	if ( deviceType === 'Tablet' ) {
		responsiveImageId = imgIdTablet;
	} else if ( deviceType === 'Mobile' ) {
		responsiveImageId = imgIdMobile;
	} else {
		responsiveImageId = imgId;
	}
	const { createNotice } = useDispatch( 'core/notices' );
	const { image } = useSelect( // eslint-disable-line
		( select ) => {
			const { getMedia } = select( coreStore );
			return {
				image:
					responsiveImageId && isSelected
						? getMedia( responsiveImageId )
						: null,
			};
		},
		[ imgId, imgIdTablet, imgIdMobile, isSelected ]
	);

	// function onSetHref(params) {
	// 	setAttributes({
	// 		imgLink: { ...attributes?.imgLink, ...params },
	// 	});
	// }

	function onSelectURL( params ) {
		setAttributes( {
			[ 'imgId' + deviceType ]: block_id?.split( '-' )[ 0 ],
			[ 'imgUrl' + deviceType ]: params,
		} );
	}

	function onUploadError( message ) {
		createNotice( 'error', message, {
			type: 'snackbar',
		} );
	}

	return (
		<>
			<BlockControls group="block">
				{ /* Alignment control  */ }
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
				/>
				{ imgId && (
					<>
						{ /* Link control  */ }
						{ /* <ImageURLInputUI
							url={href || ''}
							onChangeUrl={onSetHref}
							linkDestination={linkDestination}
							mediaUrl={(image && image.source_url) || imgUrl}
							mediaLink={image && image.link}
							linkTarget={linkTarget}
							linkClass={linkClass}
							rel={rel}
						/> */ }
					</>
				) }
			</BlockControls>

			{ imgId && (
				<BlockControls group="other">
					<MediaReplaceFlow
						mediaId={ [ 'imgId' + deviceType ] }
						mediaURL={ imgUrl }
						allowedTypes={ [ 'image' ] }
						accept="image/*"
						onSelect={ ( mediaValue ) =>
							onSelectImage(
								mediaValue,
								attributes,
								setAttributes,
								deviceType
							)
						}
						onSelectURL={ onSelectURL }
						onError={ onUploadError }
					/>
				</BlockControls>
			) }
		</>
	);
}
