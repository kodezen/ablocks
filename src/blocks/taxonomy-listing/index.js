import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';

if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Taxonomy Listing',
		attributes: metadata.attributes,
		icon: (
			<span className="ablocks-icon ablocks-icon--taxonomy-listing"></span>
		),
		edit: Edit,
		save: () => {
			return null;
		},
	} );
}
