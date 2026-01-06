import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	title: 'QR Code',
	attributes: metadata.attributes,
	icon: <span className="ablocks-icon ablocks-icon--qr-code"></span>,
	edit: Edit,
	save: Save,
} );
