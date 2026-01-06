import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksSelectControl from '@Controls/select';
import ABlocksTextControl from '@Controls/text';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksBorderControl from '@Controls/border';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTypography from '@Controls/typography';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksRangeControl from '@Controls/range';
import ABlocksButtonGroupControl from '@Components/button-group';
import {
	strokeSize as strokeSizeDefaultAttributeValue,
	positionBottom as positionBottomDefaultAttributeValue,
	positionRight as positionRightDefaultAttributeValue,
	positionLeft as positionLeftDefaultAttributeValue,
} from './attributes';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		alignment,
		appearance,
		buttonText,
		border,
		textStroke,
		typography,
		buttonTextColor,
		buttonTextColorH,
		buttonTextColorBgH,
		buttonTextColorBg,
		textShadow,
		progressColor,
		progressColorBg,
		strokeSize,
		position,
		positionLeft,
		positionRight,
		positionBottom,
		visibleControl,
	} = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Scroll To Top', 'ablocks' ) }
						initialOpen={ true }
					>
						{ ! ( position === 'right' || position === 'left' ) && (
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
						) }

						<ABlocksSelectControl
							label={ __( 'Scroll To Top', 'ablocks' ) }
							options={ [
								{
									label: 'Icon',
									value: 'icon',
								},
								{
									label: 'Text',
									value: 'text',
								},
								{
									label: 'Progress Indicator',
									value: 'progressIndicator',
								},
							] }
							isResponsive={ false }
							attributeValue={ appearance }
							attributeName="appearance"
							setAttributes={ setAttributes }
						/>
						{ appearance === 'text' ? (
							<ContentStyleTabs
								content={
									<>
										<ABlocksTextControl
											label={ __(
												'Button Text',
												'ablocks'
											) }
											attributeName="buttonText"
											attributeValue={ buttonText }
											setAttributes={ setAttributes }
											isInline={ false }
										/>
									</>
								}
								style={
									<>
										<ControlLabel
											label="Color"
											isResponsive={ false }
											isHeader={ true }
										/>
										<NormalHoverTabs
											normal={
												<>
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="buttonTextColorBg"
														attributeValue={
															buttonTextColorBg
														}
														setAttributes={
															setAttributes
														}
													/>

													<ABlocksColorControl
														label={ __(
															'Color',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="buttonTextColor"
														attributeValue={
															buttonTextColor
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
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="buttonTextColorBgH"
														attributeValue={
															buttonTextColorBgH
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Icon Color',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="buttonTextColorH"
														attributeValue={
															buttonTextColorH
														}
														setAttributes={
															setAttributes
														}
													/>
												</>
											}
										/>
										<Separator />
										<ABlocksTypography
											label={ __(
												'Typography',
												'ablocks'
											) }
											attributeName="typography"
											attributeValue={ typography }
											setAttributes={ setAttributes }
											isResponsive={ true }
											attributes={ attributes }
										/>
										<ABlocksTextShadow
											label={ __(
												'Text Shadow',
												'ablocks'
											) }
											attributeName="textShadow"
											attributeValue={ textShadow }
											setAttributes={ setAttributes }
											isResponsive={ false }
										/>
										<ABlocksTextStroke
											label={ __(
												'Text Stroke',
												'ablocks'
											) }
											attributeName="textStroke"
											attributeValue={ textStroke }
											setAttributes={ setAttributes }
											isResponsive={ true }
										/>
										<Separator />
										<ControlLabel
											label="Padding"
											isResponsive={ false }
											isHeader={ true }
										/>
										<ABlocksDimensions
											label={ __( 'Padding', 'ablocks' ) }
											isResponsive={ true }
											attributeName="padding"
											attributeValue={
												attributes?.padding
											}
											setAttributes={ setAttributes }
										/>
										<Separator />
										<ControlLabel
											label="Border"
											isResponsive={ false }
											isHeader={ true }
										/>
										<ABlocksBorderControl
											attributeName="border"
											attributeValue={ border }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						) : (
							<>
								<Separator />
								<ControlLabel
									label="Icon"
									isResponsive={ false }
									isHeader={ true }
								/>
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
										<>
											<ABlocksIconStyleSettings
												label={ __(
													'Icon',
													'ablocks'
												) }
												attributes={ attributes }
												setAttributes={ setAttributes }
											/>
										</>
									}
								/>
							</>
						) }
					</ABlocksPanelBody>
					{ appearance === 'progressIndicator' && (
						<ABlocksPanelBody
							title={ __( 'Progress Style', 'ablocks' ) }
							initialOpen={ true }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksRangeControl
											label={ __(
												'Stroke Size',
												'ablocks'
											) }
											min={ 1 }
											max={ 100 }
											unitValue={ strokeSize }
											hasUnit={ false }
											isInline={ false }
											isResponsive={ false }
											attributeName="strokeSize"
											attributeValue={ strokeSize }
											attributeDefaultValue={
												strokeSizeDefaultAttributeValue
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
								style={
									<>
										<ControlLabel
											label="Color"
											isResponsive={ false }
											isHeader={ true }
										/>
										<ABlocksColorControl
											label={ __(
												'Line color',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="progressColor"
											attributeValue={ progressColor }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Line Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="progressColorBg"
											attributeValue={ progressColorBg }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }
					<ABlocksPanelBody
						title={ __( 'Position Control', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksButtonGroupControl
							allowDeselect={ false }
							isResponsive={ false }
							options={ [
								{
									label: 'Bottom Left',
									value: 'left',
								},
								{
									label: 'Bottom Right',
									value: 'right',
								},
							] }
							attributeName="position"
							attributeValue={ position }
							setAttributes={ setAttributes }
						/>
						{ position === 'left' && (
							<ABlocksRangeControl
								label={ __( 'Position Left', 'ablocks' ) }
								min={ 0 }
								max={ 500 }
								unitValue={ positionLeft }
								hasUnit={ true }
								isInline={ false }
								isResponsive={ true }
								attributeName="positionLeft"
								attributeValue={ positionLeft }
								attributeDefaultValue={
									positionLeftDefaultAttributeValue
								}
								setAttributes={ setAttributes }
							/>
						) }
						{ position === 'right' && (
							<ABlocksRangeControl
								label={ __( 'Position Right', 'ablocks' ) }
								min={ 0 }
								max={ 500 }
								unitValue={ positionRight }
								hasUnit={ true }
								isInline={ false }
								isResponsive={ true }
								attributeName="positionRight"
								attributeValue={ positionRight }
								attributeDefaultValue={
									positionRightDefaultAttributeValue
								}
								setAttributes={ setAttributes }
							/>
						) }
						{ ( position === 'right' || position === 'left' ) && (
							<ABlocksRangeControl
								label={ __( 'Position Bottom', 'ablocks' ) }
								min={ 0 }
								max={ 500 }
								unitValue={ positionBottom }
								hasUnit={ true }
								isInline={ false }
								isResponsive={ true }
								attributeName="positionBottom"
								attributeValue={ positionBottom }
								attributeDefaultValue={
									positionBottomDefaultAttributeValue
								}
								setAttributes={ setAttributes }
							/>
						) }
						<Separator />
						<ControlLabel
							label="Visible Control"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksButtonGroupControl
							allowDeselect={ false }
							isResponsive={ false }
							options={ [
								{
									label: 'Visible',
									value: 'visible',
								},
								{
									label: 'Hidden',
									value: 'hidden',
								},
							] }
							attributeName="visibleControl"
							attributeValue={ visibleControl }
							setAttributes={ setAttributes }
						/>
						<p
							style={ {
								border: '1px solid #EFEFF0',
								padding: '10px',
								borderRadius: '5px',
							} }
						>
							{ __(
								'The Visible Control is only for the editor view. It does not affect the frontend display. Used for user convenience while designing',
								'ablocks'
							) }
						</p>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
