import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksBackgroundControl from '@Controls/background';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import Separator from '@Components/separator';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		input_label_typhography,
		input_label_color,
		form_button_typhography,
		form_button_background,
		form_button_color,
		input_field_color,
		input_field_bg_color,
		form_field_border,
		form_button_padding,
		form_button_border,
		input_field_placeholder_color,
		form_background,
		form_padding,
		form_border,
		form_button_hover_color,
		form_button_hover_background,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Form Input Style', 'ablocks' ) }
						initialOpen={ true }
					>
						<ControlLabel
							label="Input Field Label"
							isHeader={ true }
							isResponsive={ false }
						/>

						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="input_label_typhography"
							attributeValue={ input_label_typhography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="input_label_color"
							attributeValue={ input_label_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Input Field"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="input_field_color"
							attributeValue={ input_field_color }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Background Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="input_field_bg_color"
							attributeValue={ input_field_bg_color }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Placeholder Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="input_field_placeholder_color"
							attributeValue={ input_field_placeholder_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="form_field_border"
							attributeValue={ form_field_border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Form Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksBackgroundControl
							label={ __( 'Background Color', 'ablocks' ) }
							isResponsive={ true }
							attributeName="form_background"
							attributeValue={ form_background }
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
							attributeName="form_padding"
							attributeValue={ form_padding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="form_border"
							attributeValue={ form_border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Form Button Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="form_button_typhography"
							attributeValue={ form_button_typhography }
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
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="form_button_color"
										attributeValue={ form_button_color }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isGradient={ false }
										attributeName="form_button_background"
										attributeValue={
											form_button_background
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="form_button_hover_color"
										attributeValue={
											form_button_hover_color
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isGradient={ false }
										attributeName="form_button_hover_background"
										attributeValue={
											form_button_hover_background
										}
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
							attributeName="form_button_padding"
							attributeValue={ form_button_padding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="form_button_border"
							attributeValue={ form_button_border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
