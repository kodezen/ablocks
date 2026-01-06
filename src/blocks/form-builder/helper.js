import {
	alignLeft,
	alignJustify,
	alignCenter,
	alignRight,
} from '@wordpress/icons';
import { makeRequest, is_pro } from '@Utils/helper';
import { __ } from '@wordpress/i18n';
import ControlLabel from '@Components/control-label';

export const TOOLBAR_ALIGNMENT_OPTIONS = [
	{
		icon: alignLeft,
		title: __( 'Align text left' ),
		align: 'left',
	},
	{
		icon: alignCenter,
		title: __( 'Align text center' ),
		align: 'center',
	},
	{
		icon: alignRight,
		title: __( 'Align text right' ),
		align: 'right',
	},
	{
		icon: alignJustify,
		title: __( 'Align text justify' ),
		align: 'justify',
	},
];
function updateMailchimpListOptions(
	emailType,
	response,
	attributes,
	setAttributes
) {
	if ( emailType === 'mailchimp' ) {
		const mailchimpArr = response?.data?.data?.lists;
		if ( Array.isArray( mailchimpArr ) ) {
			const result = mailchimpArr.map( ( list ) => ( {
				label: list.name, // Assuming 'name' is a property of each list
				value: list.id, // Assuming 'id' is a property of each list
			} ) );

			// Filter out already existing items in mailchimpListIdOptions
			const newOptions = result.filter(
				( item ) =>
					! attributes.mailchimpListIdOptions.some(
						( existingItem ) =>
							existingItem.label === item.label &&
							existingItem.value === item.value
					)
			);

			setAttributes( {
				mailchimpListIdOptions: [
					...attributes.mailchimpListIdOptions,
					...newOptions,
				],
				mailchimpValidateApi: true,
			} );
		} else {
			setAttributes( {
				mailchimpListIdOptions: [
					{ label: 'select options', value: 'default' },
				],
				mailchimpValidateApi: false,
			} );
		}
	}
}
function updateMailerLiteGroupOptions(
	typeOfEmail,
	response,
	attributes,
	setAttributes
) {
	if ( typeOfEmail === 'mailerlite' ) {
		const mailerLiteArr = response?.data?.data?.groups;
		if ( Array.isArray( mailerLiteArr ) ) {
			const result = mailerLiteArr.map( ( list ) => ( {
				label: list.name, // Assuming 'name' is a property of each list
				value: list.id, // Assuming 'id' is a property of each list
			} ) );

			// Filter out already existing items in mailerliteGroupIdOptions
			const newOptions = result.filter(
				( item ) =>
					! attributes.mailerliteGroupIdOptions.some(
						( existingItem ) =>
							existingItem.label === item.label &&
							existingItem.value === item.value
					)
			);

			setAttributes( {
				mailerliteGroupIdOptions: [
					...attributes.mailerliteGroupIdOptions,
					...newOptions,
				],
				mailerliteValidateApi: true,
			} );
		} else {
			setAttributes( {
				mailerliteGroupIdOptions: [
					{ label: 'select options', value: 'default' },
				],
				mailerliteValidateApi: false,
			} );
		}
	}
}
function updateDripAccountOptions(
	typeOfEmail,
	response,
	attributes,
	setAttributes
) {
	if ( typeOfEmail === 'drip' ) {
		const dripArr = response?.data?.data?.accounts;
		if ( Array.isArray( dripArr ) ) {
			const result = dripArr.map( ( account ) => ( {
				label: account.name, // Assuming 'name' is a property of each account
				value: account.id, // Assuming 'id' is a property of each account
			} ) );

			// Filter out already existing items in dripAccountIdOptions
			const newOptions = result.filter(
				( item ) =>
					! attributes.dripAccountIdOptions.some(
						( existingItem ) =>
							existingItem.label === item.label &&
							existingItem.value === item.value
					)
			);

			setAttributes( {
				dripAccountIdOptions: [
					...attributes.dripAccountIdOptions,
					...newOptions,
				],
				dripValidateApi: true,
			} );
		} else {
			setAttributes( {
				dripAccountIdOptions: [
					{ label: 'select options', value: 'default' },
				],
				dripValidateApi: false,
			} );
		}
	}
}
function updateGetResponseListOptions(
	typeOfEmail,
	response,
	attributes,
	setAttributes
) {
	if ( typeOfEmail === 'getresponse' ) {
		const getResponseArr = response?.data?.data?.campaigns;
		if ( Array.isArray( getResponseArr ) ) {
			const result = getResponseArr.map( ( list ) => ( {
				label: list.name, // Assuming 'name' is a property of each list
				value: list.campaignId, // Assuming 'id' is a property of each list
			} ) );

			// Filter out already existing items in getResponseListIdOptions
			const newOptions = result.filter(
				( item ) =>
					! attributes.getResponseListIdOptions.some(
						( existingItem ) =>
							existingItem.label === item.label &&
							existingItem.value === item.value
					)
			);

			setAttributes( {
				getResponseListIdOptions: [
					...attributes.getResponseListIdOptions,
					...newOptions,
				],
				getResponseValidateApi: true,
			} );
		} else {
			setAttributes( {
				getResponseListIdOptions: [
					{ label: 'select options', value: 'default' },
				],
				getResponseValidateApi: false,
			} );
		}
	}
}

