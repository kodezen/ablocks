import React, { useEffect, useState } from 'react';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksColorControl from '@Controls/color';
import ABlocksTypography from '@Controls/typography';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksSelectControl from '@Controls/select';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlockLinkControl from '@Controls/link-control';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksButtonGroupControl from '@Components/button-group';
import FormSetting from './form-setting';
import { Modal, Button } from '@wordpress/components';
import {
	generateChildAttributes,
	generateInnerBlockDetails,
} from './inner-data';

import {
	labelSpacing as labelSpacingDefaultAttributeValue,
	rowsSpacing as rowsSpacingDefaultAttributeValue,
	inputIconPosition as inputIconPositionDefaultAttributeValue,
	navigatorSpacing as navigatorSpacingDefaultAttributeValue,
} from './attributes';
import { buttonSizeOption } from './helper';

export default function Settings( props ) {
	const { attributes, setAttributes, clientId } = props;

	const {
		dir,
		formName,
		formType,
		labelTypography,
		labelColor,
		labelSpacing,
		helperTextColor,
		helperTextSpacing,
		helperTextTypography,
		inputBgColor,
		inputColor,
		inputPlaceholderColor,
		inputBorder,
		inputPadding,
		inputTypography,
		inputIconPosition,
		successColor,
		successBackground,
		errorColor,
		errorBackground,
		userRoles,
		roleSlug,

		showLabels,
		rowsSpacing,
		inputAlignment,
		labelAlignment,

		buttonSize,
		buttonColor,
		buttonBgColor,
		buttonHColor,
		buttonBgHColor,
		buttonTypography,
		buttonPadding,
		buttonBorder,
		buttonText,
		buttonTextAlignment,
		buttonAlignment,
		loginRedirect,
		link,
		registerRedirect,
		navigatorAccess,
		customForm,
		navigatorPadding,
		navigatorIconShow,
		navigatorColor,
		navigatorTypography,
		navigatorAlignment,
		navigatorSpacing,
		loginLabel,
		registerLabel,
		forgetPasswordLabel,
		showErrorDemo,
		showSuccessDemo,
		homeLabel,
		successErrorTypography,
		successErrorAlignment,
		successErrorPadding,
		formActions,
	} = attributes;

	const [ isOpen, setOpen ] = useState( false );
	useEffect( () => {
		if ( attributes?.formType === 'custom' ) {
			setAttributes( {
				customForm: true,
			} );
		}
	}, [ attributes.formType ] );
	const checkNavigator =
		formType === 'forget_password' ||
		formType === 'login' ||
		formType === 'registration'
			? true
			: false;

	const childBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);

	const childAttributes = generateChildAttributes( childBlocks );
	const innerBlockDetails = generateInnerBlockDetails( childBlocks );
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/form-builder/' }
				>
					<ABlocksPanelBody
						title={ __( 'General', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksButtonGroupControl
							isInline
							label={ __( 'Form Direction', 'ablocks' ) }
							options={ [
								{
									label: __( 'Row', 'ablocks' ),
									value: 'row',
									icon: (
										<span className="ablocks-icon ablocks-icon--arrow-right" />
									),
								},
								{
									label: __( 'Column', 'ablocks' ),
									value: 'column',
									icon: (
										<span className="ablocks-icon ablocks-icon--arrow-down" />
									),
								},
								{
									label: __( 'Row Reverse', 'ablocks' ),
									value: 'row-reverse',
									icon: (
										<span className="ablocks-icon ablocks-icon--arrow-left" />
									),
								},
								{
									label: __( 'Column Reverse', 'ablocks' ),
									value: 'column-reverse',
									icon: (
										<span className="ablocks-icon ablocks-icon--arrow-up" />
									),
									tooltipPosition: 'top-left',
								},
							] }
							attributeName="dir"
							attributeValue={ dir }
							setAttributes={ setAttributes }
						/>

						{ ( customForm || formType === 'multi-step' ) && (
							<ABlocksTextControl
								label={ __( 'Form Name', 'ablocks' ) }
								attributeValue={ formName }
								attributeName={ 'formName' }
								setAttributes={ setAttributes }
								isInline={ false }
							/>
						) }
						{ formType === 'registration' &&
							userRoles.length > 1 && (
								<ABlocksSelectControl
									label={ __(
										'Select User Roles',
										'ablocks'
									) }
									isResponsive={ false }
									options={ userRoles }
									attributeValue={ roleSlug }
									attributeName="roleSlug"
									setAttributes={ setAttributes }
								/>
							) }
						<ABlocksToggleControl
							label={ __( 'Show Labels', 'ablocks' ) }
							attributeValue={ showLabels }
							setAttributes={ setAttributes }
							attributeName="showLabels"
							isResponsive={ false }
						/>
						<ABlocksRangeControl
							label={ __( 'Rows Spacing', 'ablocks' ) }
							attributeName="rowsSpacing"
							attributeValue={ rowsSpacing }
							setAttributes={ setAttributes }
							min={ 0 }
							max={ 100 }
							isInline={ false }
							isResponsive={ true }
							attributeDefaultValue={
								rowsSpacingDefaultAttributeValue
							}
						/>

						<ABlocksAlignmentControl
							label={ __( 'Label Alignment', 'ablocks' ) }
							attributeName="labelAlignment"
							attributeValue={ labelAlignment }
							setAttributes={ setAttributes }
							isInline={ false }
							options={ [
								{
									label: 'left',
									value: 'left',
									icon: 'left',
								},
								{
									label: 'center',
									value: 'center',
									icon: 'center',
								},
								{
									label: 'right',
									value: 'right',
									icon: 'right',
								},
							] }
						/>
						<ABlocksAlignmentControl
							label={ __( 'Input Text Alignment', 'ablocks' ) }
							attributeName="inputAlignment"
							attributeValue={ inputAlignment }
							setAttributes={ setAttributes }
							isInline={ false }
							options={ [
								{
									label: 'left',
									value: 'left',
									icon: 'left',
								},
								{
									label: 'center',
									value: 'center',
									icon: 'center',
								},
								{
									label: 'right',
									value: 'right',
									icon: 'right',
								},
							] }
						/>
						{ checkNavigator && (
							<ABlocksToggleControl
								label={ __( 'Navigator Access', 'ablocks' ) }
								attributeValue={ navigatorAccess }
								setAttributes={ setAttributes }
								attributeName="navigatorAccess"
								isResponsive={ false }
							/>
						) }
						{ formType === 'registration' && (
							<>
								<ABlocksToggleControl
									label={ __(
										'Redirect After Register',
										'ablocks'
									) }
									attributeValue={ registerRedirect }
									setAttributes={ setAttributes }
									attributeName="registerRedirect"
									isResponsive={ false }
								/>
								{ registerRedirect && (
									<>
										<u
											style={ {
												paddingBottom: '10px',
												display: 'block',
											} }
										>
											<i>
												<b>Note:</b> Only URLs from this
												website are allowed. External
												links will not work.
											</i>
										</u>
										<ABlockLinkControl
											label={ __( 'Link', 'ablocks' ) }
											attributeName="link"
											attributeValue={ link }
											setAttributes={ setAttributes }
											noFollowIOn={ false }
										/>
									</>
								) }
							</>
						) }
						{ formType === 'login' && (
							<>
								<ABlocksToggleControl
									label={ __(
										'Redirect After Login',
										'ablocks'
									) }
									attributeValue={ loginRedirect }
									setAttributes={ setAttributes }
									attributeName="loginRedirect"
									isResponsive={ false }
								/>
								{ loginRedirect && (
									<>
										<u
											style={ {
												paddingBottom: '10px',
												display: 'block',
											} }
										>
											<i>
												<b>Note:</b> Only URLs from this
												website are allowed. External
												links will not work.
											</i>
										</u>
										<ABlockLinkControl
											label={ __( 'Link', 'ablocks' ) }
											attributeName="link"
											attributeValue={ link }
											setAttributes={ setAttributes }
											noFollowIOn={ false }
										/>
									</>
								) }
							</>
						) }
					</ABlocksPanelBody>
					{ navigatorAccess && (
						<ABlocksPanelBody
							title={ __( 'Navigator' ) }
							initialOpen={ false }
						>
							<ABlocksTextControl
								label={ __( 'Home Label', 'ablocks' ) }
								attributeName="homeLabel"
								setAttributes={ setAttributes }
								attributeValue={ homeLabel }
								isInline={ false }
								disableDynamicContent={ true }
							/>
							{ ( formType === 'forget_password' ||
								formType === 'registration' ) && (
								<ABlocksTextControl
									label={ __( 'Login Label', 'ablocks' ) }
									attributeName="loginLabel"
									setAttributes={ setAttributes }
									attributeValue={ loginLabel }
									isInline={ false }
									disableDynamicContent={ true }
								/>
							) }
							{ formType === 'login' && (
								<>
									<ABlocksTextControl
										label={ __(
											'Register Label',
											'ablocks'
										) }
										attributeName="registerLabel"
										setAttributes={ setAttributes }
										attributeValue={ registerLabel }
										isInline={ false }
										disableDynamicContent={ true }
									/>
									<ABlocksTextControl
										label={ __(
											'Forget Password Label',
											'ablocks'
										) }
										attributeName="forgetPasswordLabel"
										setAttributes={ setAttributes }
										attributeValue={ forgetPasswordLabel }
										isInline={ false }
										disableDynamicContent={ true }
									/>
								</>
							) }
							<ABlocksToggleControl
								label={ __( 'Show Icon', 'ablocks' ) }
								attributeValue={ navigatorIconShow }
								setAttributes={ setAttributes }
								attributeName="navigatorIconShow"
								isResponsive={ false }
							/>
							<ABlocksTypography
								label={ __( 'Typography', 'ablocks' ) }
								attributeName="navigatorTypography"
								attributeValue={ navigatorTypography }
								setAttributes={ setAttributes }
								isResponsive={ true }
								attributes={ attributes }
							/>
							<ABlocksColorControl
								label={ __( 'Color', 'ablocks' ) }
								attributeName="navigatorColor"
								attributeValue={ navigatorColor }
								setAttributes={ setAttributes }
							/>
							<ABlocksAlignmentControl
								label={ __( 'Alignment', 'ablocks' ) }
								attributeName="navigatorAlignment"
								attributeValue={ navigatorAlignment }
								setAttributes={ setAttributes }
								isInline={ false }
								options={ [
									{
										label: 'left',
										value: 'left',
										icon: 'left',
									},
									{
										label: 'center',
										value: 'center',
										icon: 'center',
									},
									{
										label: 'right',
										value: 'right',
										icon: 'right',
									},
								] }
							/>

							<ABlocksRangeControl
								label={ __( 'Spacing', 'ablocks' ) }
								attributeName="navigatorSpacing"
								attributeValue={ navigatorSpacing }
								setAttributes={ setAttributes }
								min={ 1 }
								max={ 100 }
								isInline={ false }
								isResponsive={ false }
								attributeDefaultValue={
									navigatorSpacingDefaultAttributeValue
								}
							/>
							<ABlocksDimensions
								label={ __( 'Padding', 'ablocks' ) }
								isResponsive={ true }
								attributeName="navigatorPadding"
								attributeValue={ navigatorPadding }
								setAttributes={ setAttributes }
							/>
						</ABlocksPanelBody>
					) }

					{ showLabels && (
						<ABlocksPanelBody
							title={ __( 'Labels', 'ablocks' ) }
							initialOpen={ false }
						>
							<ABlocksTypography
								label={ __( 'Typography', 'ablocks' ) }
								attributeName="labelTypography"
								attributeValue={ labelTypography }
								setAttributes={ setAttributes }
								isResponsive={ true }
								attributes={ attributes }
							/>
							<ABlocksColorControl
								label={ __( 'Color', 'ablocks' ) }
								attributeName="labelColor"
								attributeValue={ labelColor }
								setAttributes={ setAttributes }
							/>
							<ABlocksRangeControl
								label={ __( 'Spacing', 'ablocks' ) }
								attributeName="labelSpacing"
								attributeValue={ labelSpacing }
								setAttributes={ setAttributes }
								min={ 0 }
								max={ 100 }
								isInline={ false }
								isResponsive={ true }
								attributeDefaultValue={
									labelSpacingDefaultAttributeValue
								}
							/>
							<ABlocksRangeControl
								label={ __( 'Icon Position', 'ablocks' ) }
								attributeName="inputIconPosition"
								attributeValue={ inputIconPosition }
								setAttributes={ setAttributes }
								min={ 1 }
								max={ 100 }
								isInline={ false }
								isResponsive={ false }
								attributeDefaultValue={
									inputIconPositionDefaultAttributeValue
								}
							/>
						</ABlocksPanelBody>
					) }

					<ABlocksPanelBody
						title={ __( 'Helper text', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="helperTextTypography"
							attributeValue={ helperTextTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							attributeName="helperTextColor"
							attributeValue={ helperTextColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksRangeControl
							label={ __( 'Spacing', 'ablocks' ) }
							attributeName="helperTextSpacing"
							attributeValue={ helperTextSpacing }
							setAttributes={ setAttributes }
							min={ 0 }
							max={ 100 }
							isInline={ false }
							isResponsive={ true }
							attributeDefaultValue={
								labelSpacingDefaultAttributeValue
							}
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Input', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							attributeName="inputColor"
							attributeValue={ inputColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Placeholder Color', 'ablocks' ) }
							attributeName="inputPlaceholderColor"
							attributeValue={ inputPlaceholderColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Background Color', 'ablocks' ) }
							attributeName="inputBgColor"
							attributeValue={ inputBgColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="inputTypography"
							attributeValue={ inputTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="inputPadding"
							attributeValue={ inputPadding }
							setAttributes={ setAttributes }
						/>
						<ControlLabel label="Border" isResponsive={ false } />
						<ABlocksBorderControl
							attributeName="inputBorder"
							attributeValue={ inputBorder }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Submit Button', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextControl
										label={ __( 'Label', 'ablocks' ) }
										attributeName="buttonText"
										setAttributes={ setAttributes }
										attributeValue={ buttonText }
										isInline={ false }
									/>
									<ABlocksSelectControl
										label={ __( 'Sizes', 'ablocks' ) }
										isResponsive={ false }
										options={ buttonSizeOption }
										attributeValue={ buttonSize }
										attributeName="buttonSize"
										setAttributes={ setAttributes }
									/>
									<ABlocksAlignmentControl
										label={ __( 'Position', 'ablocks' ) }
										attributeName="buttonAlignment"
										attributeValue={ buttonAlignment }
										setAttributes={ setAttributes }
										isInline={ false }
										options={ [
											{
												label: 'flex-start',
												value: 'flex-start',
												icon: 'left',
											},
											{
												label: 'center',
												value: 'center',
												icon: 'center',
											},
											{
												label: 'flex-end',
												value: 'flex-end',
												icon: 'right',
											},
										] }
									/>
									<ABlocksAlignmentControl
										label={ __(
											'Text Alignment',
											'ablocks'
										) }
										attributeName="buttonTextAlignment"
										attributeValue={ buttonTextAlignment }
										setAttributes={ setAttributes }
										isInline={ false }
										options={ [
											{
												label: 'left',
												value: 'left',
												icon: 'left',
											},
											{
												label: 'center',
												value: 'center',
												icon: 'center',
											},
											{
												label: 'right',
												value: 'right',
												icon: 'right',
											},
										] }
									/>
								</>
							}
							style={
								<>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="buttonPadding"
										attributeValue={ buttonPadding }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="buttonTypography"
										attributeValue={ buttonTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeName="buttonColor"
													attributeValue={
														buttonColor
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
													attributeName="buttonBgColor"
													attributeValue={
														buttonBgColor
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
													attributeName="buttonHColor"
													attributeValue={
														buttonHColor
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
													attributeName="buttonBgHColor"
													attributeValue={
														buttonBgHColor
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<ControlLabel
										label="Border"
										isResponsive={ false }
									/>
									<ABlocksBorderControl
										attributeName="buttonBorder"
										attributeValue={ buttonBorder }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Success & Error Styles', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksToggleControl
							label={ __( 'Demo Success', 'ablocks' ) }
							attributeValue={ showSuccessDemo }
							setAttributes={ setAttributes }
							attributeName="showSuccessDemo"
							isResponsive={ false }
						/>
						<ABlocksToggleControl
							label={ __( 'Demo Error', 'ablocks' ) }
							attributeValue={ showErrorDemo }
							setAttributes={ setAttributes }
							attributeName="showErrorDemo"
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="successErrorTypography"
							attributeValue={ successErrorTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksAlignmentControl
							label={ __( 'Alignment', 'ablocks' ) }
							attributeName="successErrorAlignment"
							attributeValue={ successErrorAlignment }
							setAttributes={ setAttributes }
							isInline={ false }
							options={ [
								{
									label: 'left',
									value: 'left',
									icon: 'left',
								},
								{
									label: 'center',
									value: 'center',
									icon: 'center',
								},
								{
									label: 'right',
									value: 'right',
									icon: 'right',
								},
							] }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="successErrorPadding"
							attributeValue={ successErrorPadding }
							setAttributes={ setAttributes }
						/>
						<>
							<ABlocksColorControl
								label={ __( 'Success Color', 'ablocks' ) }
								attributeName="successColor"
								attributeValue={ successColor }
								setAttributes={ setAttributes }
							/>
							<ABlocksColorControl
								label={ __( 'Success Background', 'ablocks' ) }
								attributeName="successBackground"
								attributeValue={ successBackground }
								setAttributes={ setAttributes }
							/>
						</>
						<>
							<ABlocksColorControl
								label={ __( 'Error Color', 'ablocks' ) }
								attributeName="errorColor"
								attributeValue={ errorColor }
								setAttributes={ setAttributes }
							/>
							<ABlocksColorControl
								label={ __( 'Error Background', 'ablocks' ) }
								attributeName="errorBackground"
								attributeValue={ errorBackground }
								setAttributes={ setAttributes }
							/>
						</>
					</ABlocksPanelBody>
					{ formActions && (
						<div onClick={ () => setOpen( true ) }>
							<ABlocksPanelBody
								title={ __( 'Action After Submit', 'ablocks' ) }
								initialOpen={ false }
							/>
						</div>
					) }
					{ isOpen && (
						<Modal
							title="Form Settings"
							onRequestClose={ () => setOpen( false ) }
							className="ablocks-form-builder-modal"
						>
							<FormSetting
								setAttributes={ setAttributes }
								attributes={ attributes }
								childAttributes={ childAttributes }
								innerBlockDetails={ innerBlockDetails }
							/>
						</Modal>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
