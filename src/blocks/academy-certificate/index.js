import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock, plugin_root_url } from '@Utils/helper';
if (
	isEnabledBlock( metadata.name, '', 'academy_lms' ) ||
	isEnabledBlock( metadata.name, '', 'quizpress' )
) {
	registerBlockType( metadata.name, {
		title: 'Certificate',
		attributes: metadata.attributes,
		icon: (
			<img
				className="ablocks-img-icon"
				src={ plugin_root_url + 'assets/images/logo-shape.svg' }
				alt="logo"
			/>
		),
		edit: Edit,
		save: Save,
	} );
}
