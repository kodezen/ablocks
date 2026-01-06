import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import deprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name, metadata.parent[ 0 ] ) ) {
	registerBlockType( metadata.name, {
		title: 'Toggle child',
		attributes: metadata.attributes,
		edit: Edit,
		save: Save,
		icon: <span className="ablocks-icon ablocks-icon--block-toggle"></span>,
		deprecated: [
			{
				attributes: deprecatedMetadata.attributes,
				save: deprecatedSave,
			},
		],
	} );
}
