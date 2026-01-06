import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import InspectorTabs from '@Components/inspector-tabs';
import { PanelBody } from '@wordpress/components';
import { HTMLTagLists } from '@Controls/select/helper';
import ABlocksSelectControl from '@Controls/select';
import ABlocksIconUploader from '@Controls/icon-upload';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksRangeControl from '@Controls/range';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksColorControl from '@Controls/color';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTypography from '@Controls/typography';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksBorderControl from '@Controls/border';
import Separator from '@Components/separator';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksNumberControl from '@Controls/number';

import {
	itemSpace as itemSpaceDefaultAttributeValue,
	iconSize as iconSizeDefaultAttributeValue,
	iconSpace as iconSpaceDefaultAttributeValue,
} from './attributes';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		headingTag,
		allowMultiple,
		iconPosition,
		iconColor,
		iconColorH,
		iconActiveColor,
		headerTextColor,
		headerTextColorH,
		headerTextActiveColor,
		headerTypography,
		headerTextShadow,
		headerTextStroke,
		showIcon,
		headerPadding,
		headerBackgroundColor,
		headerBackgroundColorH,
		headerBackgroundActiveColor,
		bodyBackground,
		bodyBackgroundH,
		bodyPadding,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-accordion-block/'
					}
				>
					<PanelBody
						title={ __( 'Accordion', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow multiple open at a time"
										attributeValue={ allowMultiple }
										setAttributes={ setAttributes }
										attributeName="allowMultiple"
									/>
									<ABlocksNumberControl
										label={ __(
											'Initial Open',
											'ablocks'
										) }
										attributeName={ 'initialOpen' }
										attributeValue={
											attributes?.initialOpen
										}
										setAttributes={ setAttributes }
										isInline={ true }
									/>
									<span className="ablocks-control-field-description">
										{ __(
											'This feature works on the frontend only.',
											'ablocks'
										) }
									</span>
								</>
							}
							style={
								<>
									<ABlocksRangeControl
										label={ __( 'Item Space', 'ablocks' ) }
										min={ 0 }
										max={ 100 }
										isInline={ false }
										isResponsive={ false }
										attributeName={ 'itemSpace' }
										attributeValue={ attributes.itemSpace }
										hasUnit={ false }
										setAttributes={ setAttributes }
										attributeDefaultValue={
											itemSpaceDefaultAttributeValue
										}
									/>
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="itemBorder"
										attributeValue={
											attributes?.itemBorder
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Accordion Title', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'Heading Tag', 'ablocks' ) }
										options={ HTMLTagLists }
										isSearch={ true }
										attributeName="headingTag"
										attributeValue={ headingTag }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="headerTypography"
										attributeValue={ headerTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="headerTextShadow"
										attributeValue={ headerTextShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksTextStroke
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeName="headerTextStroke"
										attributeValue={ headerTextStroke }
										setAttributes={ setAttributes }
										isResponsive={ true }
									/>
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
													attributeName="headerTextColor"
													attributeValue={
														headerTextColor
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
													attributeName="headerBackgroundColor"
													attributeValue={
														headerBackgroundColor
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
														'Color',
														'ablocks'
													) }
													attributeName="headerTextColorH"
													attributeValue={
														headerTextColorH
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
													attributeName="headerBackgroundColorH"
													attributeValue={
														headerBackgroundColorH
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator margin={ '30px' } />
									<ABlocksColorControl
										label={ __(
											'Active Color',
											'ablocks'
										) }
										attributeName="headerTextActiveColor"
										attributeValue={ headerTextActiveColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Active Background',
											'ablocks'
										) }
										attributeName="headerBackgroundActiveColor"
										attributeValue={
											headerBackgroundActiveColor
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="headerPadding"
										attributeValue={ headerPadding }
										setAttributes={ setAttributes }
									/>
									<Separator margin="30px" />
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="headerBorder"
										attributeValue={
											attributes?.headerBorder
										}
										setAttributes={ setAttributes }
									/>
									<Separator />
								</>
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Toggle Icon', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksToggleControl
							isResponsive={ false }
							label="Show Icon"
							attributeValue={ showIcon }
							setAttributes={ setAttributes }
							attributeName="showIcon"
						/>
						{ showIcon && (
							<ContentStyleTabs
								content={
									<>
										<ABlocksSelectControl
											label={ __(
												'Icon Position',
												'ablocks'
											) }
											isResponsive={ false }
											options={ [
												{
													label: 'Left',
													value: 'left',
												},
												{
													label: 'Right',
													value: 'right',
												},
												{
													label: 'Both Of Side',
													value: 'both',
												},
											] }
											attributeValue={
												iconPosition || 'right'
											}
											attributeName="iconPosition"
											setAttributes={ setAttributes }
										/>
										<ABlocksRangeControl
											label={ __(
												'Icon Size',
												'ablocks'
											) }
											min={ 0 }
											max={ 100 }
											hasUnit={ false }
											isInline={ false }
											isResponsive={ false }
											attributeName={ 'iconSize' }
											attributeValue={
												attributes?.iconSize
											}
											setAttributes={ setAttributes }
											attributeDefaultValue={
												iconSizeDefaultAttributeValue
											}
										/>
										{ ( iconPosition === 'left' ||
											iconPosition === 'both' ) && (
											<>
												<ABlocksRangeControl
													label={ __(
														'Icon spacing',
														'ablocks'
													) }
													min={ 0 }
													max={ 100 }
													isInline={ false }
													isResponsive={ false }
													attributeName="iconSpace"
													attributeValue={
														attributes.iconSpace
													}
													setAttributes={
														setAttributes
													}
													attributeDefaultValue={
														iconSpaceDefaultAttributeValue
													}
												/>
												<ABlocksIconUploader
													label={ __(
														'Left Active Icon',
														'ablocks'
													) }
													attributePrefix="leftActiveIcon"
													attributes={ attributes }
													setAttributes={
														setAttributes
													}
													legacySupport={ true }
												/>
												<ABlocksIconUploader
													label={ __(
														'Left Close Icon',
														'ablocks'
													) }
													attributePrefix="leftCloseIcon"
													attributes={ attributes }
													setAttributes={
														setAttributes
													}
													legacySupport={ true }
												/>
											</>
										) }
										{ ( iconPosition === 'both' ||
											iconPosition === 'right' ) && (
											<>
												<ABlocksIconUploader
													label={ __(
														'Right Active Icon',
														'ablocks'
													) }
													attributePrefix="rightActiveIcon"
													attributes={ attributes }
													setAttributes={
														setAttributes
													}
													legacySupport={ true }
												/>
												<ABlocksIconUploader
													label={ __(
														'Right Close Icon',
														'ablocks'
													) }
													attributePrefix="rightCloseIcon"
													attributes={ attributes }
													setAttributes={
														setAttributes
													}
													legacySupport={ true }
												/>
											</>
										) }
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
															'Color',
															'ablocks'
														) }
														attributeName="iconColor"
														attributeValue={
															iconColor
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
															'Color',
															'ablocks'
														) }
														attributeName="iconColorH"
														attributeValue={
															iconColorH
														}
														setAttributes={
															setAttributes
														}
													/>
												</>
											}
										/>
										<Separator margin="30px" />
										<ABlocksColorControl
											label={ __(
												'Active Color',
												'ablocks'
											) }
											attributeName="iconActiveColor"
											attributeValue={ iconActiveColor }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						) }
					</PanelBody>
					<ABlocksPanelBody
						title={ __( 'Accordion Content', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="bodyPadding"
							attributeValue={ bodyPadding }
							setAttributes={ setAttributes }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="bodyBackground"
										attributeValue={ bodyBackground }
										setAttributes={ setAttributes }
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
										attributeName="bodyBackgroundH"
										attributeValue={ bodyBackgroundH }
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
