import { Toolbar } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

export const MyToolbar = ( { handleNewBlock, handleMegaBlock } ) => {
	return (
		<BlockControls group="block">
			<Toolbar>
				<button onClick={ handleNewBlock }>Submenu</button>
				<button onClick={ handleMegaBlock }>Mega Menu</button>
			</Toolbar>
		</BlockControls>
	);
};
