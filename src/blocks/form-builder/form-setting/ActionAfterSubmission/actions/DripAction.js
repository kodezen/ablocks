import React, { useEffect } from 'react';
import { emailOptions, sendFormData, getDefaultData } from '../../../helper';
import { __ } from '@wordpress/i18n';
import FormFieldWithAction from '../../Components/FormFieldWithAction';

export default function DripAcion( { attributes, setAttributes } ) {
	const {
		formActions,
		mapEmailOptions,
		dripOption,
		dripApiKey,
		dripValidateApi,
		dripAccountId,
		dripAccountIdOptions,
		dripEmailSelects,
		showFormFields,
		dripTags,
	} = attributes;

	useEffect( () => {
		if ( formActions.includes( 'drip' ) ) {
			getDefaultData( 'drip', setAttributes, attributes );
		}
	}, [ formActions, dripOption ] );
	useEffect( () => {
		if ( dripApiKey !== '' ) {
			sendFormData( 'drip', dripApiKey, setAttributes, attributes );
		}
	}, [ dripApiKey ] );
	return (
		<div className="ablock-form-builder-actions-wrapper">
			<FormFieldWithAction
				label="Api Key"
				type="select"
				value={ dripOption }
				onChange={ ( e ) =>
					setAttributes( { dripOption: e.target.value } )
				}
				options={ emailOptions }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			{ dripOption === 'custom' && (
				<FormFieldWithAction
					label="Custom Api Key"
					type="text"
					value={ dripApiKey }
					onChange={ ( e ) =>
						setAttributes( { dripApiKey: e.target.value } )
					}
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }
			{ ( dripOption === 'default' || dripApiKey !== '' ) && (
				<>
					<FormFieldWithAction
						label="Account"
						type="select"
						value={ dripAccountId }
						onChange={ ( e ) =>
							setAttributes( { dripAccountId: e.target.value } )
						}
						options={ dripAccountIdOptions }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					{ dripAccountId !== 'default' &&
						dripValidateApi === true && (
							<>
								<h4 className="drip-section__label">
									{ __( 'Field Map', 'ablocks' ) }
								</h4>
								<hr className="drip-section__divider" />
								<FormFieldWithAction
									label="Email"
									type="select"
									value={ dripEmailSelects }
									onChange={ ( e ) =>
										setAttributes( {
											dripEmailSelects: e.target.value,
										} )
									}
									options={ mapEmailOptions }
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
								<div className="ablocks-form-builder-form-group">
									<label className="ablocks-form-builder-form-label">
										<input
											type="checkbox"
											checked={ showFormFields }
											onChange={ ( e ) =>
												setAttributes( {
													showFormFields:
														e.target.checked,
												} )
											}
										/>
										{ __( 'Form Field', 'ablocks' ) }
									</label>
								</div>
								<FormFieldWithAction
									label="Tags"
									type="textarea"
									value={ dripTags }
									onChange={ ( e ) =>
										setAttributes( {
											dripTags: e.target.value,
										} )
									}
									placeholder="Add comma separated tags"
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
							</>
						) }
				</>
			) }
		</div>
	);
}
