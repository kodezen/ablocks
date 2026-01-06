import React from 'react';
import ActionButton from '../ActionButton';
import { __ } from '@wordpress/i18n';

const FormFieldWithAction = ( {
	label,
	type = 'text',
	value,
	onChange,
	showAction = false,
	genericTags,
	attributes,
	setAttributes,
	targetKey,
	formTags,
	placeholder = '',
	options = [],
	rows = 4,
	notice,
	selectMultiple = false,
} ) => {
	const renderField = () => {
		switch ( type ) {
			case 'select':
				return (
					<select
						multiple={ selectMultiple }
						className="ablocks-form-builder-form-select"
						value={ value }
						onChange={ onChange }
					>
						{ options.map( ( opt ) => (
							<option key={ opt.value } value={ opt.value }>
								{ opt.label }
							</option>
						) ) }
					</select>
				);

			case 'textarea':
				return (
					<textarea
						className="ablocks-form-builder-form-textarea"
						value={ value }
						onChange={ onChange }
						placeholder={ placeholder }
						rows={ rows }
					/>
				);

			default:
				return (
					<input
						className="ablocks-form-builder-form-input"
						type={ type }
						value={ value }
						placeholder={ placeholder }
						onChange={ onChange }
					/>
				);
		}
	};
	return (
		<div className="ablocks-form-builder-form-group">
			<div className="ablocks-form-builder-row">
				<div
					style={ { width: showAction ? '95%' : '100%' } }
					className="ablocks-form-builder-row__filed"
				>
					<label className="ablocks-form-builder-form-label">
						{ label }
					</label>
					{ renderField() }
				</div>
				{ showAction && (
					<ActionButton
						formTags={ formTags }
						genericTags={ genericTags }
						attributes={ attributes }
						setAttributes={ setAttributes }
						targetKey={ targetKey }
					/>
				) }
			</div>
			{ notice && (
				<p className="ablocks-form-builder-action-after-submission-notice">
					{ __( notice, 'ablocks' ) }
				</p>
			) }
		</div>
	);
};

export default FormFieldWithAction;
