import React from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import ABlocksDisable from '@Components/disable';
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
						fontFamily: attributes.cat_typography?.fontFamily,
						weight: attributes.cat_typography?.weight,
					},
					{
						fontFamily: attributes.title_typography?.fontFamily,
						weight: attributes.title_typography?.weight,
					},
					{
						fontFamily: attributes.author_typography?.fontFamily,
						weight: attributes.author_typography?.weight,
					},
					{
						fontFamily: attributes.rating_typography?.fontFamily,
						weight: attributes.rating_typography?.weight,
					},
					{
						fontFamily: attributes.price_typography?.fontFamily,
						weight: attributes.price_typography?.weight,
					},
				] }
			>
				<ABlocksDisable>
					<ServerSideRender
						block="ablocks/academy-enroll-content"
						httpMethod="POST"
						attributes={ attributes }
					/>
				</ABlocksDisable>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
