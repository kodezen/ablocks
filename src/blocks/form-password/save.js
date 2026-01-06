import React from 'react';
import metadata from './block.json';
import SaveChildContainer from '@Components/block-container/childSave';
import RenderIcon from '@Controls/icon-upload/render-icon';
export default function Save( { attributes } ) {
	const {
		block_id,
		placeholder,
		isRequired,
		name,
		label,
		showIcon,
		passwordShowHideToggle,
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
					<RenderIcon
						attributePrefix="icon"
						attributes={ attributes }
					/>
				</span>
			) }
			<input
				className={ `ablocks-form-builder__input ${
					showIcon && 'ablocks-form-builder__input-show-icon'
				}` }
				placeholder={ placeholder }
				// required={isRequired}
				name={ name }
				id={ block_id }
				type="password"
			/>
			{ isRequired && (
				<div className="ablocks-block-error-msg">{ errorMsg }</div>
			) }
			{ passwordShowHideToggle && (
				<>
					<div className=" ablocks-form-builder__input-toggle-password ablocks-form-builder__input-toggle--show-password">
						<RenderIcon
							attributePrefix={ 'passwordShow' }
							attributes={ attributes }
						/>
					</div>
					<div className="  ablocks-form-builder__input-toggle-password  ablocks-form-builder__input-toggle--hide-password">
						<RenderIcon
							attributePrefix={ 'passwordHide' }
							attributes={ attributes }
						/>
					</div>
				</>
			) }
		</SaveChildContainer>
	);
}
