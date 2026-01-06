import { store as blockEditorStore } from '@wordpress/block-editor';
import { select } from '@wordpress/data';

export const isBlockInsideAnyParent = ( clientId, parentBlockNames ) => {
	const { getBlockParents } = select( blockEditorStore );
	const parentIds = getBlockParents( clientId );

	return parentIds.some( ( parentId ) => {
		const parentBlock = select( blockEditorStore ).getBlock( parentId );
		return parentBlockNames.includes( parentBlock?.name );
	} );
};
