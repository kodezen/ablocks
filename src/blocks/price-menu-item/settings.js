import React from 'react';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import { HTMLTagLists } from '@Controls/select/helper';
import ABlocksSelectControl from '@Controls/select';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksTextControl from '@Controls/text';
import ABlocksRangeControl from '@Controls/range';

//colors
import ABlocksColorControl from '@Controls/color';
const propTypes = {};

import { dividerPatternUrlOptions } from './data';

export const iconTypeOption = [
	{ value: 'default', label: 'Default' },
	{ value: 'stacked', label: 'Stacked' },
	{ value: 'framed', label: 'Framed' },
];

import {
	width as widthDefaultValueAttribute,
	weight as weightDefaultValueAttribute,
	size as sizeDefaultValueAttribute,
} from './attributes';
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		device,
		itemsDirection,
		allowIcon,
		allowDescription,
		allowDivider,
		title,
		titleTag,
		titleColor,
		titleTypography,
		titleTextShadow,
		titleTextStroke,
		description,
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
		size,
		price,
		placePrice,
		priceTag,
		priceColor,
		priceTypography,
		priceTextShadow,
		priceTextStroke,
	} = attributes;

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
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Explore Price Menu Options',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Access the price menu settings to customize its styles effortlessly.',
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
						'https://ablocks.pro/docs/ablocks-price-menu-block/'
					}
				>
					{ /* icon */ }
					{ allowIcon && (
						<>
							<ABlocksPanelBody
								title={ __( 'Icon', 'ablocks' ) }
								initialOpen={ true }
							>
								<ContentStyleTabs
									content={
										<>
											<ABlocksIconUploader
												label={ __(
													'Icon',
													'ablocks'
												) }
												attributes={ attributes }
												setAttributes={ setAttributes }
											/>
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
						</>
					) }
					{ /* icon */ }
					<ABlocksPanelBody
						title={ __( 'Title', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextareaControl
										label={ __( 'Title', 'ablocks' ) }
										attributeName="title"
										attributeValue={ title }
										setAttributes={ setAttributes }
										placeholder={ __( 'Enter your title' ) }
									/>
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
					{ allowDescription && (
						<>
							<ABlocksPanelBody
								title={ __( 'Description', 'ablocks' ) }
								initialOpen={ false }
							>
								<ContentStyleTabs
									content={
										<>
											<ABlocksTextareaControl
												label={ __(
													'Description',
													'ablocks'
												) }
												attributeName="description"
												attributeValue={ description }
												setAttributes={ setAttributes }
												placeholder={ __(
													'Enter your description'
												) }
											/>
											<ABlocksSelectControl
												label={ __(
													'HTML Tag',
													'ablocks'
												) }
												options={ HTMLTagLists }
												isSearch={ true }
												attributeName="descriptionTag"
												attributeValue={
													descriptionTag
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
									style={
										<>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="descriptionColor"
												attributeValue={
													descriptionColor
												}
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
						</>
					) }

					{ /*  */ }
					{ allowDivider ? (
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

										{ itemsDirection[ 'value' + device ] ===
										'row' ? (
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
														label: 'under title',
														type: 'css-style',
														value: 'under title',
													},
												] }
												attributeName="placeDivider"
												attributeValue={ placeDivider }
												setAttributes={ setAttributes }
											/>
										) : null }

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
						title={ __( 'Price', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextControl
										label={ __( 'Price', 'ablocks' ) }
										attributeName="price"
										attributeValue={ price }
										setAttributes={ setAttributes }
										placeholder={ __( 'Enter your price' ) }
									/>
									{ itemsDirection[ 'value' + device ] ===
									'row' ? (
										<ABlocksSelectControl
											label={ __(
												'Place price',
												'ablocks'
											) }
											options={ [
												{
													label: 'right',
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
									) : null }
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
