import React from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import ABlocksDisable from '@Components/disable';
import RenderContainer from '@Components/block-container/render2';
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
						fontFamily: attributes.search_typography?.fontFamily,
						weight: attributes.search_typography?.weight,
					},
				] }
			>
				<ABlocksDisable>
					<ServerSideRender
						block="ablocks/academy-course-search"
						httpMethod="POST"
						attributes={ attributes }
					/>
				</ABlocksDisable>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
