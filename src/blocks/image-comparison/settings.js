import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ContentStyleTabs from '@Components/content-style-tabs';
import ControlLabel from '@Components/control-label';

import ABlocksTextControl from '@Controls/text';
import ABlocksRangeControl from '@Controls/range';
import ABlockSelectControl from '@Controls/select';
import ABlocksColorControl from '@Controls/color';
import ABlocksBorderControl from '@Controls/border';
import ABlocksToggleControl from '@Controls/toggleButton';

import {
	labelHorizontalPositionOptions,
	labelVerticalPositionOptions,
	sliderOrientationOptions,
} from './helper';

import {
	sliderBarSize as sliderBarSizeDefaultValueAttribute,
	sliderIconSize as sliderIconSizeDefaultValueAttribute,
	sliderIconBorderSize as sliderIconBorderSizeDefaultValueAttribute,
} from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		sliderPosition,
		sliderOrientation,
		showLabels,
		beforeImageLabel,
		afterImageLabel,
		swapImages,
		showHandle,
		moveOnHover,
		labelPosition,
		labelBgColor,
		labelTextColor,
		labelWithOverlay,
		labelOnHover,
		sliderBarSize,
		sliderIconSize,
		sliderIconBorderSize,
		handleColor,
		labelBorder,
		labelOverlayColor,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/add-and-customize-image-comparison/'
					}
				>
					{ /* settings */ }
					<ABlocksPanelBody
						title={ __( 'Settings', 'academy-blocks' ) }
						initialOpen={ true }
					>
						<ABlockSelectControl
							label={ __( 'Orientation', 'ablocks' ) }
							isResponsive={ false }
							options={ sliderOrientationOptions }
							attributeName="sliderOrientation"
							attributeValue={ sliderOrientation }
							setAttributes={ setAttributes }
						/>

						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Swap Imgaes', 'ablocks' ) }
							attributeValue={ swapImages }
							setAttributes={ setAttributes }
							attributeName="swapImages"
						/>

						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Move on Hover', 'ablocks' ) }
							attributeValue={ moveOnHover }
							setAttributes={ setAttributes }
							attributeName="moveOnHover"
						/>

						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Show Handle', 'ablocks' ) }
							attributeValue={ showHandle }
							setAttributes={ setAttributes }
							attributeName="showHandle"
						/>

						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Show Labels', 'ablocks' ) }
							attributeValue={ showLabels }
							setAttributes={ setAttributes }
							attributeName="showLabels"
						/>

						<ABlocksRangeControl
							label={ __( 'Slider Position', 'ablocks' ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
							isInline={ false }
							isResponsive={ false }
							attributeName="sliderPosition"
							attributeValue={ sliderPosition }
							setAttributes={ setAttributes }
						/>

						<br />
					</ABlocksPanelBody>

					{ /* Label */ }
					{ showLabels && (
						<ABlocksPanelBody
							title={ __( 'Label', 'academy-blocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksTextControl
											label={ __(
												'Before Image Label',
												'ablocks'
											) }
											attributeName="beforeImageLabel"
											attributeValue={ beforeImageLabel }
											setAttributes={ setAttributes }
										/>

										<ABlocksTextControl
											label={ __(
												'After Image Label',
												'ablocks'
											) }
											attributeName="afterImageLabel"
											attributeValue={ afterImageLabel }
											setAttributes={ setAttributes }
										/>

										<ABlockSelectControl
											label={ __(
												'Label position',
												'ablocks'
											) }
											isResponsive={ false }
											options={
												sliderOrientation ===
												'horizontal'
													? labelHorizontalPositionOptions
													: labelVerticalPositionOptions
											}
											attributeName="labelPosition"
											attributeValue={ labelPosition }
											setAttributes={ setAttributes }
										/>

										<ABlocksToggleControl
											isResponsive={ false }
											label={ __(
												'Show only on Hover',
												'ablocks'
											) }
											attributeValue={ labelOnHover }
											setAttributes={ setAttributes }
											attributeName="labelOnHover"
										/>

										<ABlocksToggleControl
											isResponsive={ false }
											label={ __(
												'Label with Overlay',
												'ablocks'
											) }
											attributeValue={ labelWithOverlay }
											setAttributes={ setAttributes }
											attributeName="labelWithOverlay"
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __(
												'Text Color',
												'ablocks'
											) }
											attributeName="labelTextColor"
											attributeValue={ labelTextColor }
											setAttributes={ setAttributes }
										/>

										<ABlocksColorControl
											label={ __(
												'Background Color',
												'ablocks'
											) }
											attributeName="labelBgColor"
											attributeValue={ labelBgColor }
											setAttributes={ setAttributes }
										/>

										<ABlocksColorControl
											label={ __(
												'Overlay Color',
												'ablocks'
											) }
											attributeName="labelOverlayColor"
											attributeValue={ labelOverlayColor }
											setAttributes={ setAttributes }
										/>

										<ControlLabel
											label="Label Border Options:"
											isResponsive={ false }
											isHeader={ true }
										/>

										<ABlocksBorderControl
											attributeName="labelBorder"
											attributeValue={ labelBorder }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }

					<>
						{ /* Handle */ }
						<ABlocksPanelBody
							title={ __( 'Handle', 'academy-blocks' ) }
							initialOpen={ false }
						>
							<ABlocksColorControl
								label={ __( 'Handle Color', 'ablocks' ) }
								attributeName="handleColor"
								attributeValue={ handleColor }
								setAttributes={ setAttributes }
							/>

							<ABlocksRangeControl
								label={ __( 'Slider Bar Size', 'ablocks' ) }
								min={ 1 }
								max={ 50 }
								step={ 1 }
								isInline={ false }
								isResponsive={ true }
								attributeName="sliderBarSize"
								attributeValue={ sliderBarSize }
								setAttributes={ setAttributes }
								attributeDefaultValue={
									sliderBarSizeDefaultValueAttribute
								}
							/>

							{ showHandle && (
								<ABlocksRangeControl
									label={ __(
										'Slider Icon Size',
										'ablocks'
									) }
									min={ 10 }
									max={ 500 }
									step={ 5 }
									isInline={ false }
									isResponsive={ true }
									attributeName="sliderIconSize"
									attributeValue={ sliderIconSize }
									setAttributes={ setAttributes }
									attributeDefaultValue={
										sliderIconSizeDefaultValueAttribute
									}
								/>
							) }

							{ showHandle && (
								<ABlocksRangeControl
									label={ __(
										'Slider Icon Border Size',
										'ablocks'
									) }
									min={ 0 }
									max={ 50 }
									step={ 1 }
									isInline={ false }
									isResponsive={ true }
									attributeName="sliderIconBorderSize"
									attributeValue={ sliderIconBorderSize }
									setAttributes={ setAttributes }
									attributeDefaultValue={
										sliderIconBorderSizeDefaultValueAttribute
									}
								/>
							) }
						</ABlocksPanelBody>
					</>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
