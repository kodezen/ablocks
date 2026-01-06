import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import { isEnabledBlock, plugin_root_url } from '@Utils/helper';
if ( isEnabledBlock( metadata.name, '', 'academy_lms' ) ) {
	registerBlockType( metadata.name, {
		title: 'Academy Course Searchbar',
		attributes: metadata.attributes,
		icon: (
			<img
				className="ablocks-img-icon"
				src={ plugin_root_url + 'assets/images/academy-lms.svg' }
				alt="logo"
			/>
		),
		edit: Edit,
		save: () => {
			return null;
		},
	} );
}
