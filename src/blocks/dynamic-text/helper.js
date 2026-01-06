import { useSelect } from '@wordpress/data';

export default function usePostId( context, attributes ) {
	const parseId = ( v ) => parseInt( v || 0, 10 ) || 0;

	return useSelect(
		( select ) => {
			const editor = select( 'core/editor' );
			const editSite =
				select( 'core/edit-site' )?.getEditedPostContext?.() ?? {};

			// Primary IDs
			const foundId = parseId(
				context?.postId ||
					editor?.getCurrentPostId?.() ||
					editSite?.postId ||
					attributes?.postId
			);

			if ( foundId ) {
				return foundId;
			}

			// Fallback: latest post
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
	);
}
