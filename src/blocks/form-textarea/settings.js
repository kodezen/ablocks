import React, { useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksSelectControl from '@Controls/select';
import ABlocksRangeControl from '@Controls/range';
import { nameList } from './helper';
import { textAreaRow as textAreaRowDefaultAttributeValue } from './attributes';
import { inputWidth as inputWidthDefaultValueAttribute } from './attributes';
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		placeholder,
		isRequired,
		name,
		nameType,
		helperText,
		errorMsg,
		customName,
		inputWidth,
		label,
	} = attributes;
	useEffect( () => {
		if ( ! nameType && nameList.length > 0 ) {
			setAttributes( { nameType: nameList[ 0 ].value } );
		}
	}, [ nameType, setAttributes ] );

	const hasReturnedEmpty = useRef( false );
	useEffect( () => {
		if ( label === 'Message' && ! hasReturnedEmpty.current ) {
			setAttributes( { label: ' Message' } );
			hasReturnedEmpty.current = true;
		}

		if ( ! nameType ) {
			return;
		}
		if ( name === '' && ! hasReturnedEmpty.current ) {
			hasReturnedEmpty.current = true;
			return;
		}
		const prefix = nameType;
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
	}, [ nameType, label, name, setAttributes ] );
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
						title={ __( 'Text Area', 'ablocks' ) }
						initialOpen={ true }
					>
						<React.Fragment>
							<ABlocksRangeControl
								label={ __( 'Text Area Width', 'ablocks' ) }
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
							<ABlocksSelectControl
								label={ __( 'Name Type', 'ablocks' ) }
								options={ nameList }
								isSearch={ true }
								attributeName="nameType"
								attributeValue={ nameType }
								setAttributes={ setAttributes }
							/>
							<ABlocksTextControl
								label={ __( 'Name', 'ablocks' ) }
								attributeName="name"
								setAttributes={ setAttributes }
								attributeValue={ name }
								isInline={ false }
								disableDynamicContent={ true }
							/>
							{ nameType === 'custom' && (
								<ABlocksTextControl
									label={ __( 'Custom Name', 'ablocks' ) }
									attributeName="customName"
									setAttributes={ setAttributes }
									attributeValue={ customName }
									isInline={ false }
									disableDynamicContent={ true }
								/>
							) }
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
							<ABlocksRangeControl
								label={ __( 'Rows', 'ablocks' ) }
								min={ 0 }
								max={ 100 }
								isInline={ false }
								isResponsive={ false }
								attributeName={ 'textAreaRow' }
								attributeValue={ attributes?.textAreaRow }
								setAttributes={ setAttributes }
								attributeDefaultValue={
									textAreaRowDefaultAttributeValue
								}
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
						</React.Fragment>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
