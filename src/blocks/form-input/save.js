import React from 'react';
import metadata from './block.json';
import SaveChildContainer from '@Components/block-container/childSave';
import { getStandardAutocomplete } from './helper';

import RenderIcon from '@Controls/icon-upload/render-icon';
export default function Save( { attributes } ) {
	const {
		block_id,
		placeholder,
		isRequired,
		name,
		inputType,
		label,
		showIcon,
		helperText,
		errorMsg,
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
			{ showIcon && (
				<span className="ablocks-form-builder__input-icon">
					<RenderIcon attributes={ attributes } />
				</span>
			) }
			<input
				className={ `ablocks-form-builder__input ${
					showIcon && 'ablocks-form-builder__input-show-icon'
				}` }
				placeholder={ placeholder }
				name={ name }
				autoComplete={ getStandardAutocomplete( name ) }
				id={ block_id }
				type={
					inputType.toLowerCase() === 'username'
						? 'text'
						: inputType.toLowerCase() === 'url'
						? 'url'
						: inputType.toLowerCase()
				}
			/>
			{ isRequired && (
				<div className="ablocks-block-error-msg">{ errorMsg }</div>
			) }
		</SaveChildContainer>
	);
}
