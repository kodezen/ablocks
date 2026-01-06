import { registerBlockType } from '@wordpress/blocks';
import attributes from './attributes';
import Edit from './edit';

import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		attributes,
		icon: <span className="ablocks-icon ablocks-icon--log-out"></span>,
		edit: Edit,
		save: () => {
			return null;
		},
	} );
}
