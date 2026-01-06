import React, { useEffect } from 'react';
import {
	emailOptions,
	sendFormData,
	getDefaultData,
	findIndivisualEmailDetails,
} from '../../../helper';
import FormFieldWithAction from '../../Components/FormFieldWithAction';
import { __ } from '@wordpress/i18n';

export default function MailerLiteAction( { attributes, setAttributes } ) {
	const {
		formActions,
		mapOtherOptions,
		mailerliteOption,
		mailerliteApiKey,
		mailerliteValidateApi,
		mailerliteGroupId,
		mailerliteGroupIdOptions,
		mailerliteMapSelects,
		mapEmailOptions,
		allowReSubscribe,
		childDetails,
	} = attributes;

	useEffect( () => {
		if ( formActions.includes( 'mailerlite' ) ) {
			getDefaultData( 'mailerlite', setAttributes, attributes );
		}
	}, [ mailerliteOption, formActions ] );
	useEffect( () => {
		if (
			mailerliteGroupId !== 'default' &&
			( mailerliteMapSelects === 'default' ||
				mailerliteMapSelects === undefined )
		) {
			findIndivisualEmailDetails(
				'mailerlite',
				mailerliteApiKey,
				mailerliteGroupId,
				setAttributes,
				attributes
			);
		}
	}, [ mailerliteGroupId ] );
	useEffect( () => {
		if ( mailerliteApiKey !== '' ) {
			sendFormData(
				'mailerlite',
				mailerliteApiKey,
				setAttributes,
				attributes
			);
		}
	}, [ mailerliteApiKey ] );
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
				value={ mailerliteOption }
				onChange={ ( e ) =>
					setAttributes( { mailerliteOption: e.target.value } )
				}
				options={ emailOptions }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			{ mailerliteOption === 'custom' && (
				<FormFieldWithAction
					label="Custom Api Key"
					type="text"
					value={ mailerliteApiKey }
					onChange={ ( e ) =>
						setAttributes( { mailerliteApiKey: e.target.value } )
					}
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }
			{ ( mailerliteOption === 'default' || mailerliteApiKey !== '' ) && (
				<>
					<FormFieldWithAction
						label="Group"
						type="select"
						value={ mailerliteGroupId }
						onChange={ ( e ) =>
							setAttributes( {
								mailerliteGroupId: e.target.value,
							} )
						}
						options={ mailerliteGroupIdOptions }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					{ mailerliteGroupId !== 'default' &&
						mailerliteValidateApi === true && (
							<>
								<div className="mailerlite-section__field-map-group">
									<label className="mailerlite-section__label">
										Field Map
									</label>
									<hr className="mailerlite-section__divider" />
									{ attributes?.mailerliteMapFields &&
										attributes?.mailerliteMapSelects &&
										attributes?.mailerliteMapFields.map(
											( field, fieldIndex ) => {
												const value =
													mailerliteMapSelects?.[
														field.key
													] || '';
												return (
													<div
														key={ fieldIndex }
														className="mailerlite-section__field-group"
													>
														<label className="mailerlite-section__label">
															{ field.title }
														</label>
														<select
															className="mailerlite-section__select"
															value={ value }
															onChange={ (
																e
															) => {
																setAttributes( {
																	...attributes,
																	mailerliteMapSelects:
																		{
																			...attributes.mailerliteMapSelects,
																			[ field.key ]:
																				e
																					.target
																					.value ||
																				null,
																		},
																} );
															} }
														>
															{ ( field.key ===
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
								<div className="mailerlite-section__toggle-group">
									<label className="mailerlite-section__toggle-label">
										<input
											type="checkbox"
											checked={ !! allowReSubscribe }
											onChange={ ( e ) =>
												setAttributes( {
													allowReSubscribe:
														e.target.checked,
												} )
											}
										/>
										{ __(
											'Allow Re-Subscribe',
											'ablocks'
										) }
									</label>
								</div>
							</>
						) }
				</>
			) }
		</div>
	);
}
