import React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, DropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const CustomToolbar = ( {
	addAfterRow,
	addBeforeRow,
	addColumnAfter,
	addColumnBefore,
	deleteColumn,
	deleteRow,
	rowEdit,
	handleDeleteCel,
} ) => {
	return (
		<>
			<BlockControls>
				<ToolbarButton
					icon="trash"
					label={ __( 'Delete', 'ablocks' ) }
					onClick={ handleDeleteCel }
					className="ablocks-table-toolbar-cell-delete"
				></ToolbarButton>
			</BlockControls>
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
									addAfterRow();
									onClose();
								} }
							>
								{ __( 'Add after row', 'ablocks' ) }
							</ToolbarButton>

							<ToolbarButton
								onClick={ () => {
									addBeforeRow();
									onClose();
								} }
							>
								{ __( 'Add Before row', 'ablocks' ) }
							</ToolbarButton>
							<ToolbarButton
								onClick={ () => {
									addColumnAfter();
									onClose();
								} }
							>
								{ __( 'Add after column', 'ablocks' ) }
							</ToolbarButton>
							<ToolbarButton
								onClick={ () => {
									addColumnBefore();
									onClose();
								} }
							>
								{ __( 'Add Before column', 'ablocks' ) }
							</ToolbarButton>
							<ToolbarButton
								onClick={ () => {
									deleteColumn();
									onClose();
								} }
							>
								{ __( 'Delete column', 'ablocks' ) }
							</ToolbarButton>
							<ToolbarButton
								onClick={ () => {
									deleteRow();
									onClose();
								} }
							>
								{ __( 'Deleted Row', 'ablocks' ) }
							</ToolbarButton>
							<ToolbarButton
								onClick={ () => {
									rowEdit();
									onClose();
								} }
							>
								{ __( 'Row Edit', 'ablocks' ) }
							</ToolbarButton>
						</div>
					) }
				</DropdownMenu>
			</BlockControls>
		</>
	);
};

export default CustomToolbar;
