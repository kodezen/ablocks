import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import Separator from '@Components/separator';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		buttonBorder,
		padding,
		buttonBackground,
		buttonBackgroundH,
		buttonColor,
		buttonColorH,
		buttonTypography,
		buttonWidth,
		buttonAlignment,
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
						title={ __( 'Button Setting', 'ablocks' ) }
					>
						<ABlocksRangeControl
							label={ __( 'Width', 'ablocks' ) }
							min={ 0 }
							max={ 100 }
							isInline={ false }
							isResponsive={ true }
							attributeName={ 'buttonWidth' }
							attributeValue={ buttonWidth }
							hasUnit={ true }
							setAttributes={ setAttributes }
						/>

						<ABlocksAlignmentControl
							label={ __( 'Alignment', 'ablocks' ) }
							attributeName="buttonAlignment"
							attributeValue={ buttonAlignment }
							setAttributes={ setAttributes }
							isInline={ false }
						/>
						<Separator />
						<ControlLabel
							label="Button Style"
							isHeader={ true }
							isResponsive={ false }
						/>
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
										label={ __( 'Color', 'ablocks' ) }
										attributeValue={ buttonColor }
										attributeName="buttonColor"
										setAttributes={ setAttributes }
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
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Hover',
											'ablocks'
										) }
										attributeValue={ buttonBackgroundH }
										attributeName="buttonBackgroundH"
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										attributeValue={ buttonColorH }
										attributeName="buttonColorH"
										setAttributes={ setAttributes }
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
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
