import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksTypography from '@Controls/typography';
import InspectorTabs from '@Components/inspector-tabs';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksRangeControl from '@Controls/range';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import { PanelBody } from '@wordpress/components';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import ABlocksTextControl from '@Controls/text';
import Select from 'react-select';
import { postCountWidth as postWidthDefaultVale } from '../taxonomy-listing/attributes';
import { iconsSize as iconsSizeDefaultVale } from '../taxonomy-listing/attributes';
import { useEffect, useMemo } from '@wordpress/element';
import { parse } from '@wordpress/blocks';
import { useRef } from '@wordpress/element';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		alignment,
		taxonomyTitleTypography,
		taxonomyTitlecolor,
		postTitleHoverColor,
		selectedPostType,
		selectedTerms = {},
		activeTaxonomy = [],
		postOrder,
		postOrderBy,
		numberOfPosts,
		enableReloadButton,
		allowIcon,
		showTermCount,
		postCountBorder,
		postCountBgColor,
		postCountColor,
		taxonomyTitlePadding,
		taxonomyTitletBgColor,
		taxonomyTitleDirection,
		taxonomyTitlePosition,
		taxonomyTitleBorder,
		postTitleColor,
		postTitleTypography,
		buttonPadding,
		buttonBorder,
		buttonBgColor,
		buttonHoverBgColor,
		buttonColor,
		buttonHoverColor,
		buttonTypography,
		buttonPosition,
		cardBgColor,
		cardPadding,
		cardBorder,
		cardBoxShadow,
		buttonText,
		showTab,
		postPadding,
		activePostBackgroundColor,
		hoverPostBackgroundColor,
		postTitleActiveColor,
		activePostBorder,
		postBorder,
		postBackgroundColor,
		showPost,
		cardBgHoverColor,
		showPostLink,
		showInherit,
		postCountTypography,
		showTermCountPrefix,
		countPrefixText,
		iconColor,
		iconBorderRadius,
		iconBgColor,
		iconPadding,
		showIconDffent,
		pageLinks,
		showTabScrolling,
		taxonomyLayout = true,
	} = attributes;

	const postTypes = useSelect( ( select ) => {
		const types =
			select( coreStore ).getPostTypes( { per_page: -1 } ) || [];
		return types.filter(
			( type ) => type.viewable && type.slug !== 'attachment'
		);
	}, [] );

	const taxonomiesWithTerms = useSelect(
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

	const updateSelectedTerms = ( taxonomy, values ) => {
		setAttributes( {
			selectedTerms: {
				...selectedTerms,
				[ taxonomy ]: values,
			},
		} );
	};
	const supportedOrderBy = [
		{ label: 'Date', value: 'date' },
		{ label: 'Title', value: 'title' },
	];

	if ( selectedPostType === 'page' || selectedPostType === '' ) {
		supportedOrderBy.push( { label: 'Menu Order', value: 'menu_order' } );
	}

	const availableTaxonomies = taxonomiesWithTerms.map( ( t ) => ( {
		label: t.name,
		value: t.slug,
	} ) );
	const activeTaxonomies = taxonomiesWithTerms.filter( ( t ) =>
		activeTaxonomy.includes( t.slug )
	);

	const __autoOn = Boolean(
		( attributes?.query && attributes.query.inherit ) ??
			attributes?.initial ??
			attributes?.showInherit
	);

	const __es = useSelect( ( select ) => select( 'core/edit-site' ), [] );
	const __tplId = useSelect(
		() => __es?.getEditedPostId?.() || '',
		[ __es ]
	);
	const __tplType = useSelect(
		() => __es?.getEditedPostType?.() || 'wp_template',
		[ __es ]
	);

	const __tplRecord = useSelect(
		( select ) => {
			if ( ! __tplId || ! __tplType ) {
				return null;
			}
			return select( coreStore ).getEntityRecord(
				'postType',
				__tplType,
				__tplId
			);
		},
		[ __tplId, __tplType ]
	);

	const __slugFromId =
		typeof __tplId === 'string'
			? __tplId.split( '/' ).filter( Boolean ).pop()
			: '';

	const __slugFromUrl = ( () => {
		try {
			const qs = new URLSearchParams( window.location.search );
			const p = qs.get( 'p' );
			if ( ! p ) {
				return '';
			}
			return (
				decodeURIComponent( p ).split( '/' ).filter( Boolean ).pop() ||
				''
			);
		} catch {
			return '';
		}
	} )();

	const __tplSlug = __slugFromId || __slugFromUrl;
	const __isArchive = /^archive(?:-|$)/i.test( __tplSlug );

	const __ptFromQuery = useMemo( () => {
		const raw =
			__tplRecord?.content?.raw || __tplRecord?.content?.rendered || '';
		if ( ! raw ) {
			return '';
		}
		try {
			const blocks = parse( raw );
			let pt = '';
			const walk = ( arr = [] ) => {
				for ( const b of arr ) {
					if ( b?.name === 'core/query' ) {
						const q = b?.attributes?.query;
						if ( q?.postType ) {
							pt = Array.isArray( q.postType )
								? q.postType[ 0 ] || ''
								: q.postType;
							if ( pt ) {
								return true;
							}
						}
					}
					if ( b?.innerBlocks?.length && walk( b.innerBlocks ) ) {
						return true;
					}
				}
				return false;
			};
			walk( blocks );
			return pt || '';
		} catch {
			return '';
		}
	}, [ __tplRecord ] );

	const __ptFromSlug = ( () => {
		const m = __tplSlug?.match( /^archive-([a-z0-9_-]+)$/i );
		return m && m[ 1 ] ? m[ 1 ] : '';
	} )();

	const __ptFromHasArchive = useMemo( () => {
		const suf = __ptFromSlug;
		if ( ! suf ) {
			return '';
		}
		if ( ! Array.isArray( postTypes ) || ! postTypes.length ) {
			return '';
		}
		const hit = postTypes.find( ( t ) => {
			if ( t.slug === suf ) {
				return true;
			}
			if ( t.has_archive === true && suf === t.slug ) {
				return true;
			}
			if (
				typeof t.has_archive === 'string' &&
				t.has_archive.toLowerCase() === suf.toLowerCase()
			) {
				return true;
			}
			return false;
		} );
		return hit?.slug || '';
	}, [ postTypes, __ptFromSlug ] );

	const __candidatePT = useMemo( () => {
		if ( __ptFromQuery ) {
			return __ptFromQuery;
		}

		if (
			__ptFromSlug &&
			Array.isArray( postTypes ) &&
			postTypes.some( ( t ) => t.slug === __ptFromSlug )
		) {
			return __ptFromSlug;
		}

		if ( __ptFromHasArchive ) {
			return __ptFromHasArchive;
		}

		if ( Array.isArray( postTypes ) && postTypes.length ) {
			const firstArch =
				postTypes.find( ( t ) => t.has_archive && t.slug !== 'post' ) ||
				postTypes.find( ( t ) => t.slug === 'post' );
			return firstArch?.slug || '';
		}

		return '';
	}, [ __ptFromQuery, __ptFromSlug, __ptFromHasArchive, postTypes ] );

	useEffect( () => {
		if ( ! __autoOn ) {
			return;
		}
		if ( ! __isArchive ) {
			return;
		}
		if ( ! Array.isArray( postTypes ) || ! postTypes.length ) {
			return;
		}
		if ( ! __candidatePT ) {
			return;
		}

		if ( selectedPostType !== __candidatePT ) {
			setAttributes( { selectedPostType: __candidatePT } );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ __autoOn, __isArchive, postTypes, __candidatePT ] );
	// helper: array item reorder
	const reorder = ( list, startIndex, endIndex ) => {
		const result = Array.from( list );
		const [ removed ] = result.splice( startIndex, 1 );
		result.splice( endIndex, 0, removed );
		return result;
	};

	const dragIndexRef = useRef( null );
	return (
		<InspectorControls>
			<InspectorTabs
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				<ABlocksPanelBody
					title={ __( 'Taxonomy Settings', 'ablocks' ) }
					initialOpen={ true }
				>
					<ContentStyleTabs
						content={
							<>
								<ABlocksToggleControl
									isResponsive={ false }
									label={ __( 'Inherit', 'ablocks' ) }
									attributeValue={ showInherit }
									setAttributes={ setAttributes }
									attributeName="showInherit"
								/>

								{ ! showInherit && (
									<ABlocksSelectControl
										label={ __(
											'Select Post Type',
											'ablocks'
										) }
										options={ [
											{
												label: __(
													'Select a post type',
													'ablocks'
												),
												value: '',
											},
											...postTypes.map( ( type ) => ( {
												label: type.name,
												value: type.slug,
											} ) ),
										] }
										attributeName="selectedPostType"
										attributeValue={ selectedPostType }
										setAttributes={ setAttributes }
									/>
								) }
								{ selectedPostType && (
									<ABlocksSelectControl
										label={ __(
											'Select Taxonomies',
											'ablocks'
										) }
										attributeName="activeTaxonomy"
										attributeValue={
											Array.isArray( activeTaxonomy )
												? activeTaxonomy[ 0 ]
												: null
										}
										setAttributes={ ( attrs ) => {
											const { activeTaxonomy } = attrs;
											const fixed = Array.isArray(
												activeTaxonomy
											)
												? activeTaxonomy
												: [ activeTaxonomy ];

											setAttributes( {
												activeTaxonomy: fixed,
											} );
										} }
										options={ [
											{
												label: __(
													'Select Taxonomy',
													'ablocks'
												),
												value: '',
											},
											...taxonomiesWithTerms.map(
												( t ) => ( {
													label: t.name,
													value: t.slug,
												} )
											),
										] }
										isMultiple={ false }
										isSearchable={ true }
										placeholder={ __(
											'Select Taxonomy',
											'ablocks'
										) }
									/>
								) }

								{ ! showInherit &&
									activeTaxonomies.map( ( taxonomy ) => {
										const termOptions = taxonomy.terms.map(
											( term ) => ( {
												label: showTermCount
													? `${ term.name } (${ term.count })`
													: term.name,
												value: term.id,
											} )
										);

										const selectedValues = Array.isArray(
											selectedTerms?.[ taxonomy.slug ]
										)
											? termOptions.filter( ( option ) =>
													selectedTerms[
														taxonomy.slug
													].includes( option.value )
											  )
											: [];

										const selectedIds = Array.isArray(
											selectedTerms?.[ taxonomy.slug ]
										)
											? selectedTerms[ taxonomy.slug ]
											: [];

										return (
											<div key={ taxonomy.slug }>
												<label>
													{ __(
														'Select',
														'ablocks'
													) }{ ' ' }
													{ taxonomy.name }
												</label>

												<Select
													isMulti
													isSearchable
													options={ termOptions }
													value={ selectedValues }
													onChange={ ( selected ) => {
														const values = (
															selected || []
														).map(
															( opt ) => opt.value
														);
														updateSelectedTerms(
															taxonomy.slug,
															values
														);
													} }
												/>
												{ selectedIds.length > 0 && (
													<div className="ablocks-taxonomy__position-drag">
														<div>
															{ __(
																'Position Drag to reorder',
																'ablocks'
															) }
														</div>

														{ /* container: drop allow */ }
														<div
															onDragOver={ (
																e
															) =>
																e.preventDefault()
															}
														>
															{ selectedIds.map(
																(
																	id,
																	index
																) => {
																	const item =
																		termOptions.find(
																			(
																				o
																			) =>
																				o.value ===
																				id
																		);
																	if (
																		! item
																	) {
																		return null;
																	}

																	return (
																		<div
																			className="ablocks-taxonomy__position-drag_item"
																			key={ `${ taxonomy.slug }-${ id }` }
																			draggable
																			onDragStart={ () => {
																				dragIndexRef.current =
																					index;
																			} }
																			onDragOver={ (
																				e
																			) =>
																				e.preventDefault()
																			}
																			onDrop={ () => {
																				if (
																					dragIndexRef.current ===
																						null ||
																					dragIndexRef.current ===
																						index
																				) {
																					dragIndexRef.current =
																						null;
																					return;
																				}
																				const reordered =
																					reorder(
																						selectedIds,
																						dragIndexRef.current,
																						index
																					);
																				dragIndexRef.current =
																					null;
																				updateSelectedTerms(
																					taxonomy.slug,
																					reordered
																				);
																			} }
																			title={ __(
																				'Position Drag to reorder',
																				'ablocks'
																			) }
																		>
																			<span>
																				{
																					item.label
																				}
																			</span>
																			<span>
																				⠿
																			</span>
																		</div>
																	);
																}
															) }
														</div>
													</div>
												) }
											</div>
										);
									} ) }

								{ activeTaxonomy.length > 0 && (
									<>
										<Separator />
										<ABlocksToggleControl
											isResponsive={ false }
											label={ __(
												'Show Taxonomy Link',
												'ablocks'
											) }
											attributeValue={ showPostLink }
											setAttributes={ setAttributes }
											attributeName="showPostLink"
										/>
										{ showPostLink && (
											<ABlocksSelectControl
												label={ __(
													'Taxonomy Link Type',
													'ablocks'
												) }
												attributeName="pageLinks"
												attributeValue={
													attributes.pageLinks
												}
												setAttributes={ setAttributes }
												options={ [
													{
														label: __(
															'Single Page link',
															'ablocks'
														),
														value: 'singlePagelink',
													},
													{
														label: __(
															'Archive page link',
															'ablocks'
														),
														value: 'archivePagelink',
													},
												] }
											/>
										) }
										{ showPostLink && (
											<div
												style={ {
													paddingBottom: '20px',
													display: 'block',
													fontSize: '12px',
												} }
											>
												<i>
													{ ' ' }
													Frontend: show all taxonomy
													titles as links. Editor:
													show only the taxonomy title
													as a link.
												</i>
											</div>
										) }

										<ABlocksToggleControl
											isResponsive={ false }
											label={ __(
												'Show Post',
												'ablocks'
											) }
											attributeValue={ showPost }
											setAttributes={ setAttributes }
											attributeName="showPost"
										/>
										<ABlocksToggleControl
											isResponsive={ false }
											label={ __(
												'Show Term Post Count',
												'ablocks'
											) }
											attributeValue={ showTermCount }
											setAttributes={ setAttributes }
											attributeName="showTermCount"
										/>
										{ showTermCount && (
											<ABlocksToggleControl
												isResponsive={ false }
												label={ __(
													'Show Prefix',
													'ablocks'
												) }
												attributeValue={
													showTermCountPrefix
												}
												setAttributes={ setAttributes }
												attributeName="showTermCountPrefix"
											/>
										) }
										{ showTermCountPrefix && (
											<ABlocksTextControl
												label={ __(
													'Count Prefix Text',
													'ablocks'
												) }
												attributeName="countPrefixText"
												attributeValue={
													countPrefixText
												}
												setAttributes={ setAttributes }
												isInline={ false }
												placeholder={ __( 'Items' ) }
												disableDynamicContent={ true }
											/>
										) }
										<ABlocksSelectControl
											label={ __(
												'Layout Style',
												'ablocks'
											) }
											attributeName="taxonomyLayout"
											attributeValue={
												attributes.taxonomyLayout
											}
											setAttributes={ setAttributes }
											options={ [
												{
													label: __(
														'List View',
														'ablocks'
													),
													value: 'list',
												},
												{
													label: __(
														'Flex/Grid View',
														'ablocks'
													),
													value: 'flex',
												},
											] }
										/>
										{ attributes.taxonomyLayout ===
											'list' && (
											<u
												style={ {
													paddingBottom: '20px',
													display: 'block',
												} }
											>
												<i>
													Tab View Show Only FrontEnd
												</i>
											</u>
										) }
										{ attributes.taxonomyLayout ===
											'list' && (
											<ABlocksToggleControl
												isResponsive={ false }
												label={ __(
													'Tab View',
													'ablocks'
												) }
												attributeValue={ showTab }
												setAttributes={ setAttributes }
												attributeName="showTab"
											/>
										) }
										{ attributes.taxonomyLayout ===
											'list' && (
											<ABlocksToggleControl
												isResponsive={ false }
												label={ __(
													'Show Tab Scrolling',
													'ablocks'
												) }
												attributeValue={
													showTabScrolling
												}
												setAttributes={ setAttributes }
												attributeName="showTabScrolling"
											/>
										) }

										{ attributes.taxonomyLayout ===
											'flex' && (
											<ABlocksSelectControl
												label={ __(
													'Items Per Row',
													'ablocks'
												) }
												attributeName="itemsPerRow"
												attributeValue={
													attributes.itemsPerRow
												}
												setAttributes={ setAttributes }
												options={ Array.from(
													{ length: 6 },
													( _, i ) => ( {
														label: `${ i + 1 }`,
														value: i + 1,
													} )
												) }
											/>
										) }
										{ showPost && (
											<ABlocksSelectControl
												label={ __(
													'Post Order By',
													'ablocks'
												) }
												attributeName="postOrderBy"
												attributeValue={ postOrderBy }
												setAttributes={ setAttributes }
												options={ supportedOrderBy }
											/>
										) }
										{ showPost && (
											<ABlocksSelectControl
												label={ __(
													'Post Order',
													'ablocks'
												) }
												attributeName="postOrder"
												attributeValue={ postOrder }
												setAttributes={ setAttributes }
												options={ [
													{
														label: 'Descending',
														value: 'desc',
													},
													{
														label: 'Ascending',
														value: 'asc',
													},
												] }
											/>
										) }

										{ showPost && (
											<ABlocksSelectControl
												label={ __(
													'Number of Posts',
													'ablocks'
												) }
												attributeName="numberOfPosts"
												attributeValue={ numberOfPosts }
												setAttributes={ setAttributes }
												options={ [
													{
														label: __(
															'All',
															'ablocks'
														),
														value: -1,
													},
													...Array.from(
														{ length: 20 },
														( _, i ) => ( {
															label: `${ i + 1 }`,
															value: i + 1,
														} )
													),
												] }
											/>
										) }

										{ showPost && (
											<ABlocksToggleControl
												isResponsive={ false }
												label={ __(
													'Enable Reload Button',
													'ablocks'
												) }
												attributeValue={
													enableReloadButton
												}
												setAttributes={ setAttributes }
												attributeName="enableReloadButton"
											/>
										) }

										{ enableReloadButton && (
											<ABlocksTextControl
												label={ __(
													'Button Text',
													'ablocks'
												) }
												attributeName="buttonText"
												attributeValue={ buttonText }
												setAttributes={ setAttributes }
												isInline={ false }
												placeholder={ __(
													'View More'
												) }
												disableDynamicContent={ true }
											/>
										) }
										<ABlocksToggleControl
											isResponsive={ false }
											label={ __(
												'Allow icon',
												'ablocks'
											) }
											attributeValue={ allowIcon }
											setAttributes={ setAttributes }
											attributeName="allowIcon"
										/>
									</>
								) }
							</>
						}
						style={
							<>
								<u
									style={ {
										paddingBottom: '20px',
										display: 'block',
									} }
								>
									<i>Taxonomy Card Style</i>
								</u>
								<ABlocksAlignmentControl
									label={ __( 'Alignment', 'ablocks' ) }
									attributeName="alignment"
									attributeValue={ alignment }
									setAttributes={ setAttributes }
									isInline={ false }
								/>
								<ABlocksColorControl
									label={ __(
										'Card Background Color',
										'ablocks'
									) }
									isGradient={ true }
									attributeName="cardBgColor"
									attributeValue={ cardBgColor }
									setAttributes={ setAttributes }
								/>
								<ABlocksColorControl
									label={ __(
										'Card Hover Background Color',
										'ablocks'
									) }
									isGradient={ true }
									attributeName="cardBgHoverColor"
									attributeValue={ cardBgHoverColor }
									setAttributes={ setAttributes }
								/>
								<ControlLabel
									label="Card Border"
									isResponsive={ true }
									isHeader={ true }
								/>
								<ABlocksBorderControl
									attributeName="cardBorder"
									attributeValue={ cardBorder }
									setAttributes={ setAttributes }
								/>
								<ABlocksDimensions
									label={ __( 'Card Padding', 'ablocks' ) }
									isResponsive={ true }
									attributeName="cardPadding"
									attributeValue={ cardPadding }
									setAttributes={ setAttributes }
								/>
								<ControlLabel
									label="Card Box shadow"
									isHeader={ true }
									isResponsive={ false }
								/>
								<ABlocksBoxShadowControl
									label={ __( 'Box shadow', 'ablocks' ) }
									attributeName="cardBoxShadow"
									attributeValue={ cardBoxShadow }
									setAttributes={ setAttributes }
								/>
							</>
						}
					/>
				</ABlocksPanelBody>
				<PanelBody
					title={ __( 'Taxonomy Title Style', 'ablocks' ) }
					initialOpen={ false }
				>
					<ABlocksAlignmentControl
						label={ __( 'Alignment', 'ablocks' ) }
						attributeName="taxonomyTitlePosition"
						attributeValue={ taxonomyTitlePosition }
						setAttributes={ setAttributes }
						options={ [
							{
								label: 'Start',
								value: 'start',
								icon: 'arrow-left',
							},
							{
								label: 'Space Between',
								value: 'space-between',
								icon: 'wrap',
							},
							{
								label: 'Space Around',
								value: 'space-around',
								icon: 'wrap',
							},
							{
								label: 'right',
								value: 'right',
								icon: 'arrow-right',
							},
						] }
						isInline={ false }
					/>
					<ABlocksAlignmentControl
						label={ __( 'Position', 'ablocks' ) }
						attributeName="taxonomyTitleDirection"
						attributeValue={ taxonomyTitleDirection }
						setAttributes={ setAttributes }
						options={ [
							{
								label: 'Row',
								value: 'row',
								icon: 'arrow-left',
							},
							{
								label: 'Column',
								value: 'column',
								icon: 'wrap',
							},
						] }
						isInline={ false }
					/>

					{ attributes.taxonomyTitleDirection && (
						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Icon Position', 'ablocks' ) }
							attributeValue={ showIconDffent }
							setAttributes={ setAttributes }
							attributeName="showIconDffent"
						/>
					) }
					<ABlocksTypography
						label={ __( 'Typography', 'ablocks' ) }
						attributeName="taxonomyTitleTypography"
						attributeValue={ taxonomyTitleTypography }
						setAttributes={ setAttributes }
						isResponsive={ true }
						attributes={ attributes }
					/>
					<ABlocksColorControl
						label={ __( 'Color', 'ablocks' ) }
						isGradient={ true }
						attributeName="taxonomyTitlecolor"
						attributeValue={ taxonomyTitlecolor }
						setAttributes={ setAttributes }
					/>
					<ABlocksColorControl
						label={ __( 'Background Color', 'ablocks' ) }
						isGradient={ true }
						attributeName="taxonomyTitletBgColor"
						attributeValue={ taxonomyTitletBgColor }
						setAttributes={ setAttributes }
					/>
					<ABlocksDimensions
						label={ __( 'Padding', 'ablocks' ) }
						isResponsive={ true }
						attributeName="taxonomyTitlePadding"
						attributeValue={ taxonomyTitlePadding }
						setAttributes={ setAttributes }
					/>
					<ControlLabel
						label="Border"
						isResponsive={ false }
						isHeader={ true }
					/>

					<ABlocksBorderControl
						attributeName="taxonomyTitleBorder"
						attributeValue={ taxonomyTitleBorder }
						setAttributes={ setAttributes }
					/>
				</PanelBody>
				{ showTermCount && (
					<PanelBody
						title={ __( 'Taxonomy Post Count Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="postCountTypography"
							attributeValue={ postCountTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							attributeName="postCountColor"
							attributeValue={ postCountColor }
							setAttributes={ setAttributes }
						/>

						<ABlocksColorControl
							label={ __( 'Background Color', 'ablocks' ) }
							isGradient={ true }
							attributeName="postCountBgColor"
							attributeValue={ postCountBgColor }
							setAttributes={ setAttributes }
						/>

						<ABlocksRangeControl
							label={ __( 'Post Count Width', 'ablocks' ) }
							min={ 1 }
							max={ 100 }
							hasUit={ false }
							isInlnine={ false }
							isResponsive={ false }
							attributeName={ 'postCountWidth' }
							attributeValue={ attributes?.postCountWidth }
							setAttributes={ setAttributes }
							attributeDefaultValue={ postWidthDefaultVale }
						/>
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="postCountBorder"
							attributeValue={ postCountBorder }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
				) }
				{ showPost && (
					<PanelBody
						title={ __( 'Post Title Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<Separator />
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="postTitleTypography"
							attributeValue={ postTitleTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="postTitleColor"
										attributeValue={ postTitleColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="postBackgroundColor"
										attributeValue={ postBackgroundColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="postPadding"
										attributeValue={ postPadding }
										setAttributes={ setAttributes }
									/>
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="postBorder"
										attributeValue={ postBorder }
										setAttributes={ setAttributes }
									/>
									<u
										style={ {
											paddingBottom: '20px',
											display: 'block',
										} }
									>
										<i>Active Style</i>
									</u>
									<ABlocksColorControl
										label={ __(
											'Active Color',
											'ablocks'
										) }
										attributeName="postTitleActiveColor"
										attributeValue={ postTitleActiveColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="activePostBackgroundColor"
										attributeValue={
											activePostBackgroundColor
										}
										setAttributes={ setAttributes }
									/>
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="activePostBorder"
										attributeValue={ activePostBorder }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __(
											'Post Title Hover Color',
											'ablocks'
										) }
										attributeName="postTitleHoverColor"
										attributeValue={ postTitleHoverColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="hoverPostBackgroundColor"
										attributeValue={
											hoverPostBackgroundColor
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
							active={ <></> }
						/>
					</PanelBody>
				) }
				{ enableReloadButton && (
					<PanelBody
						title={ __( 'Button Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksAlignmentControl
							label={ __( 'Position', 'ablocks' ) }
							attributeName="buttonPosition"
							attributeValue={ buttonPosition }
							setAttributes={ setAttributes }
							options={ [
								{
									label: 'Full Width',
									value: 'block',
									icon: 'arrow-left',
								},
								{
									label: 'Inline',
									value: 'inline',
									icon: 'wrap',
								},
							] }
							isInline={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="buttonTypography"
							attributeValue={ buttonTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="buttonColor"
										attributeValue={ buttonColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="buttonBgColor"
										attributeValue={ buttonBgColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Hover Color', 'ablocks' ) }
										attributeName="buttonHoverColor"
										attributeValue={ buttonHoverColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Hover Color',
											'ablocks'
										) }
										attributeName="buttonHoverBgColor"
										attributeValue={ buttonHoverBgColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="buttonBorder"
							attributeValue={ buttonBorder }
							setAttributes={ setAttributes }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="buttonPadding"
							attributeValue={ buttonPadding }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
				) }

				{ allowIcon && (
					<PanelBody
						title={ __( 'Icon Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksRangeControl
							label={ __( 'Icon Size', 'ablocks' ) }
							min={ 1 }
							max={ 100 }
							hasUit={ false }
							isInlnine={ false }
							isResponsive={ false }
							attributeName={ 'iconsSize' }
							attributeValue={ attributes?.iconsSize }
							setAttributes={ setAttributes }
							attributeDefaultValue={ iconsSizeDefaultVale }
						/>
						<ABlocksColorControl
							label={ __( 'Primary Color', 'ablocks' ) }
							attributeName="iconColor"
							attributeValue={ iconColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Background Color', 'ablocks' ) }
							attributeName="iconBgColor"
							attributeValue={ iconBgColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							attributeName="iconPadding"
							attributeValue={ iconPadding }
							setAttributes={ setAttributes }
						/>
						<ABlocksDimensions
							label={ __( 'Border radius', 'ablocks' ) }
							attributeName="iconBorderRadius"
							attributeValue={ iconBorderRadius }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
				) }
			</InspectorTabs>
		</InspectorControls>
	);
}
Settings.propTypes = propTypes;
