import React from 'react';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksButtonGroupControl from '@Controls/group-button';
import ABlocksRangeControl from '@Controls/range';
import { HTMLTagLists } from '@Controls/select/helper';
import ABlocksSelectControl from '@Controls/select';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ControlLabel from '@Components/control-label';
import ABlocksBorderControl from '@Controls/border';

//colors
import ABlocksColorControl from '@Controls/color';
import ABlocksAlignmentControl from '@Controls/alignment';

import './style.css';
const propTypes = {};

import { dividerPatternUrlOptions } from './data';

import {
	columnGap as columnGapDefaultAttributeValue,
	width as widthDefaultValueAttribute,
	weight as weightDefaultValueAttribute,
	size as sizeDefaultValueAttribute,
	gap as gapDefaultValueAttribute,
} from './attributes';

const directions = [
	{
		label: 'row',
		value: 'row',
	},
	{
		label: 'column',
		value: 'column',
	},
];

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		device,
		alignment,
		columnGap,
		itemsDirection,
		allowDescription,
		allowIcon,
		allowDivider,
		itemPadding,
		itemBackground,
		itemBackgroundH,
		transition,
		itemBorder,
		titleTag,
		titleColor,
		titleTypography,
		titleTextShadow,
		titleTextStroke,
		descriptionTag,
		descriptionColor,
		descriptionTypography,
		descriptionTextShadow,
		descriptionTextStroke,
		placeDivider,
		dividerPatternUrl,
		color,
		weight,
		width,
		gap,
		size,
		placePrice,
		priceTag,
		priceColor,
		priceTypography,
		priceTextShadow,
		priceTextStroke,
	} = attributes;
	const {} = attributes;

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

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-price-menu-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Price menu', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __( 'Column gap', 'ablocks' ) }
										min={ 0 }
										max={ 100 }
										hasUnit={ true }
										isInline={ false }
										isResponsive={ true }
										attributeName="columnGap"
										attributeValue={ columnGap }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										attributeDefaultValue={
											columnGapDefaultAttributeValue
										}
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'rem', label: 'rem' },
											{ value: 'em', label: 'em' },
										] }
									/>

									<ABlocksButtonGroupControl
										label={ __(
											'Items Direction',
											'ablocks'
										) }
										options={ directions }
										attributeName="itemsDirection"
										attributeValue={ itemsDirection }
										setAttributes={ setAttributes }
									/>

									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										options={ [
											{
												label: __(
													'Flex Start',
													'ablocks'
												),
												value: 'flex-start',
												icon: 'left',
											},
											{
												label: __(
													'Center',
													'ablocks'
												),
												value: 'center',
												icon: 'center',
											},
											{
												label: __(
													'Flex End',
													'ablocks'
												),
												value: 'flex-end',
												icon: 'right',
											},
										] }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
									/>

									<ABlocksRangeControl
										label={ __(
											'Gap around elements',
											'ablocks'
										) }
										isResponsive={ true }
										attributeName="gap"
										attributeObjectKey="value"
										attributeValue={ gap }
										setAttributes={ setAttributes }
										isInline={ false }
										min={ 1 }
										max={ 30 }
										step={ 1 }
										attributeDefaultValue={
											gapDefaultValueAttribute
										}
									/>
									<Separator />
									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow icon"
										attributeValue={ allowIcon }
										setAttributes={ setAttributes }
										attributeName="allowIcon"
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow description"
										attributeValue={ allowDescription }
										setAttributes={ setAttributes }
										attributeName="allowDescription"
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow divider"
										attributeValue={ allowDivider }
										setAttributes={ setAttributes }
										attributeName="allowDivider"
									/>
									<ABlocksSelectControl
										label={ __(
											'Place divider',
											'ablocks'
										) }
										options={ [
											{
												label: 'near title',
												type: 'css-style',
												value: 'near title',
											},
											{
												label: `under price`,
												type: 'css-style',
												value: 'under title',
											},
											{
												label: 'under description',
												type: 'css-style',
												value: 'under des',
											},
										] }
										attributeName="placeDivider"
										attributeValue={ placeDivider }
										setAttributes={ setAttributes }
									/>
									<ABlocksSelectControl
										label={ __( 'Place price', 'ablocks' ) }
										options={ [
											{
												label: 'base',
												type: 'css-style',
												value: 'right',
											},
											{
												label: 'bottom',
												type: 'css-style',
												value: 'bottom',
											},
										] }
										attributeName="placePrice"
										attributeValue={ placePrice }
										setAttributes={ setAttributes }
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
														'Background Color',
														'ablocks'
													) }
													attributeName="itemBackground"
													attributeValue={
														itemBackground
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
														'Background Color',
														'ablocks'
													) }
													attributeName="itemBackgroundH"
													attributeValue={
														itemBackgroundH
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Transition Duration',
														'ablocks'
													) }
													min={ 0 }
													max={ 5 }
													step={ 0.01 }
													hasUnit={ false }
													isInline={ false }
													isResponsive={ false }
													attributeValue={
														transition || 0
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
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="itemPadding"
										attributeValue={ itemPadding }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ControlLabel
										label="Border"
										isResponsive={ false }
									/>
									<ABlocksBorderControl
										attributeName="itemBorder"
										attributeValue={ itemBorder }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Titles', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'HTML Tag', 'ablocks' ) }
										options={ HTMLTagLists }
										isSearch={ true }
										attributeName="titleTag"
										attributeValue={ titleTag }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="titleColor"
										attributeValue={ titleColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="titleTypography"
										attributeValue={ titleTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="titleTextShadow"
										attributeValue={ titleTextShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksTextStroke
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeName="titleTextStroke"
										attributeValue={ titleTextStroke }
										setAttributes={ setAttributes }
										isResponsive={ true }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					{ allowDescription ? (
						<ABlocksPanelBody
							title={ __( 'Descriptions', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksSelectControl
											label={ __(
												'HTML Tag',
												'ablocks'
											) }
											options={ HTMLTagLists }
											isSearch={ true }
											attributeName="descriptionTag"
											attributeValue={ descriptionTag }
											setAttributes={ setAttributes }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="descriptionColor"
											attributeValue={ descriptionColor }
											setAttributes={ setAttributes }
										/>

										<ABlocksTypography
											label={ __(
												'Typography',
												'ablocks'
											) }
											attributeName="descriptionTypography"
											attributeValue={
												descriptionTypography
											}
											setAttributes={ setAttributes }
											isResponsive={ true }
											attributes={ attributes }
										/>
										<ABlocksTextShadow
											label={ __(
												'Text Shadow',
												'ablocks'
											) }
											attributeName="descriptionTextShadow"
											attributeValue={
												descriptionTextShadow
											}
											setAttributes={ setAttributes }
											isResponsive={ false }
										/>
										<ABlocksTextStroke
											label={ __(
												'Text Stroke',
												'ablocks'
											) }
											attributeName="descriptionTextStroke"
											attributeValue={
												descriptionTextStroke
											}
											setAttributes={ setAttributes }
											isResponsive={ true }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) : null }

					{ /*  */ }
					{ allowDivider ? (
						<ABlocksPanelBody
							title={ __( 'Dividers', 'ablocks' ) }
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
											max={
												allowDescription ||
												( device === 'Mobile' &&
													allowDescription === false )
													? 100
													: 500
											}
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
					<ABlocksPanelBody
						title={ __( 'Prices', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'HTML Tag', 'ablocks' ) }
										options={ HTMLTagLists }
										isSearch={ true }
										attributeName="priceTag"
										attributeValue={ priceTag }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="priceColor"
										attributeValue={ priceColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="priceTypography"
										attributeValue={ priceTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="priceTextShadow"
										attributeValue={ priceTextShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksTextStroke
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeName="priceTextStroke"
										attributeValue={ priceTextStroke }
										setAttributes={ setAttributes }
										isResponsive={ true }
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
