import React from 'react';
import metadata from './block.json';
import SaveChildContainer from '@Components/block-container/childSave';

export default function Save( { attributes } ) {
	const {
		block_id,
		label,
		isRequired,
		helperText,
		isChecked,
		errorMsg,
		name,
		inputType,
	} = attributes;

	return (
		<SaveChildContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
			className="ablocks-form-builder__field ablocks-form-builder__checkbox"
			blockProps={ {
				'data-required': isRequired,
			} }
		>
			<div className="ablocks-form-builder__field__content">
				<input
					type="checkbox"
					checked={ isChecked }
					name={ name }
					id={ `${ label
						.toLowerCase()
						.replace( / /g, '_' ) }_${ block_id }` }
				/>
				<label
					className={ `ablocks-form-builder__label ${
						isRequired
							? 'ablocks-form-builder__label--required'
							: ''
					} ` }
					htmlFor={ `${ label
						.toLowerCase()
						.replace( / /g, '_' ) }_${ block_id }` }
				>
					{ label }
				</label>
			</div>

			{ helperText !== '' && (
				<label
					className={ `ablocks-form-builder__helper-text` }
					htmlFor={ block_id }
				>
					{ helperText }
				</label>
			) }
			{ isRequired && (
				<div className="ablocks-block-error-msg">{ errorMsg }</div>
			) }
		</SaveChildContainer>
	);
}
