import React, { useMemo } from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import { useSelect } from '@wordpress/data';
import RenderContainer from '@Components/block-container/render2';
import metadata from './block.json';

const parseId = ( v ) => parseInt( v || 0, 10 ) || 0;

export default function Render( props ) {
	const { attributes, context } = props;
	const { block_id } = attributes;

	const effectivePostId =
		useSelect(
			( select ) => {
				const editor = select( 'core/editor' );
				const editSite =
					select( 'core/edit-site' )?.getEditedPostContext?.() ?? {};

				const found = parseId(
					context?.postId ||
						editor?.getCurrentPostId?.() ||
						editSite?.postId ||
						attributes?.postId
				);

				if ( found ) {
					return found;
				}
				const postType =
					context?.postType ||
					editSite?.postType ||
					editor?.getCurrentPostType?.() ||
					'post';

				const posts = select( 'core' )?.getEntityRecords?.(
					'postType',
					postType,
					{
						per_page: 1,
						order: 'desc',
						orderby: 'date',
					}
				);

				return parseId( posts?.[ 0 ]?.id );
			},
			[ context?.postId, context?.postType, attributes?.postId ]
		) || 0;

	const urlQueryArgs = useMemo(
		() => ( effectivePostId ? { post_id: effectivePostId } : {} ),
		[ effectivePostId ]
	);

	return (
		<RenderContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
			typography={ [
				{
					fontFamily: attributes.cat_typography?.fontFamily,
					weight: attributes.cat_typography?.weight,
				},
			] }
		>
			<ServerSideRender
				block={ metadata.name }
				httpMethod="POST"
				attributes={ attributes }
				urlQueryArgs={ urlQueryArgs }
				key={ `fi-ssr-${ effectivePostId }` }
			/>
		</RenderContainer>
	);
}
