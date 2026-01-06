import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name, metadata.parent[ 0 ] ) ) {
	registerBlockType( metadata.name, {
		title: 'Tabs Child',
		icon: (
			<span className="ablocks-icon ablocks-icon--block-tab-child"></span>
		),
		attributes: metadata.attributes,
		edit: Edit,
		save: Save,
	} );
}
