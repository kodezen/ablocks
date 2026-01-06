import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { plugin_root_url, isEnabledBlock } from '@Utils/helper';
if (
	isEnabledBlock( metadata.name, metadata.parent[ 0 ], 'academy_lms' ) ||
	isEnabledBlock( metadata.name, metadata.parent[ 0 ], 'quizpress' )
) {
	registerBlockType( metadata.name, {
		title: 'Certificate Container',
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
