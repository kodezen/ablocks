import { Toolbar } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

export const MyToolbar = ( { handleNewBlock } ) => {
	return (
		<BlockControls group="block">
			<Toolbar>
				<button onClick={ handleNewBlock }>Add New Item</button>
			</Toolbar>
		</BlockControls>
	);
};
