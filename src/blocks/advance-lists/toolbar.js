import React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const CustomToolbar = ( { handleNewMenuItem } ) => {
	return (
		<BlockControls>
			<ToolbarButton
				icon="plus"
				label={ __( 'Add item', 'ablocks' ) }
				onClick={ handleNewMenuItem }
			></ToolbarButton>
		</BlockControls>
	);
};

export default CustomToolbar;
