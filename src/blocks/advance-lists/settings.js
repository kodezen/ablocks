import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { HTMLTagLists } from '@Controls/select/helper';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextControl from '@Controls/text';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksButtonGroupControl from '@Controls/group-button';
import ABlocksRangeControl from '@Controls/range';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksToggleControl from '@Controls/toggleButton';
import { getResponsiveValue } from '@Utils/helper';
import GetDeviceType from '@Utils/get-device-type';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useDispatch, select } from '@wordpress/data';

// colors
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
const propTypes = {};

import {
	columnGap as columnGapDefaultAttributeValue,
	innerGap as innerGapDefaultAttributeValue,
	width as widthDefaultValueAttribute,
	weight as weightDefaultValueAttribute,
	size as sizeDefaultValueAttribute,
	shapeSize as shapeSizeDefaultValueAttribute,
} from './attributes';
import { dividerPatternUrlOptions } from './data';

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

const getMaxValueSpaceForUnit = ( unit ) => {
	switch ( unit ) {
		case 'px':
			return 100;
		case 'em':
		case 'rem':
			return 10;
		default:
			return 100;
	}
};

export default function Settings( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		block_id,
		listsDirection,
		emoji,
		shapeType,
		shapeColor,
		shapeSize,
		markerType,
		iconAlignment,
		columnGap,
		innerGap,
		alignment,
		advanceListItemTextSize,
		listTextShadow,
		listTypography,
		textColor,
		advanceListItemTextTag,
		listTextStroke,
		dropCaps,
		dropCapsTextColor,
		allowDivider,
		dividerType,
		dividerPatternUrl,
		color,
		weight,
		width,
		size,
	} = attributes;
	const validateAttributes = ( changedAttributes, attObj ) => {
		const storedAttributes = [
			'iconAlignment',
			'emoji',
			'shapeType',
			'shapeColor',
			'shapeSize',
		];
		storedAttributes.forEach( ( item ) => {
			if ( changedAttributes.includes( item ) === false ) {
				attObj[ item ] = attributes[ item ];
			}
		} );
		return attObj;
	};
	// Use dispatch to update child block attributes
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	// A function to change the first child's attribute
	const changeChildAttribute = () => {
		const childBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		if ( childBlocks.length > 0 ) {
			// Loop through the child blocks and access their attributes
			childBlocks.forEach( ( childBlock ) => {
				let attObj = {
					markerType,
					allowDivider,
					alignment,
					listsDirection,
					innerGap,
					advanceListItemTextSize,
					textColor,
					advanceListItemTextTag,
					dropCaps,
					dropCapsTextColor,
					dividerType,
				};
				attObj = validateAttributes(
					childBlock.attributes.changedAttributes,
					attObj
				);
				const childBlockId = childBlock.clientId;
				updateBlockAttributes( childBlockId, attObj );
			} );
		}
	};
	const handleNewMenuItem = () => {
		const childBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		const newList = createBlock( 'ablocks/advance-list-item' );
		dispatch( 'core/block-editor' ).insertBlock(
			newList,
			childBlocks.length,
			block_id
		);
		changeChildAttribute();
	};
	const deviceType = GetDeviceType();
	const innerGapUnit = getResponsiveValue(
		innerGap,
		'valueUnit',
		deviceType
	);
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
		if ( markerType === 'Emoji' ) {
			return (
				<ABlocksPanelBody
					title={ __( 'Emoji', 'ablocks' ) }
					initialOpen={ false }
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
		} else if ( markerType === 'Shapes' ) {
			return (
				<ABlocksPanelBody title={ markerType } initialOpen={ false }>
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
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-advance-lists-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Advance lists', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksButtonGroupControl
							label={ __( 'Layout', 'ablocks' ) }
							options={ [
								{
									label: 'Vertical',
									value: 'row',
								},
								{
									label: 'Horizontal',
									value: 'column',
								},
							] }
							isResponsive={ true }
							attributeName="listsDirection"
							attributeValue={ listsDirection }
							setAttributes={ setAttributes }
						/>
						<ABlocksAlignmentControl
							label={ __( 'Alignment', 'ablocks' ) }
							options={ [
								{
									label: 'flex-start',
									value: 'start',
									icon: 'left',
								},
								{
									label: 'center',
									value: 'center',
									icon: 'center',
								},
								{
									label: 'flex-end',
									value: 'end',
									icon: 'right',
								},
							] }
							attributeName="alignment"
							attributeValue={ alignment }
							setAttributes={ setAttributes }
							isInline={ false }
						/>
						<ABlocksSelectControl
							label={ __( 'Marker type', 'ablocks' ) }
							options={ markerTypeOptions }
							attributeName="markerType"
							attributeValue={ markerType }
							setAttributes={ setAttributes }
						/>
						{ listsDirection[ 'value' + deviceType ] ===
							'column' && (
							<ABlocksToggleControl
								isResponsive={ false }
								label="Allow divider"
								attributeValue={ allowDivider }
								setAttributes={ setAttributes }
								attributeName="allowDivider"
							/>
						) }
						<ABlocksRangeControl
							label={
								listsDirection[ 'value' + deviceType ] === 'row'
									? __( 'Column gap', 'ablocks' )
									: __( 'Row Gap', 'ablocks' )
							}
							min={ 0 }
							max={ 100 }
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
							isInline={ false }
							isResponsive={ true }
							attributeName="columnGap"
							attributeValue={ columnGap }
							setAttributes={ setAttributes }
							attributeObjectKey="value"
							attributeDefaultValue={
								columnGapDefaultAttributeValue
							}
						/>
						<ABlocksRangeControl
							label={ __( 'Inner Gap', 'ablocks' ) }
							min={ 0 }
							max={ getMaxValueSpaceForUnit( innerGapUnit ) }
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
							isInline={ false }
							isResponsive={ true }
							attributeName="innerGap"
							attributeValue={ innerGap }
							setAttributes={ setAttributes }
							attributeObjectKey="value"
							attributeDefaultValue={
								innerGapDefaultAttributeValue
							}
						/>
						<button
							className="ablocks-advance-list-add-button"
							onClick={ handleNewMenuItem }
						>
							<span className="ablocks-icon ablocks-icon--plus"></span>
							Create new item
						</button>
					</ABlocksPanelBody>
					{ renderSettings() }
					<ABlocksPanelBody
						title={ __( 'Title', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
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
					{ allowDivider &&
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
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
