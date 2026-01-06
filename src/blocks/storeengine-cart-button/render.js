import React from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import ABlocksDisable from '@Components/disable';
import RenderContainer from '@Components/block-container/render';
import metadata from './block.json';

const propTypes = {};

export default function Render( props ) {
	const { attributes, context } = props;
	const { block_id } = attributes;

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [] }
			>
				<ABlocksDisable>
					<ServerSideRender
						block="ablocks/storeengine-cart-button"
						httpMethod="POST"
						attributes={ {
							...attributes,
							postId: context.postId,
							product_id: ! attributes.product_id
								? context.postId
								: attributes.product_id,
						} }
					/>
				</ABlocksDisable>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
