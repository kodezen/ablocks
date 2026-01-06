import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import getDeviceType from '@Utils/get-device-type';
import MediaUploadField from '@Components/media-upload';
import ABlocksSelectControl from '@Controls/select';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksRangeControl from '@Controls/range';
import ImageRadioControl from './ImageRadioControl';

const propTypes = {};
import { containerWidth as containerWidthDefaultVal } from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		backgroundImage,
		pageSize,
		pageOrientation,
		certificate_padding,
		imageOptions,
		isCustomImage,
	} = attributes;
	const deviceType = getDeviceType();

	const onSelectPosterHandler = ( mediaValue ) => {
		setAttributes( {
			backgroundImage: mediaValue?.url,
		} );
	};

	// Removing fallback image for video control
	const onRemovePosterHandler = () => {
		setAttributes( {
			backgroundImage: undefined,
		} );
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Certificate Background', 'ablocks' ) }
						initialOpen={ true }
					>
						<ImageRadioControl
							label={ __(
								'Select a Certificate Image',
								'ablocks'
							) }
							selectedImage={ backgroundImage }
							options={ imageOptions }
							attributes={ attributes }
							onChange={ ( label, value ) => {
								if ( label === 'custom_image' ) {
									setAttributes( { isCustomImage: true } );
									setAttributes( { backgroundImage: value } );
								} else {
									setAttributes( { isCustomImage: false } );
									setAttributes( { backgroundImage: value } );
								}
							} }
						/>
						{ isCustomImage && (
							<MediaUploadField
								allowedTypes={ [ 'image' ] }
								attributeValue={ attributes }
								deviceType={ deviceType }
								attributeName="backgroundImage"
								onSelectImageHandler={ onSelectPosterHandler }
								setAttributes={ setAttributes }
								onRemoveImageHandler={ onRemovePosterHandler }
							/>
						) }
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Certificate Layout', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksSelectControl
							label={ __( 'Page Size', 'ablocks' ) }
							isResponsive={ false }
							options={ [
								{
									label: 'A4',
									value: 'A4',
								},
								{
									label: 'Letter',
									value: 'Letter',
								},
							] }
							attributeValue={ pageSize }
							attributeName="pageSize"
							setAttributes={ setAttributes }
						/>
						<ABlocksSelectControl
							label={ __( 'Page Orientation', 'ablocks' ) }
							isResponsive={ false }
							options={ [
								{
									label: 'Portrait',
									value: 'P',
								},
								{
									label: 'Landscape',
									value: 'L',
								},
							] }
							attributeValue={ pageOrientation }
							attributeName="pageOrientation"
							setAttributes={ setAttributes }
						/>
						<ABlocksRangeControl
							label={ __( 'Container Width', 'ablocks' ) }
							min={ 1 }
							max={ 100 }
							hasUit={ false }
							isInlnine={ false }
							isResponsive={ false }
							attributeName={ 'containerWidth' }
							attributeValue={ attributes?.containerWidth }
							setAttributes={ setAttributes }
							attributeDefaultValue={ containerWidthDefaultVal }
						/>
						<ABlocksDimensions
							label={ __( 'Certificate Padding', 'ablocks' ) }
							isResponsive={ false }
							attributeName="certificate_padding"
							attributeValue={ certificate_padding }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
