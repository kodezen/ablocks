export const emailGenericTags = [
	{
		label: 'User Email',
		value: 'user_email',
	},
	{
		label: 'Admin Email',
		value: 'admin_email',
	},
];
export const subjectGenericTags = [
	{ label: 'All Data', value: 'all-data' },
	{
		label: 'Site Title',
		value: 'site_title',
	},
	{
		label: 'Site Name',
		value: 'site_name',
	},
];
export const getAllFieldNames = (
	childAttributes = [],
	innerBlockDetails = [],
	isEmail = false
) => {
	const cleanLabel = ( label = '' ) => {
		const parts = label.split( '-' );
		return parts[ 0 ]?.trim() || label;
	};
	const fields = [
		...childAttributes
			.map( ( c ) => {
				const name = c.attributes?.name?.trim();
				const label = c.attributes?.label?.trim();

				return name
					? {
							label: label || name,
							value: name,
					  }
					: null;
			} )
			.filter( Boolean ),
		...innerBlockDetails
			.map( ( item ) =>
				item ? { label: cleanLabel( item ), value: item } : null
			)
			.filter( Boolean ),
	];
	if ( isEmail ) {
		return fields.filter( ( f ) =>
			f.label?.toLowerCase().includes( 'email' )
		);
	}
	return fields;
};
