import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksTextControl from '@Controls/text';
import { PanelBody } from '@wordpress/components';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTypography from '@Controls/typography';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksSelectControl from '@Controls/select';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import Separator from '@Components/separator';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ABlocksRangeControl from '@Controls/range';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ABlockLinkControl from '@Controls/link-control';
import ControlLabel from '@Components/control-label';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import './style.css';
import { iconSpace as iconSpaceDefaultAttributeValue } from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes, context } = props;
	const {
		buttonType,
		text,
		position,
		alignment,
		buttonSize,
		textShadow,
		typography,
		textColor,
		textColorH,
		background,
		backgroundH,
		padding,
		iconPosition,
		link,
		showIcon,
		iconSpace,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-button-block/'
					}
				>
					<PanelBody
						title={ __( 'Button', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksAlignmentControl
										label={ __( 'Position', 'ablocks' ) }
										attributeName="position"
										attributeValue={ position }
										setAttributes={ setAttributes }
										options={ [
											{
												label: 'left',
												value: 'left',
												icon: 'arrow-left',
											},
											{
												label: 'center',
												value: 'center',
												icon: 'wrap',
											},
											{
												label: 'right',
												value: 'right',
												icon: 'arrow-right',
											},
											{
												label: 'stretch',
												value: 'stretch',
												icon: 'align-center',
											},
										] }
										isInline={ false }
									/>
									{ position?.value === 'stretch' && (
										<ABlocksAlignmentControl
											label={ __(
												'Alignment',
												'ablocks'
											) }
											attributeName="alignment"
											attributeValue={ alignment }
											setAttributes={ setAttributes }
											options={ [
												{
													label: 'start',
													value: 'start',
													icon: 'left',
												},
												{
													label: 'center',
													value: 'center',
													icon: 'center',
												},
												{
													label: 'end',
													value: 'end',
													icon: 'right',
												},
												{
													label: 'space-between',
													value: 'space-between',
													icon: 'justify',
												},
											] }
											isInline={ false }
										/>
									) }
									<ABlocksSelectControl
										label={ __( 'Type', 'ablocks' ) }
										options={ [
											{
												label: 'Default',
												value: 'default',
											},
											{
												label: 'Link',
												value: 'link',
											},
											{
												label: 'Danger',
												value: '#dc3545',
											},
											{
												label: 'Info',
												value: '#0dcaf0',
											},
											{
												label: 'Success',
												value: '#198754',
											},
											{
												label: 'Warning',
												value: '#fd7e14',
											},
											{
												label: 'Primary',
												value: '#0d6efd',
											},
										] }
										isResponsive={ false }
										attributeValue={
											buttonType || 'default'
										}
										attributeName="buttonType"
										setAttributes={ setAttributes }
									/>

									<ABlocksTextControl
										label={ __( 'Text', 'ablocks' ) }
										attributeName="text"
										attributeValue={ text }
										setAttributes={ setAttributes }
										isInline={ false }
										context={ context }
									/>

									<ABlocksSelectControl
										label={ __( 'Sizes', 'ablocks' ) }
										options={ [
											{
												label: 'Extra small',
												value: 'xs',
											},
											{ label: 'Small', value: 'sm' },
											{
												label: 'Medium',
												value: 'md',
											},
											{ label: 'Large', value: 'lg' },
											{
												label: 'Extra large',
												value: 'xl',
											},
										] }
										isResponsive={ false }
										attributeValue={ buttonSize || 'sm' }
										attributeName="buttonSize"
										setAttributes={ setAttributes }
									/>

									<ABlockLinkControl
										label={ __( 'Link', 'ablocks' ) }
										attributeName="link"
										attributeValue={ link }
										setAttributes={ setAttributes }
									/>
									{ buttonType !== 'link' && (
										<ABlocksToggleControl
											label={ __(
												'Show Icon',
												'ablocks'
											) }
											attributeValue={ showIcon }
											setAttributes={ setAttributes }
											attributeName="showIcon"
											isResponsive={ false }
										/>
									) }
								</>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="typography"
										attributeValue={ typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="textShadow"
										attributeValue={ textShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<Separator />
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
														'Color',
														'ablocks'
													) }
													attributeName="textColor"
													attributeValue={
														textColor || '#000000'
													}
													setAttributes={
														setAttributes
													}
												/>
												{ buttonType !== 'link' && (
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="background"
														attributeValue={
															background || '#ddd'
														}
														setAttributes={
															setAttributes
														}
													/>
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
													attributeName="textColorH"
													attributeValue={
														textColorH
													}
													setAttributes={
														setAttributes
													}
												/>
												{ buttonType !== 'link' && (
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="backgroundH"
														attributeValue={
															backgroundH
														}
														setAttributes={
															setAttributes
														}
													/>
												) }
												<ABlocksRangeControl
													label={ __(
														'Transition Duration (ms)',
														'ablocks'
													) }
													min={ 0 }
													max={ 5 }
													step={ 0.01 }
													hasUnit={ false }
													isInline={ false }
													isResponsive={ false }
													attributeValue={
														attributes?.transition ||
														0
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

									<Separator />
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="border"
										attributeValue={ attributes?.border }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="padding"
										attributeValue={ padding }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ControlLabel
										label="Box shadow"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeName="boxShadow"
										attributeValue={ attributes?.boxShadow }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</PanelBody>

					{ showIcon && (
						<PanelBody
							title={ __( 'Icon', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksIconUploader
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
										<ABlocksSelectControl
											label={ __(
												'Icon position',
												'ablocks'
											) }
											options={ [
												{
													label: 'Before',
													value: 'left',
												},
												{
													label: 'After',
													value: 'right',
												},
											] }
											isResponsive={ false }
											attributeValue={
												iconPosition || 'left'
											}
											attributeName="iconPosition"
											setAttributes={ setAttributes }
										/>

										<ABlocksRangeControl
											label={ __(
												'Icon spacing',
												'ablocks'
											) }
											min={ 0 }
											max={ 100 }
											hasUnit={ true }
											isInline={ false }
											isResponsive={ true }
											attributeName={ 'iconSpace' }
											attributeValue={ iconSpace }
											setAttributes={ setAttributes }
											attributeObjectKey="value"
											attributeDefaultValue={
												iconSpaceDefaultAttributeValue
											}
											unitOptions={ [
												{ value: 'px', label: 'px' },
												{ value: 'rem', label: 'rem' },
												{ value: 'em', label: 'em' },
											] }
										/>
									</>
								}
								style={
									<>
										<ABlocksIconStyleSettings
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</PanelBody>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
