import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { isEnabledBlock } from '@Utils/helper';
import DeprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';

if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Stripe Button',
		attributes: metadata.attributes,
		icon: <span className="ablocks-icon ablocks-icon--block-button"></span>,
		edit: Edit,
		save: Save,
		deprecated: [
			{
				attributes: deprecatedMetadata?.attributes,
				// save: deprecatedSave,
				save: ( props ) => <DeprecatedSave { ...props } />,
			},
		],
	} );
}
