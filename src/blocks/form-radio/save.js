import React from 'react';
import metadata from './block.json';
import SaveChildContainer from '@Components/block-container/childSave';
import { RenderMarker } from './helper';

export default function Save( { attributes } ) {
	const {
		block_id,
		label,
		isRequired,
		name,
		radioArr,
		helperText,
		inputType,
		markerType,
		listIcons,
		minimumValue,
		maximumValue,
	} = attributes;

	return (
		<SaveChildContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
			className="ablocks-form-builder__radio-field ablocks-form-builder__field"
			blockProps={ {
				'data-required': isRequired,
				'data-minimum-value': inputType === 'radio' ? 1 : minimumValue,
				'data-maximum-value': inputType === 'radio' ? 1 : maximumValue,
			} }
		>
			<p
				className={ `ablocks-form-builder__label ${
					isRequired ? 'ablocks-form-builder__label--required' : ''
				} ` }
				htmlFor={ block_id }
			>
				{ label }
			</p>
			{ helperText !== '' && (
				// eslint-disable-next-line
				<label className={`ablocks-form-builder__helper-text`}>
					{ helperText }
				</label>
			) }
			<div className="ablocks-form-builder__radio-all-options">
				{ radioArr?.map( ( radio, index ) => (
					<div
						className="ablocks-form-builder__radio-option"
						key={ index }
					>
						<div className="ablocks-form-builder__radio-content">
							<RenderMarker
								markerType={ markerType }
								index={ index }
								iconAttributes={ listIcons }
								listProperties={ radio }
							/>
							<label htmlFor={ block_id }>
								{ ' ' }
								{ radio.value }{ ' ' }
							</label>
						</div>
						<input
							type={ inputType }
							name={ `${ name }[${
								inputType === 'radio' ? 0 : index
							}]` }
							value={ radio.value }
							id={ index }
						/>
					</div>
				) ) }
			</div>
		</SaveChildContainer>
	);
}
