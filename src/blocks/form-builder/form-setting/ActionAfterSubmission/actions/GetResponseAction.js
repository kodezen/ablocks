import React, { useEffect } from 'react';
import {
	emailOptions,
	sendFormData,
	getDefaultData,
	findIndivisualEmailDetails,
} from '../../../helper';
import FormFieldWithAction from '../../Components/FormFieldWithAction';
import { __ } from '@wordpress/i18n';

export default function GetResponseAction( { attributes, setAttributes } ) {
	const {
		formActions,
		mapOtherOptions,
		mailerliteApiKey,
		mapEmailOptions,
		getResponseOption,
		getResponseApiKey,
		getResponseValidateApi,
		getResponseListIdOptions,
		getResponseListId,
		getResponseMapSelects,
		childDetails,
	} = attributes;
	//for get default value of mailchimp,mailerlite,drip,getResponse and convertkit
	useEffect( () => {
		if ( formActions.includes( 'getResponse' ) ) {
			getDefaultData( 'getresponse', setAttributes, attributes );
		}
	}, [ formActions, getResponseOption ] );
	//indivisual details of emails server
	useEffect( () => {
		if (
			getResponseListId !== 'default' &&
			( getResponseMapSelects === 'default' ||
				getResponseMapSelects === undefined )
		) {
			findIndivisualEmailDetails(
				'getresponse',
				mailerliteApiKey,
				getResponseListId,
				setAttributes,
				attributes
			);
		}
	}, [ getResponseListId ] );
	useEffect( () => {
		if ( getResponseApiKey !== '' ) {
			sendFormData(
				'getresponse',
				getResponseApiKey,
				setAttributes,
				attributes
			);
		}
	}, [ getResponseApiKey ] );
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
				label: child.name?.toUpperCase() || 'Default Label', // Default if name is missing
				value: child.name || 'default-value', // Default value if name is missing
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
				value={ getResponseOption }
				onChange={ ( e ) =>
					setAttributes( { getResponseOption: e.target.value } )
				}
				options={ emailOptions }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			{ getResponseOption === 'custom' && (
				<FormFieldWithAction
					label="Custom Api Key"
					type="text"
					value={ getResponseApiKey }
					onChange={ ( e ) =>
						setAttributes( { getResponseApiKey: e.target.value } )
					}
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }
			{ ( getResponseOption === 'default' ||
				getResponseApiKey !== '' ) && (
				<>
					<FormFieldWithAction
						label="List"
						type="select"
						value={ getResponseListId }
						onChange={ ( e ) =>
							setAttributes( {
								getResponseListId: e.target.value,
							} )
						}
						options={ getResponseListIdOptions }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					{ getResponseListId !== 'default' &&
						getResponseValidateApi === true && (
							<>
								<FormFieldWithAction
									label="Day Of Cycle"
									type="number"
									value={
										attributes?.getResponseDayCycle || ''
									}
									onChange={ ( e ) =>
										setAttributes( {
											getResponseDayCycle:
												parseInt(
													e.target.value,
													10
												) || 0,
										} )
									}
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
								<div className="getresponse-section__field-map-group">
									<label className="getresponse-section__label">
										{ __( 'Field Mapping', 'ablocks' ) }
									</label>
									<hr className="getresponse-section__divider" />
									{ attributes?.getResponseMapFields &&
										attributes?.getResponseMapSelects &&
										attributes?.getResponseMapFields.map(
											( field, fieldIndex ) => {
												const value =
													getResponseMapSelects?.[
														field.key
													];
												return (
													<div
														key={ fieldIndex }
														className="ablocks-form-builder-form-group"
													>
														<label className="ablocks-form-builder-form-input">
															{ field.name }
														</label>
														<select
															className="ablocks-form-builder-form-select"
															value={
																value || ''
															}
															onChange={ (
																e
															) => {
																setAttributes( {
																	...attributes,
																	getResponseMapSelects:
																		{
																			...attributes.getResponseMapSelects,
																			[ field.customFieldId ]:
																				e
																					.target
																					.value ||
																				null,
																		},
																} );
															} }
														>
															{ ( field.customFieldId ===
															'email'
																? mapEmailOptions
																: mapOtherOptions
															).map(
																(
																	opt,
																	idx
																) => (
																	<option
																		key={
																			idx
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
