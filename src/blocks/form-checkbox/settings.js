import React, { useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import SelectParentBlockButton from '@Components/select-parent-block';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksToggleControl from '@Controls/toggleButton';
import Separator from '@Components/separator';
import ABlocksRangeControl from '@Controls/range';
import { inputWidth as inputWidthDefaultValueAttribute } from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		isRequired,
		name,
		label,
		helperText,
		isChecked,
		errorMsg,
		inputWidth,
	} = attributes;

	const hasReturnedEmpty = useRef( false );
	useEffect( () => {
		if ( label === 'Checkbox' && ! hasReturnedEmpty.current ) {
			setAttributes( { label: ' Checkbox' } );
			hasReturnedEmpty.current = true;
		}
		if ( name === '' && ! hasReturnedEmpty.current ) {
			hasReturnedEmpty.current = true;
			return;
		}
		if (
			! name ||
			name.trim() === '' ||
			name.startsWith( 'MulSefield-' )
		) {
			const generateShortUniqueName = `Checkbox-${
				Math.floor( Math.random() * 1000 ) + 1
			}`;
			setAttributes( { name: generateShortUniqueName } );
		}
	}, [ name, label, setAttributes ] );

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
						title={ __( 'Checkbox', 'ablocks' ) }
						initialOpen={ true }
					>
						<React.Fragment>
							<ABlocksRangeControl
								label={ __( 'Checkbox Width', 'ablocks' ) }
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
							<ABlocksTextControl
								label={ __( 'Name', 'ablocks' ) }
								attributeName="name"
								setAttributes={ setAttributes }
								attributeValue={ name }
								isInline={ false }
								disableDynamicContent={ true }
							/>
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

							<ABlocksToggleControl
								label={ __( 'Default Checked', 'ablocks' ) }
								attributeValue={ isChecked }
								setAttributes={ setAttributes }
								attributeName="isChecked"
								isResponsive={ false }
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
								/>
							) }
						</React.Fragment>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
