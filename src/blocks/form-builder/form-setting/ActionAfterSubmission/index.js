import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import Select from 'react-select';
import './styles.scss';
import { ationTypes } from '../../helper';
const ActionAfterSubmiton = ( { attributes, setAttributes } ) => {
	const { formActions, formName, formType, customForm } = attributes;
	useEffect( () => {
		if ( attributes?.formType === 'custom' ) {
			if ( attributes?.formName !== '' ) {
				setAttributes( {
					formType: formName,
				} );
			} else {
				setAttributes( {
					formType: 'custom',
				} );
			}
		}
	}, [ formName ] );
	useEffect( () => {
		if ( attributes?.formType === 'custom' ) {
			setAttributes( {
				customForm: true,
			} );
		}
	}, [ attributes.formType ] );
	const checkFormAction =
		formType === 'contact' ||
		formType === 'subscription' ||
		formType === 'multi-step' ||
		customForm
			? true
			: false;
	const handleChange = ( selectedOptions ) => {
		setAttributes( {
			formActions: selectedOptions.map( ( opt ) => opt.value ),
		} );
	};
	return (
		<div className="ablocks-form-builder-action-after-submition">
			{ checkFormAction && (
				<div className="ablocks-form-builder-action-after-submition__action-types-section">
					<label className="ablocks-form-builder-action-after-submition__action-types-label">
						{ __( 'Action Types', 'ablocks' ) }
					</label>
					<Select
						className="ablocks-form-builder-action-after-submition__action-types-select"
						isMulti
						options={ ationTypes }
						value={ ationTypes.filter( ( opt ) =>
							formActions.includes( opt.value )
						) }
						onChange={ handleChange }
					/>
				</div>
			) }
		</div>
	);
};

export default ActionAfterSubmiton;
