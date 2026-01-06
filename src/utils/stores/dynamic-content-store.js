import { register, createReduxStore } from '@wordpress/data';

const initialState = {
	taxonomies: {
		isRequestBeingProcessed: false,
		data: undefined,
	},
	metaFields: {},
	postTermsRelations: {},
	postMetaRelations: {},
	recentPosts: undefined,
	recentMediasUrls: undefined,
	authors: {},
	authorsMeta: {},
	postsCommentsCount: {},
	featuredMediasData: {},
	allTaxonomiesTermsData: {},
	authorData: {},
	authorProfilePictureUrl: undefined,
};

const actions = {
	setTaxonomies( taxonomies ) {
		return {
			type: 'SET_TAXONOMIES',
			taxonomies,
		};
	},
	setMetaFields( metaFields ) {
		return {
			type: 'SET_META_FIELDS',
			metaFields,
		};
	},
	setPostTermsRelations( posId, taxonomy, terms ) {
		return {
			type: 'SET_POST_TERMS_RELATIONS',
			posId,
			taxonomy,
			terms,
		};
	},
	setPostMetaRelations( posId, metaData ) {
		return {
			type: 'SET_POST_META_RELATIONS',
			posId,
			metaData,
		};
	},
	setRecentPosts( data ) {
		return {
			type: 'SET_RECENT_POSTS',
			data,
		};
	},
	setAuthorsData( data ) {
		return {
			type: 'SET_AUTHOR_DATA',
			data,
		};
	},
	setAuthorsMeta( data ) {
		return {
			type: 'SET_AUTHOR_META',
			data,
		};
	},
	setPostsCommentsCount( data ) {
		return {
			type: 'SET_POSTS_COMMENTS_COUNT',
			data,
		};
	},
	setFeaturedMediasData( data ) {
		return {
			type: 'SET_FEATURED_MEDIAS_DATA',
			data,
		};
	},
	setAllTaxonomiesTermsData( data ) {
		return {
			type: 'SET_ALL_TAXONOMIES_TERMS_DATA',
			data,
		};
	},
	setRecentMediasUrls( data ) {
		return {
			type: 'SET_RECENT_MEDIAS_URLS_DATA',
			data,
		};
	},
	setAllAuthorsData( data ) {
		return {
			type: 'SET_AUTHORS_DATA',
			data,
		};
	},
	setAuthorProfilePictureUrl( data ) {
		return {
			type: 'SET_AUTHOR_PROFILE_PICTURE_URL',
			data,
		};
	},
};

