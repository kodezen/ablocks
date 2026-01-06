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
import ABlocksTypography from '@Controls/typography';
import ABlocksDimensions from '@Controls/dimensions';
import ControlLabel from '@Components/control-label';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import MediaUploadField from '@Components/media-upload';
import { store as coreStore } from '@wordpress/core-data';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksNormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksColorControl from '@Controls/color';

import {
	opacity as opacityDefaultAttributevalue,
	opacityH as opacityHDefaultAttributevalue,
	filterTransitionDuration as filterTransitionDurationDefaultAttributeValue,
} from './attributes';

import {
	updateImageAttributes,
	onSelectImage,
	convertToObjectArray,
} from './utils';
import {
	imageLinkOptions,
	imageObjectFit,
	aspectRatioOptions,
	onImageHoverOptions,
} from './helper';

const propTypes = {};

export default function Settings( props ) {
	const {
		attributes,
		setAttributes,
		isSelected,
		currentImageData,
		setCurrentImageData,
		context,
	} = props;
	const {
		imgId,
		imgIdTablet,
		imgIdMobile,
		opacity,
		opacityH,
		aspectRatio,
		alignment,
		captionAlignment,
		// captionPosition,
		cssFilter,
		cssHoverFilter,
		boxShadow,
		captionColor,
		captionBackground,
		captionTypography,
		captionPadding,
		captionBorder,
		filterTransitionDuration,
		imgLink: { linkDestination, href },
		widthHeightWidget = {},
	} = attributes;

	const deviceType = getDeviceType();

	const attrShowHeight = widthHeightWidget?.[ 'showHeight' + deviceType ];
	const attrWidth = widthHeightWidget?.[ 'width' + deviceType ];

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

	const setHeightHandler = ( controlValue ) => {
		const newAttribute = {};
		if ( controlValue && ! isNaN( controlValue ) ) {
			newAttribute.widthHeightWidget = {
				...widthHeightWidget,
				[ 'height' + deviceType ]: controlValue,
				[ 'showHeight' + deviceType ]: true,
			};
			if ( attrWidth ) {
				newAttribute.aspectRatio = {
					...aspectRatio,
					[ 'ratio' + deviceType ]: attrWidth / controlValue,
					[ 'value' + deviceType ]: undefined,
				};
			}
		} else {
			newAttribute.widthHeightWidget = {
				...widthHeightWidget,
				[ 'height' + deviceType ]: '',
				[ 'showHeight' + deviceType ]: false,
			};
			if ( attrWidth ) {
				const width = currentImageData?.media_details?.width;
				const height = currentImageData?.media_details?.height;

				newAttribute.aspectRatio = {
					...aspectRatio,
					[ 'ratio' + deviceType ]: width / height,
					[ 'value' + deviceType ]: 'original',
				};
			}
		}
		setAttributes( newAttribute );
	};

	const setWidthHandler = ( controlValue ) => {
		const newAttribute = {};
		if ( controlValue && ! isNaN( controlValue ) ) {
			newAttribute.widthHeightWidget = {
				...widthHeightWidget,
				[ 'width' + deviceType ]: controlValue,
			};
			if ( ! attrShowHeight ) {
				newAttribute.widthHeightWidget = {
					...newAttribute.widthHeightWidget,
					[ 'height' + deviceType ]: '',
				};
				if ( ! aspectRatio[ 'value' + deviceType ] ) {
					const width = currentImageData?.media_details?.width;
					const height = currentImageData?.media_details?.height;
					newAttribute.aspectRatio = {
						...aspectRatio,
						[ 'ratio' + deviceType ]: width / height,
						[ 'value' + deviceType ]: 'original',
					};
				}
			} else {
				newAttribute.aspectRatio = {
					...aspectRatio,
					[ 'ratio' + deviceType ]: '',
					[ 'value' + deviceType ]: undefined,
				};
			}
		} else {
			newAttribute.widthHeightWidget = {
				...widthHeightWidget,
				[ 'width' + deviceType ]: '',
			};
			if ( ! aspectRatio[ 'value' + deviceType ] ) {
				const width = currentImageData?.media_details?.width;
				const height = currentImageData?.media_details?.height;
				newAttribute.aspectRatio = {
					...aspectRatio,
					[ 'ratio' + deviceType ]: width / height,
					[ 'value' + deviceType ]: 'original',
				};
			}
			if ( ! attrShowHeight ) {
				newAttribute.widthHeightWidget = {
					...newAttribute.widthHeightWidget,
					[ 'height' + deviceType ]: '',
				};
			}
		}

		setAttributes( newAttribute );
	};

	// Event triggered when remove alt text
	const clearAltText = () => {
		setAttributes( {
			imgAltText: '',
		} );
	};

	const onImageSizeChange = ( controlValue ) => {
		const updatedValues = updateImageAttributes(
			image,
			controlValue,
			setAttributes
		);
		const { url, objectFit, aspectRatio: ratio } = updatedValues;
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
				[ 'value' + deviceType ]: ratio
					? ratio
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
		const mediaDetails = image?.media_details?.sizes;
		const extractImageSizes = convertToObjectArray( mediaDetails );
		setImageSizes( extractImageSizes );
		setCurrentImageData( image );
	}, [ image ] );

	// Image block content tab
	const contentPanel = (
		<>
			<MediaUploadField
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
				setAttributes={ setAttributes }
			/>

			{ imageSizes?.length > 0 && (
				<ABlockSelectControl
					label={ __( 'Image sizes', 'ablocks' ) }
					isResponsive={ true }
					options={ imageSizes }
					attributeName="imgSize"
					attributeValue={
						attributes?.imgSize[ 'value' + deviceType ]
					}
					setAttributes={ setAttributes }
					onChangeHandler={ onImageSizeChange }
				/>
			) }

			<ABlockSelectControl
				label={ __( 'Aspect ratio', 'ablocks' ) }
				isResponsive={ true }
				options={ aspectRatioOptions }
				onChangeHandler={ ( controlValue ) => {
					const newAspectRatio = {
						...aspectRatio,
						[ 'value' + deviceType ]: controlValue,
					};
					const newWidthHeightWidget = {
						...widthHeightWidget,
					};
					let ratioValue = '';
					const currentImgWidth =
						currentImageData?.media_details?.width;
					const currentImgHeight =
						currentImageData?.media_details?.height;
					if ( controlValue && 'original' !== controlValue ) {
						const [ width, height ] = controlValue
							.split( '/' )
							.map( parseFloat );

						ratioValue = width / height;
					} else if ( controlValue && 'original' === controlValue ) {
						ratioValue = currentImgWidth / currentImgHeight;
					}

					newAspectRatio[ 'ratio' + deviceType ] = ratioValue;

					if ( ratioValue ) {
						if ( attrWidth ) {
							newWidthHeightWidget[
								'showHeight' + deviceType
							] = false;
							newWidthHeightWidget[ 'height' + deviceType ] = '';
						}
					}
					setAttributes( {
						aspectRatio: newAspectRatio,
						widthHeightWidget: newWidthHeightWidget,
					} );
				} }
				attributeName="aspectRatio"
				attributeValue={ aspectRatio }
				attributeObjectKey="value"
				setAttributes={ setAttributes }
			/>

			<ABlocksAlignmentControl
				label={ __( 'Alignment', 'ablocks' ) }
				attributeName="alignment"
				attributeValue={ alignment }
				setAttributes={ setAttributes }
				isInline={ false }
				options={ [
					{
						label: 'left',
						value: 'left',
						icon: 'left',
					},
					{
						label: 'center',
						value: 'center',
						icon: 'center',
					},
					{
						label: 'right',
						value: 'right',
						icon: 'right',
					},
				] }
			/>

			<Separator />

			{ /* Image Dimensions controls  */ }
			<ControlLabel label={ 'Image Dimensions' } isHeader={ true } />
			<ABlocksTextControl
				label={ __( 'Width', 'ablocks' ) }
				attributeName="width"
				attributeValue={
					attributes?.widthHeightWidget[ 'width' + deviceType ]
				}
				onChangeHandler={ setWidthHandler }
				placeholder="Auto"
				isInline={ false }
				disableDynamicContent={ true }
				isResponsive={ true }
			/>
			<ABlocksTextControl
				label={ __( 'Height', 'ablocks' ) }
				attributeName="height"
				attributeValue={
					widthHeightWidget[ 'showHeight' + deviceType ]
						? widthHeightWidget[ 'height' + deviceType ]
						: ''
				}
				placeholder="Auto"
				onChangeHandler={ setHeightHandler }
				isInline={ false }
				disableDynamicContent={ true }
				isResponsive={ true }
			/>

			{ /* Object fit control  */ }
			<ABlockSelectControl
				label={ __( 'Object fit', 'ablocks' ) }
				isResponsive={ true }
				options={ imageObjectFit }
				attributeName="objectFit"
				attributeValue={ attributes.objectFit }
				attributeObjectKey="value"
				setAttributes={ setAttributes }
			/>

			<Separator />

			{ /* Title control  */ }
			<ABlocksTextControl
				label={ __( 'Title', 'ablocks' ) }
				attributeName="imgTitle"
				attributeValue={ attributes.imgTitle }
				setAttributes={ setAttributes }
				isInline={ false }
				context={ context }
			/>

			{ /* Link control  */ }
			<ABlockSelectControl
				label="Link"
				options={ imageLinkOptions }
				attributeObjectKey="linkDestination"
				attributeValue={ attributes?.imgLink }
				setAttributes={ setAttributes }
				onChangeHandler={ ( value ) => {
					setAttributes( {
						imgLink: {
							...attributes?.imgLink,
							linkDestination: value,
						},
					} );
				} }
			/>
			{ linkDestination === 'custom' && (
				<>
					<ABlocksTextControl
						label={ __( 'Image link', 'ablocks' ) }
						attributeName="imgLink"
						attributeValue={ href }
						isInline={ false }
						setAttributes={ setAttributes }
						onChangeHandler={ ( controlValue ) => {
							setAttributes( {
								imgLink: {
									...attributes?.imgLink,
									href: controlValue,
								},
							} );
						} }
						disableDynamicContent={ true }
					/>

					<ABlocksToggleControl
						isResponsive={ false }
						label={ __( 'Open in new tab', 'ablocks' ) }
						attributeValue={ attributes?.imgLink }
						setAttributes={ setAttributes }
						attributeName="imgLink"
						attributeObjectKey="linkTarget"
					/>
				</>
			) }

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
					context={ context }
				/>
			</div>

			<Separator />
			{ /* On Hover image control  */ }

			<ABlockSelectControl
				label={ __( 'On Hover image', 'ablocks' ) }
				options={ onImageHoverOptions }
				attributeName="onHoverImg"
				attributeValue={ attributes.onHoverImg }
				setAttributes={ setAttributes }
			/>
		</>
	);

	// Image block style tab
	const stylePanel = (
		<>
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
			<ControlLabel
				label="Box shadow"
				isHeader={ true }
				isResponsive={ false }
			/>
			<ABlocksBoxShadowControl
				label={ __( 'Box shadow', 'ablocks' ) }
				attributeName="boxShadow"
				attributeValue={ boxShadow }
				setAttributes={ setAttributes }
			/>
		</>
	);

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/docs/ablocks-image-block/' }
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

					{ /* Captions control settings  */ }
					<ABlocksPanelBody
						title={ __( 'Caption', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksToggleControl
										isResponsive={ false }
										label={ __( 'Captions', 'ablocks' ) }
										attributeValue={
											attributes?.imgCaption
										}
										setAttributes={ setAttributes }
										attributeName="imgCaption"
									/>
									{ attributes.imgCaption && (
										<>
											<ABlocksTextControl
												label={ __(
													'Caption text',
													'ablocks'
												) }
												attributeName="caption"
												attributeValue={
													attributes.caption
												}
												setAttributes={ setAttributes }
												isInline={ false }
												context={ context }
											/>

											<ABlocksAlignmentControl
												label={ __(
													'Alignment',
													'ablocks'
												) }
												attributeName="captionAlignment"
												attributeValue={
													captionAlignment
												}
												setAttributes={ setAttributes }
												isInline={ false }
											/>
										</>
									) }
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="captionColor"
										attributeValue={ captionColor }
										setAttributes={ setAttributes }
									/>

									<ABlocksColorControl
										label={ __(
											'Background color',
											'ablocks'
										) }
										attributeName="captionBackground"
										attributeValue={ captionBackground }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="captionTypography"
										attributeValue={ captionTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>

									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="captionPadding"
										attributeValue={ captionPadding }
										setAttributes={ setAttributes }
									/>

									<Separator margin="20" />
									<ControlLabel
										label="Border"
										isHeader={ true }
										isResponsive={ false }
									/>

									<ABlocksBorderControl
										attributeName="captionBorder"
										attributeValue={ captionBorder }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
