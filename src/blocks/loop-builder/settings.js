import { useEffect, useState, useCallback, useRef } from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import {
	SelectControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksSelectControl from '@Controls/select';
import ABlocksRangeControl from '@Controls/range';
import usePostTypes from '@Utils/use-post-types';
import ABlocksNumberControl from '@Controls/number';
import Select from 'react-select';
import Separator from '@Components/separator';
import InspectorTabs from '@Components/inspector-tabs';
import ControlLabel from '@Components/control-label';
import { makeRequest } from '@Utils/helper';
import { useTaxonomies } from './utils';
import { useSelect, useDispatch } from '@wordpress/data';
import ABlocksButtonGroupControl from '@Components/button-group';

const MIN_OFFSET = 0;
const MAX_OFFSET = 100;

export const OffsetControl = ( { offset, onChange } ) => {
	return (
		<ABlocksNumberControl
			label={ __( 'Offset' ) }
			attributeValue={ offset }
			onChangeHandler={ ( newOffset ) => {
				if (
					isNaN( newOffset ) ||
					newOffset < MIN_OFFSET ||
					newOffset > MAX_OFFSET
				) {
					return;
				}
				onChange( newOffset );
			} }
		/>
	);
};

export default function Settings( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { tagName: TagName = 'div', query } = attributes;
	const { postType, perPage, order, orderBy, offset } = query;
	const { postTypesSelectOptions } = usePostTypes();
	const taxonomies = useTaxonomies( postType );
	const [ loadingStates, setLoadingStates ] = useState( {} );
	const [ termLists, setTermLists ] = useState( {} );
	const [ selectedTerms, setSelectedTerms ] = useState( {} );
	const hasTaxonomy = taxonomies?.length > 0;

	const fetchTerms = ( taxonomySlug ) => {
		if ( termLists[ taxonomySlug ] ) {
			return;
		}
		setLoadingStates( ( prev ) => ( { ...prev, [ taxonomySlug ]: true } ) );
		makeRequest( {
			action: 'ablocks/get_taxonomy_term_data',
			taxonomy: taxonomySlug,
		} )
			.then( ( res ) => {
				if ( res?.data?.success ) {
					const terms = res?.data?.data || [];
					setTermLists( ( prev ) => ( {
						...prev,
						[ taxonomySlug ]: terms,
					} ) );
				}
			} )
			.finally( () => {
				setLoadingStates( ( prev ) => ( {
					...prev,
					[ taxonomySlug ]: false,
				} ) );
			} );
	};

	useEffect( () => {
		if ( hasTaxonomy ) {
			taxonomies.forEach( ( t ) => fetchTerms( t.slug ) );
		}
	}, [ taxonomies, hasTaxonomy ] );

	const handleChange = ( taxonomySlug, selectedOptions ) => {
		updateQuery( {
			taxQuery: {
				[ taxonomySlug ]: selectedOptions.map(
					( option ) => option.value
				),
			},
		} );
		setSelectedTerms( ( prev ) => ( {
			...prev,
			[ taxonomySlug ]: selectedOptions,
		} ) );
	};

	const htmlElementMessages = {
		main: __(
			'The <main> element should be used for the primary content of your document only.'
		),
		section: __(
			"The <section> element should represent a standalone portion of the document that can't be better represented by another element."
		),
		aside: __(
			"The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."
		),
	};

	const updateQuery = ( newQuery ) => {
		const prevQuery = query || {};
		const currentTaxQuery = prevQuery.taxQuery ?? {};
		const newTaxQuery = newQuery.taxQuery
			? { ...currentTaxQuery, ...newQuery.taxQuery }
			: currentTaxQuery;

		setAttributes( {
			query: {
				...query,
				...newQuery,
				taxQuery: newTaxQuery,
			},
		} );
	};

	// Find loop-filter child block
	function findChildBlockByName( block, blockName ) {
		if ( ! block ) {
			return null;
		}
		if ( block.name === blockName ) {
			return block;
		}
		if ( block.innerBlocks?.length ) {
			for ( const child of block.innerBlocks ) {
				const result = findChildBlockByName( child, blockName );
				if ( result ) {
					return result;
				}
			}
		}
		return null;
	}
	const loopFilterBlock = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const thisBlock = getBlock( clientId );
			if ( ! thisBlock ) {
				return null;
			}
			return findChildBlockByName( thisBlock, 'ablocks/loop-filter' );
		},
		[ clientId ]
	);
	const loopFilterClientId = loopFilterBlock?.clientId;
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const prevPostTypeRef = useRef( postType );
	useEffect( () => {
		if ( ! loopFilterClientId || ! postType ) {
			return;
		}

		const prevPostType = prevPostTypeRef.current;

		if ( postType !== prevPostType ) {
			updateBlockAttributes( loopFilterClientId, {
				taxonomy_term_items: [],
			} );
		}
		prevPostTypeRef.current = postType;
	}, [ postType, loopFilterClientId ] );

	const { inherit } = query;

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Loop Builder', 'academy-blocks' ) }
						initialOpen={ true }
					>
						<ABlocksButtonGroupControl
							isResponsive={ false }
							allowDeselect={ false }
							label={ __( 'Query Type', 'ablocks' ) }
							options={ [
								{
									value: true,
									label: __( 'Inherit', 'ablocks' ),
								},
								{
									value: false,
									label: __( 'Custom', 'ablocks' ),
								},
							] }
							attributeName="inherit"
							attributeValue={ query?.inherit }
							setAttributes={ ( newAttributes ) => {
								setAttributes( {
									query: {
										...query,
										...newAttributes,
									},
								} );
							} }
						/>
						{ ! query?.inherit && (
							<>
								<ABlocksPanelBody
									title={ __( 'Query', 'academy-blocks' ) }
									initialOpen={ true }
								>
									<ABlocksSelectControl
										label={ __( 'Post Types', 'ablocks' ) }
										isResponsive={ false }
										options={ postTypesSelectOptions }
										attributeValue={ postType }
										onChangeHandler={ ( postTypeValue ) => {
											setAttributes( {
												query: {
													...query,
													postType: postTypeValue,
												},
											} );
										} }
									/>

									<ABlocksSelectControl
										label={ __( 'Order By' ) }
										options={ [
											{
												label: __( 'Newest to oldest' ),
												value: 'date/desc',
											},
											{
												label: __( 'Oldest to newest' ),
												value: 'date/asc',
											},
											{
												label: __( 'A → Z' ),
												value: 'title/asc',
											},
											{
												label: __( 'Z → A' ),
												value: 'title/desc',
											},
										] }
										attributeValue={ `${ orderBy }/${ order }` }
										onChangeHandler={ (
											attributeValue
										) => {
											const [ newOrderBy, newOrder ] =
												attributeValue.split( '/' );
											setAttributes( {
												query: {
													...query,
													orderBy: newOrderBy,
													order: newOrder,
												},
											} );
										} }
									/>

									<Separator />
									<ControlLabel
										label="Display"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksNumberControl
										label={ __(
											'Posts Per Page',
											'ablocks'
										) }
										attributeValue={ perPage }
										onChangeHandler={ ( value ) => {
											setAttributes( {
												query: {
													...query,
													perPage: value,
												},
											} );
										} }
									/>

									<OffsetControl
										offset={ offset }
										onChange={ ( newOffset ) => {
											setAttributes( {
												query: {
													...query,
													offset: newOffset,
												},
											} );
										} }
									/>
								</ABlocksPanelBody>
								{ hasTaxonomy && (
									<ABlocksPanelBody
										title={ __(
											'Taxonomy Filter',
											'academy-blocks'
										) }
										initialOpen={ true }
									>
										{ hasTaxonomy &&
											taxonomies.map( ( item, index ) => {
												const taxonomySlug = item.slug;
												return (
													<div
														key={ index }
														className="ablcks-taxonomies-select"
													>
														<label className="ablocks-taxonomies-label">
															{
																item?.labels
																	?.name
															}
														</label>
														<Select
															className="ablocks-terms-select"
															classNamePrefix="select"
															isLoading={
																loadingStates[
																	taxonomySlug
																]
															}
															isClearable={ true }
															isMulti={ true }
															options={
																termLists[
																	taxonomySlug
																] || []
															}
															value={
																termLists[
																	taxonomySlug
																]
																	? termLists[
																			taxonomySlug
																	  ].filter(
																			(
																				term
																			) =>
																				(
																					query
																						?.taxQuery?.[
																						taxonomySlug
																					] ||
																					[]
																				).includes(
																					term.value
																				)
																	  )
																	: null
															}
															onChange={ (
																selected
															) =>
																handleChange(
																	taxonomySlug,
																	selected
																)
															}
															onMenuOpen={ () =>
																fetchTerms(
																	taxonomySlug
																)
															}
															placeholder="Select terms..."
															closeMenuOnSelect={
																false
															}
														/>
													</div>
												);
											} ) }
									</ABlocksPanelBody>
								) }
							</>
						) }
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>

			<InspectorControls group="advanced">
				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'HTML element' ) }
					options={ [
						{ label: __( 'Default (<div>)' ), value: 'div' },
						{ label: '<main>', value: 'main' },
						{ label: '<section>', value: 'section' },
						{ label: '<aside>', value: 'aside' },
					] }
					value={ TagName }
					onChange={ ( value ) =>
						setAttributes( { tagName: value } )
					}
					help={ htmlElementMessages[ TagName ] }
				/>
			</InspectorControls>
		</>
	);
}
