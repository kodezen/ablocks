import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';

import InspectorTabs from '@Components/inspector-tabs';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksRangeControl from '@Controls/range';
import ABlocksSelectControl from '@Controls/select';
import { InspectorControls } from '@wordpress/block-editor';
import ControlLabel from '@Components/control-label';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksBorderControl from '@Controls/border';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import GetDeviceType from '@Utils/get-device-type';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import { getResponsiveValue } from '@Utils/helper';

import './style.css';
const propTypes = {};
const defaultProps = {};

import {
	carouselHeight as carouselHeightDefaultAttributeValue,
	paginationPositionY as paginationPositionYDefaultAttributeValue,
	paginationPositionX as paginationPositionXDefaultAttributeValue,
	paginationSize as paginationSizeDeafaultAttributeValue,
	paginationHoverSize as paginationHoverSizeDeafaultAttributeValue,
	paginationActiveSize as paginationActiveSizeDefaultAttributeValue,
	paginationActiveHoverSize as paginationActiveHoverSizeDefaultAttributeValue,
	navigationIconSize as navigationIconSizeDefaultAttribute,
	navigationIconPositionNextX as navigationButtonPositionNextXDefaultAttributeValue,
	navigationIconPositionPrevX as navigationButtonPositionPrevXDefaultAttributeValue,
	navigationIconPositionY as navigationIconPositionYDefaultAttributeValue,
	slidesPerView as slidesPerViewDefaultAttributeValue,
	gap as gapDefaultAttributeValue,
} from './attributes';

