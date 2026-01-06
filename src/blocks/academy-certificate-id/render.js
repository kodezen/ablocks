import React from 'react';
import RenderContainer from '@Components/block-container/render';
import metadata from './block.json';

const propTypes = {};

export default function Render( props ) {
	const { attributes } = props;
	const { block_id } = attributes;

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
			>
				<span className="ablocks-block--certificate__verification-id">
					[verification_id]
				</span>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
