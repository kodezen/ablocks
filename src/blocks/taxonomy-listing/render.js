import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import classNames from 'classnames';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import './style.css';

const propTypes = {};
export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		selectedPostType,
		activeTaxonomy = [],
		selectedTerms = {},
		numberOfPosts,
		postOrder = 'desc',
		postOrderBy = 'date',
		taxonomyLayout = 'list',
		itemsPerRow = 3,
		showTermCount,
		enableReloadButton,
		allowIcon,
		buttonText,
		showPost,
		showInherit,
		countPrefixText,
		showTermCountPrefix,
		showIconDffent,
		showPostLink,
	} = attributes;

	const hasActiveTaxonomy = useMemo( () => {
		return (
			Array.isArray( activeTaxonomy ) &&
			activeTaxonomy.some(
				( t ) => typeof t === 'string' && t.trim() !== ''
			)
		);
	}, [ activeTaxonomy ] );

	const taxonomies = useSelect(
		( select ) => {
			if ( ! selectedPostType ) {
				return [];
			}
			const allTax =
				select( coreStore ).getTaxonomies( {
					type: selectedPostType,
				} ) || [];
			return allTax.map( ( tax ) => {
				const terms =
					select( coreStore ).getEntityRecords(
						'taxonomy',
						tax.slug,
						{
							per_page: -1,
						}
					) || [];
				return { ...tax, terms };
			} );
		},
		[ selectedPostType ]
	);

	const inheritedTerms = useMemo( () => {
		if ( ! showInherit || ! Array.isArray( activeTaxonomy ) ) {
			return {};
		}

		const result = {};

		if ( typeof window !== 'undefined' && window.location ) {
			const path = window.location.pathname
				.split( '/' )
				.filter( Boolean ); // ['block', 'category', 'design']

			activeTaxonomy.forEach( ( taxonomy ) => {
				const taxonomyData = taxonomies.find(
					( t ) => t.slug === taxonomy
				);
				if ( ! taxonomyData ) {
					return;
				}

				let matchedTermId = null;

				taxonomyData.terms?.forEach( ( term ) => {
					if ( path.includes( term.slug ) ) {
						matchedTermId = term.id;
					}
				} );

				if ( matchedTermId ) {
					result[ taxonomy ] = [ matchedTermId ];
				} else {
					const allTermIds =
						taxonomyData.terms?.map( ( term ) => term.id ) || [];
					if ( allTermIds.length > 0 ) {
						result[ taxonomy ] = allTermIds;
					}
				}
			} );
		}

		return result;
	}, [ showInherit, activeTaxonomy, taxonomies ] );

	const effectiveSelectedTerms = showInherit ? inheritedTerms : selectedTerms;
	const hasValidTerms =
		taxonomyLayout === 'flex' &&
		Object.values( effectiveSelectedTerms ).some(
			( arr ) => Array.isArray( arr ) && arr.length > 0
		);

	const containerStyle = hasValidTerms
		? {
				gridTemplateColumns: `repeat(${ itemsPerRow || '' }, 1fr)`,
		  }
		: undefined;

	const postsByTerm = useSelect(
		( select ) => {
			const result = {};
			if ( ! selectedPostType || ! Array.isArray( activeTaxonomy ) ) {
				return result;
			}

			activeTaxonomy.forEach( ( taxonomy ) => {
				const taxObj = taxonomies.find( ( t ) => t.slug === taxonomy );
				if ( ! taxObj ) {
					return;
				}

				const restBase = taxObj.rest_base || taxonomy;
				const termIds = effectiveSelectedTerms[ taxonomy ] || [];

				termIds.forEach( ( termId ) => {
					const query = {
						per_page: numberOfPosts === -1 ? 2000 : numberOfPosts,
						orderby: postOrderBy || 'date',
						order: postOrder || 'desc',
						[ restBase ]: termId,
					};

					const posts = select( coreStore ).getEntityRecords(
						'postType',
						selectedPostType,
						query
					);
					if ( posts ) {
						result[ `${ taxonomy }-${ termId }` ] = posts;
					}
				} );
			} );
			return result;
		},
		[
			selectedPostType,
			activeTaxonomy,
			effectiveSelectedTerms,
			numberOfPosts,
			postOrder,
			postOrderBy,
			taxonomies,
		]
	);
	const firstPostLinksByTerm = useSelect(
		( select ) => {
			const map = {};

			if ( ! showPostLink ) {
				return map;
			}

			if (
				! Array.isArray( activeTaxonomy ) ||
				activeTaxonomy.length === 0
			) {
				return map;
			}

			activeTaxonomy.forEach( ( taxonomy ) => {
				const taxObj = taxonomies.find( ( t ) => t.slug === taxonomy );
				if ( ! taxObj ) {
					return;
				}

				const restBase = taxObj.rest_base || taxonomy;
				const dynamicTypes =
					Array.isArray( taxObj.types ) && taxObj.types.length
						? taxObj.types
						: [ 'post' ];

				const postTypesToCheck = selectedPostType
					? [ selectedPostType ]
					: dynamicTypes;

				const termIds = effectiveSelectedTerms?.[ taxonomy ] || [];

				termIds.forEach( ( termId ) => {
					let foundLink = '';

					for ( const pt of postTypesToCheck ) {
						const posts = select( coreStore ).getEntityRecords(
							'postType',
							pt,
							{
								per_page: 1,
								orderby: 'date',
								order: 'asc', // earliest; চাইলে 'desc'
								status: 'publish',
								[ restBase ]: termId,
							}
						);

						if ( posts && posts.length ) {
							foundLink = posts[ 0 ]?.link || '';
							if ( foundLink ) {
								break;
							}
						}
					}

					if ( foundLink ) {
						map[ `${ taxonomy }-${ termId }` ] = foundLink;
					}
				} );
			} );

			return map;
		},
		[
			showPostLink,
			selectedPostType,
			activeTaxonomy,
			effectiveSelectedTerms,
			taxonomies,
		]
	);
	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div
					className={ classNames(
						`ablocks-taxonomy-listing_${ taxonomyLayout }`
					) }
					style={ containerStyle }
				>
					{ ! selectedPostType ? (
						<p className="ablocks-posttype-not-found">
							{ __(
								'Please select a post type first.',
								'ablocks'
							) }
						</p>
					) : ! hasActiveTaxonomy ? (
						<p className="ablocks-taxonomy-not-found">
							{ __(
								'Please select a taxonomy for this post type.',
								'ablocks'
							) }
						</p>
					) : (
						activeTaxonomy.map( ( taxonomy ) => {
							const taxonomyData = taxonomies.find(
								( t ) => t.slug === taxonomy
							);
							if ( ! taxonomyData ) {
								return null;
							}

							const selectedTermIds =
								effectiveSelectedTerms[ taxonomy ] || [];
							if ( selectedTermIds.length === 0 ) {
								return (
									<div
										key={ `empty-${ taxonomy }` }
										className="ablocks-taxonomy-listing-item"
									>
										<p className="ablocks-taxonomy-not-found">
											{ __(
												'Please select at least one term for this taxonomy.',
												'ablocks'
											) }
										</p>
									</div>
								);
							}
							return selectedTermIds.map( ( termId ) => {
								const term = taxonomyData.terms?.find(
									( t ) => t.id === termId
								);
								const posts =
									postsByTerm[
										`${ taxonomy }-${ termId }`
									] || [];

								if ( ! term ) {
									return null;
								}

								return (
									<div
										key={ `${ taxonomy }-${ termId }` }
										className="ablocks-taxonomy-listing-item"
									>
										<h3 className="ablocks-taxonomy-title">
											{ showIconDffent && allowIcon && (
												<span className="ablocks-taxonomy-icon">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="32"
														height="32"
														fill="#000000"
														viewBox="0 0 256 256"
													>
														<path d="M245,110.64A16,16,0,0,0,232,104H216V88a16,16,0,0,0-16-16H130.67L102.94,51.2a16.14,16.14,0,0,0-9.6-3.2H40A16,16,0,0,0,24,64V208h0a8,8,0,0,0,8,8H211.1a8,8,0,0,0,7.59-5.47l28.49-85.47A16.05,16.05,0,0,0,245,110.64ZM93.34,64,123.2,86.4A8,8,0,0,0,128,88h72v16H69.77a16,16,0,0,0-15.18,10.94L40,158.7V64Zm112,136H43.1l26.67-80H232Z"></path>
													</svg>
												</span>
											) }
											<span
												className={
													showIconDffent === true
														? 'ablocks-taxonomy-listing_direction'
														: ''
												}
											>
												{ showIconDffent === false &&
													allowIcon && (
														<span className="ablocks-taxonomy-icon">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="32"
																height="32"
																fill="#000000"
																viewBox="0 0 256 256"
															>
																<path d="M245,110.64A16,16,0,0,0,232,104H216V88a16,16,0,0,0-16-16H130.67L102.94,51.2a16.14,16.14,0,0,0-9.6-3.2H40A16,16,0,0,0,24,64V208h0a8,8,0,0,0,8,8H211.1a8,8,0,0,0,7.59-5.47l28.49-85.47A16.05,16.05,0,0,0,245,110.64ZM93.34,64,123.2,86.4A8,8,0,0,0,128,88h72v16H69.77a16,16,0,0,0-15.18,10.94L40,158.7V64Zm112,136H43.1l26.67-80H232Z"></path>
															</svg>
														</span>
													) }
												{ attributes.pageLinks ===
													'singlePagelink' &&
												firstPostLinksByTerm[
													`${ taxonomy }-${ termId }`
												] ? (
													<a
														href={
															firstPostLinksByTerm[
																`${ taxonomy }-${ termId }`
															]
														}
													>
														{ term.name }
													</a>
												) : attributes.pageLinks ===
												  'archivePagelink' ? (
													<a href={ term.link }>
														{ term.name }
													</a>
												) : (
													term.name
												) }
												{ showTermCount &&
													showIconDffent === true && (
														<span className="ablocks-taxonomy-title__post-count">
															{ term.count }
															{ showTermCountPrefix && (
																<span>
																	{
																		countPrefixText
																	}
																</span>
															) }
														</span>
													) }
											</span>
											{ showTermCount &&
												showIconDffent === false && (
													<span className="ablocks-taxonomy-title__post-count">
														{ term.count }
														{ showTermCountPrefix && (
															<span>
																{
																	countPrefixText
																}
															</span>
														) }
													</span>
												) }
										</h3>
										{ showPost && (
											<div className="ablocks-taxonomy-listing-item_content">
												{ posts.length > 0 ? (
													<ul className="ablocks-taxonomy-posts">
														{ posts.map(
															( post ) => (
																<a
																	key={
																		post.id
																	}
																	href={
																		post.link
																	}
																	target="_blank"
																	rel="noreferrer"
																>
																	<div
																		dangerouslySetInnerHTML={ {
																			__html: post
																				.title
																				.rendered,
																		} }
																	/>
																</a>
															)
														) }
													</ul>
												) : (
													<p>
														{ __(
															'No posts found.',
															'ablocks'
														) }
													</p>
												) }

												{ enableReloadButton && (
													<div className="ablocks-reload-button-wrapper">
														<a
															href={
																term.link ||
																`/${ taxonomy }/${ term.slug }`
															}
															className="ablocks-reload-button"
														>
															{ buttonText }
														</a>
													</div>
												) }
											</div>
										) }
									</div>
								);
							} );
						} )
					) }
				</div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
