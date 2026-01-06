import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import Separator from '@Components/separator';
import { selectWidth as selectWidthAttribute } from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		titleTypography,
		titleColor,
		titleColorH,
		labelTypography,
		labelColor,
		labelColorH,
		inputBorder,
		padding,
		selectTextcolor,
		selectTextcolorH,
		selectBackground,
		selectBackgroundH,
		selectBorder,
		selectPadding,
		selectTypography,
		buttonColor,
		buttonColorH,
		buttonBackground,
		buttonBackgroundH,
		buttonTypography,
		selectWidth,
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
						title={ __( 'Title Style', 'ablocks' ) }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="titleTypography"
							attributeValue={ titleTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Text color', 'ablocks' ) }
										attributeName="titleColor"
										attributeValue={ titleColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Text color', 'ablocks' ) }
										attributeName="titleColorH"
										attributeValue={ titleColorH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Label Style', 'ablocks' ) }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="labelTypography"
							attributeValue={ labelTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Text color', 'ablocks' ) }
										attributeName="labelColor"
										attributeValue={ labelColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Text color', 'ablocks' ) }
										attributeName="labelColorH"
										attributeValue={ labelColorH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Input Style', 'ablocks' ) }
					>
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
						<Separator />
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
					</ABlocksPanelBody>
					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Select Style', ' ablocks' ) }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="selectTypography"
							attributeValue={ selectTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>

						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Text color', 'ablocks' ) }
										attributeName="selectTextcolor"
										attributeValue={ selectTextcolor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background color',
											'ablocks'
										) }
										attributeName="selectBackground"
										attributeValue={ selectBackground }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Text color', 'ablocks' ) }
										attributeName="selectTextcolorH"
										attributeValue={ selectTextcolorH }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background color',
											'ablocks'
										) }
										attributeName="selectBackgroundH"
										attributeValue={ selectBackgroundH }
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
							attributeName="selectPadding"
							attributeValue={ selectPadding }
							setAttributes={ setAttributes }
						/>
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="selectBorder"
							attributeValue={ selectBorder }
							setAttributes={ setAttributes }
						/>
						<ABlocksRangeControl
							label={ __( 'Width', 'ablocks' ) }
							min={ 0 }
							max={ 500 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeName="selectWidth"
							attributeValue={ selectWidth }
							setAttributes={ setAttributes }
							attributeObjectKey="value"
							attributeDefaultValue={ selectWidthAttribute }
							autoSyncRange={ true }
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Button Style', ' ablocks' ) }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="buttonTypography"
							attributeValue={ buttonTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										attributeValue={ buttonBackground }
										attributeName="buttonBackground"
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Text', 'ablocks' ) }
										attributeValue={ buttonColor }
										attributeName="buttonColor"
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __(
											'Button Background Hover',
											'ablocks'
										) }
										attributeValue={ buttonBackgroundH }
										attributeName="buttonBackgroundH"
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Button Text Hover',
											'ablocks'
										) }
										attributeValue={ buttonColorH }
										attributeName="buttonColorH"
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
