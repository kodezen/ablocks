import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import SaveContainer from '@Components/block-container/save2';
import metadata from './block.json';
import { getExtraClasses } from './helper';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		popupPosition,
		panelBlockPosition,
		popupOnTop,
		useHoverTrigger,
		enableAutoTriggerTimer,
		showAutoOnce,
		autoTriggerTime,
		showOnMouseOutOfWindow,
	} = attributes;

	const extraClasses = getExtraClasses( {
		popupPosition,
		panelBlockPosition,
		popupOnTop,
	} );

	const dataAttributes =
		enableAutoTriggerTimer && autoTriggerTime
			? { 'data-auto-trigger-time': autoTriggerTime }
			: {};

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				className={ `${ extraClasses } ${
					useHoverTrigger ? 'ablocks-trigger-on-hover' : ''
				}` }
				dataAttributes={ dataAttributes }
				blockProps={
					autoTriggerTime
						? {
								'data-auto-show-once': showAutoOnce,
								'data-show-on-mouse-out':
									showOnMouseOutOfWindow,
						  }
						: {}
				}
			>
				<InnerBlocks.Content />
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
