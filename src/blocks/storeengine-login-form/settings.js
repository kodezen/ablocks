import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksBackgroundControl from '@Controls/background';
import ABlocksBorderControl from '@Controls/border';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksTextControl from '@Controls/text';
import ContentStyleTabs from '@Components/content-style-tabs';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		form_title,
		title_color,
		title_typography,
		title_hover_color,
		username_label,
		username_placeholder,
		password_label,
		password_placeholder,
		remember_label,
		login_button_label,
		reset_password_label,
		login_redirect_url,
		logout_redirect_url,
		show_logged_in_message,
		login_btn_color,
		login_btn_bg_color,
		login_btn_typography,
		input_field_label_color,
		input_field_label_typography,
		input_field_label_hover_color,
		form_bg_color,
		input_field_bg_color,
		inputFieldColor,
		input_field_border,
		input_field_padding,
		form_padding,
		form_border,
		login_btn_hover_color,
		login_btn_bg_hover_color,
		inputFieldColorH,
		input_field_bg_hover_color,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Form Settings', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextControl
										label="Form Title"
										attributeValue={ form_title }
										setAttributes={ setAttributes }
										attributeName="form_title"
									/>
									<ABlocksTextControl
										label="Username Label"
										attributeValue={ username_label }
										setAttributes={ setAttributes }
										attributeName="username_label"
									/>
									<ABlocksTextControl
										label="Username Placeholder"
										attributeValue={ username_placeholder }
										setAttributes={ setAttributes }
										attributeName="username_placeholder"
									/>
									<ABlocksTextControl
										label="Password Label"
										attributeValue={ password_label }
										setAttributes={ setAttributes }
										attributeName="password_label"
									/>
									<ABlocksTextControl
										label="Password Placeholder"
										attributeValue={ password_placeholder }
										setAttributes={ setAttributes }
										attributeName="password_placeholder"
									/>
									<ABlocksTextControl
										label="Remember Label"
										attributeValue={ remember_label }
										setAttributes={ setAttributes }
										attributeName="remember_label"
									/>
									<ABlocksTextControl
										label="Login Button Label"
										attributeValue={ login_button_label }
										setAttributes={ setAttributes }
										attributeName="login_button_label"
									/>
									<ABlocksTextControl
										label="Reset Password Label"
										attributeValue={ reset_password_label }
										setAttributes={ setAttributes }
										attributeName="reset_password_label"
									/>
									<ABlocksTextControl
										label="Login Redirect Url"
										attributeValue={ login_redirect_url }
										setAttributes={ setAttributes }
										attributeName="login_redirect_url"
									/>
									<ABlocksTextControl
										label="Logout Redirect Url"
										attributeValue={ logout_redirect_url }
										setAttributes={ setAttributes }
										attributeName="logout_redirect_url"
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Show Logged in Message"
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
									<ControlLabel
										label={ __( 'Background', 'ablocks' ) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBackgroundControl
										label={ __( 'Background', 'ablocks' ) }
										isGradient={ false }
										attributeName="form_bg_color"
										attributeValue={ form_bg_color }
										setAttributes={ setAttributes }
									/>

									<Separator />
									<ControlLabel
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ false }
										attributeName="form_padding"
										attributeValue={ form_padding }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ControlLabel
										label={ __( 'Border', 'ablocks' ) }
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
						title={ __( 'Form Title Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="title_typography"
							attributeValue={ title_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label={ __( 'Color', 'ablocks' ) }
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="title_color"
										attributeValue={ title_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Hover color', 'ablocks' ) }
										isGradient={ false }
										attributeName="title_hover_color"
										attributeValue={ title_hover_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
						></NormalHoverTabs>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Input Field Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label="Input Label"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="input_field_label_typography"
							attributeValue={ input_field_label_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label={ __( 'Color', 'ablocks' ) }
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="input_field_label_color"
										attributeValue={
											input_field_label_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Hover color', 'ablocks' ) }
										isGradient={ false }
										attributeName="input_field_label_hover_color"
										attributeValue={
											input_field_label_hover_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						></NormalHoverTabs>
						<Separator />
						<ControlLabel
							label="Input Field"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="inputFieldColor"
										attributeValue={ inputFieldColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isGradient={ false }
										attributeName="input_field_bg_color"
										attributeValue={ input_field_bg_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Hover color', 'ablocks' ) }
										isGradient={ false }
										attributeName="inputFieldColorH"
										attributeValue={ inputFieldColorH }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Hover background',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="input_field_bg_hover_color"
										attributeValue={
											input_field_bg_hover_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						></NormalHoverTabs>
						<Separator />
						<ControlLabel
							label="Padding"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ false }
							attributeName="input_field_padding"
							attributeValue={ input_field_padding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="input_field_border"
							attributeValue={ input_field_border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Button Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="login_btn_typography"
							attributeValue={ login_btn_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label={ __( 'Color', 'ablocks' ) }
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="login_btn_color"
										attributeValue={ login_btn_color }
										setAttributes={ setAttributes }
									/>

									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="login_btn_bg_color"
										attributeValue={ login_btn_bg_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="login_btn_hover_color"
										attributeValue={ login_btn_hover_color }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="login_btn_bg_hover_color"
										attributeValue={
											login_btn_bg_hover_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						></NormalHoverTabs>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
