import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import { plugin_root_url } from '@Utils/helper';

registerBlockType( metadata.name, {
	title: 'Frontend Dashboard',
	attributes: metadata.attributes,
	icon: (
		<span className="ablocks-icon ablocks-icon--frontend-dashboard"></span>
	),
	edit: Edit,
	save: () => {
		return null;
	},
} );
