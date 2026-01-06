import React from 'react';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import SaveChildContainer from '@Components/block-container/childSave';

import { closeIcon } from './helper';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, noCloseButton } = attributes;
	return (
		<SaveChildContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<div className="ablocks-block-modal---panel-wrap">
				<div className="ablocks-modal-popup-content-wrap">
					<div className="ablocks-modal-popup--content">
						<InnerBlocks.Content />
					</div>
					{ ! noCloseButton && (
						<div className="ablocks-modal-popup-close">
							{ closeIcon }
						</div>
					) }
				</div>
			</div>
		</SaveChildContainer>
	);
}

Save.propTypes = propTypes;
