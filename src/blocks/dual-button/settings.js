import React from 'react';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTypography from '@Controls/typography';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksSelectControl from '@Controls/select';
import ABlocksRangeControl from '@Controls/range';
import ABlocksButtonGroupControl from '@Controls/group-button';

//colors
import ABlocksColorControl from '@Controls/color';
import ABlocksAlignmentControl from '@Controls/alignment';
import './style.css';
const propTypes = {};
const defaultProps = {};

import { gap as gapDefaultAttributeValue } from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		stack,
		alignment,
		gap,
		buttonType,
		buttonSize,
		textShadow,
		typography,
		textColor,
		textColorH,
		background,
		backgroundH,
		padding,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-dual-button-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Dual Button', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksButtonGroupControl
										isResponsive={ false }
										label={ __( 'Layout', 'ablocks' ) }
										options={ [
											{
												value: 'vertical',
												label: __(
													'Vertical',
													'ablocks'
												),
											},
											{
												value: 'horizontal',
												label: __(
													'Horizontal',
													'ablocks'
												),
											},
										] }
										attributeName="stack"
										attributeValue={ stack }
										setAttributes={ setAttributes }
									/>

									{ /*  */ }
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
										options={
											stack === 'horizontal'
												? [
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
														{
															label: __(
																'Space Between',
																'ablocks'
															),
															value: 'space-between',
															icon: 'justify',
														},
												  ]
												: [
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
												  ]
										}
										isInline={ false }
									/>
									{ ( alignment !== 'space-between' &&
										stack === 'horizontal' ) ||
									stack === 'vertical' ? (
										<ABlocksRangeControl
											label={ __( 'Gap', 'ablocks' ) }
											min={ 0 }
											max={ 400 }
											hasUnit={ true }
											unitOptions={
												stack === 'horizontal'
													? [
															{
																value: 'px',
																label: 'px',
															},
															{
																value: '%',
																label: '%',
															},
															{
																value: 'rem',
																label: 'rem',
															},
															{
																value: 'em',
																label: 'em',
															},
													  ]
													: [
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
													  ]
											}
											isInline={ false }
											isResponsive={ true }
											attributeName="gap"
											attributeValue={ gap }
											setAttributes={ setAttributes }
											attributeObjectKey="value"
											attributeDefaultValue={
												gapDefaultAttributeValue
											}
										/>
									) : null }
									<Separator />
									<ABlocksSelectControl
										label={ __( 'Type', 'ablocks' ) }
										options={ [
											{
												label: 'Default',
												value: '#ddd',
											},
											{
												label: 'Link',
												value: 'link',
											},
											{
												label: 'Danger',
												value: '#dc3545',
											},
											{ label: 'Info', value: '#0dcaf0' },
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
											buttonType || 'Primary'
										}
										attributeName="buttonType"
										setAttributes={ setAttributes }
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
														attributes?.transition
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
Settings.defaultProps = defaultProps;
