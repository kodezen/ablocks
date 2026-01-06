import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name, metadata.parent[ 0 ] ) ) {
	registerBlockType( metadata.name, {
		title: 'Single Accordion',
		attributes: metadata.attributes,
		edit: Edit,
		save: Save,
		icon: (
			<span className="ablocks-icon ablocks-icon--block-accordion-child"></span>
		),
	} );
}
