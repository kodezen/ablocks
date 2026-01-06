import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import ABlocksPanelBody from '@Components/panel-body';
import { InspectorControls } from '@wordpress/block-editor';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import Select from 'react-select';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksTypography from '@Controls/typography';
import ContentStyleTabs from '@Components/content-style-tabs';
import ControlLabel from '@Components/control-label';
import ABlocksBorderControl from '@Controls/border';
import ABlocksDimensions from '@Controls/dimensions';
import { makeRequest } from '@Utils/helper';
import SelectParentBlockButton from '@Components/select-parent-block';
import { FilterBtnGap as FilterBtnGapDefaultAttributeValue } from './attributes';
import './styles.scss';
const propTypes = {};
const defaultProps = {};
export default function Settings( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		taxonomy,
		taxonomy_term_items,
		buttonAlignment,
		filterBtnAlignment,
		rowAlignBtn,
	} = attributes;
	const [ taxonomies, setTaxonomies ] = useState( [] );
	const [ selectedTaxonomy, setSelectedTaxonomy ] = useState( null );
	const [ taxonomyTermLists, setTaxonomyTermLists ] = useState( [] );
	const [ selectedTerms, setSelectedTerms ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( false );

	const parentLoopBuilderAttributes = useSelect(
		( select ) => {
			const { getBlock, getBlockParents } = select( 'core/block-editor' );
			const parentIds = getBlockParents( clientId );
			if ( ! parentIds.length ) {
				return null;
			}

			for ( const parentId of parentIds ) {
				const parentBlock = getBlock( parentId );
				if ( parentBlock?.name === 'ablocks/loop-builder' ) {
					return parentBlock.attributes;
				}
			}
			return null;
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( parentLoopBuilderAttributes?.query?.postType ) {
			makeRequest( {
				action: 'ablocks/get_taxonomies_data',
				post_type: parentLoopBuilderAttributes.query.postType,
			} ).then( ( res ) => {
				if ( res.data?.success ) {
					setTaxonomies( res.data.data );
				}
			} );
		}
	}, [ parentLoopBuilderAttributes?.query?.postType ] );

	useEffect( () => {
		if ( taxonomy && taxonomies.length ) {
			const initialTaxonomy = taxonomies.find(
				( t ) => t.value === taxonomy
			);
			setSelectedTaxonomy( initialTaxonomy );
		}
	}, [ taxonomy, taxonomies ] );

	useEffect( () => {
		if ( parentLoopBuilderAttributes?.query?.postType && taxonomy ) {
			makeRequest( {
				action: 'ablocks/get_taxonomy_term_data',
				taxonomy,
			} ).then( ( res ) => {
				if ( res?.data?.success ) {
					const terms = res?.data?.data || [];
					const termsWithAll = [
						{ label: 'All', value: '*' },
						...terms,
					];
					setTaxonomyTermLists( termsWithAll );
					if (
						Array.isArray( taxonomy_term_items ) &&
						taxonomy_term_items.length > 0
					) {
						const fatchTerms = taxonomy_term_items.map(
							( saved ) => {
								return (
									termsWithAll.find(
										( term ) => term.value === saved.value
									) || saved
								);
							}
						);
						setSelectedTerms( fatchTerms );
					}
				}
			} );
		}
	}, [ taxonomy, parentLoopBuilderAttributes?.query?.postType ] );

	const handleTaxonomyChange = ( selectedOption ) => {
		const taxonomyValue = selectedOption?.value || '';
		setSelectedTaxonomy( selectedOption );
		setSelectedTerms( [] );
		setAttributes( {
			taxonomy: taxonomyValue,
			taxonomy_term_items: [],
		} );
	};

	const handleTermsChange = ( selectedOptions ) => {
		const terms = selectedOptions || [];
		setSelectedTerms( terms );
		setAttributes( {
			taxonomy_term_items: terms,
		} );
	};

	return (
		<InspectorControls>
			<ABlocksPanelBody>
				<div className="ablocks-modal-triger">
					<div className="ablocks-modal-triger-area">
						<p className="ablocks-modal-triger-area__title">
							{ __( 'Access Loop Builder Settings', 'ablocks' ) }
						</p>
						<span className="ablocks-modal-triger-area__title--des">
							{ __(
								'This is a child block. Click below to manage the full loop builder.',
								'ablocks'
							) }
						</span>
					</div>
					<SelectParentBlockButton clientId={ props?.clientId } />
				</div>
			</ABlocksPanelBody>
			<InspectorTabs
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				<ABlocksPanelBody
					title={ __( 'Taxonomies', 'ablocks' ) }
					initialOpen={ true }
				>
					<>
						<div className="components-base-control">
							<label className="components-base-control__label">
								{ __( 'Select Taxonomy', 'ablocks' ) }
							</label>
							<Select
								className="ablocks-taxonomy-select"
								classNamePrefix="select"
								isLoading={ isLoading }
								isClearable={ true }
								options={ taxonomies }
								value={ selectedTaxonomy }
								onChange={ handleTaxonomyChange }
								placeholder={ __(
									'Select a taxonomy…',
									'ablocks'
								) }
							/>
						</div>

						{ selectedTaxonomy && (
							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Select Terms', 'ablocks' ) }
								</label>
								<Select
									className="ablocks-terms-select"
									classNamePrefix="select"
									isLoading={ isLoading }
									isClearable={ true }
									isMulti={ true }
									options={ taxonomyTermLists }
									value={ selectedTerms }
									onChange={ handleTermsChange }
									placeholder={ __(
										'Select terms…',
										'ablocks'
									) }
									closeMenuOnSelect={ false }
								/>
							</div>
						) }
						<ABlocksButtonGroupControl
							allowDeselect={ true }
							isResponsive={ false }
							label={ __( 'Button Alignment', 'ablocks' ) }
							options={ [
								{
									value: 'row',
									label: __( 'Row', 'ablocks' ),
								},
								{
									value: 'column',
									label: __( 'Column', 'ablocks' ),
								},
								{
									value: 'row-reverse',
									label: __( 'Reverse', 'ablocks' ),
								},
							] }
							attributeName="buttonAlignment"
							attributeValue={ buttonAlignment }
							setAttributes={ setAttributes }
						/>
						{ buttonAlignment != 'column' && (
							<ABlocksAlignmentControl
								label={ __( 'Row Alignment', 'ablocks' ) }
								options={ [
									{
										label: 'Left',
										value: 'flex-start',
										icon: 'left',
									},
									{
										label: 'Center',
										value: 'center',
										icon: 'center',
									},
									{
										label: 'Right',
										value: 'flex-end',
										icon: 'right',
									},
								] }
								attributeName="rowAlignBtn"
								attributeValue={ rowAlignBtn }
								setAttributes={ setAttributes }
								isInline={ false }
							/>
						) }
						{ buttonAlignment === 'column' && (
							<ABlocksAlignmentControl
								label={ __( 'Button Alignment', 'ablocks' ) }
								options={ [
									{
										label: 'Left',
										value: 'flex-start',
										icon: 'left',
									},
									{
										label: 'Center',
										value: 'center',
										icon: 'center',
									},
									{
										label: 'Right',
										value: 'flex-end',
										icon: 'right',
									},
								] }
								attributeName="filterBtnAlignment"
								attributeValue={ filterBtnAlignment }
								setAttributes={ setAttributes }
								isInline={ false }
							/>
						) }
						<ABlocksRangeControl
							label={ __( 'Button Gap', 'ablocks' ) }
							attributeName="FilterBtnGap"
							attributeObjectKey="value"
							attributeValue={ attributes?.FilterBtnGap }
							setAttributes={ setAttributes }
							hasUnit={ true }
							step={ 1 }
							min={ 0 }
							max={ 100 }
							unitOptions={ [
								{ value: 'px', label: 'px' },
								{ value: '%', label: '%' },
								{ value: 'rem', label: 'rem' },
								{ value: 'em', label: 'em' },
							] }
							isInline={ false }
							attributeDefaultValue={
								FilterBtnGapDefaultAttributeValue
							}
						/>
					</>
				</ABlocksPanelBody>
				<ABlocksPanelBody
					title={ __( 'Filter', 'ablocks' ) }
					initialOpen={ true }
				>
					<ContentStyleTabs
						content={
							<>
								<ControlLabel
									label={ __( 'Border', 'ablocks' ) }
									isResponsive={ false }
									isHeader={ true }
								/>
								<ABlocksBorderControl
									attributeName="filterBtnBorder"
									attributeValue={
										attributes?.filterBtnBorder
									}
									setAttributes={ setAttributes }
								/>
								<ABlocksDimensions
									label={ __( 'Padding', 'ablocks' ) }
									isResponsive={ true }
									attributeName="filterButtonPadding"
									attributeValue={
										attributes?.filterButtonPadding
									}
									setAttributes={ setAttributes }
								/>
								<ABlocksDimensions
									label={ __( 'Margin', 'ablocks' ) }
									isResponsive={ true }
									attributeName="filterButtonMargin"
									attributeValue={
										attributes?.filterButtonMargin
									}
									setAttributes={ setAttributes }
								/>
							</>
						}
						style={
							<>
								<ABlocksColorControl
									label={ __( 'Color', 'ablocks' ) }
									attributeName="filterBtnTextColor"
									attributeValue={
										attributes?.filterBtnTextColor
									}
									setAttributes={ setAttributes }
								/>
								<ABlocksColorControl
									label={ __(
										'Background Color',
										'ablocks'
									) }
									attributeName="filterBtnBgColor"
									attributeValue={
										attributes?.filterBtnBgColor
									}
									setAttributes={ setAttributes }
								/>
								<ABlocksTypography
									label={ __( 'Typography', 'ablocks' ) }
									attributeName="typography"
									attributeValue={ attributes?.typography }
									setAttributes={ setAttributes }
									isResponsive={ true }
									attributes={ attributes }
								/>
							</>
						}
					/>
				</ABlocksPanelBody>
				<ABlocksPanelBody
					title={ __( 'Active Style Filter', 'ablocks' ) }
					initialOpen={ true }
				>
					<ContentStyleTabs
						content={
							<>
								<ControlLabel
									label={ __( 'Border', 'ablocks' ) }
									isResponsive={ false }
									isHeader={ true }
								/>
								<ABlocksBorderControl
									attributeName="activeBtnBorder"
									attributeValue={
										attributes?.activeBtnBorder || 0
									}
									setAttributes={ setAttributes }
								/>
							</>
						}
						style={
							<>
								<ABlocksColorControl
									label={ __( 'Color', 'ablocks' ) }
									attributeName="activeBtnTextColor"
									attributeValue={
										attributes?.activeBtnTextColor
									}
									setAttributes={ setAttributes }
								/>
								<ABlocksColorControl
									label={ __(
										'Background Color',
										'ablocks'
									) }
									attributeName="activeBtnBgColor"
									attributeValue={
										attributes?.activeBtnBgColor
									}
									setAttributes={ setAttributes }
								/>
							</>
						}
					/>
				</ABlocksPanelBody>
			</InspectorTabs>
		</InspectorControls>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