function updateConvertKitFormOptions(
	typeOfEmail,
	response,
	attributes,
	setAttributes
) {
	if ( typeOfEmail === 'convertkit' ) {
		const convertkitArr = response?.data?.data?.forms?.forms;
		const convertkitTag = response?.data?.data?.tags;
		if ( Array.isArray( convertkitTag ) ) {
			const tags = convertkitTag.map( ( form ) => ( {
				label: form.name,
				value: form.id,
			} ) );
			setAttributes( {
				convertkitTagsOptions: tags,
			} );
		}
		if ( Array.isArray( convertkitArr ) ) {
			const result = convertkitArr.map( ( form ) => ( {
				label: form.name, // Assuming 'name' is a property of each form
				value: form.id, // Assuming 'id' is a property of each form
			} ) );

			// Filter out already existing items in convertkitFormIdOptions
			const newOptions = result.filter(
				( item ) =>
					! attributes.convertkitFormIdOptions.some(
						( existingItem ) =>
							existingItem.label === item.label &&
							existingItem.value === item.value
					)
			);

			setAttributes( {
				convertkitFormIdOptions: [
					...attributes.convertkitFormIdOptions,
					...newOptions,
				],
				convertkitValidateApi: true,
			} );
		} else {
			setAttributes( {
				convertkitFormIdOptions: [
					{ label: 'select options', value: 'default' },
				],
				convertkitValidateApi: false,
			} );
		}
	}
}

