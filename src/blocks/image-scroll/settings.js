import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import Separator from '@Components/separator';
import ABlocksTextControl from '@Controls/text';
import ABlocksRangeControl from '@Controls/range';
import getDeviceType from '@Utils/get-device-type';
import ABlockSelectControl from '@Controls/select';
import AblocksCSSFilter from '@Controls/css-filter';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import MediaUploadField from '@Components/media-upload';
import { store as coreStore } from '@wordpress/core-data';
import ABlocksToggleControl from '@Controls/toggleButton';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksNormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksNumberControl from '@Controls/number';
import ABlocksColorControl from '@Controls/color';

import {
	scrollHeight as scrollHeightDefaultAttributeValue,
	opacity as opacityDefaultAttributevalue,
	opacityH as opacityHDefaultAttributevalue,
	filterTransitionDuration as filterTransitionDurationDefaultAttributeValue,
	iconFontSize as iconFontSizeDefaultAttributeValue,
} from './attributes';

import {
	updateImageAttributes,
	onSelectImage,
	convertToObjectArray,
} from './utils';
import { imageScrolls } from './helper';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes, isSelected, setCurrentImageData } =
		props;
	const {
		imgId,
		imgIdTablet,
		imgIdMobile,
		imageDataAttribute,
		opacity,
		opacityH,
		cssFilter,
		cssHoverFilter,
		filterTransitionDuration,
		scrollHeight,
		overlayColor,
		showOverlay,
		showIcon,
		iconFontSize,
		iconColor,
	} = attributes;

	const deviceType = getDeviceType();

	const [ imageSizes, setImageSizes ] = useState( [] );
	let responsiveImageId;

	if ( deviceType === 'Tablet' ) {
		responsiveImageId = imgIdTablet || imgId;
	} else if ( deviceType === 'Mobile' ) {
		responsiveImageId = imgIdMobile || imgIdTablet || imgId;
	} else {
		responsiveImageId = imgId;
	}

	const { image } = useSelect(
		( select ) => {
			const { getMedia } = select( coreStore );
			return {
				image:
					responsiveImageId && isSelected
						? getMedia( responsiveImageId )
						: null,
			};
		},
		[ isSelected, responsiveImageId ]
	);

	// Event triggered when remove alt text
	const clearAltText = () => {
		setAttributes( {
			imgAltText: '',
		} );
	};

	const onImageSizeChange = ( controlValue ) => {
		let updatedValues;
		if ( image === null ) {
			updatedValues = updateImageAttributes(
				imageDataAttribute,
				controlValue,
				setAttributes
			);
		} else {
			updatedValues = updateImageAttributes(
				image,
				controlValue,
				setAttributes
			);
		}
		const { url, objectFit, aspectRatio } = updatedValues;
		return setAttributes( {
			[ 'imgUrl' + deviceType ]: url,
			imgSize: {
				...attributes?.imgSize,
				[ 'value' + deviceType ]: controlValue,
			},
			widthHeightWidget: {
				...attributes?.widthHeightWidget,
			},
			objectFit: {
				...attributes?.objectFit,
				[ 'value' + deviceType ]: objectFit
					? objectFit
					: attributes?.objectFit[ 'value' + deviceType ],
			},
			aspectRatio: {
				...attributes?.aspectRatio,
				[ 'value' + deviceType ]: aspectRatio
					? aspectRatio
					: attributes?.aspectRatio[ 'value' + deviceType ],
			},
		} );
	};

	// Event triggered when image Removing
	const onRemoveImage = () => {
		setAttributes( {
			imgId: undefined,
			imgIdTablet: undefined,
			imgIdMobile: undefined,
			imgUrl: undefined,
			imgUrlTablet: undefined,
			imgUrlMobile: undefined,
			widthHeightWidget: {
				...attributes?.widthHeightWidget,
				imgNaturalWidth: undefined,
				imgNaturalHeight: undefined,
				width: undefined,
				widthTablet: undefined,
				widthMobile: undefined,
				height: undefined,
				heightTablet: undefined,
				heightMobile: undefined,
			},
		} );
	};

	useEffect( () => {
		if ( image !== null ) {
			setAttributes( {
				imageDataAttribute: image,
			} );
			const mediaDetails = image?.media_details?.sizes;
			const extractImageSizes = convertToObjectArray( mediaDetails );
			setImageSizes( extractImageSizes );
			setCurrentImageData( image );
		} else {
			const mediaDetails = imageDataAttribute?.media_details?.sizes;
			const extractImageSizes = convertToObjectArray( mediaDetails );
			setImageSizes( extractImageSizes );
			setCurrentImageData( imageDataAttribute );
		}
	}, [ image ] );

	// Image block content tab
	const contentPanel = (
		<>
			<MediaUploadField
				setAttributes={ setAttributes }
				allowedTypes={ [ 'image' ] }
				attributeValue={ attributes }
				attributeName="imgUrl"
				deviceType={ deviceType }
				onSelectImageHandler={ ( mediaValue ) =>
					onSelectImage(
						mediaValue,
						attributes,
						setAttributes,
						deviceType
					)
				}
				onRemoveImageHandler={ onRemoveImage }
			/>
			{ imageSizes?.length > 0 && (
				<ABlockSelectControl
					label={ __( 'Images Sizes', 'ablocks' ) }
					isResponsive={ true }
					options={ imageSizes }
					attributeName="imgSize"
					attributeObjectKey="value"
					attributeValue={ attributes?.imgSize }
					setAttributes={ setAttributes }
					onChangeHandler={ onImageSizeChange }
				/>
			) }
			<ABlocksRangeControl
				label={ __( 'Height', 'ablocks' ) }
				min={ 0 }
				max={ 1600 }
				step={ 1 }
				isInline={ false }
				isResponsive={ true }
				attributeName="scrollHeight"
				attributeValue={ scrollHeight }
				setAttributes={ setAttributes }
				attributeDefaultValue={ scrollHeightDefaultAttributeValue }
			/>

			{ /* Object fit control  */ }
			<ABlockSelectControl
				label={ __( 'Image Scroll Option', 'ablocks' ) }
				isResponsive={ false }
				options={ imageScrolls }
				attributeName="imageScrollOption"
				attributeValue={ attributes.imageScrollOption }
				attributeObjectKey="value"
				setAttributes={ setAttributes }
			/>
			<ABlocksNumberControl
				label={ __( 'Speed (s)', 'ablocks' ) }
				attributeName={ 'transitionTime' }
				attributeValue={ attributes?.transitionTime }
				setAttributes={ setAttributes }
				isInline={ true }
			/>
			<ABlocksToggleControl
				isResponsive={ false }
				label="Show Overlay"
				attributeValue={ attributes?.showOverlay }
				setAttributes={ setAttributes }
				attributeName="showOverlay"
			/>
			<ABlocksToggleControl
				isResponsive={ false }
				label="Show Icon"
				attributeValue={ attributes?.showIcon }
				setAttributes={ setAttributes }
				attributeName="showIcon"
			/>
			{ showIcon && (
				<ABlocksRangeControl
					label={ __( 'Icon Size', 'ablocks' ) }
					min={ 0 }
					max={ 100 }
					step={ 1 }
					isInline={ false }
					isResponsive={ true }
					hasUnit={ true }
					attributeName="iconFontSize"
					attributeValue={ iconFontSize }
					setAttributes={ setAttributes }
					attributeDefaultValue={ iconFontSizeDefaultAttributeValue }
				/>
			) }

			{ /* Title control  */ }
			<ABlocksTextControl
				label={ __( 'Title', 'ablocks' ) }
				attributeName="imgTitle"
				attributeValue={ attributes.imgTitle }
				setAttributes={ setAttributes }
				isInline={ false }
			/>

			{ /* Alt text control  */ }
			<div className="ablocks-alt-text-control">
				<div className="ablocks-alt-text-control__header">
					<span>{ __( 'Alt Text', 'ablocks' ) }</span>
					<span
						onClick={ clearAltText }
						onKeyDown={ () => {} }
						role="presentation"
						className="ablocks-alt-text-control__clear"
					>
						{ __( 'clear', 'ablocks' ) }
					</span>
				</div>

				<ABlocksTextControl
					attributeName="imgAltText"
					attributeValue={ attributes.imgAltText }
					setAttributes={ setAttributes }
					isInline={ false }
				/>
			</div>

			{ /* On Hover image control  */ }
		</>
	);

	// Image block style tab
	const stylePanel = (
		<>
			{ showOverlay && (
				<>
					<ABlocksColorControl
						label={ __( 'Overlay Color', 'ablocks' ) }
						attributeName="overlayColor"
						attributeValue={ overlayColor }
						setAttributes={ setAttributes }
					/>
				</>
			) }
			{ showIcon && (
				<>
					<ABlocksColorControl
						label={ __( 'Icon Color', 'ablocks' ) }
						attributeName="iconColor"
						attributeValue={ iconColor }
						setAttributes={ setAttributes }
					/>
				</>
			) }
			<ControlLabel
				label="Filter & Opacity"
				isHeader={ true }
				isResponsive={ false }
			/>
			<ABlocksNormalHoverTabs
				normal={
					<>
						<AblocksCSSFilter
							label={ __( 'CSS Filters', 'ablocks' ) }
							isResponsive={ true }
							attributeValue={ cssFilter }
							attributeName="cssFilter"
							setAttributes={ setAttributes }
						/>
						<ABlocksRangeControl
							label={ __( 'Opacity', 'ablocks' ) }
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
							isInline={ false }
							isResponsive={ false }
							attributeName="opacity"
							attributeValue={ opacity }
							setAttributes={ setAttributes }
							attributeDefaultValue={
								opacityDefaultAttributevalue
							}
						/>
					</>
				}
				hover={
					<>
						<AblocksCSSFilter
							label={ __( 'CSS Filters', 'ablocks' ) }
							isResponsive={ true }
							attributeValue={ cssHoverFilter }
							attributeName="cssHoverFilter"
							setAttributes={ setAttributes }
						/>
						<ABlocksRangeControl
							label={ __( 'Opacity', 'ablocks' ) }
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
							isInline={ false }
							isResponsive={ false }
							attributeName="opacityH"
							attributeValue={ opacityH }
							setAttributes={ setAttributes }
							attributeDefaultValue={
								opacityHDefaultAttributevalue
							}
						/>
						<ABlocksRangeControl
							label={ __( 'Transition duration(ms)', 'ablocks' ) }
							min={ 0 }
							max={ 10 }
							step={ 0.5 }
							isInline={ false }
							isResponsive={ false }
							setAttributes={ setAttributes }
							attributeName="filterTransitionDuration"
							attributeValue={ filterTransitionDuration }
							attributeDefaultValue={
								filterTransitionDurationDefaultAttributeValue
							}
						/>
					</>
				}
			/>

			<Separator margin="20" />

			<ControlLabel
				label="Border"
				isHeader={ true }
				isResponsive={ false }
			/>
			<ABlocksBorderControl
				attributeName="border"
				attributeValue={ attributes?.border }
				setAttributes={ setAttributes }
			/>

			<Separator margin="20" />
		</>
	);

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					{ /* Image control settings  */ }
					<ABlocksPanelBody
						title={ __( 'Image', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={ contentPanel }
							style={ stylePanel }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
