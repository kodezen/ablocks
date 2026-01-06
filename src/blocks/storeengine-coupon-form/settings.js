import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import Separator from '@Components/separator';
import {
	inputWidth as inputWidthAttribute,
	buttonWidth as buttonWidthAttribute,
} from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		direction,
		formAlignment,
		inputWidth,
		inputBorder,
		input_placeholder,
		buttonColor,
		buttonColorH,
		buttonBackground,
		buttonBackgroundH,
		buttonTitle,
		buttonTypography,
		buttonBorder,
		padding,
		buttonWidth,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						initialOpen={ true }
						title={ __( 'Layout', 'ablocks' ) }
					>
						<ABlocksButtonGroupControl
							isResponsive={ false }
							allowDeselect={ true }
							label={ __( 'Flex Direction', 'ablocks' ) }
							options={ [
								{
									value: 'row',
									label: __( 'Horizontal', 'ablocks' ),
								},
								{
									value: 'column',
									label: __( 'Vertical', 'ablocks' ),
								},
							] }
							attributeName="direction"
							attributeValue={ direction }
							setAttributes={ setAttributes }
						/>
						<ABlocksAlignmentControl
							label={ __( 'Alignment', 'ablocks' ) }
							attributeName="formAlignment"
							attributeValue={ formAlignment }
							setAttributes={ setAttributes }
							isInline={ false }
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Input Box Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										min={ 0 }
										max={ 500 }
										hasUnit={ true }
										isInline={ false }
										isResponsive={ true }
										attributeName="inputWidth"
										attributeValue={ inputWidth }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										attributeDefaultValue={
											inputWidthAttribute
										}
										autoSyncRange={ true }
									/>
								</>
							}
							style={
								<>
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="inputBorder"
										attributeValue={ inputBorder }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Button Setting', 'ablocks' ) }
					>
						<ABlocksRangeControl
							label={ __( 'Width', 'ablocks' ) }
							min={ 0 }
							max={ 500 }
							hasUnit={ false }
							isInline={ false }
							isResponsive={ true }
							attributeName="buttonWidth"
							attributeValue={ buttonWidth }
							setAttributes={ setAttributes }
							attributeObjectKey="value"
							attributeDefaultValue={ buttonWidthAttribute }
							autoSyncRange={ true }
						/>

						<ContentStyleTabs
							content={
								<>
									<ABlocksTextControl
										label={ __( 'Button Text', 'ablocks' ) }
										attributeName="buttonTitle"
										attributeValue={ buttonTitle }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									<Separator />
									<ControlLabel
										label="Button Style"
										isHeader={ true }
										isResponsive={ false }
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
													label={ __(
														'Background',
														'ablocks'
													) }
													attributeValue={
														buttonBackground
													}
													attributeName="buttonBackground"
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeValue={
														buttonColor
													}
													attributeName="buttonColor"
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
														'Background Hover',
														'ablocks'
													) }
													attributeValue={
														buttonBackgroundH
													}
													attributeName="buttonBackgroundH"
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Text Hover',
														'ablocks'
													) }
													attributeValue={
														buttonColorH
													}
													attributeName="buttonColorH"
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
								</>
							}
							style={
								<>
									<ABlocksTypography
										label={ __(
											'Button Typography',
											'ablocks'
										) }
										attributeName="buttonTypography"
										attributeValue={ buttonTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="buttonBorder"
										attributeValue={ buttonBorder }
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
						<Separator />
						<ControlLabel
							label="Padding"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="padding"
							attributeValue={ padding }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
