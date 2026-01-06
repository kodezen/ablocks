import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import Save from './save';
import './style.css';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Scroll to Top',
		attributes: metadata.attributes,
		icon: <span className="ablocks-icon ablocks-icon--back-to-top"></span>,
		edit: Edit,
		save: Save,
	} );
}
