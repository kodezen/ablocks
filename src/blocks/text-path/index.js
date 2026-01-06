import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import deprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';

registerBlockType( metadata.name, {
	title: 'Text Path',
	icon: <span className="ablocks-icon ablocks-icon--text-path"></span>,
	attributes: metadata.attributes,
	edit: Edit,
	save: Save,
	deprecated: [
		{
			attributes: deprecatedMetadata.attributes,
			save: deprecatedSave,
		},
	],
} );