export async function sendFormData(
	typeOfEmail,
	api_key,
	setAttributes,
	attributes
) {
	try {
		// Make the request
		const response = await makeRequest( {
			action: 'ablocks/form_builder_action_setting_data',
			type: typeOfEmail,
			api: api_key,
		} );
		if ( typeOfEmail === 'mailchimp' ) {
			updateMailchimpListOptions(
				typeOfEmail,
				response,
				attributes,
				setAttributes
			);
		}
		if ( typeOfEmail === 'mailerlite' ) {
			updateMailerLiteGroupOptions(
				typeOfEmail,
				response,
				attributes,
				setAttributes
			);
		}
		if ( typeOfEmail === 'drip' ) {
			updateDripAccountOptions(
				typeOfEmail,
				response,
				attributes,
				setAttributes
			);
		}
		if ( typeOfEmail === 'getresponse' ) {
			updateGetResponseListOptions(
				typeOfEmail,
				response,
				attributes,
				setAttributes
			);
		}
		if ( typeOfEmail === 'convertkit' ) {
			updateConvertKitFormOptions(
				'convertkit',
				response,
				attributes,
				setAttributes
			);
		}
	} catch ( error ) {
		if ( typeOfEmail === 'mailchimp' ) {
			setAttributes( {
				mailchimpListIdOptions: [
					{ label: 'select options', value: 'default' },
				],
			} );
		}
	}
}
export const getDefaultData = async (
	emailType,
	setAttributes,
	attributes
) => {
	const response = await makeRequest( {
		action: 'ablocks/form_builder_action_setting_data',
		type: emailType,
	} );
	if ( emailType === 'mailchimp' && response.data.success === true ) {
		updateMailchimpListOptions(
			emailType,
			response,
			attributes,
			setAttributes
		);
	}
	if ( emailType === 'mailerlite' && response.data.success === true ) {
		updateMailerLiteGroupOptions(
			emailType,
			response,
			attributes,
			setAttributes
		);
	}
	if ( emailType === 'drip' && response.data.success === true ) {
		updateDripAccountOptions(
			emailType,
			response,
			attributes,
			setAttributes
		);
	}
	if ( emailType === 'getresponse' && response.data.success === true ) {
		updateGetResponseListOptions(
			'getresponse',
			response,
			attributes,
			setAttributes
		);
	}
	if ( emailType === 'convertkit' && response.data.success === true ) {
		updateConvertKitFormOptions(
			'convertkit',
			response,
			attributes,
			setAttributes
		);
	}
};
export const setRoles = async ( setAttribute ) => {
	const response = await makeRequest( {
		action: 'ablocks/registration_form_setting_data',
	} );
	if ( response.data.success ) {
		const transformedArray = Object.entries( response.data.data ).map(
			( [ value, label ] ) => ( { label, value } )
		);
		setAttribute( {
			userRoles: transformedArray,
		} );
	}
};
export const findIndivisualEmailDetails = async (
	emailType,
	api_key,
	mailListId,
	setAttributes
) => {
	let response;
	if ( api_key ) {
		response = await makeRequest( {
			action: 'ablocks/form_builder_action_setting_data',
			type: emailType,
			list_id: mailListId,
			api: api_key,
		} );
	} else {
		response = await makeRequest( {
			action: 'ablocks/form_builder_action_setting_data',
			type: emailType,
			list_id: mailListId,
		} );
	}

	if ( emailType === 'mailchimp' && response.data.success === true ) {
		const mailchimpContents = response.data.data;
		const mailchimpGroupsList = mailchimpContents?._group_list;
		const mailchimpFieldList = mailchimpContents._field_list;
		// Check if mailchimpGroupsList exists before proceeding
		if ( mailchimpGroupsList ) {
			const mailchimpGroup = Object.entries( mailchimpGroupsList ).map(
				( [ value, label ] ) => ( {
					value,
					label,
				} )
			);

			// Set the updated options in attributes
			setAttributes( {
				mailchimpgroupsOptions: mailchimpGroup,
			} );
		}
		if ( mailchimpFieldList ) {
			// Create an object to hold the desired output format
			const defaultValues = {};

			// Loop through the data array
			mailchimpFieldList.forEach( ( field ) => {
				const tag = field.tag; // Extract the tag
				defaultValues[ tag ] = 'default'; // Assign empty string as the value for the tag
			} );

			// Result: object with tags as keys and empty strings as values
			const transformedObject = mailchimpFieldList.reduce(
				( acc, { tag } ) => {
					acc[ tag ] = 'default';
					return acc;
				},
				{}
			);
			setAttributes( {
				mailchimpMapFields: [ ...mailchimpFieldList ],
				mailchimpMapSelects: { ...defaultValues },
				...transformedObject,
			} );
		}
	}
	if ( emailType === 'mailerlite' && response.data.success === true ) {
		const mailerliteContents = response.data.data;
		const mailerliteFieldList = mailerliteContents.fields;
		// Check if mailchimpGroupsList exists before proceeding
		if ( mailerliteFieldList ) {
			// Create an object to hold the desired output format
			const defaultValues = {};

			// Loop through the data array
			mailerliteFieldList.forEach( ( field ) => {
				const key = field.key; // Extract the tag
				defaultValues[ key ] = 'default'; // Assign empty string as the value for the tag
			} );

			// Result: object with tags as keys and empty strings as values
			const transformedObject = mailerliteFieldList.reduce(
				( acc, { key } ) => {
					acc[ key ] = 'default';
					return acc;
				},
				{}
			);
			setAttributes( {
				mailerliteMapFields: [ ...mailerliteFieldList ],
				mailerliteMapSelects: { ...defaultValues },
				...transformedObject,
			} );
		}
	}
	if ( emailType === 'drip' && response.data.success === true ) {
		const dripContents = response.data.data;
		const dripFieldList = dripContents._field_list;
		// Check if mailchimpGroupsList exists before proceeding
		if ( dripFieldList ) {
			// Create an object to hold the desired output format
			const defaultValues = {};

			// Loop through the data array
			dripFieldList.forEach( ( field ) => {
				const tag = field.tag; // Extract the tag
				defaultValues[ tag ] = 'default'; // Assign empty string as the value for the tag
			} );

			// Result: object with tags as keys and empty strings as values
			const transformedObject = dripFieldList.reduce(
				( acc, { tag } ) => {
					acc[ tag ] = 'default';
					return acc;
				},
				{}
			);
			setAttributes( {
				dripMapFields: [ ...dripFieldList ],
				dripMapSelects: { ...defaultValues },
				...transformedObject,
			} );
		}
	}
	if ( emailType === 'getresponse' && response.data.success === true ) {
		const getresponseContents = response.data.data;
		const getresponseFieldList = getresponseContents.fields;
		// Check if mailchimpGroupsList exists before proceeding
		if ( getresponseFieldList ) {
			// Create an object to hold the desired output format
			const defaultValues = {};
			// Loop through the data array
			getresponseFieldList.forEach( ( field ) => {
				const customFieldId = field.customFieldId; // Extract the tag
				defaultValues[ customFieldId ] = 'default'; // Assign empty string as the value for the tag
			} );

			// Result: object with tags as keys and empty strings as values
			const transformedObject = getresponseFieldList.reduce(
				( acc, { customFieldId } ) => {
					acc[ customFieldId ] = 'default';
					return acc;
				},
				{}
			);
			setAttributes( {
				getResponseMapFields: [ ...getresponseFieldList ],
				getResponseMapSelects: { ...defaultValues },
				...transformedObject,
			} );
		}
	}
	if ( emailType === 'convertkit' && response.data.success === true ) {
		const convertkitContents = response.data.data;
		const convertkitFieldList = convertkitContents._field_list;
		// Check if mailchimpGroupsList exists before proceeding
		if ( convertkitFieldList ) {
			// Create an object to hold the desired output format
			const defaultValues = {};

			// Loop through the data array
			convertkitFieldList.forEach( ( field ) => {
				const tag = field.tag; // Extract the tag
				defaultValues[ tag ] = 'default'; // Assign empty string as the value for the tag
			} );

			// Result: object with tags as keys and empty strings as values
			const transformedObject = convertkitFieldList.reduce(
				( acc, { tag } ) => {
					acc[ tag ] = 'default';
					return acc;
				},
				{}
			);
			setAttributes( {
				convertkitMapFields: [ ...convertkitFieldList ],
				convertkitMapSelects: { ...defaultValues },
				...transformedObject,
			} );
		}
	}
};

