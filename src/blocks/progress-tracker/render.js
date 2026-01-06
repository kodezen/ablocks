import React, { useEffect } from 'react';
import RenderContainer from '@Components/block-container/render2';
import metadata from './block.json';
import ProgressTracker from './progressTracker';
import { getRenderDomElement } from '@Utils/helper';
import progressTracker from './progress';
import './style.css';

const propTypes = {};

export default function Render( props ) {
	const { attributes } = props;
	const {
		block_id,
		layout,
		progressRelative,
		progressRelativeSelector,
		_position,
		direction,
	} = attributes;
	const { positionType } = _position;

	useEffect( () => {
		const element = getRenderDomElement( `.ablocks-block-${ block_id }` );
		if ( element ) {
			progressTracker( element );
		}
	}, [ block_id, layout, direction ] );

	const absolutePosition =
		positionType === 'absolute' ? 'ablocks-block-progress--absolute' : '';
	const positionClass =
		layout === 'bar' && positionType === 'fixed'
			? 'ablocks-block-progress--fixed'
			: absolutePosition;

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [
					{
						fontFamily: attributes.typography?.fontFamily,
						weight: attributes.typography?.weight,
					},
				] }
				blockProps={ {
					'data-layout': layout,
					'data-direction': attributes.direction,
					'data-progress-relative': progressRelative,
					'data-progress-relative-selector': progressRelativeSelector,
				} }
				className={ positionClass }
			>
				<ProgressTracker attributes={ attributes } />
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
