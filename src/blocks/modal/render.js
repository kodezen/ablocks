import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';

import RenderContainer from '@Components/block-container/render2';
import metadata from './block.json';
import { getExtraClasses } from './helper';
import './editor.scss';

const propTypes = {};

const modalTemplate = [
	[ 'ablocks/modal-trigger' ],
	[ 'ablocks/modal-panel' ],
];

export default function Render( props ) {
	const { attributes } = props;
	const {
		openPanel,
		block_id,
		popupPosition,
		panelBlockPosition,
		popupOnTop,
		noTrigger,
		autoTriggerTime,
	} = attributes;

	const extraClasses = getExtraClasses( {
		popupPosition,
		panelBlockPosition,
		popupOnTop,
	} );

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [] }
				className={ `${ extraClasses } ablocks-block-modal-panel-visibility--${ openPanel } ${
					noTrigger && autoTriggerTime
						? 'ablocks-block--modal_hide-trigger'
						: ''
				}` }
			>
				<InnerBlocks
					template={ modalTemplate }
					allowedBlocks={ [
						'ablocks/modal-trigger',
						'ablocks/modal-panel',
					] }
					templateLock="all"
				/>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
