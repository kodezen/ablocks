import { select } from '@wordpress/data';

const Form_Field_blocks = [
	'ablocks/form-input',
	'ablocks/form-password',
	'ablocks/form-email',
	'ablocks/form-textarea',
	'ablocks/form-checkbox',
	'ablocks/form-select',
	'ablocks/form-radio',
	'ablocks/form-hidden',
	'ablocks/form-rating',
	'ablocks/form-datepicker',
	'ablocks/form-upload',
	'ablocks/form-timepicker',
];

// Helper function to extract all nested names recursively
export function getAllNestedNames( block ) {
	const names = [];
	if ( block.attributes?.name ) {
		names.push( block.attributes.name );
	}
	if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
		block.innerBlocks.forEach( ( inner ) => {
			names.push( ...getAllNestedNames( inner ) );
		} );
	}
	return names;
}

// Helper function to extract block info and all its nested innerBlocks recursively
export function extractBlocksData( blocks ) {
	return blocks.map( ( block ) => ( {
		name: block.name,
		clientId: block.clientId,
		attributes: block.attributes,
		innerBlocks:
			block.innerBlocks && block.innerBlocks.length
				? extractBlocksData( block.innerBlocks )
				: [],
	} ) );
}

// Function to generate childAttributes from childBlocks
export function generateChildAttributes( childBlocks ) {
	return childBlocks.map( ( block ) => ( {
		name: block.name,
		attributes: block.attributes,
		clientId: block.clientId,
	} ) );
}

// Function to generate innerBlockDetails from childBlocks
export function generateInnerBlockDetails( childBlocks ) {
	return childBlocks.flatMap( ( block ) => {
		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			return extractBlocksData( block.innerBlocks )
				.flatMap( ( inner ) => getAllNestedNames( inner ) )
				.filter( Boolean );
		}
		return [];
	} );
}

// Function to detect duplicate field names
export function getDuplicateFieldNames( innerBlocks ) {
	const childAttributes = innerBlocks
		.map( ( block ) => block.attributes?.name )
		.filter( Boolean );
	const innerBlockDetails = innerBlocks.flatMap( ( block ) => {
		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			return block.innerBlocks.flatMap( ( inner ) =>
				getAllNestedNames( inner )
			);
		}
		return [];
	} );

	const allFieldNames = [ ...childAttributes, ...innerBlockDetails ];
	const duplicateNames = allFieldNames.filter(
		( name, index ) => allFieldNames.indexOf( name ) !== index
	);
	return [ ...new Set( duplicateNames ) ];
}

// is name is empty should be detected
function getAllNestedNamesIncludingEmpty( block ) {
	const names = [];
	if ( Form_Field_blocks.includes( block.name ) ) {
		names.push( block.attributes?.name || '' );
	}
	if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
		block.innerBlocks.forEach( ( inner ) => {
			names.push( ...getAllNestedNamesIncludingEmpty( inner ) );
		} );
	}
	return names;
}

export function getEmptyFieldNames( innerBlocks ) {
	const childAttributes = innerBlocks
		.filter( ( block ) => Form_Field_blocks.includes( block.name ) )
		.map( ( block ) => block.attributes?.name || '' )
		.filter( ( name ) => name.trim() === '' );

	const innerBlockDetails = innerBlocks.flatMap( ( block ) => {
		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			return block.innerBlocks.flatMap( ( inner ) =>
				getAllNestedNamesIncludingEmpty( inner )
			);
		}
		return [];
	} );
	return [
		...childAttributes,
		...innerBlockDetails.filter( ( name ) => name.trim() === '' ),
	];
}