const reducers = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'SET_TAXONOMIES': {
			const newState = {
				...state,
				taxonomies: {
					...state.taxonomies,
					...action.taxonomies,
					data: action?.taxonomies?.data,
				},
			};
			return newState;
		}
		case 'SET_META_FIELDS': {
			const newState = {
				...state,
				metaFields: {
					...state.metaFields,
					...action.metaFields,
				},
			};
			return newState;
		}
		case 'SET_POST_TERMS_RELATIONS': {
			const newState = {
				...state,
				postTermsRelations: {
					...state.postTermsRelations,
					[ action.posId ]: {
						...( state.postTermsRelations?.[ action.posId ] || {} ),
						[ action.taxonomy ]: action.terms,
					},
				},
			};
			return newState;
		}
		case 'SET_POST_META_RELATIONS': {
			const newState = {
				...state,
				postMetaRelations: {
					...state.postMetaRelations,
					[ action.posId ]: {
						...( state.postMetaRelations?.[ action.posId ] || {} ),
						...( action.metaData || {} ),
					},
				},
			};
			return newState;
		}
		case 'SET_RECENT_POSTS': {
			const newState = {
				...state,
				recentPosts: action.data,
			};
			return newState;
		}
		case 'SET_AUTHOR_DATA': {
			const actionData = action.data || {};
			const authorData = actionData.data || {};
			const authorID = actionData.authorID;

			const newState = {
				...state,
				authors: {
					...state.authors,
					[ authorID ]: {
						...( state.authors?.[ authorID ] || {} ),
						...( authorData || {} ),
					},
				},
			};
			return newState;
		}
		case 'SET_AUTHOR_META': {
			const actionData = action.data || {};
			const authorID = actionData?.authorID;
			const isRequestBeingProcessed = actionData?.isRequestBeingProcessed;

			delete actionData?.isRequestBeingProcessed;
			delete actionData?.authorID;

			const newState = {
				...state,
				authorsMeta: {
					...state.authorsMeta,
					isRequestBeingProcessed,
					[ authorID ]: {
						...( state.authorsMeta?.[ authorID ] || {} ),
						...actionData,
					},
				},
			};
			return newState;
		}
		case 'SET_POSTS_COMMENTS_COUNT': {
			const actionData = action.data || {};
			const postID = actionData?.postID;
			const commentsCount = actionData?.commentsCount;

			const newState = {
				...state,
				postsCommentsCount: {
					...state.postsCommentsCount,
					[ postID ]: commentsCount,
				},
			};
			return newState;
		}
		case 'SET_FEATURED_MEDIAS_DATA': {
			const actionData = action.data || {};
			const postID = actionData?.postID;
			const mediaData = actionData?.data;

			const newState = {
				...state,
				featuredMediasData: {
					...state.featuredMediasData,
					[ postID ]: mediaData,
				},
			};
			return newState;
		}
		case 'SET_ALL_TAXONOMIES_TERMS_DATA': {
			const actionData = action.data || {};

			const newState = {
				...state,
				allTaxonomiesTermsData: {
					...( actionData || {} ),
				},
			};
			return newState;
		}
		case 'SET_RECENT_MEDIAS_URLS_DATA': {
			const actionData = action?.data || [];

			const currentMediasData = state.recentMediasUrls || [];
			const newOptions = [ ...currentMediasData ];
			for ( const element of actionData ) {
				if (
					! currentMediasData.find(
						( item ) => item.value === element.value
					)
				) {
					newOptions.push( element );
				}
			}

			const newState = {
				...state,
				recentMediasUrls: [
					...( state.recentMediasUrls || [] ),
					...actionData,
				],
			};

			return newState;
		}
		case 'SET_AUTHORS_DATA': {
			const actionData = action.data || {};

			const newState = {
				...state,
				authorData: {
					...( actionData || {} ),
				},
			};
			return newState;
		}
		case 'SET_AUTHOR_PROFILE_PICTURE_URL': {
			const actionData = action.data || {};

			const newState = {
				...state,
				authorProfilePictureUrl: actionData,
			};

			return newState;
		}
		default:
			return state;
	}
};

const selectors = {
	getTaxonomies( state ) {
		return state.taxonomies;
	},
	getMetaFields( state ) {
		return state.metaFields;
	},
	getPostTermsRelations( state ) {
		return state.postTermsRelations;
	},
	getPostMetaRelations( state ) {
		return state.postMetaRelations;
	},
	getRecentPosts( state ) {
		return state.recentPosts;
	},
	getAuthorsData( state ) {
		return state.authors;
	},
	getAuthorsMeta( state ) {
		return state.authorsMeta;
	},
	getPostsCommentsCount( state ) {
		return state.postsCommentsCount;
	},
	getFeaturedMediasData( state ) {
		return state.featuredMediasData;
	},
	getAllTaxonomiesTermsData( state ) {
		return state.allTaxonomiesTermsData;
	},
	getRecentMediasUrls( state ) {
		return state.recentMediasUrls;
	},
	getAuthorsData( state ) {
		return state.authorData;
	},
	getAuthorProfilePictureUrl( state ) {
		return state.authorProfilePictureUrl;
	},
};

const nonRestExposedTaxonomiesStore = createReduxStore(
	'ablocks/dynamic-content-store',
	{
		reducer: reducers,
		actions,
		selectors,
		initialState,
	}
);

register( nonRestExposedTaxonomiesStore );