import { getMaxValueForIconSize, getMaxValueForIconPosition } from './helper';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		verticalAlign,
		autoplayDelay,
		autoplay,
		reverseDirection,
		autoplayPauseOnHover,
		autoPlayReverse,
		grabCursor,
		mousewheel,
		navigation,
		carouselHeight,
		slidesPerView,
		speed,
		effect,
		// autoPlayProgress,
		paginationType,
		paginationPositionY,
		paginationPositionX,
		paginationColor,
		paginationHoverColor,
		paginationActiveColor,
		paginationActiveHoverColor,
		paginationSize,
		paginationHoverSize,
		paginationActiveSize,
		paginationActiveHoverSize,

		navigationIconSize,
		navigationIconPositionY,
		navigationIconPositionNextX,
		navigationIconPositionPrevX,
		navigationIconColor,
		navigationIconBgColor,
		gap,
	} = attributes;
	const device = GetDeviceType();

	const iconUnit = getResponsiveValue(
		navigationIconSize,
		'valueUnit',
		device
	);

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-carousel-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Carousel', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<React.Fragment>
									<u
										style={ {
											paddingBottom: '20px',
											display: 'block',
										} }
									>
										<i>
											These feature will only works in
											frontend
										</i>
									</u>
									<ABlocksSelectControl
										label={ __(
											'Choose Effect',
											'ablocks'
										) }
										options={ [
											{
												label: 'Slide',
												value: 'slide',
											},
											{
												label: 'Fade',
												value: 'fade',
											},
											{
												label: 'Cube',
												value: 'cube',
											},
											{
												label: 'Flip',
												value: 'flip',
											},
										] }
										attributeName="effect"
										attributeValue={ effect }
										setAttributes={ setAttributes }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label={ __(
											'Reverse Direction',
											'ablocks'
										) }
										attributeValue={ reverseDirection }
										setAttributes={ setAttributes }
										attributeName="reverseDirection"
									/>
									{ effect === 'slide' && (
										<ABlocksRangeControl
											label={ __( 'Slides Per View' ) }
											attributeValue={ slidesPerView }
											setAttributes={ setAttributes }
											attributeName="slidesPerView"
											min={ 1 }
											step={ 1 }
											max={ 10 }
											isInline={ false }
											isResponsive={ true }
											attributeDefaultValue={
												slidesPerViewDefaultAttributeValue
											}
										/>
									) }
									{ effect === 'slide' &&
										slidesPerView[ 'value' + device ] >
											1 && (
											<ABlocksRangeControl
												label={ __( 'Gap' ) }
												attributeValue={ gap }
												setAttributes={ setAttributes }
												attributeName="gap"
												min={ 0 }
												step={ 1 }
												max={ 100 }
												isInline={ false }
												isResponsive={ true }
												attributeDefaultValue={
													gapDefaultAttributeValue
												}
											/>
										) }
									<ABlocksToggleControl
										isResponsive={ false }
										label={ __( 'Loop', 'ablocks' ) }
										attributeValue={ attributes?.isLoop }
										setAttributes={ setAttributes }
										attributeName="isLoop"
									/>
									<ABlocksRangeControl
										label={ __( 'Speed (ms)' ) }
										attributeValue={ speed }
										setAttributes={ setAttributes }
										attributeName="speed"
										step={ 50 }
										min={ 0 }
										max={ 5000 }
										isInline={ false }
										isResponsive={ false }
									/>

									<ABlocksToggleControl
										isResponsive={ false }
										label={ __( 'Grab Cursor', 'ablocks' ) }
										attributeValue={ grabCursor }
										setAttributes={ setAttributes }
										attributeName="grabCursor"
									/>

									<ABlocksToggleControl
										isResponsive={ false }
										label={ __( 'Mousewheel', 'ablocks' ) }
										attributeValue={ mousewheel }
										setAttributes={ setAttributes }
										attributeName="mousewheel"
									/>
								</React.Fragment>
							}
							style={
								<React.Fragment>
									<ABlocksRangeControl
										label={ __( 'Carousel Height' ) }
										attributeName="carouselHeight"
										attributeValue={ carouselHeight }
										setAttributes={ setAttributes }
										hasUnit={ true }
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'vh', label: 'vh' },
										] }
										min={ 0 }
										max={
											[ 'vh' ].includes(
												carouselHeight[
													'valueUnit' + device
												]
											)
												? 100
												: 1000
										}
										isInline={ false }
										isResponsive={ true }
										attributeDefaultValue={
											carouselHeightDefaultAttributeValue
										}
									/>
									<ABlocksButtonGroupControl
										label={ __(
											'Vertical Alignment',
											'ablocks'
										) }
										setAttributes={ setAttributes }
										attributeName="verticalAlign"
										attributeValue={ verticalAlign }
										options={ [
											{
												label: __( 'Top', 'ablocks' ),
												value: 'start',
											},
											{
												label: __(
													'Center',
													'ablocks'
												),
												value: 'center',
											},
											{
												label: __(
													'Bottom',
													'ablocks'
												),
												value: 'end',
											},
										] }
										isResponsive={ true }
										allowDeselect={ false }
									/>
								</React.Fragment>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Pagination', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<React.Fragment>
									<ABlocksToggleControl
										isResponsive={ false }
										label={ __( 'Pagination', 'ablocks' ) }
										attributeValue={
											attributes?.pagination
										}
										setAttributes={ setAttributes }
										attributeName="pagination"
									/>
									{ attributes.pagination && (
										<>
											<ABlocksSelectControl
												label={ __(
													'Pagination Type',
													'ablocks'
												) }
												options={ [
													{
														label: 'Default',
														value: 'default',
													},
													{
														label: 'Border 1',
														value: 'border1',
													},
													{
														label: 'Border 2',
														value: 'border2',
													},
													{
														label: 'Border 3',
														value: 'border3',
													},
												] }
												attributeName="paginationType"
												attributeValue={
													paginationType
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksToggleControl
												isResponsive={ false }
												label={ __(
													'Pagination Clickable',
													'ablocks'
												) }
												attributeValue={
													attributes?.paginationClickable
												}
												setAttributes={ setAttributes }
												attributeName="paginationClickable"
											/>
											<ABlocksRangeControl
												label={ __( 'Position Y' ) }
												attributeName="paginationPositionY"
												attributeValue={
													paginationPositionY
												}
												setAttributes={ setAttributes }
												hasUnit={ true }
												unitOptions={ [
													{ value: '%', label: '%' },
													{
														value: 'px',
														label: 'px',
													},
												] }
												min={
													paginationPositionY?.valueUnit ===
													'px'
														? -250
														: -50
												}
												max={ getMaxValueForIconPosition(
													paginationPositionY?.valueUnit ||
														'%'
												) }
												isInline={ false }
												isResponsive={ true }
												attributeDefaultValue={
													paginationPositionYDefaultAttributeValue
												}
												autoSyncRange={ false }
											/>
											<ABlocksRangeControl
												label={ __( 'Position X' ) }
												attributeName="paginationPositionX"
												attributeValue={
													paginationPositionX
												}
												setAttributes={ setAttributes }
												hasUnit={ true }
												unitOptions={ [
													{ value: '%', label: '%' },
													{
														value: 'px',
														label: 'px',
													},
												] }
												min={
													paginationPositionX?.valueUnit ===
													'px'
														? -250
														: -50
												}
												max={ getMaxValueForIconPosition(
													paginationPositionX?.valueUnit ||
														'%'
												) }
												isInline={ false }
												isResponsive={ true }
												attributeDefaultValue={
													paginationPositionXDefaultAttributeValue
												}
												autoSyncRange={ false }
											/>
										</>
									) }
								</React.Fragment>
							}
							style={
								<React.Fragment>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeName="paginationColor"
													attributeValue={
														paginationColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Active Color',
														'ablocks'
													) }
													attributeName="paginationActiveColor"
													attributeValue={
														paginationActiveColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __( 'Size' ) }
													attributeName="paginationSize"
													attributeValue={
														paginationSize
													}
													setAttributes={
														setAttributes
													}
													hasUnit={ true }
													unitOptions={ [
														{
															value: 'px',
															label: 'px',
														},
														{
															value: 'rem',
															label: 'rem',
														},
														{
															value: 'em',
															label: 'em',
														},
													] }
													min={ 0 }
													max={ 100 }
													isInline={ false }
													isResponsive={ true }
													attributeDefaultValue={
														paginationSizeDeafaultAttributeValue
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Active Size'
													) }
													attributeName="paginationActiveSize"
													attributeValue={
														paginationActiveSize
													}
													setAttributes={
														setAttributes
													}
													hasUnit={ true }
													unitOptions={ [
														{
															value: 'px',
															label: 'px',
														},
														{
															value: 'rem',
															label: 'rem',
														},
														{
															value: 'em',
															label: 'em',
														},
													] }
													min={ 0 }
													max={ 100 }
													isInline={ false }
													isResponsive={ true }
													attributeDefaultValue={
														paginationActiveSizeDefaultAttributeValue
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
													attributeName="paginationHoverColor"
													attributeValue={
														paginationHoverColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Active Color',
														'ablocks'
													) }
													attributeName="paginationActiveHoverColor"
													attributeValue={
														paginationActiveHoverColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __( 'Size' ) }
													attributeName="paginationHoverSize"
													attributeValue={
														paginationHoverSize
													}
													setAttributes={
														setAttributes
													}
													hasUnit={ true }
													unitOptions={ [
														{
															value: 'px',
															label: 'px',
														},
														{
															value: 'rem',
															label: 'rem',
														},
														{
															value: 'em',
															label: 'em',
														},
													] }
													min={ 0 }
													max={ 100 }
													isInline={ false }
													isResponsive={ true }
													attributeDefaultValue={
														paginationHoverSizeDeafaultAttributeValue
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Active Size'
													) }
													attributeName="paginationActiveHoverSize"
													attributeValue={
														paginationActiveHoverSize
													}
													setAttributes={
														setAttributes
													}
													hasUnit={ true }
													unitOptions={ [
														{
															value: 'px',
															label: 'px',
														},
														{
															value: 'rem',
															label: 'rem',
														},
														{
															value: 'em',
															label: 'em',
														},
													] }
													min={ 0 }
													max={ 100 }
													isInline={ false }
													isResponsive={ true }
													attributeDefaultValue={
														paginationActiveHoverSizeDefaultAttributeValue
													}
												/>
											</>
										}
									/>

									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="paginationBorder"
										attributeValue={
											attributes?.paginationBorder
										}
										setAttributes={ setAttributes }
									/>
									<ControlLabel
										label="Active Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="activePaginationBorder"
										attributeValue={
											attributes?.activePaginationBorder
										}
										setAttributes={ setAttributes }
									/>
								</React.Fragment>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Autoplay', 'ablocks' ) }
						initialOpen={ false }
					>
						<u
							style={ {
								paddingBottom: '20px',
								display: 'block',
							} }
						>
							<i>These feature will only works in frontend</i>
						</u>
						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Autoplay', 'ablocks' ) }
							attributeValue={ autoplay }
							setAttributes={ setAttributes }
							attributeName="autoplay"
						/>
						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Autoplay Reverse', 'ablocks' ) }
							attributeValue={ autoPlayReverse }
							setAttributes={ setAttributes }
							attributeName="autoPlayReverse"
						/>
						{ autoplay && (
							<React.Fragment>
								<ABlocksRangeControl
									label={ __( 'Autoplay Delay (ms)' ) }
									attributeValue={ autoplayDelay }
									setAttributes={ setAttributes }
									attributeName="autoplayDelay"
									min={ 0 }
									step={ 100 }
									max={ 25000 }
									isInline={ false }
									isResponsive={ false }
								/>
								<ABlocksToggleControl
									isResponsive={ false }
									label={ __(
										'Autoplay Pause On Hover',
										'ablocks'
									) }
									attributeValue={ autoplayPauseOnHover }
									setAttributes={ setAttributes }
									attributeName="autoplayPauseOnHover"
								/>
							</React.Fragment>
						) }
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Navigation', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Navigation', 'ablocks' ) }
							attributeValue={ navigation }
							setAttributes={ setAttributes }
							attributeName="navigation"
						/>
						{ navigation && (
							<ContentStyleTabs
								content={
									<React.Fragment>
										<ABlocksIconUploader
											label={ __(
												'Left Icon',
												'ablocks'
											) }
											attributes={ attributes }
											attributePrefix="leftIcon"
											setAttributes={ setAttributes }
											legacySupport
										/>
										<ABlocksIconUploader
											label={ __(
												'Right Icon',
												'ablocks'
											) }
											attributePrefix="rightIcon"
											attributes={ attributes }
											setAttributes={ setAttributes }
											legacySupport
										/>
										<ABlocksRangeControl
											label={ __( 'Size' ) }
											attributeName="navigationIconSize"
											attributeValue={
												navigationIconSize
											}
											setAttributes={ setAttributes }
											hasUnit={ true }
											unitOptions={ [
												{ value: 'px', label: 'px' },
												{ value: 'rem', label: 'rem' },
												{ value: 'em', label: 'em' },
											] }
											min={ 0 }
											max={ getMaxValueForIconSize(
												iconUnit
											) }
											isInline={ false }
											isResponsive={ true }
											attributeDefaultValue={
												navigationIconSizeDefaultAttribute
											}
										/>
										<ABlocksRangeControl
											label={ __( 'Position Y' ) }
											attributeName="navigationIconPositionY"
											attributeValue={
												navigationIconPositionY
											}
											setAttributes={ setAttributes }
											hasUnit={ true }
											unitOptions={ [
												{ value: '%', label: '%' },
												{ value: 'px', label: 'px' },
											] }
											min={
												navigationIconPositionY?.valueUnit ===
												'px'
													? -250
													: -50
											}
											max={ getMaxValueForIconPosition(
												navigationIconPositionY?.valueUnit ||
													'%'
											) }
											isInline={ false }
											isResponsive={ true }
											attributeDefaultValue={
												navigationIconPositionYDefaultAttributeValue
											}
											autoSyncRange={ false }
										/>
										<ABlocksRangeControl
											label={ __( 'Nav Next X' ) }
											attributeName="navigationIconPositionNextX"
											attributeValue={
												navigationIconPositionNextX
											}
											setAttributes={ setAttributes }
											hasUnit={ true }
											unitOptions={ [
												{ value: '%', label: '%' },
												{ value: 'px', label: 'px' },
											] }
											min={
												navigationIconPositionNextX?.valueUnit ===
												'px'
													? -250
													: -50
											}
											max={ getMaxValueForIconPosition(
												navigationIconPositionNextX?.valueUnit ||
													'%'
											) }
											isInline={ false }
											isResponsive={ true }
											attributeDefaultValue={
												navigationButtonPositionNextXDefaultAttributeValue
											}
											autoSyncRange={ false }
										/>
										<ABlocksRangeControl
											label={ __( 'Nav Prev X' ) }
											attributeName="navigationIconPositionPrevX"
											attributeValue={
												navigationIconPositionPrevX
											}
											setAttributes={ setAttributes }
											hasUnit={ true }
											unitOptions={ [
												{ value: '%', label: '%' },
												{ value: 'px', label: 'px' },
											] }
											min={
												navigationIconPositionPrevX?.valueUnit ===
												'px'
													? -250
													: -50
											}
											max={ getMaxValueForIconPosition(
												navigationIconPositionPrevX?.valueUnit ||
													'%'
											) }
											isInline={ false }
											isResponsive={ true }
											attributeDefaultValue={
												navigationButtonPositionPrevXDefaultAttributeValue
											}
											autoSyncRange={ false }
										/>
									</React.Fragment>
								}
								style={
									<React.Fragment>
										<NormalHoverTabs
											normal={
												<>
													<ABlocksColorControl
														label={ __(
															'Color',
															'ablocks'
														) }
														attributeName="navigationIconColor"
														attributeValue={
															navigationIconColor
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Background Color',
															'ablocks'
														) }
														attributeName="navigationIconBgColor"
														attributeValue={
															navigationIconBgColor
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
														attributeName="navigationIconColorH"
														attributeValue={
															attributes?.navigationIconColorH
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Background Color',
															'ablocks'
														) }
														attributeName="navigationIconBgColorH"
														attributeValue={
															attributes?.navigationIconBgColorH
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
															attributes?.navigationIconTransition ||
															0
														}
														attributeName={
															'navigationIconTransition'
														}
														setAttributes={
															setAttributes
														}
													/>
												</>
											}
										/>
										<ABlocksDimensions
											label={ __( 'Padding', 'ablocks' ) }
											isResponsive={ true }
											attributeName="navigationIconPadding"
											attributeValue={
												attributes?.navigationIconPadding
											}
											setAttributes={ setAttributes }
										/>
										<ControlLabel
											label="Border"
											isResponsive={ false }
											isHeader={ true }
										/>
										<ABlocksBorderControl
											attributeName="navigationIconBorder"
											attributeValue={
												attributes?.navigationIconBorder
											}
											setAttributes={ setAttributes }
										/>
										<ControlLabel
											label="Box shadow"
											isHeader={ true }
											isResponsive={ false }
										/>
										<ABlocksBoxShadowControl
											label={ __(
												'Box shadow',
												'ablocks'
											) }
											attributeName="navigationIconBoxShadow"
											attributeValue={
												attributes?.navigationIconBoxShadow
											}
											setAttributes={ setAttributes }
										/>
									</React.Fragment>
								}
							/>
						) }
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
