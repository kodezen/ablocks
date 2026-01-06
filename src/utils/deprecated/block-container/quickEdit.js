import React from 'react';
import { dispatch, select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import classNames from 'classnames';

const propTypes = {};

let handleAppendNewBlock;
let handleRemoveBlock;

export default function QuickEdit( props ) {
	const { name, blockId, overflow } = props;

	const isRootBlock =
		! select( 'core/block-editor' ).getBlockRootClientId( blockId );

	const isContainerBlock = name === 'ablocks/container';
	if ( isRootBlock ) {
		handleAppendNewBlock = () => {
			const blockIndex =
				select( 'core/block-editor' ).getBlockIndex( blockId );
			dispatch( 'core/block-editor' ).insertBlock(
				createBlock( 'ablocks/container' ),
				blockIndex
			);
		};

		handleRemoveBlock = () =>
			dispatch( 'core/block-editor' ).removeBlock( blockId );
	}

	return (
		<React.Fragment>
			<div
				className={ classNames( 'ablocks-editor-block-control-wrap', {
					'ablocks-editor-block-control-wrap--root-block':
						isRootBlock,
					'ablocks-editor-block-control-wrap--container-block':
						isContainerBlock,
					'ablocks-editor-block-control-wrap--overflow-not-visible':
						overflow === 'auto' || overflow === 'hidden',
				} ) }
			>
				<div className="ablocks-editor-block-control-wrap__buttons">
					<button
						type="button"
						className="ablocks-editor-block-control-button ablocks-editor-block-control-button--add"
						onClick={ handleAppendNewBlock }
					>
						<span className="ablocks-icon ablocks-icon--add"></span>
					</button>
					<button
						type="button"
						className={ `ablocks-editor-block-control-button ablocks-editor-block-control-button--${
							isRootBlock || isContainerBlock
								? 'drag'
								: 'edit-two'
						}` }
					>
						<span
							className={ `ablocks-icon ablocks-icon--${
								isRootBlock || isContainerBlock
									? 'drag'
									: 'edit-two'
							}` }
						></span>
					</button>
					<button
						type="button"
						className="ablocks-editor-block-control-button ablocks-editor-block-control-button--delete"
						onClick={ handleRemoveBlock }
					>
						<span className="ablocks-icon ablocks-icon--delete-two"></span>
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}
QuickEdit.propTypes = propTypes;
