import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { dispatch as dataDispatch } from '@wordpress/data';
import metadata from './block.json';
import RenderChildContainer from '@Components/block-container/childRender';
import { getBlockTypes } from '@wordpress/blocks';
import { closeIcon } from './helper';

const propTypes = {};

const modalPanelTemplate = [ [ 'core/paragraph' ] ];

export default function Render( props ) {
	const { attributes, parentModalId } = props;
	const { block_id, noCloseButton } = attributes;

	const allowedBlocksModal = getBlockTypes()
		.filter(
			( item ) =>
				! item.parent &&
				! [
					'ablocks/modal',
					'ablocks/modal-trigger',
					'ablocks/modal-panel',
				].includes( item.name )
		)
		.map( ( block ) => block.name );

	const innerBlocksProps = {
		allowedBlocks: allowedBlocksModal,
		template: modalPanelTemplate,
		templateLock: false,
		renderAppender: InnerBlocks.DefaultBlockAppender,
	};

	return (
		<React.Fragment>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div className="ablocks-block-modal---panel-wrap">
					<div className="ablocks-modal-popup-content-wrap">
						<div className="ablocks-modal-popup--content">
							<InnerBlocks { ...innerBlocksProps } />
						</div>
						{ ! noCloseButton && (
							<div
								className="ablocks-modal-popup-close"
								role="presentation"
								onKeyDown={ () => {} }
								onClick={ () => {
									if ( parentModalId ) {
										dataDispatch(
											'core/block-editor'
										).updateBlockAttributes(
											parentModalId,
											{
												openPanel: 'close',
											}
										);
									}
								} }
							>
								{ closeIcon }
							</div>
						) }
					</div>
				</div>
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
