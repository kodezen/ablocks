import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import { isEnabledBlock, plugin_root_url } from '@Utils/helper';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Dynamic Text',
		attributes: metadata.attributes,
		icon: <span className="ablocks-icon ablocks-icon--dynamic-text"></span>,
		edit: Edit,
		save: () => {
			return null;
		},
	} );
}
