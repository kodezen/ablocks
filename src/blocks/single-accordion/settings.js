import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import SelectParentBlockButton from '@Components/select-parent-block';
import InspectorTabs from '@Components/inspector-tabs';
import { PanelBody } from '@wordpress/components';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksRangeControl from '@Controls/range';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksColorControl from '@Controls/color';
import ABlocksTypography from '@Controls/typography';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksBorderControl from '@Controls/border';
import Separator from '@Components/separator';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksTextControl from '@Controls/text';
const propTypes = {};
import {
	itemSpace as itemSpaceDefaultAttributeValue,
	iconSize as iconSizeDefaultAttributeValue,
} from './attributes';
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		headerTextColor,
		headerTextColorH,
		headerBackgroundColor,
		headerBackgroundColorH,
		headerPadding,
		headerTypography,
		headerTextShadow,
		headerTextStroke,
		iconColor,
		iconColorH,
		bodyBackgroundH,
		bodyBackground,
		bodyPadding,
		accordionTitle,
		headerBackgroundActiveColor,
		headerTextActiveColor,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __( 'Explore Accordion Options', 'ablocks' ) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Customize accordion block settings to your design and content needs.',
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
						'https://ablocks.pro/docs/ablocks-accordion-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Single Accordion', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksRangeControl
							label={ __( 'Item Space', 'ablocks' ) }
							min={ 0 }
							max={ 100 }
							isInline={ false }
							isResponsive={ false }
							attributeName={ 'itemSpace' }
							hasUnit={ false }
							attributeValue={ attributes.itemSpace }
							setAttributes={ setAttributes }
							attributeDefaultValue={
								itemSpaceDefaultAttributeValue
							}
						/>
						<ControlLabel
							label="Border"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksBorderControl
							attributeName="itemBorder"
							attributeValue={ attributes?.itemBorder }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<PanelBody
						title={ __( 'Title', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextControl
										label={ __(
											'Accordion Title',
											'ablocks'
										) }
										attributeName="accordionTitle"
										attributeValue={ accordionTitle }
										setAttributes={ setAttributes }
										isInline={ false }
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
									<Separator margin="30px" />
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
									<Separator margin={ '30px' } />
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
									<Separator margin="30px" />
								</>
							}
						/>
					</PanelBody>
					<ABlocksPanelBody
						title={ __( 'Icon', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksRangeControl
							label={ __( 'Icon Size', 'ablocks' ) }
							min={ 0 }
							max={ 100 }
							hasUnit={ false }
							isInline={ false }
							isResponsive={ false }
							attributeName={ 'iconSize' }
							attributeValue={ attributes?.iconSize }
							setAttributes={ setAttributes }
							attributeDefaultValue={
								iconSizeDefaultAttributeValue
							}
						/>
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="iconColor"
										attributeValue={ iconColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="iconColorH"
										attributeValue={ iconColorH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Content', 'ablocks' ) }
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
