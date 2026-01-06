import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import deprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';
import { isEnabledBlock } from '@Utils/helper';
import './styles.scss';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Dual Button',
		attributes: metadata.attributes,
		icon: (
			<>
				<span className="ablocks-icon ablocks-icon--block-button"></span>
				<span className="ablocks-icon ablocks-icon--block-button"></span>
			</>
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
