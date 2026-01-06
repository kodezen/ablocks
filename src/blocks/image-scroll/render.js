import React, { useEffect } from 'react';
import Layouts from './Layouts';
import metadata from './block.json';
import { __, sprintf } from '@wordpress/i18n';
import { onSelectImage } from './utils';
import getDeviceType from '@Utils/get-device-type';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Notice } from '@wordpress/components';
import RenderContainer from '@Components/block-container/render';
import Toolbar from './toolbar';
import './editor.scss';
import { getRenderDomElement } from '@Utils/helper';
import ABlocksImageScroll from './image-scroll';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes, isSelected, currentImageData } = props;
	const {
		block_id,
		imgUrl,
		imgId,
		imgIdTablet,
		imgIdMobile,
		showNotice,
		imageScrollOption,
		transitionTime,
		scrollHeight,
	} = attributes;

	const deviceType = getDeviceType();

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

	useEffect( () => {
		if (
			imageScrollOption.value === 'top-to-bottom' ||
			imageScrollOption.value === 'bottom-to-top' ||
			imageScrollOption.value === 'left-to-right' ||
			imageScrollOption.value === 'right-to-left' ||
			imageScrollOption.value === 'mouse-scroll' ||
			imageScrollOption.value === 'horizontal-scroll'
		) {
			const element = getRenderDomElement(
				`.ablocks-block--image-scroll`
			);
			if ( element !== null ) {
				new ABlocksImageScroll( element );
			}
		}
	}, [ imageScrollOption, transitionTime, scrollHeight ] );
	const tabletType = imgIdTablet ? 'Tablet' : 'Mobile';
	const deviceTypeOption =
		imgIdTablet && imgIdMobile ? 'Tablet & Mobile' : tabletType;

	return (
		<React.Fragment>
			<Toolbar { ...props } />
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
						<p>
							{ sprintf(
								/* translators: %s represents the device type option */
								__(
									`You have different image for %s. Do you want to use this image for all devices?`,
									'ablocks'
								),
								deviceTypeOption
							) }
						</p>
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
					setAttributes={ setAttributes }
					attributeName={ '_image' }
					isResponsive={ true }
					block_id={ block_id }
					isSelected={ isSelected }
				/>
				<MediaPlaceholder
					labels={ {
						title: __( 'Image Scroll', 'ablocks' ),
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
