import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import './styles.scss';
import { isEnabledBlock } from '@Utils/helper';
import deprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';

if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Social Shares',
		attributes: metadata.attributes,
		edit: Edit,
		save: Save,
		icon: (
			<span className="ablocks-icon  ablocks-icon--social-share"></span>
		),
		deprecated: [
			{
				attributes: deprecatedMetadata.attributes,
				save: deprecatedSave,
			},
		],
	} );
}
