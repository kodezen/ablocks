import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksTextControl from '@Controls/text';
import { PanelBody } from '@wordpress/components';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTypography from '@Controls/typography';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksSelectControl from '@Controls/select';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import Separator from '@Components/separator';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ABlocksRangeControl from '@Controls/range';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ControlLabel from '@Components/control-label';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import ABlocksNumberControl from '@Controls/number';
import { makeRequest } from '@Utils/helper';
import ABlockLinkControl from '@Controls/link-control';

import './style.css';
import { iconSpace as iconSpaceDefaultAttributeValue } from './attributes';
import {
	btnPositionOptions,
	stripeCurrencyOptions,
	textAlignmentOptions,
} from './helper';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		buttonType,
		text,
		position,
		alignment,
		buttonSize,
		textShadow,
		typography,
		textColor,
		textColorH,
		background,
		backgroundH,
		padding,
		iconPosition,
		showIcon,
		iconSpace,

		stripeApi,
		itemName,
		price,
		currency,
		quantity,
		shippingPrice,
		hasTax,
		tax,
		taxId,
		redirectionAfterPayment,
		openInNewTab,
		customMessage,
		errorMessage,
	} = attributes;

	useEffect( () => {
		if ( stripeApi ) {
			makeRequest( {
				action: 'ablocks/stripe_get_tax_rates',
				api_key: stripeApi,
			} ).then( ( res ) => {
				if ( res.data.success ) {
					const txData = res?.data?.data.data;
					if ( txData.length > 0 ) {
						const txOp = txData.map( ( item ) => {
							return {
								label: item.display_name,
								value: item.id,
							};
						} );

						setAttributes( {
							tax: txOp,
						} );
					} else {
						setAttributes( {
							tax: [
								{
									label: 'No tax found.',
									value: '',
								},
							],
						} );
					}
				} else {
					setAttributes( {
						tax: [
							{
								label: 'No tax found.',
								value: '',
							},
						],
					} );
				}
			} );
		} else {
			setAttributes( {
				tax: [
					{
						label: 'No tax found.',
						value: '',
					},
				],
			} );
		}
	}, [ stripeApi, hasTax ] );

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-stripe-button-block/'
					}
				>
					{ /* Stripe */ }
					<PanelBody
						title={ __( 'Pricing & Payments', 'ablocks' ) }
						initialOpen={ true }
					>
						<>
							<ABlocksTextControl
								label={ __( 'Stripe API', 'ablocks' ) }
								attributeName="stripeApi"
								attributeValue={ stripeApi }
								setAttributes={ setAttributes }
								placeholder=""
								isInline={ false }
								disableDynamicContent={ true }
							/>

							<Separator />

							<ABlocksTextControl
								label={ __( 'Item Name', 'ablocks' ) }
								attributeName="itemName"
								attributeValue={ itemName }
								setAttributes={ setAttributes }
								isInline={ false }
								disableDynamicContent={ true }
							/>

							<ABlocksNumberControl
								label={ __( 'Product Price', 'ablocks' ) }
								attributeName={ 'price' }
								attributeValue={ price }
								setAttributes={ setAttributes }
								isInline={ true }
							/>

							<ABlocksSelectControl
								label={ __( 'Currency', 'ablocks' ) }
								options={ stripeCurrencyOptions }
								isResponsive={ false }
								attributeValue={ currency || 'usd' }
								attributeName="currency"
								setAttributes={ setAttributes }
							/>

							<div className="ablocks-stripe-settings-msg">
								Currencies marked with * are not supported by
								American Express.
							</div>

							<ABlocksNumberControl
								label={ __( 'Quantity', 'ablocks' ) }
								attributeName={ 'quantity' }
								attributeValue={ quantity }
								setAttributes={ setAttributes }
								isInline={ true }
							/>

							<ABlocksNumberControl
								label={ __( 'Shipping Price', 'ablocks' ) }
								attributeName={ 'shippingPrice' }
								attributeValue={ shippingPrice }
								setAttributes={ setAttributes }
								isInline={ true }
							/>

							<ABlocksToggleControl
								label={ __( 'Add Tax', 'ablocks' ) }
								attributeValue={ hasTax }
								setAttributes={ setAttributes }
								attributeName="hasTax"
								isResponsive={ false }
							/>

							{ hasTax && (
								<ABlocksSelectControl
									label={ __( 'Select Tax', 'ablocks' ) }
									options={ tax }
									isResponsive={ false }
									attributeValue={ taxId }
									attributeName="taxId"
									setAttributes={ setAttributes }
								/>
							) }
						</>
					</PanelBody>

					{ /* Button */ }
					<PanelBody
						title={ __( 'Button', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksAlignmentControl
										label={ __( 'Position', 'ablocks' ) }
										attributeName="position"
										attributeValue={ position }
										setAttributes={ setAttributes }
										options={ btnPositionOptions }
										isInline={ false }
									/>
									{ position?.value === 'stretch' && (
										<ABlocksAlignmentControl
											label={ __(
												'Alignment',
												'ablocks'
											) }
											attributeName="alignment"
											attributeValue={ alignment }
											setAttributes={ setAttributes }
											options={ textAlignmentOptions }
											isInline={ false }
										/>
									) }
									<ABlocksSelectControl
										label={ __( 'Type', 'ablocks' ) }
										options={ [
											{
												label: 'Default',
												value: '#635bff',
											},
											{
												label: 'Danger',
												value: '#dc3545',
											},
											{ label: 'Info', value: '#0dcaf0' },
											{
												label: 'Success',
												value: '#198754',
											},
											{
												label: 'Warning',
												value: '#fd7e14',
											},
											{
												label: 'Primary',
												value: '#0d6efd',
											},
										] }
										isResponsive={ false }
										attributeValue={
											buttonType || 'Primary'
										}
										attributeName="buttonType"
										setAttributes={ setAttributes }
									/>

									<ABlocksTextControl
										label={ __( 'Text', 'ablocks' ) }
										attributeName="text"
										attributeValue={ text }
										setAttributes={ setAttributes }
										isInline={ false }
									/>

									<ABlocksSelectControl
										label={ __( 'Sizes', 'ablocks' ) }
										options={ [
											{
												label: 'Extra small',
												value: 'xs',
											},
											{ label: 'Small', value: 'sm' },
											{
												label: 'Medium',
												value: 'md',
											},
											{ label: 'Large', value: 'lg' },
											{
												label: 'Extra large',
												value: 'xl',
											},
										] }
										isResponsive={ false }
										attributeValue={ buttonSize || 'sm' }
										attributeName="buttonSize"
										setAttributes={ setAttributes }
									/>

									<ABlocksToggleControl
										label={ __( 'Show Icon', 'ablocks' ) }
										attributeValue={ showIcon }
										setAttributes={ setAttributes }
										attributeName="showIcon"
										isResponsive={ false }
									/>
								</>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="typography"
										attributeValue={ typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="textShadow"
										attributeValue={ textShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
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
													attributeName="textColor"
													attributeValue={
														textColor || '#000000'
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													isGradient={ true }
													attributeName="background"
													attributeValue={
														background || '#ddd'
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
														'Color',
														'ablocks'
													) }
													attributeName="textColorH"
													attributeValue={
														textColorH
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													isGradient={ true }
													attributeName="backgroundH"
													attributeValue={
														backgroundH
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Transition Duration (ms)',
														'ablocks'
													) }
													min={ 0 }
													max={ 5 }
													step={ 0.01 }
													hasUnit={ false }
													isInline={ false }
													isResponsive={ false }
													attributeValue={
														attributes?.transition ||
														0
													}
													attributeName={
														'transition'
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
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="border"
										attributeValue={ attributes?.border }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="padding"
										attributeValue={ padding }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ControlLabel
										label="Box shadow"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeName="boxShadow"
										attributeValue={ attributes?.boxShadow }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</PanelBody>

					{ /* Icon */ }
					{ showIcon && (
						<PanelBody
							title={ __( 'Icon', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksIconUploader
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
										<ABlocksSelectControl
											label={ __(
												'Icon position',
												'ablocks'
											) }
											options={ [
												{
													label: 'Before',
													value: 'left',
												},
												{
													label: 'After',
													value: 'right',
												},
											] }
											isResponsive={ false }
											attributeValue={
												iconPosition || 'left'
											}
											attributeName="iconPosition"
											setAttributes={ setAttributes }
										/>

										<ABlocksRangeControl
											label={ __(
												'Icon spacing',
												'ablocks'
											) }
											min={ 0 }
											max={ 100 }
											hasUnit={ true }
											isInline={ false }
											isResponsive={ true }
											attributeName={ 'iconSpace' }
											attributeValue={ iconSpace }
											setAttributes={ setAttributes }
											attributeObjectKey="value"
											attributeDefaultValue={
												iconSpaceDefaultAttributeValue
											}
											unitOptions={ [
												{ value: 'px', label: 'px' },
												{ value: 'rem', label: 'rem' },
												{ value: 'em', label: 'em' },
											] }
										/>
									</>
								}
								style={
									<>
										<ABlocksIconStyleSettings
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</PanelBody>
					) }

					{ /* Additional Options */ }
					<PanelBody
						title={ __( 'Additional Options', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlockLinkControl
							label={ __(
								'Redirection After Payment',
								'ablocks'
							) }
							attributeName="redirectionAfterPayment"
							attributeValue={ redirectionAfterPayment }
							setAttributes={ setAttributes }
							placeholder="https://ablocks.pro/"
							isInline={ false }
						/>

						<ABlocksToggleControl
							label={ __( 'Open in New Tab', 'ablocks' ) }
							attributeValue={ openInNewTab }
							setAttributes={ setAttributes }
							attributeName="openInNewTab"
							isResponsive={ false }
						/>

						<ABlocksToggleControl
							label={ __( 'Custom Message', 'ablocks' ) }
							attributeValue={ customMessage }
							setAttributes={ setAttributes }
							attributeName="customMessage"
							isResponsive={ false }
						/>

						{ customMessage && (
							<>
								<ABlocksTextControl
									label={ __( 'Error Message', 'ablocks' ) }
									attributeName="errorMessage"
									attributeValue={ errorMessage }
									setAttributes={ setAttributes }
									isInline={ false }
								/>
							</>
						) }
					</PanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
