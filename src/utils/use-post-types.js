/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Returns a helper object that contains an `options` object
 * from the available post types, to be passed to a `SelectControl`.
 *
 * @return {Object} The helper object related to post types.
 */
const usePostTypes = () => {
	const postTypes = useSelect( ( select ) => {
		const { getPostTypes, getPostType } = select( coreStore );
		const types = getPostTypes( { per_page: -1 } ) || [];

		const excludedPostTypes = [ 'attachment' ];

		return types
			.filter(
				( { viewable, slug } ) =>
					viewable && ! excludedPostTypes.includes( slug )
			)
			.map( ( { slug } ) => getPostType( slug ) );
	}, [] );

	const postTypesSelectOptions = useMemo(
		() =>
			( postTypes || [] ).map( ( { labels, slug } ) => ( {
				label: labels?.singular_name || slug,
				value: slug,
			} ) ),
		[ postTypes ]
	);

	return {
		postTypesSelectOptions,
	};
};

export default usePostTypes;
