import React from 'react';
import metadata from './block.json';
import SaveChildContainer from '@Components/block-container/childSave';

export default function Save( { attributes } ) {
	const { block_id, name, isRequired, options, label, helperText, errorMsg } =
		attributes;

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
			<div>
				<select
					name={ name || block_id }
					id={ block_id }
					className="ablocks-form-builder__select"
				>
					{ options?.map( ( option ) => (
						<option key={ option?.value } value={ option.value }>
							{ ' ' }
							{ option.value }{ ' ' }
						</option>
					) ) }
				</select>
				{ isRequired && (
					<div className="ablocks-block-error-msg">{ errorMsg }</div>
				) }
			</div>
		</SaveChildContainer>
	);
}
