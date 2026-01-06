import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import './styles.scss';

import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Map',
		attributes: metadata.attributes,
		edit: Edit,
		save: () => {
			return null;
		},
		icon: <span className="ablocks-icon ablocks-icon--map"></span>,
	} );
}
