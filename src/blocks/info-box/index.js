import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { variations } from './variations';
import { isEnabledBlock } from '@Utils/helper';
import deprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		attributes: metadata.attributes,
		icon: <span className="ablocks-icon ablocks-icon--info-box"></span>,
		edit: Edit,
		save: Save,
		variations,
		deprecated: [
			{
				attributes: deprecatedMetadata.attributes,
				save: deprecatedSave,
			},
		],
	} );
}
