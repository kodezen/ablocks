import React from 'react';
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import {
	stylesCopyHandler,
	stylesPasteHandler,
} from '@Addons/block-settings-menu/helper';
import { settings } from '@Utils/helper';

const propTypes = {};
export default function Toolbar() {
	return (
		<React.Fragment>
			{ settings?.enabled_block_copy_paste_style && (
				<BlockControls group="block">
					<ToolbarGroup>
						<ToolbarButton
							icon={ 'admin-comments' }
							label={ __(
								'aBlocks Copy Styles (cmd+shift+c)',
								'ablocks'
							) }
							onClick={ () => {
								stylesCopyHandler();
							} }
						/>
						<ToolbarButton
							icon={ 'admin-collapse' }
							label={ __(
								'aBlocks Paste Styles (cmd+shift+v)',
								'ablocks'
							) }
							onClick={ () => {
								stylesPasteHandler();
							} }
						/>
					</ToolbarGroup>
				</BlockControls>
			) }
		</React.Fragment>
	);
}

Toolbar.propTypes = propTypes;
