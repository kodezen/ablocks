import React, { useEffect } from 'react';
import {
	emailOptions,
	sendFormData,
	getDefaultData,
	findIndivisualEmailDetails,
} from '../../../helper';
import { __ } from '@wordpress/i18n';
import FormFieldWithAction from '../../Components/FormFieldWithAction';

export default function MailchimpAction( { attributes, setAttributes } ) {
	const {
		mailchimpOption,
		mailchimpApiKey,
		mailchimpListId,
		mailchimpTags,
		showDoubleOpt,
		childDetails,
		mailchimpListIdOptions,
		formActions,
		mapEmailOptions,
		mailchimpgroupsOptions,
	} = attributes;
	useEffect( () => {
		if ( formActions.includes( 'mailchimp' ) ) {
			getDefaultData( 'mailchimp', setAttributes, attributes );
		}
	}, [ mailchimpOption ] );
	useEffect( () => {
		if (
			mailchimpListId !== 'default' &&
			( mailchimpMapSelects === 'default' ||
				mailchimpMapSelects === undefined )
		) {
			findIndivisualEmailDetails(
				'mailchimp',
				mailchimpApiKey,
				mailchimpListId,
				setAttributes,
				attributes
			);
		}
	}, [ mailchimpListId ] );
	useEffect( () => {
		if ( mailchimpApiKey !== '' ) {
			sendFormData(
				'mailchimp',
				mailchimpApiKey,
				setAttributes,
				attributes
			);
		}
	}, [ mailchimpApiKey ] );
	useEffect( () => {
		const checkEmail = childDetails.filter( ( child ) =>
			child.inputType?.toLowerCase().includes( 'email' )
		);
		if ( checkEmail.length !== 0 ) {
			setAttributes( {
				mapEmailOptions: [
					{ label: 'None', value: 'default' },
					{ label: 'Email', value: 'email' },
				],
			} );
		}
		if ( Array.isArray( childDetails ) && childDetails.length !== 0 ) {
			const newChildDetails = childDetails.map( ( child ) => ( {
				label: child.name?.toUpperCase() || 'Default Label',
				value: child.name || 'default-value',
			} ) );
			newChildDetails.push( { label: 'None', value: 'default' } );
			setAttributes( {
				mapOtherOptions: [ ...newChildDetails ],
			} );
		}
	}, [ childDetails ] );

	return (
		<div className="ablock-form-builder-actions-wrapper">
			<FormFieldWithAction
				label="Api Key"
				type="select"
				value={ mailchimpOption }
				onChange={ ( e ) =>
					setAttributes( { mailchimpOption: e.target.value } )
				}
				options={ emailOptions }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			{ mailchimpOption === 'custom' && (
				<FormFieldWithAction
					label="Custom API Key"
					type="text"
					value={ mailchimpApiKey }
					onChange={ ( e ) =>
						setAttributes( { mailchimpApiKey: e.target.value } )
					}
					placeholder="Enter your Mailchimp API key"
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }

			{ ( mailchimpOption === 'default' || mailchimpApiKey !== '' ) && (
				<>
					<FormFieldWithAction
						label="Audience"
						type="select"
						value={ mailchimpListId }
						onChange={ ( e ) =>
							setAttributes( { mailchimpListId: e.target.value } )
						}
						options={ mailchimpListIdOptions }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					{ mailchimpListId !== 'default' && mailchimpValidateApi && (
						<>
							<FormFieldWithAction
								label="Group"
								type="select"
								value={ mailchimpgroupSelects }
								onChange={ ( e ) =>
									setAttributes( {
										mailchimpgroupSelects: Array.from(
											e.target.selectedOptions,
											( opt ) => opt.value
										),
									} )
								}
								options={ mailchimpgroupsOptions }
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
							<FormFieldWithAction
								label="Tags"
								type="textarea"
								value={ mailchimpTags }
								onChange={ ( e ) =>
									setAttributes( {
										mailchimpTags: e.target.value,
									} )
								}
								placeholder="Add comma separated tags"
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>

							<div className="ablocks-form-builder-form-group">
								<label className="ablocks-form-builder-form-label">
									<input
										type="checkbox"
										checked={ showDoubleOpt }
										onChange={ ( e ) =>
											setAttributes( {
												showDoubleOpt: e.target.checked,
											} )
										}
									/>

									{ __( 'Double Opt-in', 'ablocks' ) }
								</label>
							</div>
							<div className="field-map-section">
								<h4 className="field-map-title">
									{ __( 'Field Map', 'ablocks' ) }
								</h4>
								<hr className="field-map-divider" />
								<FormFieldWithAction
									label="Email"
									type="select"
									value={ mailchimpEmailSelects }
									onChange={ ( e ) =>
										setAttributes( {
											mailchimpEmailSelects:
												e.target.value,
										} )
									}
									options={ mapEmailOptions }
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
								{ attributes?.mailchimpMapFields &&
									attributes?.mailchimpMapSelects &&
									attributes.mailchimpMapFields.map(
										( field, fieldIndex ) => {
											const value =
												mailchimpMapSelects?.[
													field.tag
												] || '';
											return (
												<div
													key={ fieldIndex }
													className="ablocks-form-builder-form-group"
												>
													<label className="ablocks-form-builder-form-label">
														{ field.name }
													</label>
													<select
														className="ablocks-form-builder-form-select"
														value={ value }
														onChange={ ( e ) =>
															setAttributes( {
																...attributes,
																mailchimpMapSelects:
																	{
																		...attributes.mailchimpMapSelects,
																		[ field.tag ]:
																			e
																				.target
																				.value,
																	},
															} )
														}
													>
														{ mapOtherOptions.map(
															( opt ) => (
																<option
																	key={
																		opt.value
																	}
																	value={
																		opt.value
																	}
																>
																	{
																		opt.label
																	}
																</option>
															)
														) }
													</select>
												</div>
											);
										}
									) }
							</div>
						</>
					) }
				</>
			) }
		</div>
	);
}
