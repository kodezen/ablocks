import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name, 'ablocks/menu' ) ) {
	registerBlockType( metadata.name, {
		title: 'Sub Menu',
		attributes: metadata.attributes,
		edit: Edit,
		save: Save,
		icon: <span className="ablocks-icon ablocks-icon--submenu"></span>,
	} );
}
