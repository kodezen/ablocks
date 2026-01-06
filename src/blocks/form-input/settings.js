import React, { useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlockSelectControl from '@Controls/select';
import ABlocksColorControl from '@Controls/color';
import { inputTypeOptions } from './helper';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksRangeControl from '@Controls/range';
import { inputWidth as inputWidthDefaultValueAttribute } from './attributes';

import {
	inputIconSize as inputIconSizeDefaultValueAttribute,
	inputIconSpace as inputIconSpaceDefaultValueAttribute,
} from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		placeholder,
		isRequired,
		inputType,
		name,
		label,
		showIcon,
		inputIconSize,
		iconColor,
		inputIconSpace,
		emailType,
		helperText,
		errorMsg,
		formType,
		nameChangeable,
		inputWidth,
	} = attributes;

	useEffect( () => {
		if ( ! inputType && inputTypeOptions.length > 0 ) {
			setAttributes( { inputType: inputTypeOptions[ 0 ].value } );
		}
	}, [ inputType, setAttributes ] );
	// Set default label only when inputType changes and no custom label exists
	useEffect( () => {
		let newLabel;
		switch ( inputType ) {
			case 'Text':
				newLabel = 'Text';
				break;
			case 'Number':
				newLabel = 'Number';
				break;
			case 'URL':
				newLabel = 'URL';
				break;
			case 'Username':
				newLabel = 'Username';
				break;
			case 'Email':
				newLabel = emailType === 'email' ? 'Email' : 'Confirm Email';
				break;
			default:
				newLabel = 'Name';
		}

		const defaultLabels = [
			'Name',
			'Text',
			'Number',
			'URL',
			'Username',
			'Email',
			'Confirm Email',
		];

		if ( ! label || defaultLabels.includes( label ) ) {
			setAttributes( { label: newLabel } );
		}
	}, [ inputType, emailType ] );

	useEffect( () => {
		if ( ! label ) {
			return;
		}

		let newPlaceholder;
		if ( inputType === 'URL' ) {
			newPlaceholder = `Please Enter your Valid ${ label }`;
		} else {
			newPlaceholder = `Please Enter your ${ label }`;
		}

		setAttributes( { placeholder: newPlaceholder } );
	}, [ label, inputType ] );

	const hasReturnedEmpty = useRef( false );
	useEffect( () => {
		if ( ! inputType ) {
			return;
		}
		if ( name === '' && ! hasReturnedEmpty.current ) {
			hasReturnedEmpty.current = true;
			return;
		}
		const prefix = inputType === 'Text' ? 'first_name' : inputType;
		if ( ! name || name.startsWith( 'field-' ) ) {
			const randomId = Math.floor( Math.random() * 1000 ) + 1;
			setAttributes( { name: `${ prefix }-${ randomId }` } );
			return;
		}
		const autoPattern = /^([A-Za-z_]+)-(\d+)$/;
		const match = name.match( autoPattern );
		if ( match && match[ 1 ] !== prefix ) {
			const number = match[ 2 ];
			setAttributes( { name: `${ prefix }-${ number }` } );
		}
	}, [ inputType, name, setAttributes ] );

	const checkFormType =
		( formType === 'registration' && nameChangeable === false ) ||
		( formType === 'login' && nameChangeable === false ) ||
		( formType === 'forget_password' && nameChangeable === false ) ||
		( formType === 'subscription' && nameChangeable === false )
			? true
			: false;
	const isEmailField = inputType?.toLowerCase() === 'email';
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
						title={ __( 'Input', 'ablocks' ) }
						initialOpen={ true }
					>
						<React.Fragment>
							<ABlockSelectControl
								label={ __( 'Field type', 'ablocks' ) }
								isResponsive={ false }
								options={ inputTypeOptions }
								attributeName="inputType"
								attributeValue={ inputType }
								setAttributes={ setAttributes }
								disabled={ checkFormType }
							/>
							<ABlocksRangeControl
								label={ __( 'Input Width', 'ablocks' ) }
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
							{ inputType === 'Email' &&
								checkFormType === false && (
									<ABlocksButtonGroupControl
										allowDeselect={ false }
										isResponsive={ false }
										label={ __( 'Email Type', 'ablocks' ) }
										options={ [
											{
												label: 'Email',
												value: 'email',
											},
											{
												label: 'Confirm Email',
												value: 'confirm_email',
											},
										] }
										attributeName="emailType"
										attributeValue={ emailType }
										setAttributes={ setAttributes }
									/>
								) }
							<ABlocksTextControl
								label={ __( 'Name', 'ablocks' ) }
								attributeName="name"
								setAttributes={ ( attrs ) => {
									if ( attrs.name ) {
										attrs.name = attrs.name.replace(
											/\s+/g,
											''
										);
									}
									setAttributes( attrs );
								} }
								attributeValue={ name }
								isInline={ false }
								disabled={ checkFormType }
								disableDynamicContent={ true }
							/>
							{ /* ) } */ }
							<ABlocksTextControl
								label={ __( 'Label', 'ablocks' ) }
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
							{ /* <ABlocksIconStyleSettings
								label={__('Icon', 'ablocks')}
								attributes={attributes}
								setAttributes={setAttributes}
							/> */ }
						</ABlocksPanelBody>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
