import React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';

const CustomToolbar = ( { addNewMarquee } ) => {
	return (
		<BlockControls>
			<div className="ablocks-block-marquee-dropdown-toolbar-menu">
				<ToolbarButton
					onClick={ () => {
						addNewMarquee();
					} }
				>
					<span className="ablocks-icon ablocks-icon--plus"></span>
				</ToolbarButton>
			</div>
		</BlockControls>
	);
};

export default CustomToolbar;
