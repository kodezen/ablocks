import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import DeprecatedSavePrev from './deprecated/savePrev';
import deprecatedMetadataPrev from './deprecated/blockPrev.json';
import DeprecatedSave from './deprecated/save';
import deprecatedMetadata from './deprecated/block.json';
import { isEnabledBlock } from '@Utils/helper';
if ( isEnabledBlock( metadata.name ) ) {
	registerBlockType( metadata.name, {
		title: 'Tabs',
		icon: <span className="ablocks-icon ablocks-icon--block-tab"></span>,
		attributes: metadata.attributes,
		edit: Edit,
		save: Save,
		deprecated: [
			{
				attributes: deprecatedMetadataPrev.attributes,
				save: DeprecatedSavePrev,
			},
			{
				attributes: deprecatedMetadata.attributes,
				save: ( props ) => <DeprecatedSave { ...props } />,
			},
		],
	} );
}
