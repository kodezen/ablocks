import React from 'react';
import metadata from './block.json';
import SaveChildContainer from '@Components/block-container/childSave';

export default function Save( { attributes } ) {
	const {
		block_id,
		name,
		placeholder,
		isRequired,
		label,
		helperText,
		errorMsg,
		customName,
	} = attributes;

	return (
		<SaveChildContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
			className="ablocks-form-builder__field"
			blockProps={ {
				'data-required': isRequired,
			} }
		>
			<label
				className={ `ablocks-form-builder__label ${
					isRequired ? 'ablocks-form-builder__label--required' : ''
				} ` }
				htmlFor={ block_id }
			>
				{ label }
			</label>
			{ helperText !== '' && (
				<label
					className={ `ablocks-form-builder__helper-text` }
					htmlFor={ block_id }
				>
					{ helperText }
				</label>
			) }
			<textarea
				className="ablocks-form-builder__input ablocks-form-builder__field__text"
				rows={ attributes?.textAreaRow }
				placeholder={ placeholder }
				name={ name === 'custom' ? customName : name }
				id={ block_id }
			></textarea>
			{ isRequired && (
				<div className="ablocks-block-error-msg">{ errorMsg }</div>
			) }
		</SaveChildContainer>
	);
}
