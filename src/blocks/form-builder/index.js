import { registerBlockType } from '@wordpress/blocks';
import { variations } from './variations';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
import deprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';

import './styles.scss';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		attributes: metadata.attributes,
		icon: <span className="ablocks-icon   ablocks-icon--form"></span>,
		edit: Edit,
		save: Save,
		deprecated: [
			{
				attributes: deprecatedMetadata.attributes,
				save: deprecatedSave,
			},
		],
		variations,
	} );
}
