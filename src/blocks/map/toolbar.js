import React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const CustomToolbar = ( { addNewListItem } ) => {
	return (
		<BlockControls>
			<ToolbarButton
				icon="plus"
				label={ __( 'Add item', 'ablocks' ) }
				onClick={ addNewListItem }
			></ToolbarButton>
		</BlockControls>
	);
};

export default CustomToolbar;
