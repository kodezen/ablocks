import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextControl from '@Controls/text';
import Separator from '@Components/separator';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		form_title,
		username_label,
		reset_button_label,
		login_button_label,
		show_logged_in_message,
		form_background_color,
		form_padding,
		form_border,
		label_typography,
		label_color,
		input_field_color,
		input_field_typography,
		input_border,
		input_padding,
		button_color,
		button_typography,
		button_background_color,
		button_padding,
		button_border,
		form_title_typography,
		form_title_color,
		form_footer_title_typography,
		form_footer_title_color,
		form_background_hover_color,
		button_background_hover_color,
		button_hover_color,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Form Options', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextControl
										label={ __( 'Form Title', 'ablocks' ) }
										attributeName="form_title"
										attributeValue={ form_title }
										setAttributes={ setAttributes }
										isInline={ false }
									/>

									<ABlocksTextControl
										label={ __(
											'Username Label',
											'ablocks'
										) }
										attributeName="username_label"
										attributeValue={ username_label }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									<ABlocksTextControl
										label={ __(
											'Reset Button Label',
											'ablocks'
										) }
										attributeName="reset_button_label"
										attributeValue={ reset_button_label }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									<ABlocksTextControl
										label={ __( 'Login Label', 'ablocks' ) }
										attributeName="login_button_label"
										attributeValue={ login_button_label }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Show Logged in message"
										attributeValue={
											show_logged_in_message
										}
										setAttributes={ setAttributes }
										attributeName="show_logged_in_message"
									/>
								</>
							}
							style={
								<>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Background color',
														'ablocks'
													) }
													attributeName="form_background_color"
													attributeValue={
														form_background_color
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
														'Background color',
														'ablocks'
													) }
													attributeName="form_background_hover_color"
													attributeValue={
														form_background_hover_color
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
								</>
							}
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Form Header & Footer', 'ablocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label="Form Header Title"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="form_title_typography"
							attributeValue={ form_title_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="form_title_color"
							attributeValue={ form_title_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Form Footer Title"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="form_footer_title_typography"
							attributeValue={ form_footer_title_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="form_footer_title_color"
							attributeValue={ form_footer_title_color }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Input Field Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label="Label Option"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="label_typography"
							attributeValue={ label_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="label_color"
							attributeValue={ label_color }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Input Field Option"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="input_field_typography"
							attributeValue={ input_field_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ false }
							attributeName="input_field_color"
							attributeValue={ input_field_color }
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
							attributeName="input_padding"
							attributeValue={ input_padding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="input_border"
							attributeValue={ input_border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Button Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="button_typography"
							attributeValue={ button_typography }
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
										attributeName="button_color"
										attributeValue={ button_color }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="button_background_color"
										attributeValue={
											button_background_color
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
										attributeName="button_hover_color"
										attributeValue={ button_hover_color }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="button_background_hover_color"
										attributeValue={
											button_background_hover_color
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
							attributeName="button_padding"
							attributeValue={ button_padding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="button_border"
							attributeValue={ button_border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
