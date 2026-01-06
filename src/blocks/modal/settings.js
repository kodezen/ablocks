import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksRangeControl from '@Controls/range';
import ABlocksColorControl from '@Controls/color';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBackgroundControl from '@Controls/background';
import ABlocksBorderControl from '@Controls/border';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';

import ContentStyleTabs from '@Components/content-style-tabs';

import {
	panelHeight as heightDefaultValueAttribute,
	panelWidth as widthDefaultValueAttribute,
} from './attributes';

import {
	positionsSet,
	blockPositions,
	panelContentPositionOptions,
	getMaxValueForUnit,
} from './helper';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		popupPosition,
		panelBlockPosition,
		popupOnTop,
		popupTopOffset,
		panelWidth,
		panelHeight,
		panelContentPosition,
		disableCloseButton,
		useHoverTrigger,
		enableAutoTriggerTimer,
		showAutoOnce,
		showOnMouseOutOfWindow,
		autoTriggerTime,
		backdropColor,
		panelPadding,
		panelBackground,
		panelBorder,
		panelShadow,
		closeBtnBackgroundColor,
		closeBtnColor,
		openPanel,
		noTrigger,
		closeBtnSide,
		closeBtnTop,
		closePosition,
	} = attributes;

	const widthUnit = panelWidth?.valueUnit || 'px';
	const heightUnit = panelHeight?.valueUnit || 'px';

	const handleShowOnMouseOutChange = ( value ) => {
		setAttributes( {
			showOnMouseOutOfWindow: value,
			enableAutoTriggerTimer: value ? false : enableAutoTriggerTimer,
		} );
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-modal-popup-builder/'
					}
				>
					<ABlocksPanelBody initialOpen={ true }>
						<ABlocksButtonGroupControl
							allowDeselect={ false }
							isResponsive={ false }
							options={ [
								{
									label: 'Open Panel',
									value: 'open',
								},
								{
									label: 'Close Panel',
									value: 'close',
								},
							] }
							onChangeHandler={ ( value ) =>
								setAttributes( { openPanel: value } )
							}
							attributeValue={ openPanel }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Panel', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<div className="ablocks-modal-position-settings-wrapper">
										<ABlocksRangeControl
											label={ __( 'Width', 'ablocks' ) }
											attributeName="panelWidth"
											attributeObjectKey="value"
											attributeValue={ panelWidth }
											setAttributes={ setAttributes }
											hasUnit={ true }
											step={ 1 }
											min={ 0 }
											max={ getMaxValueForUnit(
												widthUnit
											) }
											isInline={ false }
											unitValue={ panelWidth }
											attributeDefaultValue={
												widthDefaultValueAttribute
											}
										/>

										<ABlocksRangeControl
											label={ __( 'Height', 'ablocks' ) }
											attributeName="panelHeight"
											attributeObjectKey="value"
											attributeValue={ panelHeight }
											setAttributes={ setAttributes }
											hasUnit={ true }
											step={ 1 }
											min={ 0 }
											max={ getMaxValueForUnit(
												heightUnit
											) }
											isInline={ false }
											unitValue={ panelHeight }
											attributeDefaultValue={
												heightDefaultValueAttribute
											}
										/>

										<ControlLabel
											label="Position"
											isResponsive={ false }
											isHeader={ true }
										/>

										{ positionsSet.map(
											( items, index ) => (
												<ABlocksButtonGroupControl
													key={ index }
													allowDeselect={ false }
													isResponsive={ false }
													options={ items }
													onChangeHandler={ (
														value
													) =>
														setAttributes( {
															popupPosition:
																value,
														} )
													}
													attributeValue={
														popupPosition
													}
												/>
											)
										) }
									</div>

									{ 'block' === popupPosition && (
										<ABlocksButtonGroupControl
											allowDeselect={ false }
											isResponsive={ false }
											options={ blockPositions }
											onChangeHandler={ ( value ) =>
												setAttributes( {
													panelBlockPosition: value,
												} )
											}
											attributeValue={
												panelBlockPosition
											}
										/>
									) }

									{ 'popup' === popupPosition && (
										<>
											<ABlocksToggleControl
												label={ __(
													'Place popup on top of page',
													'ablocks'
												) }
												attributeValue={ popupOnTop }
												setAttributes={ setAttributes }
												attributeName="popupOnTop"
												isResponsive={ false }
											/>

											<ABlocksRangeControl
												label={ __(
													'Top Offset',
													'ablocks'
												) }
												min={ 0 }
												max={ 2000 }
												step={ 1 }
												isInline={ true }
												isResponsive={ false }
												attributeName="popupTopOffset"
												attributeValue={
													popupTopOffset
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }

									<ABlocksButtonGroupControl
										isInline={ false }
										isResponsive={ false }
										label={ __(
											'Content Position',
											'ablocks'
										) }
										options={ panelContentPositionOptions }
										attributeName="panelContentPosition"
										attributeValue={ panelContentPosition }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Backdrop BG', 'ablocks' ) }
										attributeName="backdropColor"
										attributeValue={ backdropColor }
										setAttributes={ setAttributes }
									/>

									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										attributeName="panelPadding"
										attributeValue={ panelPadding }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ControlLabel
										label="Background"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBackgroundControl
										isResponsive={ true }
										attributeName="panelBackground"
										attributeValue={ panelBackground }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="panelBorder"
										attributeValue={ panelBorder }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ControlLabel
										label="Shadow"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeName="panelShadow"
										attributeValue={ panelShadow }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Trigger settings', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksToggleControl
							label={ __(
								'Use hover trigger instead of click',
								'ablocks'
							) }
							attributeValue={ useHoverTrigger }
							setAttributes={ setAttributes }
							attributeName="useHoverTrigger"
							isResponsive={ false }
						/>

						<ABlocksToggleControl
							label={ __(
								'Show on mouse out of window',
								'ablocks'
							) }
							attributeValue={ showOnMouseOutOfWindow ?? '0' }
							setAttributes={ setAttributes }
							attributeName="showOnMouseOutOfWindow"
							isResponsive={ false }
							onChangeHandler={ handleShowOnMouseOutChange }
						/>
						{ showOnMouseOutOfWindow && (
							<ABlocksToggleControl
								label={ __( 'Trigger Once', 'ablocks' ) }
								attributeValue={ showAutoOnce ?? '0' }
								setAttributes={ setAttributes }
								attributeName="showAutoOnce"
								isResponsive={ false }
							/>
						) }

						<ABlocksToggleControl
							onChangeHandler={ ( value ) => {
								if ( ! value ) {
									setAttributes( {
										noTrigger: false,
									} );
								}
								setAttributes( {
									enableAutoTriggerTimer: value,
									showOnMouseOutOfWindow: value
										? false
										: showOnMouseOutOfWindow,
								} );
							} }
							label={ __(
								'Enable Auto Trigger Timer (s)',
								'ablocks'
							) }
							attributeValue={ enableAutoTriggerTimer ?? '0' }
							setAttributes={ setAttributes }
							attributeName="enableAutoTriggerTimer"
							isResponsive={ false }
						/>

						{ enableAutoTriggerTimer && (
							<>
								<ABlocksRangeControl
									min={ 0 }
									max={ 100 }
									step={ 1 }
									isInline={ false }
									isResponsive={ false }
									attributeName="autoTriggerTime"
									attributeValue={ autoTriggerTime ?? '0' }
									setAttributes={ setAttributes }
								/>

								<ABlocksToggleControl
									label={ __( 'Trigger Once', 'ablocks' ) }
									attributeValue={ showAutoOnce ?? '0' }
									setAttributes={ setAttributes }
									attributeName="showAutoOnce"
									isResponsive={ false }
								/>

								<ABlocksToggleControl
									label={ __(
										'Disable Trigger Element',
										'ablocks'
									) }
									attributeValue={ noTrigger ?? '0' }
									setAttributes={ setAttributes }
									attributeName="noTrigger"
									isResponsive={ false }
								/>
							</>
						) }
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Close Button', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksToggleControl
							label={ __( 'Disable Button', 'ablocks' ) }
							attributeValue={ disableCloseButton }
							setAttributes={ setAttributes }
							attributeName="disableCloseButton"
							isResponsive={ false }
						/>
						{ ! disableCloseButton && (
							<ContentStyleTabs
								content={
									<>
										<ControlLabel
											label="Position"
											isResponsive={ false }
											isHeader={ true }
										/>

										<ABlocksButtonGroupControl
											allowDeselect={ false }
											isResponsive={ false }
											options={ [
												{
													label: 'Top Left',
													value: 'left',
												},
												{
													label: 'Top Right',
													value: 'right',
												},
											] }
											onChangeHandler={ ( value ) =>
												setAttributes( {
													closePosition: value,
												} )
											}
											attributeValue={ closePosition }
										/>

										<ABlocksRangeControl
											label={ `${
												'right' === closePosition
													? 'Left'
													: 'Right'
											} Offset` }
											attributeName="closeBtnSide"
											attributeValue={ closeBtnSide }
											setAttributes={ setAttributes }
											hasUnit={ false }
											step={ 1 }
											min={ -1000 }
											max={ 1000 }
											isInline={ false }
											isResponsive={ false }
										/>

										<ABlocksRangeControl
											label={ __(
												'Top Offset',
												'ablocks'
											) }
											attributeName="closeBtnTop"
											attributeValue={ closeBtnTop }
											setAttributes={ setAttributes }
											hasUnit={ false }
											step={ 1 }
											min={ -1000 }
											max={ 1000 }
											isInline={ false }
											isResponsive={ false }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __(
												'Background Color',
												'ablocks'
											) }
											attributeName="closeBtnBackgroundColor"
											attributeValue={
												closeBtnBackgroundColor
											}
											setAttributes={ setAttributes }
										/>

										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="closeBtnColor"
											attributeValue={ closeBtnColor }
											setAttributes={ setAttributes }
										/>
									</>
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
