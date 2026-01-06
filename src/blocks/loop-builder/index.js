import { registerBlockType } from '@wordpress/blocks';
import attributes from './attributes';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	attributes,
	icon: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path d="M16 15L24 15 20 20zM8 9L0 9 4 4z"></path>
			<path d="M21 6c0-1.654-1.346-3-3-3H7.161l1.6 2H18c.551 0 1 .448 1 1v10h2V6zM3 18c0 1.654 1.346 3 3 3h10.839l-1.6-2H6c-.551 0-1-.448-1-1V8H3V18z"></path>
		</svg>
	),

	edit: Edit,
	save: Save,
} );
