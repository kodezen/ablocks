import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
import './style.css';
import deprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Filterable Cards',
		attributes: metadata.attributes,
		icon: (
			<span className="ablocks-icon ablocks-icon--filterable-card"></span>
		),
		edit: Edit,
		save: Save,
		deprecated: [
			{
				attributes: deprecatedMetadata.attributes,
				save: deprecatedSave,
			},
		],
	} );
}
