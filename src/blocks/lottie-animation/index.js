import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Lottie Animation',
		attributes: metadata.attributes,
		edit: Edit,
		save: Save,
		icon: (
			<span className="ablocks-icon ablocks-icon--lottie-animation"></span>
		),
	} );
}
