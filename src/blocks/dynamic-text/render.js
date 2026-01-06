import React from 'react';
import { Disabled } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import RenderContainer from '@Components/block-container/render';
import metadata from './block.json';
import usePostId from './helper';

const propTypes = {};

export default function Render( props ) {
	const { attributes, context } = props;

	const postId = usePostId( context, attributes );

	return (
		<RenderContainer
			blockId={ attributes.block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<Disabled>
				<ServerSideRender
					block="ablocks/dynamic-text"
					httpMethod="POST"
					attributes={ { ...attributes, postId } }
					urlQueryArgs={ postId ? { post_id: postId } : {} }
					key={ `dynamic-text-${ postId }` }
				/>
			</Disabled>
		</RenderContainer>
	);
}

Render.propTypes = propTypes;
