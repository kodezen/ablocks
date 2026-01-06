import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import React from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import ABlocksMarquee from './newsTicker';
import { getRenderDomElement } from '@Utils/helper';
import AblocksRichText from '@Components/rich-text';
import { useFetch } from './helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
const propTypes = {};
const defaultProps = {};
import './style.css';

export default function Render( props ) {
	const { attributes, setAttributes, className = '' } = props;
	const {
		block_id,
		slideSpeed,
		stickyLabel,
		stickyLabelTag,
		slideDirection,
		selectedPosts,
		selectedPages,
		isPauseOnOver,
		queryType,
		lists,
		_position,
		_width,
		postLink,
		pageLink,
		navigatorColor,
	} = attributes;
	let currentPosition = 0;
	useEffect( () => {
		const element = getRenderDomElement( `.ablocks-block-${ block_id }` );
		let marqueeInstance;

		if ( element ) {
			marqueeInstance = new ABlocksMarquee( element, {
				slideSpeed,
				slideDirection,
				isPauseOnOver,
				currentPosition,
			} );
		}

		return () => {
			if ( marqueeInstance ) {
				currentPosition = marqueeInstance.currentPosition;
				marqueeInstance.destroy();
			}
		};
	}, [ isPauseOnOver, slideSpeed, slideDirection, block_id ] );

	// Reset selected pages or posts when query type changes
	useEffect( () => {
		if ( queryType === 'posts' ) {
			setAttributes( { selectedPages: [] } );
		} else if ( queryType === 'pages' ) {
			setAttributes( { selectedPosts: [] } );
		}
	}, [ queryType ] );

	// Filter pages and posts
	const getFilterSelectedItems = ( items, selectedItems ) => {
		const selectedItemsArray =
			typeof selectedItems === 'object' && selectedItems !== null
				? selectedItems
				: [ selectedItems ];

		return items
			? items.filter( ( item ) => selectedItemsArray.includes( item.id ) )
			: [];
	};

	const filteredPages = getFilterSelectedItems(
		useFetch( 'page' ),
		selectedPages
	);
	const filteredPosts = getFilterSelectedItems(
		useFetch( 'post' ),
		selectedPosts
	);

	// Get relative time
	const getRelativeTime = ( dateString ) => {
		const postDate = new Date( dateString );
		const now = new Date();
		const diffInSeconds = Math.floor( ( now - postDate ) / 1000 );

		const timeIntervals = {
			year: 31536000,
			month: 2592000,
			week: 604800,
			day: 86400,
			hour: 3600,
			minute: 60,
			second: 1,
		};

		for ( const interval in timeIntervals ) {
			const timeDiff = Math.floor(
				diffInSeconds / timeIntervals[ interval ]
			);
			if ( timeDiff >= 1 ) {
				return `${ timeDiff } ${ interval }${
					timeDiff > 1 ? 's' : ''
				} ago`;
			}
		}
		return 'Just now';
	};
	const { positionType } = _position;
	const { widthType } = _width;

	const absoluteClass =
		positionType === 'absolute'
			? 'ablocks-block-news-ticker--absolute'
			: '';
	const positionClass =
		positionType === 'fixed'
			? 'ablocks-block-news-ticker--fixed'
			: absoluteClass;

	const defaultWidth =
		widthType === 'default' ? 'ablocks-block-news-ticker--default' : '';
	const widthClass =
		widthType === 'auto' ? 'ablocks-block-news-ticker--auto' : defaultWidth;

	const dynamicClass = `${ positionClass } ${ widthClass }`;
	const hasPostsPagesLists =
		filteredPosts.length > 0 ||
		filteredPages.length > 0 ||
		( queryType === 'customText' && lists.length > 0 );

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ {
					...attributes,
				} }
				className={ dynamicClass }
			>
				<div
					className={ `ablocks-block-news-ticker${ className }` }
					data-slide-speed={ slideSpeed }
				>
					<AblocksRichText
						tagName={ stickyLabelTag }
						value={ stickyLabel }
						className="ablocks-block-news-ticker__label"
						onChange={ ( newStickyLabel ) =>
							setAttributes( { stickyLabel: newStickyLabel } )
						}
						placeholder={ __( 'Breaking News', 'ablocks' ) }
					/>

					<div className="ablocks-block-news-ticker__marquee">
						<div className="ablocks-block-news-ticker_marquee--content">
							<ul className="ablocks-block-news-ticker__list">
								{ queryType === 'customText' && (
									<>
										{ lists.map( ( item ) =>
											item.link?.href?.length > 0 ? (
												<a
													href={ item.link.href }
													target={
														item.link.linkTarget
															? '_blank'
															: '_self'
													}
													rel={
														item.link.linkTarget
															? 'noopener noreferrer'
															: undefined
													}
													key={ `list-${ item.id }` }
												>
													<li className="ablocks-block-news-ticker__custom-text">
														{ item.text }
													</li>
												</a>
											) : (
												<li
													key={ `list-${ item.id }` }
													className="ablocks-block-news-ticker__custom-text"
												>
													{ item.text }
												</li>
											)
										) }
									</>
								) }
								{ hasPostsPagesLists ? (
									<>
										{ filteredPosts.map( ( post ) =>
											postLink ? (
												<a
													href={ post.link }
													target="_blank"
													rel="noreferrer"
													key={ post.id }
												>
													<li
														key={ `post-${ post.id }` }
													>
														{ post.title.rendered }
														<span className="ablocks-block-news-ticker--date">
															{ getRelativeTime(
																post.date
															) }
														</span>
													</li>
												</a>
											) : (
												<li key={ `post-${ post.id }` }>
													{ post.title.rendered }
													<span className="ablocks-block-news-ticker--date">
														{ getRelativeTime(
															post.date
														) }
													</span>
												</li>
											)
										) }
										{ filteredPages.map( ( page ) =>
											pageLink ? (
												<a
													href={ page.link }
													target="_blank"
													rel="noreferrer"
													key={ page.id }
												>
													<li
														key={ `page-${ page.id }` }
													>
														{ page.title.rendered }
														<span className="ablocks-block-news-ticker--date">
															{ getRelativeTime(
																page.date
															) }
														</span>
													</li>
												</a>
											) : (
												<li key={ `page-${ page.id }` }>
													{ page.title.rendered }
													<span className="ablocks-block-news-ticker--date">
														{ getRelativeTime(
															page.date
														) }
													</span>
												</li>
											)
										) }
									</>
								) : (
									<li>
										{ __( 'No items selected', 'ablocks' ) }
									</li>
								) }
							</ul>
						</div>

						<div className="ablocks-block-news-ticker--icons">
							<button
								aria-label="Previous Button"
								title="Previous Button"
								className="ablocks-block-news-ticker--icons__prev"
							>
								<svg
									width="24"
									height="50"
									viewBox="0 0 28 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18.119 22.1309C18.2003 22.2122 18.2648 22.3087 18.3088 22.415C18.3528 22.5212 18.3755 22.635 18.3755 22.75C18.3755 22.865 18.3528 22.9788 18.3088 23.085C18.2648 23.1913 18.2003 23.2878 18.119 23.3691C18.0378 23.4504 17.9412 23.5148 17.835 23.5588C17.7288 23.6028 17.615 23.6255 17.5 23.6255C17.385 23.6255 17.2712 23.6028 17.165 23.5588C17.0587 23.5148 16.9622 23.4504 16.8809 23.3691L8.13092 14.6191C8.04957 14.5378 7.98503 14.4413 7.941 14.3351C7.89696 14.2288 7.8743 14.115 7.8743 14C7.8743 13.885 7.89696 13.7712 7.941 13.6649C7.98503 13.5587 8.04957 13.4622 8.13092 13.3809L16.8809 4.63094C17.0451 4.46675 17.2678 4.37451 17.5 4.37451C17.7322 4.37451 17.9549 4.46675 18.119 4.63094C18.2832 4.79512 18.3755 5.01781 18.3755 5.25C18.3755 5.48219 18.2832 5.70488 18.119 5.86906L9.98702 14L18.119 22.1309Z"
										fill={ getTextColorCSS(
											navigatorColor
										) }
									/>
								</svg>
							</button>
							<button
								aria-label="Pause Button"
								title="Pause Button"
								className="ablocks-block-news-ticker--icons__pause"
							>
								<svg
									width="28"
									height="50"
									viewBox="0 0 28 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect
										x="9"
										y="4"
										width="1.55556"
										height="19.25"
										fill={ getTextColorCSS(
											navigatorColor
										) }
									/>
									<rect
										x="18.2"
										y="4"
										width="1.55556"
										height="19.25"
										fill={ getTextColorCSS(
											navigatorColor
										) }
									/>
								</svg>
							</button>
							<button
								aria-label="Next Button"
								title="Next Button"
								className="ablocks-block-news-ticker--icons__next"
							>
								<svg
									width="24"
									height="50"
									viewBox="0 0 28 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19.8691 14.6191L11.1191 23.3691C11.0378 23.4504 10.9413 23.5148 10.835 23.5588C10.7288 23.6028 10.615 23.6255 10.5 23.6255C10.385 23.6255 10.2712 23.6028 10.165 23.5588C10.0587 23.5148 9.96223 23.4504 9.88094 23.3691C9.79964 23.2878 9.73515 23.1913 9.69115 23.085C9.64716 22.9788 9.62451 22.865 9.62451 22.75C9.62451 22.635 9.64716 22.5212 9.69115 22.415C9.73515 22.3087 9.79964 22.2122 9.88094 22.1309L18.013 14L9.88094 5.86906C9.71675 5.70488 9.62451 5.48219 9.62451 5.25C9.62451 5.01781 9.71675 4.79512 9.88094 4.63094C10.0451 4.46675 10.2678 4.37451 10.5 4.37451C10.7322 4.37451 10.9549 4.46675 11.1191 4.63094L19.8691 13.3809C19.9504 13.4622 20.015 13.5587 20.059 13.6649C20.103 13.7712 20.1257 13.885 20.1257 14C20.1257 14.115 20.103 14.2288 20.059 14.3351C20.015 14.4413 19.9504 14.5378 19.8691 14.6191Z"
										fill={ getTextColorCSS(
											navigatorColor
										) }
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
