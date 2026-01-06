import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksRangeControl from '@Controls/range';
import ABlocksSelectControl from '@Controls/select';
import ABlocksTextControl from '@Controls/text';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ABlocksColorGradient from '@Controls/color';
import ABlocksTypography from '@Controls/typography';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksButtonGroupControl from '@Components/button-group';
import GetDeviceType from '@Utils/get-device-type';

import {
	width as widthDefaultValueAttribute,
	weight as weightDefaultValueAttribute,
	size as sizeDefaultValueAttribute,
	gap as gapDefaultValueAttribute,
	elementTextSpacing as elementTextSpacingDefaultValueAttribute,
	elementIconSpacing as elementIconSpacingDefaultValue,
} from './attributes';

import { dividerPatternUrlOptions, dividerElementOptions } from './data';
const propTypes = {};

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
	const { attributes, setAttributes } = props;
	const {
		dividerPatternUrl,
		element,
		alignment,
		color,
		elementText,
		elementTextSpacing,
		elementTextColor,
		elementTextTypography,
		elementTextStroke,
		elementIconSpacing,
		elementIconPosition,
		elementTextPosition,
		weight,
		width,
		gap,
		size,
	} = attributes;
	const deviceType = GetDeviceType();
	const elementTextSpacingUnit =
		elementTextSpacing[ 'valueUnit' + deviceType ] || 'px';
	const elementIconSpacingUnit =
		elementIconSpacing[ 'valueUnit' + deviceType ] || 'px';

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
						<Separator />
					</React.Fragment>
				);
			} else if ( control === 'gap' ) {
				return (
					<React.Fragment key={ index }>
						<ABlocksRangeControl
							label={ __( 'Gap', 'ablocks' ) }
							attributeName="gap"
							attributeObjectKey="value"
							attributeValue={ gap }
							setAttributes={ setAttributes }
							isInline={ false }
							min={ 1 }
							max={ 50 }
							step={ 1 }
							attributeDefaultValue={ gapDefaultValueAttribute }
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

						<Separator />
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
						'https://ablocks.pro/docs/ablocks-divider-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Divider', 'ablocks' ) }
						initialOpen={ true }
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
														divider.value === value
												);
											setAttributes( {
												dividerPatternUrl:
													matchDivider.value,
												dividerType: matchDivider.type,
											} );
										} }
									/>

									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeName="width"
										attributeObjectKey="value"
										attributeValue={ width }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ true }
										attributeDataType="object"
										unitOptions={ [
											{
												value: 'px',
												label: 'px',
											},
											{
												value: '%',
												label: '%',
											},
											{
												value: 'em',
												label: 'em',
											},
											{
												value: 'rem',
												label: 'rem',
											},
											{
												value: 'vw',
												label: 'vw',
											},
										] }
										min={ 0 }
										max={
											[ 'vw', '%' ].includes(
												width[
													'valueUnit' + deviceType
												] ?? '%'
											)
												? 100
												: 1000
										}
										attributeDefaultValue={
											widthDefaultValueAttribute
										}
										autoSyncRange={ true }
									/>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
										isInline={ false }
										options={ [
											{
												label: 'left',
												value: 'left',
												icon: 'left',
											},
											{
												label: 'center',
												value: 'center',
												icon: 'center',
											},
											{
												label: 'right',
												value: 'right',
												icon: 'right',
											},
										] }
									/>

									<Separator />
									<ABlocksButtonGroupControl
										allowDeselect={ false }
										isResponsive={ false }
										label={ __( 'Add Element', 'ablocks' ) }
										options={ dividerElementOptions }
										attributeName="element"
										attributeValue={ attributes.element }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									{ optionalStyleControlsRender }
									<ABlocksColorGradient
										label={ __( 'Color', 'ablocks' ) }
										attributeName="color"
										attributeValue={ color }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					{ element === 'text' && (
						<ABlocksPanelBody
							title={ __( 'Divider Text', 'ablocks' ) }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksTextControl
											label={ __( 'Text', 'ablocks' ) }
											attributeName="elementText"
											attributeValue={ elementText }
											setAttributes={ setAttributes }
										/>
										<ABlocksAlignmentControl
											label={ __(
												'Position',
												'ablocks'
											) }
											isResponsive={ false }
											attributeName="elementTextPosition"
											attributeObjectKey="elementTextPosition"
											attributeValue={
												elementTextPosition
											}
											setAttributes={ setAttributes }
											isInline={ false }
											options={ [
												{
													label: 'left',
													value: 'left',
													icon: 'left',
												},
												{
													label: 'center',
													value: 'center',
													icon: 'center',
												},
												{
													label: 'right',
													value: 'right',
													icon: 'right',
												},
											] }
										/>
										<ABlocksRangeControl
											label={ __( 'Spacing', 'ablocks' ) }
											attributeName="elementTextSpacing"
											attributeObjectKey="value"
											attributeValue={
												elementTextSpacing
											}
											setAttributes={ setAttributes }
											isResponsive={ true }
											hasUnit={ true }
											step={ 1 }
											min={ 0 }
											max={ getMaxValueSpaceForUnit(
												elementTextSpacingUnit
											) }
											unitValue={ elementTextSpacing }
											unitOptions={ [
												{ value: 'px', label: 'px' },
												{ value: 'rem', label: 'rem' },
												{ value: 'em', label: 'em' },
											] }
											isInline={ false }
											attributeDefaultValue={
												elementTextSpacingDefaultValueAttribute
											}
											// autoSyncRange={true}
										/>
									</>
								}
								style={
									<>
										<ABlocksColorGradient
											label={ __( 'Color', 'ablocks' ) }
											attributeName="elementTextColor"
											attributeValue={ elementTextColor }
											setAttributes={ setAttributes }
										/>

										<ABlocksTypography
											label={ __(
												'Typography',
												'ablocks'
											) }
											attributeName="elementTextTypography"
											attributeValue={
												elementTextTypography
											}
											setAttributes={ setAttributes }
											isResponsive={ true }
											attributes={ attributes }
										/>

										<ABlocksTextStroke
											label={ __(
												'Text Stroke',
												'ablocks'
											) }
											attributeName="elementTextStroke"
											attributeValue={ elementTextStroke }
											setAttributes={ setAttributes }
											isResponsive={ true }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }
					{ element === 'icon' && (
						<ABlocksPanelBody
							title={ __( 'Divider Icon', 'ablocks' ) }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksIconUploader
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
										<ABlocksAlignmentControl
											label={ __(
												'Position',
												'ablocks'
											) }
											attributeName="elementIconPosition"
											attributeObjectKey="elementIconPosition"
											attributeValue={
												elementIconPosition
											}
											setAttributes={ setAttributes }
											isInline={ false }
											isResponsive={ false }
											options={ [
												{
													label: 'left',
													value: 'left',
													icon: 'left',
												},
												{
													label: 'center',
													value: 'center',
													icon: 'center',
												},
												{
													label: 'right',
													value: 'right',
													icon: 'right',
												},
											] }
										/>
										{ /* Icon rotate*/ }
										<ABlocksRangeControl
											label={ __( 'Spacing', 'ablocks' ) }
											attributeName="elementIconSpacing"
											attributeObjectKey="value"
											attributeValue={
												elementIconSpacing
											}
											setAttributes={ setAttributes }
											hasUnit={ true }
											step={ 1 }
											min={ 0 }
											max={ getMaxValueSpaceForUnit(
												elementIconSpacingUnit
											) }
											unitValue={ elementIconSpacing }
											unitOptions={ [
												{ value: 'px', label: 'px' },
												{ value: 'rem', label: 'rem' },
												{ value: 'em', label: 'em' },
											] }
											isInline={ false }
											attributeDefaultValue={
												elementIconSpacingDefaultValue
											}
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
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
