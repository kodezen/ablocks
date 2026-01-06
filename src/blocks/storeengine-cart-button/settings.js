import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';
import { useSelect } from '@wordpress/data';
import {
	button_width as buttonButtonAttribute,
	boxWidth as boxWidthAttribute,
	elementGapAttribute,
} from './attributes';
import ABlocksToggleControl from '@Controls/toggleButton';
import GetDeviceType from '@Utils/get-device-type';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		product_id,
		price_display,
		direct_checkout,
		label,
		button_color,
		button_color_hover,
		btn_typography,
		button_width,
		button_bg_hover,
		button_bg,
		padding,
		buttonBorder,
		boxShadow,
		buttonAlign,
		priceAlign,
		priceTypography,
		priceColor,
		priceColorH,
		priceNameTypography,
		priceNameColor,
		priceNameColorH,
		boxWidth,
		boxBackgroundH,
		boxBackground,
		radioHeight,
		radioWidth,
		buttonTextAlign,
		boxPadding,
		elementGap,
		boxBorder,
	} = attributes;

	const priceDisplayOptions = [
		{
			label: __( 'Radio', 'ablocks' ),
			value: 'radio',
		},
		{
			label: __( 'Dropdown', 'ablocks' ),
			value: 'dropdown',
		},
		{
			label: __( 'Price Range', 'ablocks' ),
			value: 'price_range',
		},
		{
			label: __( 'Hidden', 'ablocks' ),
			value: 'hidden',
		},
	];

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
	const deviceType = GetDeviceType();

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					{ /* General Settings Tab */ }
					<ABlocksPanelBody
						initialOpen={ true }
						title={ __( 'General', 'ablocks' ) }
					>
						<ABlocksSelectControl
							options={ prductOption }
							label={ __( 'Select Product', 'ablocks' ) }
							attributeValue={ product_id }
							attributeName={ 'product_id' }
							setAttributes={ setAttributes }
						/>

						<ABlocksSelectControl
							options={ priceDisplayOptions }
							label={ __( 'Price Display', 'ablocks' ) }
							attributeValue={ price_display }
							attributeName={ 'price_display' }
							setAttributes={ setAttributes }
						/>

						<ABlocksTextControl
							label="Button Label"
							attributeValue={ label }
							setAttributes={ setAttributes }
							attributeName="label"
						/>

						<ABlocksToggleControl
							isResponsive={ false }
							label="Direct Checkout"
							attributeValue={ direct_checkout }
							setAttributes={ ( newAttributes ) => {
								setAttributes( newAttributes );

								if (
									newAttributes.direct_checkout !== undefined
								) {
									const newDirectCheckout =
										newAttributes.direct_checkout;

									if (
										newDirectCheckout &&
										attributes.label === 'Add To Cart'
									) {
										setAttributes( { label: 'Buy Now' } );
									} else if (
										! newDirectCheckout &&
										attributes.label === 'Buy Now'
									) {
										setAttributes( {
											label: 'Add To Cart',
										} );
									}
								}
							} }
							attributeName="direct_checkout"
						/>
					</ABlocksPanelBody>

					{ /* Button Settings Tab */ }
					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Button', 'ablocks' ) }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										min={ 0 }
										isInline={ false }
										isResponsive={ true }
										attributeName={ 'button_width' }
										attributeValue={ button_width }
										hasUnit={ true }
										setAttributes={ setAttributes }
										attributeDefaultValue={
											buttonButtonAttribute
										}
										autoSyncRange={ true }
									/>

									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="buttonAlign"
										attributeValue={ buttonAlign }
										setAttributes={ setAttributes }
										isInline={ false }
									/>

									<ABlocksAlignmentControl
										label={ __( 'Text Align', 'ablocks' ) }
										attributeName="buttonTextAlign"
										attributeValue={ buttonTextAlign }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
								</>
							}
							style={
								<>
									{ /* Typography */ }
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="btn_typography"
										attributeValue={ btn_typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />

									{ /* Colors */ }
									<ControlLabel
										label="Color"
										isHeader={ true }
										isResponsive={ false }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Text Color',
														'ablocks'
													) }
													attributeValue={
														button_color
													}
													attributeName="button_color"
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													attributeValue={ button_bg }
													attributeName="button_bg"
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
														'Text Hover',
														'ablocks'
													) }
													attributeValue={
														button_color_hover
													}
													attributeName="button_color_hover"
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background Hover',
														'ablocks'
													) }
													attributeValue={
														button_bg_hover
													}
													attributeName="button_bg_hover"
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>

									{ /* Padding */ }
									<Separator />
									<ControlLabel
										label={ __( 'Padding', 'ablocks' ) }
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="padding"
										attributeValue={ padding }
										setAttributes={ setAttributes }
									/>

									{ /* Border */ }
									<Separator />
									<ControlLabel
										label={ __( 'Border', 'ablocks' ) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="buttonBorder"
										attributeValue={ buttonBorder }
										setAttributes={ setAttributes }
									/>

									{ /* Box Shadow */ }
									<Separator />
									<ControlLabel
										label="Box Shadow"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box Shadow', 'ablocks' ) }
										attributeName="boxShadow"
										attributeValue={ boxShadow }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					{ /* Price Settings Tab */ }
					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Price', 'ablocks' ) }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeName="boxWidth"
										attributeObjectKey="value"
										attributeValue={ boxWidth }
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
												boxWidth[
													'valueUnit' + deviceType
												] ?? '%'
											)
												? 100
												: 1600
										}
										attributeDefaultValue={
											boxWidthAttribute
										}
										autoSyncRange={ true }
									/>

									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="priceAlign"
										attributeValue={ priceAlign }
										setAttributes={ setAttributes }
										isInline={ false }
									/>

									{ /* Radio-specific settings */ }
									{ price_display === 'radio' && (
										<>
											<ABlocksRangeControl
												label={ __(
													'Radio Width',
													'ablocks'
												) }
												min={ 0 }
												max={ 200 }
												isInline={ false }
												isResponsive={ true }
												attributeName={ 'radioWidth' }
												attributeValue={ radioWidth }
												hasUnit={ true }
												setAttributes={ setAttributes }
												attributeDefaultValue={
													boxWidthAttribute
												}
											/>
											<ABlocksRangeControl
												label={ __(
													'Radio Height',
													'ablocks'
												) }
												min={ 0 }
												max={ 200 }
												isInline={ false }
												isResponsive={ true }
												attributeName={ 'radioHeight' }
												attributeValue={ radioHeight }
												hasUnit={ true }
												setAttributes={ setAttributes }
												attributeDefaultValue={
													boxWidthAttribute
												}
											/>
										</>
									) }

									{ /* Radio & Dropdown common settings */ }
									{ ( price_display === 'radio' ||
										price_display === 'dropdown' ) && (
										<>
											<Separator />
											<ControlLabel
												label={ __(
													'Padding',
													'ablocks'
												) }
												isHeader={ true }
												isResponsive={ false }
											/>
											<ABlocksDimensions
												label={ __(
													'Padding',
													'ablocks'
												) }
												isResponsive={ true }
												attributeName="boxPadding"
												attributeValue={ boxPadding }
												setAttributes={ setAttributes }
											/>

											<Separator />
											<ControlLabel
												label={ __(
													'Border',
													'ablocks'
												) }
												isResponsive={ false }
												isHeader={ true }
											/>
											<ABlocksBorderControl
												attributeName="boxBorder"
												attributeValue={ boxBorder }
												setAttributes={ setAttributes }
											/>
										</>
									) }
								</>
							}
							style={
								<>
									{ /* Price Typography & Colors */ }
									<ControlLabel
										label={ __( 'Price Text', 'ablocks' ) }
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="priceTypography"
										attributeValue={ priceTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />

									<NormalHoverTabs
										normal={
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeValue={ priceColor }
												attributeName="priceColor"
												setAttributes={ setAttributes }
											/>
										}
										hover={
											<ABlocksColorControl
												label={ __(
													'Hover Color',
													'ablocks'
												) }
												attributeValue={ priceColorH }
												attributeName="priceColorH"
												setAttributes={ setAttributes }
											/>
										}
									/>

									{ /* Price Name Styles (Radio & Dropdown only) */ }
									{ ( price_display === 'radio' ||
										price_display === 'dropdown' ) && (
										<>
											<Separator />
											<ControlLabel
												label={ __(
													'Price Name',
													'ablocks'
												) }
												isHeader={ true }
												isResponsive={ false }
											/>
											<ABlocksTypography
												label={ __(
													'Typography',
													'ablocks'
												) }
												attributeName="priceNameTypography"
												attributeValue={
													priceNameTypography
												}
												setAttributes={ setAttributes }
												isResponsive={ true }
												attributes={ attributes }
											/>
											<Separator />

											<NormalHoverTabs
												normal={
													<ABlocksColorControl
														label={ __(
															'Color',
															'ablocks'
														) }
														attributeValue={
															priceNameColor
														}
														attributeName="priceNameColor"
														setAttributes={
															setAttributes
														}
													/>
												}
												hover={
													<ABlocksColorControl
														label={ __(
															'Hover Color',
															'ablocks'
														) }
														attributeValue={
															priceNameColorH
														}
														attributeName="priceNameColorH"
														setAttributes={
															setAttributes
														}
													/>
												}
											/>

											{ /* Price Box Background */ }
											<Separator />
											<ControlLabel
												label={ __(
													'Box Background',
													'ablocks'
												) }
												isHeader={ true }
												isResponsive={ false }
											/>
											<NormalHoverTabs
												normal={
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														attributeValue={
															boxBackground
														}
														attributeName="boxBackground"
														setAttributes={
															setAttributes
														}
													/>
												}
												hover={
													<ABlocksColorControl
														label={ __(
															'Hover Background',
															'ablocks'
														) }
														attributeValue={
															boxBackgroundH
														}
														attributeName="boxBackgroundH"
														setAttributes={
															setAttributes
														}
													/>
												}
											/>
										</>
									) }
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
