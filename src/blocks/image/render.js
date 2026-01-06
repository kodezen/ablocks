import React, { useEffect, useRef } from 'react';
import Layouts from './Layouts';
import metadata from './block.json';
import { __ } from '@wordpress/i18n';
import { onSelectImage } from './utils';
import getDeviceType from '@Utils/get-device-type';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Notice } from '@wordpress/components';
import RenderContainer from '@Components/block-container/render2';
import Toolbar from './toolbar';
import './editor.scss';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes, context, isSelected, currentImageData } =
		props;
	const {
		block_id,
		imgUrl,
		imgId,
		imgIdTablet,
		imgIdMobile,
		showNotice,
		imgTitle,
		imgAltText,
		caption,
	} = attributes;
	const deviceType = getDeviceType();
	const addCaptionRef = useRef( null );

	const {
		isDynamicEnabled: isDynamicImgTitleEnabled,
		data: dynamicImgTitle,
	} = useDynamicData( {
		attributeValue: imgTitle,
	} );
	const {
		isDynamicEnabled: isDynamicImgAltTextEnabled,
		data: dynamicImgAltText,
	} = useDynamicData( {
		attributeValue: imgAltText,
	} );
	const { isDynamicEnabled: isDynamicCaptionEnabled, data: dynamicCaption } =
		useDynamicData( {
			attributeValue: caption,
		} );

	// change in attribute value
	useEffect( () => {
		if ( isDynamicImgTitleEnabled ) {
			setAttributes( { imgTitle: dynamicImgTitle } );
		}
		if ( isDynamicImgAltTextEnabled ) {
			setAttributes( { imgAltText: dynamicImgAltText } );
		}
		if ( isDynamicCaptionEnabled ) {
			setAttributes( { caption: dynamicCaption } );
		}
	}, [ dynamicImgTitle, dynamicImgAltText, dynamicCaption ] );

	function onSelectURL( url ) {
		setAttributes( {
			[ 'imgId' + deviceType ]: block_id?.split( '-' )[ 0 ],
			[ 'imgUrl' + deviceType ]: url,
		} );
	}

	const mediaPreview = !! imgUrl && (
		<img
			alt={ __( 'Edit image', 'ablocks' ) }
			title={ __( 'Edit image', 'ablocks' ) }
			className={ 'edit-image-preview' }
			src={ imgUrl }
		/>
	);

	let message = '';
	if ( imgIdTablet ) {
		message = __(
			'You have different image for Tablet. Do you want to use this image for all devices?',
			'ablocks'
		);
	} else if ( imgIdTablet && imgIdMobile ) {
		message = __(
			'You have different image for Tablet & Mobile. Do you want to use this image for all devices?',
			'ablocks'
		);
	} else {
		message = __(
			'You have different image for Mobile. Do you want to use this image for all devices?',
			'ablocks'
		);
	}

	return (
		<React.Fragment>
			<Toolbar { ...props } addCaptionRef={ addCaptionRef } />
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ showNotice && (
					<Notice
						className="ablocks-show-image-replace-all-notice"
						status="info"
						isDismissible={ false }
					>
						<p>{ message }</p>
						<Button
							isPrimary
							onClick={ () =>
								setAttributes( {
									imgId,
									imgIdTablet: undefined,
									imgIdMobile: undefined,
									imgUrl,
									imgUrlTablet: imgUrl,
									imgUrlMobile: imgUrl,
									showNotice: false,
								} )
							}
						>
							{ __(
								'Use this image for all devices',
								'ablocks'
							) }
						</Button>
						<Button
							isSecondary
							onClick={ () =>
								setAttributes( { showNotice: false } )
							}
						>
							{ __( 'skip', 'ablocks' ) }
						</Button>
					</Notice>
				) }
				<Layouts
					currentImageData={ currentImageData }
					attributeValue={ attributes._image }
					attributes={ attributes }
					context={ context }
					setAttributes={ setAttributes }
					attributeName={ '_image' }
					isResponsive={ true }
					block_id={ block_id }
					isSelected={ isSelected }
					addCaptionRef={ addCaptionRef }
				/>
				<MediaPlaceholder
					labels={ {
						title: __( 'Image', 'ablocks' ),
						instructions: __(
							'Upload an image file, pick one from your media library, or add one with a URL.',
							'ablocks'
						),
					} }
					onSelect={ ( mediaValue ) =>
						onSelectImage(
							mediaValue,
							attributes,
							setAttributes,
							deviceType
						)
					}
					onSelectURL={ ( url ) => onSelectURL( url ) }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					value={ { url: imgUrl } }
					mediaPreview={ mediaPreview }
					disableMediaButtons={ imgUrl }
				/>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