export const buttonSizeOption = [
	{ label: __( 'Default', 'ablocks' ), value: 'default' },
	{ label: __( 'Small', 'ablocks' ), value: 'small' },
	{ label: __( 'Medium', 'ablocks' ), value: 'medium' },
	{ label: __( 'Large', 'ablocks' ), value: 'large' },
	{ label: __( 'Extra Large', 'ablocks' ), value: 'extra-large' },
	{ label: __( 'Full Width', 'ablocks' ), value: 'full-width' },
];
const getLabel = ( label ) => {
	if ( is_pro ) {
		return label; // Simple label when enabled
	}

	return (
		<div
			style={ { justifyContent: 'left' } }
			className="ablocks-pro-toggle__label-control"
		>
			<ControlLabel label={ label } isResponsive={ false } />
			<span className="ablocks-icon ablocks-icon--lock"></span>
		</div>
	);
};
export const ationTypes = [
	{ label: __( 'Collect Submission', 'ablocks' ), value: 'submission' },

	{ label: __( 'Mailchimp', 'ablocks' ), value: 'mailchimp' },
	{
		label: getLabel( __( 'Mailerlite', 'ablocks' ) ),
		value: 'mailerlite',
		isDisabled: ! is_pro ? true : false,
	},
	{
		label: getLabel( __( 'Drip', 'ablocks' ) ),
		value: 'drip',
		isDisabled: ! is_pro ? true : false,
	},
	{
		label: getLabel( __( 'GetResponse', 'ablocks' ) ),
		value: 'getResponse',
		isDisabled: ! is_pro ? true : false,
	},
	{
		label: getLabel( __( 'Convertkit', 'ablocks' ) ),
		value: 'convertkit',
		isDisabled: ! is_pro ? true : false,
	},
	{
		label: getLabel( __( 'Webhook', 'ablocks' ) ),
		value: 'webhook',
		isDisabled: ! is_pro ? true : false,
	},
];
export const emailOptions = [
	{ label: __( 'Default', 'ablocks' ), value: 'default' },
	{ label: __( 'Custom', 'ablocks' ), value: 'custom' },
];
export const submissionDataOption = [
	{ label: __( 'User IP', 'ablocks' ), value: 'userIp' },
	{ label: __( 'User Agent', 'ablocks' ), value: 'userAgent' },
];
