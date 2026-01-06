import { registerBlockType } from '@wordpress/blocks';
import attributes from './attributes';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name ) ) {
	console.log( metadata.name );
	registerBlockType( metadata.name, {
		attributes,
		icon: <span className="ablocks-icon ablocks-icon--player"></span>,
		edit: Edit,
		save: Save,
	} );
}
