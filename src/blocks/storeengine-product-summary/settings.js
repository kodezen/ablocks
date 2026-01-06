import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';
import { useSelect } from '@wordpress/data';
import GetDeviceType from '@Utils/get-device-type';
import ABlocksToggleControl from '@Controls/toggleButton';
import {
	AddButtonWidthAttributes,
	buttonWidthAttributes,
	inputWidthAttribute,
} from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		product_id,
		titleTypography,
		titleColor,
		titleColorH,
		ProductPriceTypography,
		productPriceColorH,
		productPriceColor,
		inputWidth,
		inputTextColor,
		inputTextColorH,
		inputTextTypography,
		inputPadding,
		inputBorder,
		buttonBorder,
		buttonWidth,
		buttonPadding,
		btnTypography,
		buttonBackground,
		buttonBackgroundH,
		buttonColor,
		buttonColorH,
		AddButtonBorder,
		AddButtonWidth,
		AddButtonPadding,
		AddBtnTypography,
		AddButtonBackground,
		AddButtonBackgroundH,
		AddButtonColor,
		AddButtonColorH,
		isCustom,
	} = attributes;

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
									<Separator />
									<ControlLabel
										label={ __(
											'Product Price',
											'ablocks'
										) }
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="titleTypography"
										attributeValue={ titleTypography }
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
													productPriceColor
												}
												attributeName="productPriceColor"
												setAttributes={ setAttributes }
											/>
										}
										hover={
											<ABlocksColorControl
												label={ __(
													'Hover Color',
													'ablocks'
												) }
												attributeValue={
													productPriceColorH
												}
												attributeName="productPriceColorH"
												setAttributes={ setAttributes }
											/>
										}
									/>
									<Separator />
									<ControlLabel
										label={ __(
											'Product Title',
											'ablocks'
										) }
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="ProductPriceTypography"
										attributeValue={
											ProductPriceTypography
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
												attributeValue={ titleColor }
												attributeName="titleColor"
												setAttributes={ setAttributes }
											/>
										}
										hover={
											<ABlocksColorControl
												label={ __(
													'Hover Color',
													'ablocks'
												) }
												attributeValue={ titleColorH }
												attributeName="titleColorH"
												setAttributes={ setAttributes }
											/>
										}
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Input Box', 'ablocks' ) }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeName="inputWidth"
										attributeObjectKey="value"
										attributeValue={ inputWidth }
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
												inputWidth[
													'valueUnit' + deviceType
												] ?? '%'
											)
												? 100
												: 1600
										}
										attributeDefaultValue={
											inputWidthAttribute
										}
										autoSyncRange={ true }
									/>
								</>
							}
							style={
								<>
									<ControlLabel
										label={ __( 'Typography', 'ablocks' ) }
										isResponsive={ false }
										isHeader={ true }
									/>

									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="inputTextTypography"
										attributeValue={ inputTextTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<NormalHoverTabs
										normal={
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeValue={
													inputTextColor
												}
												attributeName="inputTextColor"
												setAttributes={ setAttributes }
											/>
										}
										hover={
											<ABlocksColorControl
												label={ __(
													'Hover Color',
													'ablocks'
												) }
												attributeValue={
													inputTextColorH
												}
												attributeName="inputTextColorH"
												setAttributes={ setAttributes }
											/>
										}
									/>
									<Separator />
									<ControlLabel
										label={ __( 'Padding', 'ablocks' ) }
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="inputPadding"
										attributeValue={ inputPadding }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ControlLabel
										label={ __( 'Border', 'ablocks' ) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="inputBorder"
										attributeValue={ inputBorder }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Button Style', 'ablocks' ) }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										min={ 0 }
										isInline={ false }
										isResponsive={ true }
										attributeName={ 'buttonWidth' }
										attributeValue={ buttonWidth }
										hasUnit={ true }
										setAttributes={ setAttributes }
										attributeDefaultValue={
											buttonWidthAttributes
										}
										autoSyncRange={ true }
									/>
								</>
							}
							style={
								<>
									{ /* Typography */ }
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="btnTypography"
										attributeValue={ btnTypography }
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
														buttonColor
													}
													attributeName="buttonColor"
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													attributeValue={
														buttonBackground
													}
													attributeName="buttonBackground"
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
														buttonColorH
													}
													attributeName="buttonColorH"
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
														buttonBackgroundH
													}
													attributeName="buttonBackgroundH"
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
										attributeName="buttonPadding"
										attributeValue={ buttonPadding }
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
								</>
							}
						/>
						<ControlLabel
							label="Add to cart Button"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										min={ 0 }
										isInline={ false }
										isResponsive={ true }
										attributeName={ 'AddButtonWidth' }
										attributeValue={ AddButtonWidth }
										hasUnit={ true }
										setAttributes={ setAttributes }
										attributeDefaultValue={
											AddButtonWidthAttributes
										}
										autoSyncRange={ true }
									/>
								</>
							}
							style={
								<>
									{ /* Typography */ }
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="AddBtnTypography"
										attributeValue={ AddBtnTypography }
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
														AddButtonColor
													}
													attributeName="AddButtonColor"
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													attributeValue={
														AddButtonBackground
													}
													attributeName="AddButtonBackground"
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
														AddButtonColorH
													}
													attributeName="AddButtonColorH"
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
														AddButtonBackgroundH
													}
													attributeName="AddButtonBackgroundH"
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
										attributeName="AddButtonPadding"
										attributeValue={ AddButtonPadding }
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
										attributeName="AddButtonBorder"
										attributeValue={ AddButtonBorder }
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
