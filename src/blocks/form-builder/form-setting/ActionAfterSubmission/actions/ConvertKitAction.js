import React, { useEffect } from 'react';
import { emailOptions, sendFormData, getDefaultData } from '../../../helper';
import FormFieldWithAction from '../../Components/FormFieldWithAction';

export default function ConvertKitAction( { attributes, setAttributes } ) {
	const {
		formActions,
		mapOtherOptions,
		mapEmailOptions,
		convertkitOption,
		convertkitApiKey,
		convertkitValidateApi,
		convertkitFormId,
		convertkitFormIdOptions,
		convertkitEmailSelects,
		convertkitFirstNameSelects,
		convertkitTagsOptions,
		convertkitTagsSelects,
		childDetails,
	} = attributes;

	useEffect( () => {
		if ( formActions.includes( 'convertkit' ) ) {
			getDefaultData( 'convertkit', setAttributes, attributes );
		}
	}, [ convertkitOption ] );
	useEffect( () => {
		if ( convertkitApiKey !== '' ) {
			sendFormData(
				'convertkit',
				convertkitApiKey,
				setAttributes,
				attributes
			);
		}
	}, [ convertkitApiKey ] );
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
				value={ convertkitOption }
				onChange={ ( e ) =>
					setAttributes( { convertkitOption: e.target.value } )
				}
				options={ emailOptions }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			{ convertkitOption === 'custom' && (
				<FormFieldWithAction
					label="Custom Api Key"
					type="text"
					value={ convertkitApiKey }
					onChange={ ( e ) =>
						setAttributes( { convertkitApiKey: e.target.value } )
					}
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }
			{ ( convertkitOption === 'default' || convertkitApiKey !== '' ) && (
				<>
					<FormFieldWithAction
						label="List"
						type="select"
						value={ convertkitFormId }
						onChange={ ( e ) =>
							setAttributes( {
								convertkitFormId: e.target.value,
							} )
						}
						options={ convertkitFormIdOptions }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					{ convertkitFormId !== 'default' &&
						convertkitValidateApi === true && (
							<>
								<h4 className="convertkit-section__label">
									Field Map
								</h4>
								<hr className="convertkit-section__divider" />
								<FormFieldWithAction
									label="Email"
									type="select"
									value={ convertkitEmailSelects }
									onChange={ ( e ) =>
										setAttributes( {
											convertkitEmailSelects:
												e.target.value,
										} )
									}
									options={ mapEmailOptions }
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
								<FormFieldWithAction
									label="First Name"
									type="select"
									value={ convertkitFirstNameSelects }
									onChange={ ( e ) =>
										setAttributes( {
											convertkitFirstNameSelects:
												e.target.value,
										} )
									}
									options={ mapOtherOptions }
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
								<FormFieldWithAction
									label="Tags"
									type="select"
									selectMultiple={ true }
									value={ convertkitTagsSelects || [] }
									onChange={ ( e ) => {
										const selected = Array.from(
											e.target.selectedOptions,
											( option ) => option.value
										);
										setAttributes( {
											convertkitTagsSelects: selected,
										} );
									} }
									options={ convertkitTagsOptions }
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
