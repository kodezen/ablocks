import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import InspectorTabs from '@Components/inspector-tabs';
import { PanelBody } from '@wordpress/components';
import './style.css';
import ABlocksButtonGroupControl from '@Components/button-group';
import { __ } from '@wordpress/i18n';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksRangeControl from '@Controls/range';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTypography from '@Controls/typography';
import GetDeviceType from '@Utils/get-device-type';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import {
	thickness as thicknessDefaultAttributeValue,
	iconSize as iconSizeDefaultAttributeValue,
	itemGap as itemGapDefaultAttributeValue,
	iconBackgroundSize as iconBackgroundSizeDefaultAttributeValue,
	lineLeft as lineLeftDefaultAttributeValue,
	lineRight as lineRightDefaultAttributeValue,
} from './attributes';
import { dateAlignmentOptions } from './helper';
import { dateOptions } from '@Utils/helper.js';

const Settings = ( { attributes, setAttributes } ) => {
	const {
		arrowAlignment,
		contentPosition,
		iconBackgroundColor,
		iconColor,
		thicknessColor,
		dateFormat,
		contentBackgroundColor,
		showDate,
		showDateTablet,
		showDateMobile,
		dateColor,
		dateTypography,
		contentPadding,
		datePadding,
		dateAlign,
		dateBackground,
		connectorAnimationColor,
		showAnimation,
	} = attributes;
	const deviceType = GetDeviceType();

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-content-timeline-block/'
					}
				>
					<PanelBody
						title={ __( 'Content Timeline', 'ablocks' ) }
						initialOpen
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksButtonGroupControl
										isResponsive={ false }
										allowDeselect={ false }
										label={ __(
											'Content Position',
											'ablocks'
										) }
										options={ [
											{ label: 'Left', value: 'left' },
											{
												label: 'Center',
												value: 'center',
											},
											{ label: 'Right', value: 'right' },
										] }
										attributeName="contentPosition"
										attributeValue={ contentPosition }
										setAttributes={ setAttributes }
									/>
									<ABlocksButtonGroupControl
										isResponsive={ false }
										allowDeselect={ false }
										label={ __(
											'Arrow Alignment',
											'ablocks'
										) }
										options={ [
											{ label: 'Top', value: 'top' },
											{
												label: 'Center',
												value: 'center',
											},
											{
												label: 'Bottom',
												value: 'bottom',
											},
										] }
										attributeName="arrowAlignment"
										attributeValue={ arrowAlignment }
										setAttributes={ setAttributes }
									/>
									{ deviceType === '' && (
										<ABlocksToggleControl
											isResponsive={ false }
											label={ __(
												'Show Date',
												'ablocks'
											) }
											attributeValue={ showDate }
											setAttributes={ setAttributes }
											attributeName="showDate"
										/>
									) }
									{ deviceType === 'Tablet' && (
										<ABlocksToggleControl
											isResponsive={ false }
											label={ __(
												'Show Date',
												'ablocks'
											) }
											attributeValue={ showDateTablet }
											setAttributes={ setAttributes }
											attributeName="showDateTablet"
										/>
									) }
									{ deviceType === 'Mobile' && (
										<ABlocksToggleControl
											isResponsive={ false }
											label={ __(
												'Show Date',
												'ablocks'
											) }
											attributeValue={ showDateMobile }
											setAttributes={ setAttributes }
											attributeName="showDateMobile"
										/>
									) }
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										attributeName="contentBackgroundColor"
										attributeValue={
											contentBackgroundColor
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __( 'Item Gap', 'ablocks' ) }
										attributeName="itemGap"
										attributeObjectKey="value"
										attributeValue={ attributes?.itemGap }
										setAttributes={ setAttributes }
										hasUnit={ true }
										step={ 1 }
										min={ 0 }
										max={ 100 }
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: '%', label: '%' },
											{ value: 'rem', label: 'rem' },
											{ value: 'em', label: 'em' },
										] }
										isInline={ false }
										attributeDefaultValue={
											itemGapDefaultAttributeValue
										}
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="contentPadding"
										attributeValue={ contentPadding }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</PanelBody>
					{ attributes[ `showDate${ deviceType }` ] && (
						<PanelBody
							title={ __( 'Date', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksSelectControl
											label={ __(
												'Date Format',
												'ablocks'
											) }
											options={ dateOptions }
											attributeValue={ dateFormat }
											attributeName="dateFormat"
											setAttributes={ setAttributes }
											allowDeselect={ false }
											isResponsive={ false }
										/>
										{ deviceType === 'Mobile' && (
											<ABlocksButtonGroupControl
												isResponsive={ false }
												isInline
												label={ __(
													'Date Alignment',
													'ablocks'
												) }
												options={ dateAlignmentOptions }
												attributeName="dateAlign"
												attributeValue={ dateAlign }
												setAttributes={ setAttributes }
											/>
										) }
									</>
								}
								style={
									<>
										<ABlocksTypography
											label={ __(
												'Date Typography',
												'ablocks'
											) }
											attributeName="dateTypography"
											attributeValue={ dateTypography }
											setAttributes={ setAttributes }
											isResponsive
											attributes={ attributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Date Color',
												'ablocks'
											) }
											attributeName="dateColor"
											attributeValue={ dateColor }
											setAttributes={ setAttributes }
										/>
										{ deviceType === 'Mobile' && (
											<>
												<ABlocksColorControl
													label={ __(
														'Date Background',
														'ablocks'
													) }
													attributeName="dateBackground"
													attributeValue={
														dateBackground
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksDimensions
													label={ __(
														'Padding',
														'ablocks'
													) }
													isResponsive={ true }
													attributeName="datePadding"
													attributeValue={
														datePadding
													}
													setAttributes={
														setAttributes
													}
												/>
												<ControlLabel
													label="Border"
													isResponsive={ true }
													isHeader={ true }
												/>
												<ABlocksBorderControl
													attributeName="dateBorder"
													attributeValue={
														attributes?.dateBorder
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										) }
									</>
								}
							/>
						</PanelBody>
					) }
					<PanelBody
						title={ __( 'Connectors', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksIconUploader
										label={ __( 'Icon', 'ablocks' ) }
										attributePrefix="contentTimeLineIcon"
										attributes={ attributes }
										setAttributes={ setAttributes }
										legacySupport={ true }
									/>
									<ABlocksRangeControl
										label={ __( 'Icon Size', 'ablocks' ) }
										min={ 0 }
										max={ 100 }
										step={ 1 }
										isInline={ false }
										isResponsive={ true }
										hasUnit={ true }
										attributeName="iconSize"
										attributeValue={ attributes?.iconSize }
										setAttributes={ setAttributes }
										attributeDefaultValue={
											iconSizeDefaultAttributeValue
										}
									/>
									<ABlocksRangeControl
										label={ __(
											'Icon Background Size',
											'ablocks'
										) }
										min={ 0 }
										max={ 100 }
										isInline={ false }
										isResponsive={ false }
										attributeName="iconBackgroundSize"
										attributeValue={
											attributes?.iconBackgroundSize
										}
										setAttributes={ setAttributes }
										attributeDefaultValue={
											iconBackgroundSizeDefaultAttributeValue
										}
									/>
									{ contentPosition !== 'right' && (
										<ABlocksRangeControl
											label={ __(
												'Line Left',
												'ablocks'
											) }
											min={ -100 }
											max={ 100 }
											step={ 1 }
											isInline={ false }
											isResponsive={ true }
											hasUnit={ true }
											attributeName="lineLeft"
											attributeValue={
												attributes?.lineLeft
											}
											setAttributes={ setAttributes }
											attributeDefaultValue={
												lineLeftDefaultAttributeValue
											}
											autoSyncRange={ false }
										/>
									) }
									{ contentPosition === 'right' && (
										<ABlocksRangeControl
											label={ __(
												'Right Line',
												'ablocks'
											) }
											min={ -100 }
											max={ 100 }
											step={ 1 }
											isInline={ false }
											isResponsive={ true }
											hasUnit={ true }
											attributeName="lineRight"
											attributeValue={
												attributes?.lineRight
											}
											setAttributes={ setAttributes }
											attributeDefaultValue={
												lineRightDefaultAttributeValue
											}
											autoSyncRange={ false }
										/>
									) }
									<ABlocksRangeControl
										label={ __(
											'Connector Thickness',
											'ablocks'
										) }
										min={ 1 }
										max={ 10 }
										isInline={ false }
										isResponsive={ false }
										attributeName="thickness"
										attributeValue={ attributes?.thickness }
										setAttributes={ setAttributes }
										attributeDefaultValue={
											thicknessDefaultAttributeValue
										}
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __(
											'Connector Color',
											'ablocks'
										) }
										attributeName="thicknessColor"
										attributeValue={ thicknessColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label={ __(
											'Show Animation',
											'ablocks'
										) }
										attributeValue={ showAnimation }
										setAttributes={ setAttributes }
										attributeName="showAnimation"
									/>
									{ showAnimation && (
										<>
											<ABlocksColorControl
												label={ __(
													'Connector Animation Color',
													'ablocks'
												) }
												attributeName="connectorAnimationColor"
												attributeValue={
													connectorAnimationColor
												}
												setAttributes={ setAttributes }
											/>
											<span className="ablocks-control-field-description">
												{ __(
													'Animation color only work at frontend.',
													'ablocks'
												) }
											</span>
										</>
									) }

									<ABlocksColorControl
										label={ __( 'Icon Color', 'ablocks' ) }
										attributeName="iconColor"
										attributeValue={ iconColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Icon Background Color',
											'ablocks'
										) }
										attributeName="iconBackgroundColor"
										attributeValue={ iconBackgroundColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</PanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
};

export default Settings;
