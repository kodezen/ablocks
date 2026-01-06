import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import Separator from '@Components/separator';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksToggleControl from '@Controls/toggleButton';
import ControlLabel from '@Components/control-label';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
// colors
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
import { post_types } from '@Utils/helper';
const propTypes = {};

const positionOptions = [
	{
		label: __( 'Default', 'ablocks' ),
		value: 'default',
	},
	{
		label: __( 'Absolute', 'ablocks' ),
		value: 'absolute',
	},

	{
		label: __( 'Fixed', 'ablocks' ),
		value: 'fixed',
	},
];

export const horizontalOrientation = [
	{
		label: 'arrow-left-alt',
		value: 'left',
		icon: 'left',
	},
	{
		label: 'arrow-right-alt',
		value: 'right',
		icon: 'right',
	},
];

export const verticalOrientation = [
	{
		label: 'arrow-up-alt',
		value: 'top',
		icon: 'align-top',
	},
	{
		label: 'arrow-down-alt',
		value: 'bottom',
		icon: 'align-bottom',
	},
];

import {
	iconWidth as iconWidthDefaultAttributeValue,
	SearchBtnWidth as SearchBtnWidthDefaultAttributeValue,
	gap as gapDefaultAttributeValue,
	listWidth as listWidthDefaultAttributeValue,
	listGap as listGapDefaultAttributeValue,
	thumbnailWidth as thumbnailWidthDefaultAttributeValue,
	thumbnailHeight as thumbnailHeightDefaultAttributeValue,
	itemWidth as itemWidthDefaultAttributeValue,
	searchItemHeight as searchItemHeightDefaultAttributeValue,
	itemGap as itemGapDefaultAttributeValue,
	horizontalOffset as horizontalOffsetDefaultAttributeValue,
	verticalOffset as verticalOffsetDefaultAttributeValue,
} from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		source,
		gap,
		placeholder,
		isIcon,
		iconWidth,
		searchBtnWidth,
		listWidth,
		allowCollapse,
		variant,
		buttonText,
		buttonAlignment,
		buttonTextColor,
		buttonBgColor,
		buttonBgColorH,
		buttonTextShadow,
		buttonTextStroke,
		buttonTypography,
		buttonTextColorH,
		buttonTextShadowH,
		buttonTextStrokeH,
		buttonTypographyH,
		inputTextColor,
		inputBgColor,
		inputTextShadow,
		inputTextStroke,
		inputTypography,
		listPadding,
		searchResTColor,
		searchResTypography,
		loadingSpinnerColor,
		searchBoxBorder,
		listGap,
	} = attributes;
	const showControl =
		attributes.position === 'absolute' || attributes.position === 'fixed';

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-search-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Search', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksSelectControl
							label={ __( 'Variant', 'ablocks' ) }
							options={ [
								{
									label: __( 'Classic', 'ablocks' ),
									value: 'classic',
								},
								{
									label: __( 'Minimal', 'ablocks' ),
									value: 'minimal',
								},
							] }
							attributeName="variant"
							attributeValue={ variant }
							setAttributes={ setAttributes }
						/>
						{ variant === 'minimal' ? (
							<ABlocksAlignmentControl
								label={ __( 'Button Alignment', 'ablocks' ) }
								isInline={ true }
								options={ [
									{
										label: __( 'Left', 'ablocks' ),
										value: 'left',
										icon: 'left',
									},
									{
										label: __( 'Right', 'ablocks' ),
										value: 'right',
										icon: 'right',
									},
								] }
								attributeName="buttonAlignment"
								attributeValue={ buttonAlignment }
								setAttributes={ setAttributes }
							/>
						) : null }
						{ variant === 'classic' ? (
							<ABlocksRangeControl
								label={ __( 'Gap', 'ablocks' ) }
								min={ 0 }
								max={ 100 }
								hasUnit={ true }
								isInline={ false }
								isResponsive={ true }
								attributeName="gap"
								attributeValue={ gap }
								setAttributes={ setAttributes }
								attributeObjectKey="value"
								attributeDefaultValue={
									gapDefaultAttributeValue
								}
								unitOptions={ [
									{ value: 'px', label: 'px' },
									{ value: 'rem', label: 'rem' },
									{ value: 'em', label: 'em' },
								] }
								autoSyncRange={ true }
							/>
						) : null }
						<ABlocksSelectControl
							label={ __( 'Search source', 'ablocks' ) }
							options={ [
								{
									label: __( 'Any', 'ablocks' ),
									value: 'any',
								},
								...post_types,
							] }
							attributeName="source"
							attributeValue={ source }
							setAttributes={ setAttributes }
						/>
						<ABlocksToggleControl
							label={ __( 'Allow collapse', 'ablocks' ) }
							attributeName="allowCollapse"
							attributeValue={ allowCollapse }
							setAttributes={ setAttributes }
							isResponsive={ false }
						/>
						<ControlLabel
							label={ __( 'Search Box Border', 'ablocks' ) }
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							label={ __( 'Search Box Border', 'ablocks' ) }
							attributeName="searchBoxBorder"
							attributeValue={ searchBoxBorder }
							setAttributes={ setAttributes }
							isResponsive={ true }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Search Field', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextareaControl
										label={ __( 'Placeholder', 'ablocks' ) }
										attributeName="placeholder"
										attributeValue={ placeholder }
										setAttributes={ setAttributes }
										placeholder={ __(
											'Enter your placeholder'
										) }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="inputTextColor"
										attributeValue={ inputTextColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="inputBgColor"
										attributeValue={ inputBgColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="inputTypography"
										attributeValue={ inputTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="inputTextShadow"
										attributeValue={ inputTextShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksTextStroke
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeName="inputTextStroke"
										attributeValue={ inputTextStroke }
										setAttributes={ setAttributes }
										isResponsive={ true }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Search Button', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'Button type', 'ablocks' ) }
										options={ [
											{
												label: __( 'Text', 'ablocks' ),
												value: 'text',
											},
											{
												label: __( 'Icon', 'ablocks' ),
												value: 'icon',
											},
											{
												label: __( 'Both', 'ablocks' ),
												value: 'both',
											},
										] }
										attributeName="isIcon"
										attributeValue={ isIcon }
										setAttributes={ setAttributes }
									/>

									{ isIcon !== 'icon' ? (
										<ABlocksTextareaControl
											label={ __( 'Text', 'ablocks' ) }
											attributeName="buttonText"
											attributeValue={ buttonText }
											setAttributes={ setAttributes }
											placeholder={ __(
												'Enter your text'
											) }
										/>
									) : null }

									{ isIcon !== 'text' ? (
										<ABlocksRangeControl
											label={ __(
												'Icon size',
												'ablocks'
											) }
											min={ 16 }
											max={ 100 }
											hasUnit={ true }
											isInline={ false }
											isResponsive={ true }
											attributeName="iconWidth"
											attributeValue={ iconWidth }
											setAttributes={ setAttributes }
											attributeObjectKey="value"
											attributeDefaultValue={
												iconWidthDefaultAttributeValue
											}
											autoSyncRange={ true }
										/>
									) : null }
									<ABlocksRangeControl
										label={ __( 'Button Size', 'ablocks' ) }
										min={ 30 }
										max={ 500 }
										hasUnit={ true }
										isInline={ false }
										isResponsive={ true }
										attributeName="searchBtnWidth"
										attributeValue={ searchBtnWidth }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										attributeDefaultValue={
											SearchBtnWidthDefaultAttributeValue
										}
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
													attributeName="buttonTextColor"
													attributeValue={
														buttonTextColor
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
													attributeName="buttonBgColor"
													attributeValue={
														buttonBgColor
													}
													setAttributes={
														setAttributes
													}
												/>
												{ isIcon !== 'icon' && (
													<>
														<ABlocksTypography
															label={ __(
																'Typography',
																'ablocks'
															) }
															attributeName="buttonTypography"
															attributeValue={
																buttonTypography
															}
															setAttributes={
																setAttributes
															}
															isResponsive={
																true
															}
															attributes={
																attributes
															}
														/>
														<ABlocksTextShadow
															label={ __(
																'Text Shadow',
																'ablocks'
															) }
															attributeName="buttonTextShadow"
															attributeValue={
																buttonTextShadow
															}
															setAttributes={
																setAttributes
															}
															isResponsive={
																false
															}
														/>
														<ABlocksTextStroke
															label={ __(
																'Text Stroke',
																'ablocks'
															) }
															attributeName="buttonTextStroke"
															attributeValue={
																buttonTextStroke
															}
															setAttributes={
																setAttributes
															}
															isResponsive={
																true
															}
														/>
													</>
												) }
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeName="buttonTextColorH"
													attributeValue={
														buttonTextColorH
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
													attributeName="buttonBgColorH"
													attributeValue={
														buttonBgColorH
													}
													setAttributes={
														setAttributes
													}
												/>
												{ isIcon !== 'icon' && (
													<>
														<ABlocksTypography
															label={ __(
																'Typography',
																'ablocks'
															) }
															attributeName="buttonTypographyH"
															attributeValue={
																buttonTypographyH
															}
															setAttributes={
																setAttributes
															}
															isResponsive={
																true
															}
															attributes={
																attributes
															}
														/>
														<ABlocksTextShadow
															label={ __(
																'Text Shadow',
																'ablocks'
															) }
															attributeName="buttonTextShadowH"
															attributeValue={
																buttonTextShadowH
															}
															setAttributes={
																setAttributes
															}
															isResponsive={
																false
															}
														/>
														<ABlocksTextStroke
															label={ __(
																'Text Stroke',
																'ablocks'
															) }
															attributeName="buttonTextStrokeH"
															attributeValue={
																buttonTextStrokeH
															}
															setAttributes={
																setAttributes
															}
															isResponsive={
																true
															}
														/>
													</>
												) }
											</>
										}
									/>

									<Separator />
									<ControlLabel
										label="Loading Spinner"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="loadingSpinnerColor"
										attributeValue={ loadingSpinnerColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Search Result Container', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksSelectControl
							label={ __( 'Position', 'ablocks' ) }
							options={ positionOptions }
							attributeName="position"
							attributeValue={ attributes?.position }
							setAttributes={ setAttributes }
						/>
						{ showControl && (
							<>
								<ABlocksAlignmentControl
									label={ __( 'Horizontal', 'ablocks' ) }
									isInline={ true }
									options={ horizontalOrientation }
									isResponsive={ true }
									attributeName="horizontalAlignment"
									attributeValue={
										attributes?.horizontalAlignment
									}
									attributeObjectKey="horizontalAlignment"
									setAttributes={ setAttributes }
								/>
								<ABlocksRangeControl
									label={ __( 'Offset X', 'ablocks' ) }
									min={ 0 }
									max={ 500 }
									hasUnit={ true }
									isInline={ false }
									isResponsive={ true }
									attributeName="horizontalOffset"
									attributeValue={
										attributes?.horizontalOffset
									}
									setAttributes={ setAttributes }
									attributeObjectKey="value"
									attributeDefaultValue={
										horizontalOffsetDefaultAttributeValue
									}
									autoSyncRange={ true }
								/>
								<ABlocksAlignmentControl
									label={ __( 'Vertical', 'ablocks' ) }
									isInline={ true }
									isResponsive={ true }
									options={ verticalOrientation }
									attributeName="verticalAlignment"
									attributeValue={
										attributes?.verticalAlignment
									}
									attributeObjectKey="verticalAlignment"
									setAttributes={ setAttributes }
								/>
								<ABlocksRangeControl
									label={ __( 'Offset Y', 'ablocks' ) }
									min={ 0 }
									max={ 500 }
									hasUnit={ true }
									isInline={ false }
									isResponsive={ true }
									attributeName="verticalOffset"
									attributeValue={
										attributes?.verticalOffset
									}
									setAttributes={ setAttributes }
									attributeObjectKey="value"
									attributeDefaultValue={
										verticalOffsetDefaultAttributeValue
									}
									autoSyncRange={ true }
								/>
							</>
						) }
						<Separator />
						<ABlocksRangeControl
							label={ __( 'List width', 'ablocks' ) }
							min={ 10 }
							max={ 1000 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeName="listWidth"
							attributeValue={ listWidth }
							setAttributes={ setAttributes }
							attributeObjectKey="value"
							attributeDefaultValue={
								listWidthDefaultAttributeValue
							}
							autoSyncRange={ true }
						/>
						<ABlocksRangeControl
							label={ __( 'Gap', 'ablocks' ) }
							min={ 0 }
							max={ 100 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeName="listGap"
							attributeValue={ listGap }
							setAttributes={ setAttributes }
							attributeObjectKey="value"
							attributeDefaultValue={
								listGapDefaultAttributeValue
							}
							unitOptions={ [
								{ value: 'px', label: 'px' },
								{ value: 'rem', label: 'rem' },
								{ value: 'em', label: 'em' },
							] }
							autoSyncRange={ true }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="listPadding"
							attributeValue={ listPadding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="listBorder"
							attributeValue={ attributes?.listBorder }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Search Result Item', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksRangeControl
							label={ __( 'Item width', 'ablocks' ) }
							min={ 10 }
							max={ 400 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeName="itemWidth"
							attributeValue={ attributes?.itemWidth }
							setAttributes={ setAttributes }
							attributeObjectKey="value"
							attributeDefaultValue={
								itemWidthDefaultAttributeValue
							}
							autoSyncRange={ true }
						/>
						<ABlocksRangeControl
							label={ __( 'Item Height', 'ablocks' ) }
							min={ 10 }
							max={ 400 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeName="searchItemHeight"
							attributeValue={ attributes?.searchItemHeight }
							setAttributes={ setAttributes }
							attributeObjectKey="value"
							attributeDefaultValue={
								searchItemHeightDefaultAttributeValue
							}
							autoSyncRange={ true }
						/>
						<ABlocksRangeControl
							label={ __( 'Gap', 'ablocks' ) }
							min={ 0 }
							max={ 100 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeName="itemGap"
							attributeValue={ attributes?.itemGap }
							setAttributes={ setAttributes }
							attributeObjectKey="value"
							attributeDefaultValue={
								itemGapDefaultAttributeValue
							}
							unitOptions={ [
								{ value: 'px', label: 'px' },
								{ value: 'rem', label: 'rem' },
								{ value: 'em', label: 'em' },
							] }
							autoSyncRange={ true }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="itemPadding"
							attributeValue={ attributes?.itemPadding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="itemBorder"
							attributeValue={ attributes?.itemBorder }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Search Item Title"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="searchResTypography"
							attributeValue={ searchResTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							attributeName="searchResTColor"
							attributeValue={ searchResTColor }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
