import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import DeprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';
import './style.css';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Notification',
		attributes: metadata.attributes,
		icon: <span className="ablocks-icon ablocks-icon--notification"></span>,
		edit: Edit,
		save: Save,
		deprecated: [
			{
				attributes: deprecatedMetadata.attributes,
				save: ( props ) => <DeprecatedSave { ...props } />,
			},
		],
	} );
}
