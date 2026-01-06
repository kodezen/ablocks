import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
import deprecatedSave from './deprecated/save';
import DeprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Chart',
		attributes: metadata.attributes,
		icon: <span className="ablocks-icon ablocks-icon--chart"></span>,
		edit: Edit,
		save: Save,
		deprecated: [
			{
				attributes: deprecatedMetadata?.attributes,
				save: deprecatedSave,
			},
		],
	} );
}
