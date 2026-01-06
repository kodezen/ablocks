import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import SelectParentBlockButton from '@Components/select-parent-block';
import ABlocksPanelBody from '@Components/panel-body';
import { HTMLTagLists } from '@Controls/select/helper';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import ABlocksTextControl from '@Controls/text';
import InspectorTabs from '@Components/inspector-tabs';
import Separator from '@Components/separator';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksRangeControl from '@Controls/range';
import GetDeviceType from '@Utils/get-device-type';

// colors
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
const propTypes = {};

import { dividerPatternUrlOptions } from './data';
import {
	width as widthDefaultValueAttribute,
	weight as weightDefaultValueAttribute,
	size as sizeDefaultValueAttribute,
	shapeSize as shapeSizeDefaultValueAttribute,
} from './attributes';

export const markerTypeOptions = [
	{
		label: 'None',
		value: 'none',
	},
	{
		label: 'Icon',
		value: 'Icon',
	},
	{
		label: 'Shapes',
		value: 'Shapes',
	},
	{
		label: 'Emoji',
		value: 'Emoji',
	},
];
export const shapeTypeOptions = [
	{
		label: 'None',
		value: 'none',
	},
	{
		label: 'Square',
		value: 'solid',
	},
	{
		label: 'Circle',
		value: 'dotted',
	},
	{
		label: 'Double',
		value: 'double',
	},
	{
		label: 'Ridge',
		value: 'ridge',
	},
	{
		label: 'Inset',
		value: 'inset',
	},
	{
		label: 'Outset',
		value: 'outset',
	},
];

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		markerType,
		shapeType,
		shapeColor,
		shapeSize,
		listsDirection,
		allowDivider,
		isLastChild,
		emoji,
		iconAlignment,
		advanceListItemTextSize,
		listTextShadow,
		listTypography,
		textColor,
		advanceListItemText,
		advanceListItemTextTag,
		listTextStroke,
		dropCaps,
		dropCapsTextColor,
		dividerPatternUrl,
		color,
		weight,
		width,
		size,
	} = attributes;
	const deviceType = GetDeviceType();

	const dividerFind = dividerPatternUrlOptions?.find(
		( divider ) => divider.value === dividerPatternUrl
	);
	const optionalStyleControlsRender = dividerFind?.optionalStyleControls?.map(
		( control, index ) => {
			if ( control === 'size' ) {
				return (
					<React.Fragment key={ index }>
						<ABlocksRangeControl
							label={ __( 'Size', 'ablocks' ) }
							attributeName="size"
							attributeObjectKey="value"
							attributeValue={ size }
							setAttributes={ setAttributes }
							isInline={ false }
							min={ 1 }
							max={ 100 }
							step={ 1 }
							isResponsive={ false }
							attributeDefaultValue={ sizeDefaultValueAttribute }
						/>
					</React.Fragment>
				);
			} else if ( control === 'weight' ) {
				return (
					<React.Fragment key={ index }>
						<ABlocksRangeControl
							setAttributes={ setAttributes }
							label={ __( 'Weight', 'ablocks' ) }
							attributeName="weight"
							attributeValue={ weight }
							isInline={ false }
							min={ 1 }
							max={ 10 }
							step={ 1 }
							isResponsive={ false }
							attributeDefaultValue={
								weightDefaultValueAttribute
							}
						/>
					</React.Fragment>
				);
			}

			return null;
		}
	);

	const renderSettings = () => {
		if ( markerType === 'Icon' ) {
			return (
				<ABlocksPanelBody
					title={ __( 'Icon', 'ablocks' ) }
					initialOpen={ true }
				>
					<ContentStyleTabs
						content={
							<>
								<ABlocksIconUploader
									label={ __( 'Icon', 'ablocks' ) }
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
								{ markerType !== 'none' && (
									<ABlocksAlignmentControl
										label={ sprintf(
											// translators: %s marker type
											__( `%s Position`, 'ablocks' ),
											markerType
										) }
										isResponsive={ true }
										options={ [
											{
												label: 'left',
												value: 'row',
												icon: 'left',
											},
											{
												label: 'right',
												value: 'row-reverse',
												icon: 'right',
											},
										] }
										setAttributes={ setAttributes }
										attributeValue={ iconAlignment }
										attributeName="iconAlignment"
										isInline={ false }
									/>
								) }
							</>
						}
						style={
							<ABlocksIconStyleSettings
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						}
					/>
				</ABlocksPanelBody>
			);
		} else if ( markerType === 'Emoji' ) {
			return (
				<ABlocksPanelBody
					title={ __( 'Emoji', 'ablocks' ) }
					initialOpen={ true }
				>
					<ContentStyleTabs
						content={
							<>
								{ markerType === 'Emoji' && (
									<ABlocksTextControl
										label={ __( 'Emoji', 'ablocks' ) }
										attributeName="emoji"
										attributeValue={ emoji }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
								) }
								{ markerType !== 'none' && (
									<ABlocksAlignmentControl
										label={ sprintf(
											// translators: %s marker type
											__( `%s Position`, 'ablocks' ),
											markerType
										) }
										isResponsive={ true }
										options={ [
											{
												label: 'left',
												value: 'row',
												icon: 'left',
											},
											{
												label: 'right',
												value: 'row-reverse',
												icon: 'right',
											},
										] }
										setAttributes={ setAttributes }
										attributeValue={ iconAlignment }
										attributeName="iconAlignment"
										isInline={ false }
									/>
								) }
							</>
						}
						style={
							<>
								<ABlocksRangeControl
									label={ __( 'Size', 'ablocks' ) }
									attributeName="shapeSize"
									attributeObjectKey="value"
									attributeValue={ shapeSize }
									setAttributes={ setAttributes }
									isInline={ false }
									min={ 1 }
									max={ 100 }
									step={ 1 }
									isResponsive={ true }
									attributeDefaultValue={
										shapeSizeDefaultValueAttribute
									}
								/>
							</>
						}
					/>
				</ABlocksPanelBody>
			);
		} else if ( markerType === 'none' ) {
		} else {
			return (
				<ABlocksPanelBody title={ markerType } initialOpen={ true }>
					<ContentStyleTabs
						content={
							<>
								<ABlocksSelectControl
									label={ __( 'Select Shape', 'ablocks' ) }
									options={ shapeTypeOptions }
									attributeName="shapeType"
									attributeValue={ shapeType }
									setAttributes={ setAttributes }
								/>
								{ markerType !== 'none' && (
									<ABlocksAlignmentControl
										label={ sprintf(
											// translators: %s marker type
											__( `%s Position`, 'ablocks' ),
											markerType
										) }
										isResponsive={ true }
										options={ [
											{
												label: 'left',
												value: 'row',
												icon: 'left',
											},
											{
												label: 'right',
												value: 'row-reverse',
												icon: 'right',
											},
										] }
										setAttributes={ setAttributes }
										attributeValue={ iconAlignment }
										attributeName="iconAlignment"
										isInline={ false }
									/>
								) }
							</>
						}
						style={
							<>
								<ABlocksColorControl
									label={ __( 'Color', 'ablocks' ) }
									attributeName="shapeColor"
									attributeValue={ shapeColor }
									setAttributes={ setAttributes }
								/>
								<ABlocksRangeControl
									label={ __( 'Size', 'ablocks' ) }
									attributeName="shapeSize"
									attributeObjectKey="value"
									attributeValue={ shapeSize }
									setAttributes={ setAttributes }
									isInline={ false }
									min={ 1 }
									max={ 100 }
									step={ 1 }
									isResponsive={ true }
									attributeDefaultValue={
										shapeSizeDefaultValueAttribute
									}
								/>
							</>
						}
					/>
				</ABlocksPanelBody>
			);
		}
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Explore Advance list Options',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Access the advance list settings to customize its styles effortlessly.',
									'ablocks'
								) }
							</span>
						</div>
						<SelectParentBlockButton clientId={ props?.clientId } />
					</div>
				</ABlocksPanelBody>
				<Separator />
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-advance-lists-block/'
					}
				>
					{ renderSettings() }

					<ABlocksPanelBody
						title={ __( 'Title', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextareaControl
										attributeName="advanceListItemText"
										attributeValue={ advanceListItemText }
										setAttributes={ setAttributes }
										placeholder={ __( 'Enter your title' ) }
									/>
									<ABlocksSelectControl
										label={ __( 'HTML Tag', 'ablocks' ) }
										options={ HTMLTagLists }
										isSearch={ true }
										attributeName="advanceListItemTextTag"
										attributeValue={
											advanceListItemTextTag
										}
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ABlocksSelectControl
										label={ __( 'Sizes', 'ablocks' ) }
										isResponsive={ false }
										options={ [
											{ label: 'Small', value: 'sm' },
											{ label: 'Medium', value: 'md' },
											{ label: 'Large', value: 'lg' },
											{
												label: 'Extra Large',
												value: 'xl',
											},
										] }
										attributeValue={
											advanceListItemTextSize || 'md'
										}
										attributeName="advanceListItemTextSize"
										setAttributes={ setAttributes }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Drop caps"
										attributeValue={ attributes.dropCaps }
										setAttributes={ setAttributes }
										attributeName="dropCaps"
									/>

									{ dropCaps && (
										<>
											<Separator />
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="dropCapsTextColor"
												attributeValue={
													dropCapsTextColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="textColor"
										attributeValue={ textColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="listTypography"
										attributeValue={ listTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="listTextShadow"
										attributeValue={ listTextShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksTextStroke
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeName="listTextStroke"
										attributeValue={ listTextStroke }
										setAttributes={ setAttributes }
										isResponsive={ true }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					{ /*  */ }
					{ allowDivider &&
					! isLastChild &&
					listsDirection[ 'value' + deviceType ] === 'column' ? (
						<ABlocksPanelBody
							title={ __( 'Divider', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksSelectControl
											label={ __( 'Style', 'ablocks' ) }
											options={ dividerPatternUrlOptions }
											attributeName="dividerPatternUrl"
											attributeValue={ dividerPatternUrl }
											onChangeHandler={ ( value ) => {
												const matchDivider =
													dividerPatternUrlOptions?.find(
														( divider ) =>
															divider.value ===
															value
													);
												setAttributes( {
													dividerPatternUrl:
														matchDivider.value,
													dividerType:
														matchDivider.type,
												} );
											} }
										/>

										<ABlocksRangeControl
											label={ __( 'Width', 'ablocks' ) }
											attributeName="width"
											attributeObjectKey="value"
											attributeValue={ width }
											setAttributes={ setAttributes }
											hasUnit={ false }
											step={ 1 }
											min={ 1 }
											max={ 100 }
											isInline={ false }
											attributeDefaultValue={
												widthDefaultValueAttribute
											}
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="color"
											attributeValue={ color }
											setAttributes={ setAttributes }
										/>
										<Separator />
										{ optionalStyleControlsRender }
									</>
								}
							/>
						</ABlocksPanelBody>
					) : null }
					{ /*  */ }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
