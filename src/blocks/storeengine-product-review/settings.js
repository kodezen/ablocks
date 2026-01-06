import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksBorderControl from '@Controls/border';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ControlLabel from '@Components/control-label';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';
import getDeviceType from '@Utils/get-device-type';
import { ratingSize, sectionHeight, sectionWidth } from './attributes';
import { useSelect } from '@wordpress/data';
import ABlocksToggleControl from '@Controls/toggleButton';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		product_id,
		heading_color,
		heading_hover_color,
		padding,
		boxShadow,
		border,
		section_bg,
		section_bg_hover,
		avg_typography,
		avg_color,
		avg_color_hover,
		rating_color,
		rating_color_hover,
		rating_size,
		section_height,
		section_width,
		total_typography,
		total_rating_color,
		total_rating_hover,
		listColorH,
		listColor,
		listTypography,
		startSize,
		starColorH,
		starColor,
		fillBg,
		fillBgH,
		fillABg,
		fillABgH,
		isCustom,
	} = attributes;
	const deviceType = getDeviceType();
	const product = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords(
			'postType',
			'storeengine_product',
			{
				per_page: -1,
			}
		);
	}, [] );

	const prductOption = product
		? product.map( ( p ) => ( {
				label: p.title?.rendered,
				value: p.id,
		  } ) )
		: [];
	prductOption.unshift( {
		label: 'Select a Product',
		value: 0,
	} );
	console.log( { product_id } );

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Heading Style Options', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ControlLabel
										label={ __(
											'Product Selection',
											'ablocks'
										) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksToggleControl
										label={ __(
											'Use Custom Product',
											'ablocks'
										) }
										attributeValue={ isCustom }
										isResponsive={ false }
										attributeName="isCustom"
										setAttributes={ setAttributes }
									/>
									<i>
										Enabled, the same selected product shows
										in editor and frontend.
									</i>
									<Separator />
									<ABlocksSelectControl
										options={ prductOption }
										label={ __(
											'Select Product',
											'ablocks'
										) }
										attributeValue={ product_id }
										attributeName={ 'product_id' }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="heading_color"
													attributeValue={
														heading_color
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="heading_hover_color"
													attributeValue={
														heading_hover_color
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Rating Section', 'ablocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label={ __( 'Color' ) }
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isResponsive={ false }
										attributeName="section_bg"
										attributeValue={ section_bg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="section_bg_hover"
										attributeValue={ section_bg_hover }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Padding"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="padding"
							attributeValue={ padding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Boz Shadow"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBoxShadowControl
							label={ __( 'Box shadow', 'ablocks' ) }
							attributeName="boxShadow"
							attributeValue={ boxShadow }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="border"
							attributeValue={ border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Average Rating', 'academy-blocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __(
											'Rating Icon Size',
											'ablocks'
										) }
										min={ 0 }
										step={ 1 }
										max={ 200 }
										hasUnit={ true }
										isInline={ false }
										isResponsive={ true }
										attributeValue={ rating_size }
										attributeName={ 'rating_size' }
										setAttributes={ setAttributes }
										attributeDefaultValue={ ratingSize }
									/>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeName="section_width"
										attributeObjectKey="value"
										attributeValue={ section_width }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ true }
										attributeDataType="object"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: '%', label: '%' },
											{ value: 'em', label: 'em' },
											{ value: 'rem', label: 'rem' },
											{ value: 'vw', label: 'vw' },
										] }
										min={ 0 }
										max={
											[ 'vw', '%' ].includes(
												section_width[
													'valueUnit' + deviceType
												] ?? '%'
											)
												? 100
												: 1600
										}
										attributeDefaultValue={ sectionWidth }
										autoSyncRange={ true }
									/>
									<ABlocksRangeControl
										label={ __( 'Height', 'ablocks' ) }
										attributeName="section_height"
										attributeObjectKey="value"
										attributeValue={ section_height }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ true }
										attributeDataType="object"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'vh', label: 'vh' },
											{ value: 'em', label: 'em' },
											{ value: 'rem', label: 'rem' },
										] }
										min={ 0 }
										max={
											[ 'vw', 'vh' ].includes(
												section_height[
													'valueUnit' + deviceType
												] ?? 'vh'
											)
												? 100
												: 1600
										}
										attributeDefaultValue={ sectionHeight }
										autoSyncRange={ true }
									/>
								</>
							}
							style={
								<>
									<ControlLabel
										label="Rating Icon Color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="rating_color"
													attributeValue={
														rating_color
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="rating_color_hover"
													attributeValue={
														rating_color_hover
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator />
									<ControlLabel
										label="Typography"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="avg_typography"
										attributeValue={ avg_typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />
									<ControlLabel
										label="Color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="avg_color"
													attributeValue={ avg_color }
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="avg_color_hover"
													attributeValue={
														avg_color_hover
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Rating Text"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="total_typography"
							attributeValue={ total_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="total_rating_color"
										attributeValue={ total_rating_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="total_rating_hover"
										attributeValue={ total_rating_hover }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Rating Fill Style"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="fillBg"
										attributeValue={ fillBg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="fillBgH"
										attributeValue={ fillBgH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Rating Active Style"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="fillABg"
										attributeValue={ fillABg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="fillABgH"
										attributeValue={ fillABgH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Feedback Overview', 'academy-blocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<ABlocksRangeControl
									label={ __( 'Icon Size', 'ablocks' ) }
									min={ 0 }
									max={ 500 }
									step={ 1 }
									hasUnit={ true }
									isInline={ false }
									isResponsive={ true }
									attributeValue={ startSize }
									attributeName={ 'startSize' }
									setAttributes={ setAttributes }
									attributeDefaultValue={ ratingSize }
								/>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="listTypography"
										attributeValue={ listTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />
									<ControlLabel
										label="Color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="listColor"
													attributeValue={ listColor }
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="listColorH"
													attributeValue={
														listColorH
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator />
									<ControlLabel
										label="Icon Color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="starColor"
													attributeValue={ starColor }
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="starColorH"
													attributeValue={
														starColorH
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
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
