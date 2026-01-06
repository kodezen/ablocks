import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksRangeControl from '@Controls/range';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksColorControl from '@Controls/color';
import ABlocksTypography from '@Controls/typography';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';

import {
	space as spaceDefaultAttributeValue,
	gap as gapDefaultAttributeValue,
	toggleWidth as toggleWidthDefaultAttributeValue,
	toggleHeight as toggleHeightDefaultAttributeValue,
} from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes, context } = props;
	const {
		leftLabel,
		rightLabel,
		alignment,
		toggleDirection,
		space,
		gap,
		toggleWidth,
		toggleHeight,
		toggleColorState,
		toggleActiveColor,
		toggleActiveBgColor,
		toggleNormalColor,
		toggleNormalBgColor,
		labelTypography,
		labelColorState,
		labelNormalColor,
		labelActiveColor,
		toggleBarBgColor,
		toggleBarPadding,
		toggleBarBorder,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/add-and-customize-ablocks-toggle-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Toggle', 'ablocks' ) }
						initialOpen={ true }
					>
						<React.Fragment>
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
							<ABlocksButtonGroupControl
								label={ __( 'Direction', 'ablocks' ) }
								options={ [
									{
										label: 'Horizontal',
										value: 'row',
									},
									{
										label: 'Vertical',
										value: 'column',
									},
								] }
								attributeName="toggleDirection"
								attributeValue={ toggleDirection }
								setAttributes={ setAttributes }
								isResponsive={ false }
								allowDeselect={ false }
							/>
							<ABlocksRangeControl
								label={ __( 'Space', 'ablocks' ) }
								attributeName="space"
								attributeValue={ space }
								setAttributes={ setAttributes }
								min={ 0 }
								max={ 500 }
								step={ 1 }
								isInline={ false }
								attributeDefaultValue={
									spaceDefaultAttributeValue
								}
							/>
							<ABlocksRangeControl
								label={ __( 'Gap', 'ablocks' ) }
								attributeName="gap"
								attributeValue={ gap }
								setAttributes={ setAttributes }
								min={ 0 }
								max={ 100 }
								step={ 1 }
								isInline={ false }
								attributeDefaultValue={
									gapDefaultAttributeValue
								}
							/>
						</React.Fragment>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Toggle Label', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<React.Fragment>
									<ABlocksTextControl
										label={ __( 'Left Label', 'ablocks' ) }
										attributeName="leftLabel"
										attributeValue={ leftLabel }
										setAttributes={ setAttributes }
										context={ context }
									/>

									<ABlocksTextControl
										label={ __( 'Right Label', 'ablocks' ) }
										attributeName="rightLabel"
										attributeValue={ rightLabel }
										setAttributes={ setAttributes }
										context={ context }
									/>
								</React.Fragment>
							}
							style={
								<React.Fragment>
									<ABlocksButtonGroupControl
										// label={__('Label Color State', 'ablocks')}
										setAttributes={ setAttributes }
										attributeName="labelColorState"
										attributeValue={ labelColorState }
										options={ [
											{
												label: 'Normal',
												value: 'normal',
											},
											{
												label: 'Active',
												value: 'active',
											},
										] }
										isResponsive={ false }
										allowDeselect={ false }
									/>
									{ labelColorState === 'normal' && (
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="labelNormalColor"
											attributeValue={ labelNormalColor }
											setAttributes={ setAttributes }
										/>
									) }

									{ labelColorState === 'active' && (
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="labelActiveColor"
											attributeValue={ labelActiveColor }
											setAttributes={ setAttributes }
										/>
									) }
									<Separator />
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="labelTypography"
										attributeValue={ labelTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
								</React.Fragment>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Toggle Control', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<React.Fragment>
									<ABlocksRangeControl
										label={ __(
											'Toggle Width',
											'ablocks'
										) }
										attributeName="toggleWidth"
										attributeValue={ toggleWidth }
										setAttributes={ setAttributes }
										isResponsive={ false }
										min={ 0 }
										max={ 200 }
										step={ 1 }
										isInline={ false }
										attributeDefaultValue={
											toggleWidthDefaultAttributeValue
										}
									/>
									<ABlocksRangeControl
										label={ __(
											'Toggle Height',
											'ablocks'
										) }
										attributeName="toggleHeight"
										attributeValue={ toggleHeight }
										setAttributes={ setAttributes }
										isResponsive={ false }
										min={ 0 }
										max={ 100 }
										step={ 1 }
										isInline={ false }
										attributeDefaultValue={
											toggleHeightDefaultAttributeValue
										}
									/>
								</React.Fragment>
							}
							style={
								<>
									<ABlocksButtonGroupControl
										// label={__('Toggle Color State', 'ablocks')}
										setAttributes={ setAttributes }
										attributeName="toggleColorState"
										attributeValue={ toggleColorState }
										options={ [
											{
												label: 'Normal',
												value: 'normal',
											},
											{
												label: 'Active',
												value: 'active',
											},
										] }
										isResponsive={ false }
										allowDeselect={ false }
									/>
									{ toggleColorState === 'normal' && (
										<React.Fragment>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="toggleNormalColor"
												attributeValue={
													toggleNormalColor
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Background Color',
													'ablocks'
												) }
												attributeName="toggleNormalBgColor"
												attributeValue={
													toggleNormalBgColor
												}
												setAttributes={ setAttributes }
											/>
										</React.Fragment>
									) }
									{ toggleColorState === 'active' && (
										<React.Fragment>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="toggleActiveColor"
												attributeValue={
													toggleActiveColor
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Background Color',
													'ablocks'
												) }
												attributeName="toggleActiveBgColor"
												attributeValue={
													toggleActiveBgColor
												}
												setAttributes={ setAttributes }
											/>
										</React.Fragment>
									) }
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Toggle Bar', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksColorControl
							label={ __( 'Background Color', 'ablocks' ) }
							attributeName="toggleBarBgColor"
							attributeValue={ toggleBarBgColor }
							setAttributes={ setAttributes }
						/>
						<ControlLabel
							label="Border"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksBorderControl
							attributeName="toggleBarBorder"
							attributeValue={ toggleBarBorder }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="toggleBarPadding"
							attributeValue={ toggleBarPadding }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
