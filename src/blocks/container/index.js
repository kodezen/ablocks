import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { variations } from './variations';
import deprecatedSave from './deprecated/save';
import deprecatedSave2 from './deprecated/save2';
import deprecatedMetadata from './deprecated/block.json';
import deprecatedMetadata2 from './deprecated/block2.json';
import { isEnabledBlock } from '@Utils/helper';
import './styles.scss';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Container',
		attributes: metadata.attributes,
		icon: (
			<span className="ablocks-icon ablocks-icon--block-container"></span>
		),
		edit: Edit,
		save: Save,
		// variations,
		deprecated: [
			{
				attributes: deprecatedMetadata.attributes,
				save: deprecatedSave,
			},
			{
				attributes: deprecatedMetadata2.attributes,
				save: deprecatedSave2,
			},
		],
	} );
}
