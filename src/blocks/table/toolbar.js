import React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, DropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const CustomToolbar = ( {
	insertButtonRow,
	insertTopRow,
	addRightCell,
	insertLeftCell,
} ) => {
	return (
		<BlockControls>
			<DropdownMenu
				icon="editor-table"
				label={ __( 'Edit Table', 'ablocks' ) }
				className="ablocks-table-dropdown-toolbar"
			>
				{ ( { onClose } ) => (
					<div className="ablocks-table-dropdown-toolbar-menu">
						<ToolbarButton
							onClick={ () => {
								insertTopRow();
								onClose();
							} }
						>
							{ __( 'Add Top Row', 'ablocks' ) }
						</ToolbarButton>
						<ToolbarButton
							onClick={ () => {
								insertButtonRow();
								onClose();
							} }
						>
							{ __( 'Insert Bottom Row', 'ablocks' ) }
						</ToolbarButton>
						<ToolbarButton
							onClick={ () => {
								insertLeftCell();
								onClose();
							} }
						>
							{ __( 'Insert Left Column', 'ablocks' ) }
						</ToolbarButton>
						<ToolbarButton
							onClick={ () => {
								addRightCell();
								onClose();
							} }
						>
							{ __( 'Add Right Column', 'ablocks' ) }
						</ToolbarButton>
					</div>
				) }
			</DropdownMenu>
		</BlockControls>
	);
};

export default CustomToolbar;
