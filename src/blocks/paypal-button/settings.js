import React from 'react';
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
import ABlockLinkControl from '@Controls/link-control';
import './style.css';
import { iconSpace as iconSpaceDefaultAttributeValue } from './attributes';
import {
	billingMonthOptions,
	btnPositionOptions,
	paypalCurrencyOptions,
	textAlignmentOptions,
	trxTypeOptions,
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

		paypalAccount,
		trxType,
		itemName,
		price,
		currency,
		quantity,
		shippingPrice,
		tax,
		isAmountFixed,
		isAutoRenewal,
		billingCycle,
		redirectionAfterPayment,
		sandboxMode,
		sandboxEmail,
		openInNewTab,
		customMessage,
		errorMessage,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-paypal-button/'
					}
				>
					{ /* Paypal */ }
					<PanelBody
						title={ __( 'Pricing & Payments', 'ablocks' ) }
						initialOpen={ true }
					>
						<>
							<ABlocksTextControl
								label={ __( 'PayPal Account', 'ablocks' ) }
								attributeName="paypalAccount"
								attributeValue={ paypalAccount }
								setAttributes={ setAttributes }
								placeholder="ablocks@kodezen.com"
								isInline={ false }
								disableDynamicContent={ true }
							/>

							<span className="ablocks-paypal-settings-msg">
								Transactions through your PayPal button will be
								registered to this account.
							</span>

							<Separator />

							<ABlocksSelectControl
								label={ __( 'Transaction Type', 'ablocks' ) }
								options={ trxTypeOptions }
								isResponsive={ false }
								attributeValue={ trxType }
								attributeName="trxType"
								setAttributes={ setAttributes }
							/>

							<ABlocksTextControl
								label={ __( 'Item Name', 'ablocks' ) }
								attributeName="itemName"
								attributeValue={ itemName }
								setAttributes={ setAttributes }
								isInline={ false }
								disableDynamicContent={ true }
							/>
							{ ( trxType === '_xclick' ||
								trxType === '_xclick-subscriptions' ) && (
								<ABlocksNumberControl
									label={ __( 'Price', 'ablocks' ) }
									attributeName={ 'price' }
									attributeValue={ price }
									setAttributes={ setAttributes }
									isInline={ true }
								/>
							) }

							{ trxType === '_donations' && isAmountFixed && (
								<ABlocksNumberControl
									label={ __( 'Amount', 'ablocks' ) }
									attributeName={ 'price' }
									attributeValue={ price }
									setAttributes={ setAttributes }
									isInline={ true }
								/>
							) }

							<ABlocksSelectControl
								label={ __( 'Currency', 'ablocks' ) }
								options={ paypalCurrencyOptions }
								isResponsive={ false }
								attributeValue={ currency || 'usd' }
								attributeName="currency"
								setAttributes={ setAttributes }
							/>
							{ trxType === '_xclick' && (
								<>
									<ABlocksNumberControl
										label={ __( 'Quantity', 'ablocks' ) }
										attributeName={ 'quantity' }
										attributeValue={ quantity }
										setAttributes={ setAttributes }
										isInline={ true }
									/>

									<ABlocksNumberControl
										label={ __(
											'Shipping Price',
											'ablocks'
										) }
										attributeName={ 'shippingPrice' }
										attributeValue={ shippingPrice }
										setAttributes={ setAttributes }
										isInline={ true }
									/>

									<ABlocksNumberControl
										label={ __( 'Tax (%)', 'ablocks' ) }
										attributeName={ 'tax' }
										attributeValue={ tax }
										setAttributes={ setAttributes }
										isInline={ true }
									/>
								</>
							) }

							{ trxType === '_donations' && (
								<>
									<ABlocksToggleControl
										label={ __(
											'Fixed Amount',
											'ablocks'
										) }
										attributeValue={ isAmountFixed }
										setAttributes={ setAttributes }
										attributeName="isAmountFixed"
										isResponsive={ false }
									/>
								</>
							) }

							{ trxType === '_xclick-subscriptions' && (
								<>
									<ABlocksToggleControl
										label={ __(
											'Auto Renewal',
											'ablocks'
										) }
										attributeValue={ isAutoRenewal }
										setAttributes={ setAttributes }
										attributeName="isAutoRenewal"
										isResponsive={ false }
									/>

									<ABlocksSelectControl
										label={ __(
											'Billing Cycle',
											'ablocks'
										) }
										options={ billingMonthOptions }
										isResponsive={ false }
										attributeValue={ billingCycle || 'M' }
										attributeName="billingCycle"
										setAttributes={ setAttributes }
									/>
								</>
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
												value: '#032e82',
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
							label={ __( 'Sandbox Mode', 'ablocks' ) }
							attributeValue={ sandboxMode }
							setAttributes={ setAttributes }
							attributeName="sandboxMode"
							isResponsive={ false }
						/>

						{ sandboxMode && (
							<>
								<ABlocksTextControl
									label={ __( 'Sandbox Email', 'ablocks' ) }
									attributeName="sandboxEmail"
									attributeValue={ sandboxEmail }
									setAttributes={ setAttributes }
									isInline={ false }
								/>

								<span className="ablocks-paypal-settings-msg">
									This is the email provided by PayPal when
									setting up a sandbox through your developer
									account. It allows you to simulate and test
									the purchase process.
								</span>
							</>
						) }

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
									disableDynamicContent={ true }
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
