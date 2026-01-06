import { registerBlockType } from '@wordpress/blocks';
import attributes from './attributes';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { layout } from '@wordpress/icons';
registerBlockType( metadata.name, {
	attributes,
	icon: layout,
	edit: Edit,
	save: Save,
} );
