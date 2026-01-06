import { ToolbarButton, Toolbar } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export const MyToolbar = ( { insertButtonBlock } ) => {
	return (
		<BlockControls group="block">
			<Toolbar>
				<ToolbarButton
					icon={
						<span className="ablocks-icon ablocks-icon--block-button"></span>
					}
					label={ __( 'Add Button', 'ablocks' ) }
					onClick={ insertButtonBlock }
				/>
			</Toolbar>
		</BlockControls>
	);
};
