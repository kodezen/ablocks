import React from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import RenderContainer from '@Components/block-container/render2';
import ABlocksDisable from '@Components/disable';
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
				typography={ [
					{
						fontFamily: attributes.start_btn_typography?.fontFamily,
						weight: attributes.start_btn_typography?.weight,
					},
					{
						fontFamily:
							attributes.enroll_btn_typography?.fontFamily,
						weight: attributes.enroll_btn_typography?.weight,
					},
				] }
			>
				<ABlocksDisable>
					<ServerSideRender
						block="ablocks/academy-enroll-form"
						httpMethod="POST"
						attributes={ {
							...attributes,
							postId: context.postId,
							course_id: ! attributes.product_id
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
