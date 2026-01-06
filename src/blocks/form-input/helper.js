import { __ } from '@wordpress/i18n';

export const inputTypeOptions = [
	{
		label: __( 'Text', 'ablocks' ),
		value: 'Text',
	},
	{
		label: __( 'Number', 'ablocks' ),
		value: 'Number',
	},
	{
		label: __( 'Username', 'ablocks' ),
		value: 'Username',
	},
	{
		label: __( 'Email', 'ablocks' ),
		value: 'Email',
	},
	{
		label: __( 'URL', 'ablocks' ),
		value: 'URL',
	},
];
export const nameList = [
	{
		label: __( 'first_name', 'ablocks' ),
		value: 'first_name',
	},
	{
		label: __( 'last_name', 'ablocks' ),
		value: 'last_name',
	},
	{
		label: __( 'custom', 'ablocks' ),
		value: 'custom',
	},
];
export const getStandardAutocomplete = ( name ) => {
	switch ( name ) {
		case 'first_name':
			return 'given-name';
		case 'last_name':
			return 'family-name';
		case 'email':
			return 'email';
		case 'username':
			return 'username';
		case 'url':
			return 'url';
		default:
			return 'off';
	}
};
