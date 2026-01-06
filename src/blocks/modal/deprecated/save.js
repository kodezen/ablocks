import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import SaveContainer from '@Components/block-container/save';
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
		autoTriggerTime,
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
			>
				<InnerBlocks.Content />
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
