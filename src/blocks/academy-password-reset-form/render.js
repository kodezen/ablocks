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
						fontFamily: attributes.label_typography?.fontFamily,
						weight: attributes.label_typography?.weight,
					},
					{
						fontFamily:
							attributes.input_field_typography?.fontFamily,
						weight: attributes.input_field_typography?.weight,
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
						block="ablocks/academy-password-reset-form"
						httpMethod="POST"
						attributes={ attributes }
					/>
				</ABlocksDisable>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
