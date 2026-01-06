import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import { plugin_root_url } from '@Utils/helper';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name, '', 'storeengine' ) ) {
	registerBlockType( metadata.name, {
		title: 'StoreEngine Checkout Form',
		attributes: metadata.attributes,
		icon: (
			<img
				className="ablocks-img-icon"
				src={ plugin_root_url + 'assets/images/storeengine.svg' }
				alt="logo"
			/>
		),
		edit: Edit,
		save: () => {
			return null;
		},
	} );
}
