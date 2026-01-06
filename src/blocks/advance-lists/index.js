import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Advance lists',
		attributes: metadata.attributes,
		icon: <span className="ablocks-icon ablocks-icon--block-list"></span>,
		edit: Edit,
		save: Save,
	} );
}
