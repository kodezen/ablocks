import { useState, useEffect, useCallback, useMemo } from 'react';
import { select, dispatch, resolveSelect } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import {
	parseAndGetDateTimeValue,
	parseStringToDynamicData,
	plugin_root_url,
} from '@Utils/helper';

import {
	setDynamicData as applyDynamicData,
	fetchAndStore,
	getMetaValueFromStore,
	getAuthorMetaFromStore,
	getTermsFromStore,
} from './helper';

export const useDynamicData = ( {
	attributeValue: attributeString = '',
	context = {},
} ) => {
	const [ data, setData ] = useState( attributeString );
	const [ isProcessingData, setIsProcessingData ] = useState( false );

	const currentPostId =
		context?.postId || select( 'core/editor' )?.getCurrentPostId();
	const postType = context?.postType;
	const parsedValue = parseStringToDynamicData( attributeString || '' );

	const {
		isDynamicByNewSolution,
		source,
		source_type,
		source_id,
		group_item,
		before = '',
		after = '',
		fallback = '',
		excerptWords,
		taxonomy,
		termsSeparator = ', ',
		metaKey,
		authorMetaKey,
		// Academy LMS
		numberOfTopics,
		numberOfReviews,
		totalDuration,
		numberOfEnrolled,
	} = parsedValue || {};

	const entityKind =
		! source || [ 'current', 'post-type' ].includes( source )
			? 'postType'
			: source;
	const entityName = postType || source_type;
	const entityId = currentPostId || source_id;

	const {
		record: post,
		isResolving,
		hasResolved,
	} = useEntityRecord( entityKind, entityName, entityId );

	const handlePostTerms = useCallback( () => {
		if ( ! taxonomy ) {
			return;
		}
		const cachedTerms = getTermsFromStore( entityId, taxonomy );
		if ( cachedTerms ) {
			return applyDynamicData( setData, {
				value: cachedTerms
					.map( ( t ) => t.name )
					.join( termsSeparator ),
				before,
				after,
				fallback,
			} );
		}

		fetchAndStore( {
			setLoading: setIsProcessingData,
			request: {
				action: 'ablocks/get_terms_for_post',
				post_id: entityId,
				taxonomy,
			},
			onSuccess: ( terms ) => {
				dispatch(
					'ablocks/dynamic-content-store'
				).setPostTermsRelations( entityId, taxonomy, terms );
				applyDynamicData( setData, {
					value: terms.map( ( t ) => t.name ).join( termsSeparator ),
					before,
					after,
					fallback,
				} );
			},
		} );
	}, [ taxonomy, entityId, termsSeparator, before, after, fallback ] );

	const handlePostCustomField = useCallback( () => {
		if ( ! metaKey ) {
			return applyDynamicData( setData, {
				value: '',
				before,
				after,
				fallback,
			} );
		}
		const metaValue = getMetaValueFromStore( entityId, metaKey );
		if ( metaValue !== undefined ) {
			return applyDynamicData( setData, {
				value: metaValue,
				before,
				after,
				fallback,
			} );
		}

		fetchAndStore( {
			setLoading: setIsProcessingData,
			request: {
				action: 'ablocks/get_post_meta',
				post_id: entityId,
				meta_key: metaKey,
			},
			onSuccess: ( val ) => {
				dispatch(
					'ablocks/dynamic-content-store'
				).setPostMetaRelations( entityId, {
					[ metaKey ]: {
						value: val,
						isRequestBeingProcessed: false,
					},
				} );
				applyDynamicData( setData, {
					value: val,
					before,
					after,
					fallback,
				} );
			},
		} );
	}, [ metaKey, entityId, before, after, fallback ] );

	const handleAuthorMeta = useCallback( () => {
		if ( ! authorMetaKey ) {
			return applyDynamicData( setData, {
				value: '',
				before,
				after,
				fallback,
			} );
		}
		const authorId = post?.author;
		const authorValue = getAuthorMetaFromStore( authorId, authorMetaKey );
		if ( authorValue !== undefined ) {
			return applyDynamicData( setData, {
				value: authorValue,
				before,
				after,
				fallback,
			} );
		}

		fetchAndStore( {
			setLoading: setIsProcessingData,
			request: {
				action: 'ablocks/get_author_meta',
				author_id: authorId,
				meta_key: authorMetaKey,
			},
			onSuccess: ( val ) => {
				dispatch( 'ablocks/dynamic-content-store' ).setAuthorsMeta( {
					authorID: authorId,
					[ authorMetaKey ]: val,
					isRequestBeingProcessed: false,
				} );
				applyDynamicData( setData, {
					value: val,
					before,
					after,
					fallback,
				} );
			},
		} );
	}, [ authorMetaKey, post?.author, before, after, fallback ] );

	const handleALMSData = useCallback(
		( dataFieldType ) => {
			const dataFieldValue = getMetaValueFromStore(
				entityId,
				dataFieldType
			);
			if ( dataFieldValue !== undefined ) {
				return applyDynamicData( setData, {
					value: dataFieldType,
					before,
					after,
					fallback,
				} );
			}

			fetchAndStore( {
				setLoading: setIsProcessingData,
				request: {
					action: 'ablocks/get_academy_course_data',
					post_id: entityId,
					meta_key: dataFieldType,
				},
				onSuccess: ( val ) => {
					dispatch(
						'ablocks/dynamic-content-store'
					).setPostMetaRelations( entityId, {
						[ dataFieldType ]: {
							value: val,
							isRequestBeingProcessed: false,
						},
					} );
					applyDynamicData( setData, {
						value: val,
						before,
						after,
						fallback,
					} );
				},
			} );
		},
		[
			numberOfTopics,
			numberOfReviews,
			numberOfEnrolled,
			totalDuration,
			before,
			after,
			fallback,
		]
	);

	const handleFeaturedImageFileUrl = useCallback( () => {
		const featuredImageId =
			select( 'core' ).getEntityRecord(
				'postType',
				postType,
				currentPostId
			)?.featured_media ||
			select( 'core/editor' )?.getEditedPostAttribute( 'featured_media' );
		if ( ! featuredImageId ) {
			applyDynamicData( setData, {
				value: plugin_root_url + 'assets/images/Placeholder-Loop.svg',
				before,
				after,
				fallback,
			} );
			setIsProcessingData( false );
			return;
		}

		resolveSelect( 'core' )
			.getMedia( featuredImageId )
			.then( ( media ) =>
				applyDynamicData( setData, {
					value: media?.source_url || '',
					before,
					after,
					fallback,
				} )
			)
			.catch( console.error )
			.finally( () => setIsProcessingData( false ) );
	}, [ currentPostId, postType, before, after, fallback ] );

	useEffect( () => {
		if ( ! isDynamicByNewSolution ) {
			return;
		}

		switch ( source ) {
			case 'site-tagline':
			case 'site-title': {
				setIsProcessingData( true );
				resolveSelect( 'core' )
					.getSite()
					.then( ( data ) => {
						const value =
							source === 'site-tagline'
								? data?.description
								: data?.title;
						applyDynamicData( setData, {
							value,
							before,
							after,
							fallback,
						} );
					} )
					.catch( console.error )
					.finally( () => setIsProcessingData( false ) );
				break;
			}
			case 'current-date-time': {
				const result = parseAndGetDateTimeValue( {
					dynamicAttributeValue: parsedValue,
				} );
				applyDynamicData( setData, {
					value: result,
					before,
					after,
					fallback,
				} );
				break;
			}
			case 'image': {
				if ( group_item === 'featured-image' ) {
					handleFeaturedImageFileUrl();
				}
				break;
			}
			default: {
				if (
					entityKind === 'postType' &&
					post &&
					hasResolved &&
					! isResolving
				) {
					let result = '';
					switch ( group_item ) {
						case 'post-title':
							result = post?.title?.rendered;
							break;
						case 'post-id':
							result = post?.id;
							break;
						case 'post-excerpt': {
							const text = post?.excerpt?.rendered || '';
							result = excerptWords
								? text
										.split( ' ' )
										.slice( 0, excerptWords )
										.join( ' ' )
								: text;
							break;
						}
						case 'post-custom-field':
							handlePostCustomField();
							return;
						case 'post-terms':
							handlePostTerms();
							return;
						case 'author-meta':
							handleAuthorMeta();
							return;
						case 'numberOfTopics':
							handleALMSData( 'numberOfTopics' );
							return;
						case 'totalDuration':
							handleALMSData( 'totalDuration' );
							return;
						case 'numberOfReviews':
							handleALMSData( 'numberOfReviews' );
							return;
						case 'numberOfEnrolled':
							handleALMSData( 'numberOfEnrolled' );
							return;
					}
					applyDynamicData( setData, {
						value: result,
						before,
						after,
						fallback,
					} );
				}
				break;
			}
		}
	}, [
		isDynamicByNewSolution,
		entityKind,
		hasResolved,
		isResolving,
		parsedValue,
	] );

	return {
		isDynamicEnabled: attributeString?.startsWith( 'ablocks_dc:' ),
		data,
		isProcessingData,
	};
};
