import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksRangeControl from '@Controls/range';
import ABlocksColorControl from '@Controls/color';
import { inputWidth as inputWidthDefaultValueAttribute } from './attributes';
import {
	passwordShowHideIconSize as passwordShowHideIconSizeDefaultValueAttribute,
	inputIconSize as inputIconSizeDefaultValueAttribute,
	inputIconSpace as inputIconSpaceDefaultValueAttribute,
} from './attributes';
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		placeholder,
		isRequired,
		name,
		helperText,
		label,
		iconColor,
		inputIconSize,
		inputIconSpace,
		showIcon,
		passwordShowHideToggle,
		passwordShowHideIconSize,
		passwordIconColor,
		errorMsg,
		formType,
		passwordType,
		inputWidth,
	} = attributes;
	useEffect( () => {
		setAttributes( {
			label:
				passwordType === 'password' ? 'Password' : 'Confirm Password',
		} );
	}, [ passwordType ] );
	useEffect( () => {
		setAttributes( {
			label:
				passwordType === 'password' ? 'Password' : 'Confirm Password',
			name: name !== 'confirm_password' ? 'password' : 'confirm_password',
			passwordType:
				name === 'confirm_password' ? 'confirm_password' : 'password',
		} );
	}, [] );
	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Explore Form Builder Options',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Design and customize forms easily for login, registration, and more.',
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
					docs_url={ 'https://ablocks.pro/form-builder/' }
				>
					<ABlocksPanelBody
						title={ __( 'Password', 'ablocks' ) }
						initialOpen={ true }
					>
						<React.Fragment>
							<ABlocksRangeControl
								label={ __( 'Password Width', 'ablocks' ) }
								attributeName="inputWidth"
								attributeObjectKey="value"
								attributeValue={ inputWidth }
								setAttributes={ setAttributes }
								isResponsive={ true }
								hasUnit={ true }
								step={ 1 }
								min={ 0 }
								max={ 100 }
								unitValue={ inputWidth }
								unitOptions={ [ { value: '%', label: '%' } ] }
								isInline={ false }
								attributeDefaultValue={
									inputWidthDefaultValueAttribute
								}
							/>
							{ formType !== 'login' && (
								<ABlocksButtonGroupControl
									allowDeselect={ false }
									isResponsive={ false }
									label={ __( 'Password Type', 'ablocks' ) }
									options={ [
										{
											label: 'Password',
											value: 'password',
										},
										{
											label: 'Confirm Password',
											value: 'confirm_password',
										},
									] }
									attributeName="passwordType"
									attributeValue={ passwordType }
									setAttributes={ setAttributes }
								/>
							) }
							<ABlocksTextControl
								label={ __( 'Label Name', 'ablocks' ) }
								attributeName="label"
								setAttributes={ setAttributes }
								attributeValue={ label }
								isInline={ false }
								disableDynamicContent={ true }
							/>
							<ABlocksTextControl
								label={ __( 'Helper Text', 'ablocks' ) }
								attributeName="helperText"
								setAttributes={ setAttributes }
								attributeValue={ helperText }
								isInline={ false }
								disableDynamicContent={ true }
							/>
							<ABlocksTextControl
								label={ __( 'Placeholder', 'ablocks' ) }
								attributeName="placeholder"
								setAttributes={ setAttributes }
								attributeValue={ placeholder }
								isInline={ false }
								disableDynamicContent={ true }
							/>
							<ABlocksToggleControl
								label={ __( 'Required', 'ablocks' ) }
								attributeValue={ isRequired }
								setAttributes={ setAttributes }
								attributeName="isRequired"
								isResponsive={ false }
							/>
							{ isRequired && (
								<ABlocksTextControl
									label={ __( 'Error Message', 'ablocks' ) }
									attributeName="errorMsg"
									setAttributes={ setAttributes }
									attributeValue={ errorMsg }
									isInline={ false }
									disableDynamicContent={ true }
								/>
							) }
							<ABlocksToggleControl
								label={ __( 'Show Icon', 'ablocks' ) }
								attributeValue={ showIcon }
								setAttributes={ setAttributes }
								attributeName="showIcon"
								isResponsive={ false }
							/>
							<ABlocksToggleControl
								label={ __(
									'Password Show & Hide Toggle',
									'ablocks'
								) }
								attributeValue={ passwordShowHideToggle }
								setAttributes={ setAttributes }
								attributeName="passwordShowHideToggle"
								isResponsive={ false }
							/>
						</React.Fragment>
					</ABlocksPanelBody>
					{ showIcon && (
						<ABlocksPanelBody
							initialOpen={ false }
							title={ __( 'Icon', 'ablocks' ) }
						>
							<ABlocksIconUploader
								label={ __( 'Icon', 'ablocks' ) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								legacySupport={ true }
							/>
							<ABlocksColorControl
								label={ __( 'Primary Color', 'ablocks' ) }
								attributeName="iconColor"
								attributeValue={ iconColor }
								setAttributes={ setAttributes }
							/>
							<ABlocksRangeControl
								label={ __( 'Size', 'ablocks' ) }
								attributeName="inputIconSize"
								attributeValue={ inputIconSize }
								setAttributes={ setAttributes }
								isInline={ false }
								min={ 1 }
								max={ 100 }
								step={ 1 }
								isResponsive={ false }
								hasUnit={ false }
								attributeDefaultValue={
									inputIconSizeDefaultValueAttribute
								}
							/>
							<ABlocksRangeControl
								label={ __( 'Icon Space', 'ablocks' ) }
								attributeName="inputIconSpace"
								attributeValue={ inputIconSpace }
								setAttributes={ setAttributes }
								isInline={ false }
								min={ 1 }
								max={ 100 }
								step={ 1 }
								isResponsive={ false }
								hasUnit={ false }
								attributeDefaultValue={
									inputIconSpaceDefaultValueAttribute
								}
							/>
						</ABlocksPanelBody>
					) }
					{ passwordShowHideToggle && (
						<ABlocksPanelBody
							initialOpen={ false }
							title={ __(
								'Password Show & Hide Icon',
								'ablocks'
							) }
						>
							<ABlocksRangeControl
								label={ __( 'Size', 'ablocks' ) }
								attributeName="passwordShowHideIconSize"
								attributeValue={ passwordShowHideIconSize }
								setAttributes={ setAttributes }
								isInline={ false }
								min={ 1 }
								max={ 100 }
								step={ 1 }
								isResponsive={ false }
								hasUnit={ false }
								attributeDefaultValue={
									passwordShowHideIconSizeDefaultValueAttribute
								}
							/>
							<ABlocksColorControl
								label={ __( 'Color', 'ablocks' ) }
								attributeName="passwordIconColor"
								attributeValue={ passwordIconColor }
								setAttributes={ setAttributes }
							/>
							<ABlocksIconUploader
								label={ __( 'Password Show', 'ablocks' ) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								attributePrefix="passwordShow"
								legacySupport
							/>
							<ABlocksIconUploader
								label={ __( 'Password Hide', 'ablocks' ) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								attributePrefix="passwordHide"
								legacySupport
							/>
						</ABlocksPanelBody>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
