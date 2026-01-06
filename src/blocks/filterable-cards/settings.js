import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '@Components/Button';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksColorControl from '@Controls/color';
import ABlocksTextControl from '@Controls/text';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksBorderControl from '@Controls/border';
import ABlocksTypography from '@Controls/typography';
import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksNumberControl from '@Controls/number';
import ABlocksSelectControl from '@Controls/select';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import { columnOptions, animationOptions, numberMenuAlignment } from './helper';
import AblocksProToggleControl from '@Controls/pro-bandage';
import { is_pro } from '@Utils/helper';
import {
	itemGap as itemGapDefaultAttributeValue,
	animationDuration as animationDurationDefaultValueAttribute,
	loadMoreButtonGap as loadMoreButtonGapDefaultValueAttribute,
} from './attributes';
const propTypes = {};
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		filterList,
		enableFilter,
		filterButtonTypography,
		filterButtonColor,
		filterButtonColorH,
		filterButtonBackground,
		filterButtonBackgroundH,
		filterButtonBorder,
		filterButtonPadding,
		searchMenuPadding,
		searchMenuMargin,
		searchMenuBorder,
		filterButtonMargin,
		filterButtonGap,
		filterAlignment,
		gridColumns,
		cardHeight,
		itemShows,
		activeClassBackground,
		activeClassBorder,
		loadMoreButton,
		animationDuration,
		loadMoreButtonText,
		loadMoreButtonBackground,
		loadMoreButtonTextColor,
		loadMoreButtonTextColorH,
		loadMoreButtonBackgroundH,
		moreButtonAlignment,
		dataPerPageShow,
		noMoreItemsText,
		gridStyle,
		itemGap,
		activeClassColor,
		animation,
		layout,
		searchPlaceHolder,
		searchMenuColor,
		searchMenuColorH,
		searchMenuBackground,
		searchMenuBackgroundH,
		searchNotFoundText,
		loadMoreButtonGap,
	} = attributes;

	const openListSettingHandler = ( id ) => {
		const updatedLists = filterList.map( ( list ) => {
			if ( list.id === id ) {
				return { ...list, isOpen: ! list.isOpen };
			}
			return { ...list, isOpen: false };
		} );
		setAttributes( { filterList: updatedLists } );
	};

	const changeListHandler = ( id, controlValue, attributeObjectKey ) => {
		const updatedLists = filterList.map( ( item ) => {
			if ( attributeObjectKey === 'isActive' && controlValue ) {
				return { ...item, [ attributeObjectKey ]: item.id === id };
			}
			if ( item.id === id ) {
				return { ...item, [ attributeObjectKey ]: controlValue };
			}

			return item;
		} );

		setAttributes( { filterList: updatedLists } );
	};

	const deleteAnItemFromList = ( event, id ) => {
		event.stopPropagation();
		const updatedLists = filterList.filter( ( list ) => list?.id !== id );

		setAttributes( {
			filterList: updatedLists,
		} );
	};

	const duplicateAnItemFromList = ( event, id ) => {
		event.stopPropagation();

		const targetedListItemIndex = filterList.findIndex(
			( item ) => item?.id === id
		);

		const targetedItem = filterList[ targetedListItemIndex ];
		const newListSorted = Array.from( filterList ).sort(
			( a, b ) => a.id - b.id
		);
		const biggestId = newListSorted[ newListSorted.length - 1 ]?.id ?? 0;
		const duplicatedItem = {
			id: biggestId + 1,
			text: targetedItem?.text,
			isOpen: false,
		};
		const updatedLists = [ ...filterList, duplicatedItem ];

		setAttributes( {
			filterList: updatedLists,
		} );
	};

	const uniqueIdCounter = filterList?.length
		? filterList[ filterList.length - 1 ].id + 1
		: 0;

	const addNewListItem = () => {
		const newItem = {
			id: uniqueIdCounter,
			text: `Item ${ uniqueIdCounter }`,
			isActive: false,
			isOpen: false,
		};

		const updatedList = filterList.map( ( item ) => {
			if ( item.isOpen ) {
				return { ...item, isOpen: ! item.isOpen };
			}
			return item;
		} );
		setAttributes( {
			filterList: [ ...updatedList, newItem ],
		} );
	};

	const onDragEnd = ( result ) => {
		if ( ! result.destination || result.source.index === 0 ) {
			return;
		}
		const reorderedLists = Array.from( filterList );
		const [ removedListItem ] = reorderedLists.splice(
			result.source.index,
			1
		);
		const destinationIndex = Math.max( result.destination.index, 1 );
		reorderedLists.splice( destinationIndex, 0, removedListItem );

		setAttributes( {
			filterList: reorderedLists,
		} );
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Load More Button', 'ablocks' ) }
						initialOpen={ true }
					>
						{ ! is_pro ? (
							<AblocksProToggleControl
								isResponsive={ false }
								label="Load More Button"
								attributeValue={ '' }
								setAttributes={ setAttributes }
								attributeName=""
								badgeText={ __( 'PRO', 'ablocks' ) }
								descriptionText={ __(
									'This feature is available only in the Pro version. Please upgrade to access it and unlock advanced functionality.',
									'ablocks'
								) }
							/>
						) : (
							<ABlocksToggleControl
								isResponsive={ false }
								label="Load More Button"
								attributeValue={ loadMoreButton }
								setAttributes={ setAttributes }
								attributeName="loadMoreButton"
							/>
						) }

						{ loadMoreButton && (
							<ContentStyleTabs
								content={
									<>
										<ABlocksAlignmentControl
											label={ __(
												'Alignment',
												'ablocks'
											) }
											attributeName="moreButtonAlignment"
											attributeValue={
												moreButtonAlignment
											}
											isResponsive={ false }
											setAttributes={ setAttributes }
											isInline={ false }
											options={ [
												{
													label: 'left',
													value: 'left',
													icon: 'left',
												},
												{
													label: 'center',
													value: 'center',
													icon: 'center',
												},
												{
													label: 'right',
													value: 'right',
													icon: 'right',
												},
											] }
										/>
										<ABlocksTextControl
											label={ __( 'Text', 'ablocks' ) }
											attributeName="loadMoreButtonText"
											attributeValue={
												loadMoreButtonText
											}
											setAttributes={ setAttributes }
											isInline={ false }
										/>
										<ABlocksTextControl
											label={ __(
												'No More Items Label',
												'ablocks'
											) }
											attributeName="noMoreItemsText"
											attributeValue={ noMoreItemsText }
											setAttributes={ setAttributes }
											isInline={ false }
										/>
										<ABlocksNumberControl
											label={ __(
												'Number of Items',
												'ablocks'
											) }
											attributeName="dataPerPageShow"
											attributeValue={ dataPerPageShow }
											setAttributes={ setAttributes }
										/>
										<ABlocksRangeControl
											label={ __( 'Gap', 'ablocks' ) }
											min={ 0 }
											max={ 200 }
											unitValue={ loadMoreButtonGap }
											hasUnit={ false }
											isInline={ false }
											isResponsive={ true }
											attributeName="loadMoreButtonGap"
											attributeValue={ loadMoreButtonGap }
											attributeDefaultValue={
												loadMoreButtonGapDefaultValueAttribute
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
								style={
									<>
										<ABlocksTypography
											label={ __(
												'Typography',
												'ablocks'
											) }
											attributeName="moreButtonTypography"
											attributeValue={
												attributes?.moreButtonTypography
											}
											setAttributes={ setAttributes }
											isResponsive={ true }
											attributes={ attributes }
										/>
										<Separator />
										<ControlLabel
											label="Color"
											isResponsive={ false }
											isHeader={ true }
										/>

										<NormalHoverTabs
											normal={
												<>
													<ABlocksColorControl
														label={ __(
															'Color',
															'ablocks'
														) }
														attributeName="loadMoreButtonTextColor"
														attributeValue={
															loadMoreButtonTextColor ||
															'#000000'
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="loadMoreButtonBackground"
														attributeValue={
															loadMoreButtonBackground ||
															'#ddd'
														}
														setAttributes={
															setAttributes
														}
													/>
												</>
											}
											hover={
												<>
													<ABlocksColorControl
														label={ __(
															'Color',
															'ablocks'
														) }
														attributeName="loadMoreButtonTextColorH"
														attributeValue={
															loadMoreButtonTextColorH
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="loadMoreButtonBackgroundH"
														attributeValue={
															loadMoreButtonBackgroundH
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksRangeControl
														label={ __(
															'Transition Duration (ms)',
															'ablocks'
														) }
														min={ 0 }
														max={ 5 }
														step={ 0.01 }
														hasUnit={ false }
														isInline={ false }
														isResponsive={ false }
														attributeValue={
															attributes?.loadMoreButtonTransition ||
															0
														}
														attributeName={
															'loadMoreButtonTransition'
														}
														setAttributes={
															setAttributes
														}
													/>
												</>
											}
										/>

										<Separator />
										<ControlLabel
											label="Border"
											isResponsive={ false }
											isHeader={ true }
										/>
										<ABlocksBorderControl
											attributeName="moreButtonBorder"
											attributeValue={
												attributes?.moreButtonBorder
											}
											setAttributes={ setAttributes }
										/>
										<Separator />
										<ABlocksDimensions
											label={ __( 'Padding', 'ablocks' ) }
											isResponsive={ true }
											attributeName="moreButtonPadding"
											attributeValue={
												attributes?.moreButtonPadding
											}
											setAttributes={ setAttributes }
										/>
										<Separator />
										<ControlLabel
											label="Box shadow"
											isHeader={ true }
											isResponsive={ false }
										/>
										<ABlocksBoxShadowControl
											label={ __(
												'Box shadow',
												'ablocks'
											) }
											attributeName="moreButtonboxShadow"
											attributeValue={
												attributes?.moreButtonboxShadow
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						) }
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'filterable Cards', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksToggleControl
							isResponsive={ false }
							label="Enable Filter"
							attributeValue={ enableFilter }
							setAttributes={ setAttributes }
							attributeName="enableFilter"
						/>
						<ABlocksNumberControl
							min={ 0 }
							label={ __( 'Items to show', 'ablocks' ) }
							attributeName="itemShows"
							attributeValue={ itemShows }
							setAttributes={ setAttributes }
						/>
						<ABlocksSelectControl
							min={ 0 }
							label={ __( 'Columns', 'ablocks' ) }
							attributeName="gridColumns"
							options={ columnOptions }
							attributeValue={ gridColumns }
							setAttributes={ setAttributes }
						/>
						<ABlocksSelectControl
							min={ 0 }
							label={ __( 'Grid Style', 'ablocks' ) }
							attributeName="gridStyle"
							options={ [
								{
									label: 'Grid',
									value: 'grid',
								},
								{
									label: 'Masonry',
									value: 'masonry',
								},
							] }
							attributeValue={ gridStyle }
							setAttributes={ setAttributes }
						/>
						{ ! is_pro ? (
							<AblocksProToggleControl
								isResponsive={ false }
								label="Layout"
								attributeValue={ '' }
								setAttributes={ setAttributes }
								attributeName=""
								badgeText={ __( 'PRO', 'ablocks' ) }
								descriptionText={ __(
									'This feature is available only in the Pro version. Please upgrade to access it and unlock advanced functionality.',
									'ablocks'
								) }
							/>
						) : (
							enableFilter && (
								<ABlocksSelectControl
									min={ 0 }
									label={ __( 'Layout', 'ablocks' ) }
									attributeName="layout"
									options={ [
										{ label: 'Filter', value: 'filter' },
										{
											label: 'Filter & Search',
											value: 'filter&search',
										},
									] }
									attributeValue={ layout }
									setAttributes={ setAttributes }
								/>
							)
						) }

						{ layout === 'filter&search' && (
							<ABlocksTextControl
								label={ __( 'Not Found Text', 'ablocks' ) }
								attributeName="searchNotFoundText"
								attributeValue={ searchNotFoundText }
								setAttributes={ setAttributes }
								isInline={ false }
							/>
						) }
						{ gridStyle === 'grid' && (
							<ABlocksNumberControl
								label={ __( 'Items Height', 'ablocks' ) }
								min={ 0 }
								max={ 1600 }
								attributeName="cardHeight"
								attributeValue={ cardHeight }
								setAttributes={ setAttributes }
							/>
						) }
						<ABlocksRangeControl
							label={ __( 'Item Gap', 'ablocks' ) }
							min={ 0 }
							max={ 100 }
							unitValue={ filterButtonGap }
							hasUnit={ false }
							isInline={ false }
							isResponsive={ true }
							attributeName="itemGap"
							attributeValue={ itemGap }
							attributeDefaultValue={
								itemGapDefaultAttributeValue
							}
							setAttributes={ setAttributes }
						/>
						{ ! is_pro ? (
							<AblocksProToggleControl
								isResponsive={ false }
								label="Animation"
								attributeValue={ '' }
								setAttributes={ setAttributes }
								attributeName=""
								badgeText={ __( 'PRO', 'ablocks' ) }
								descriptionText={ __(
									'This feature is available only in the Pro version. Please upgrade to access it and unlock advanced functionality.',
									'ablocks'
								) }
							/>
						) : (
							<>
								<ABlocksSelectControl
									min={ 0 }
									label={ __( 'Animation', 'ablocks' ) }
									attributeName="animation"
									options={ animationOptions }
									attributeValue={ animation }
									setAttributes={ setAttributes }
								/>
								<ABlocksRangeControl
									label={ __(
										'Animation Duration(ms)',
										'ablocks'
									) }
									attributeName="animationDuration"
									attributeValue={ animationDuration }
									setAttributes={ setAttributes }
									min={ 0 }
									max={ 10000 }
									step={ 100 }
									isInline={ false }
									isResponsive={ false }
									attributeDefaultValue={
										animationDurationDefaultValueAttribute
									}
								/>
							</>
						) }
					</ABlocksPanelBody>
					{ enableFilter && (
						<ABlocksPanelBody
							title={ __( 'Filter Style', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksAlignmentControl
											allowDeselect={ true }
											label={ __(
												'Alignment',
												'ablocks'
											) }
											options={ numberMenuAlignment }
											isInline={ false }
											attributeName="filterAlignment"
											attributeValue={ filterAlignment }
											setAttributes={ setAttributes }
										/>
										<ABlocksRangeControl
											label={ __( 'Gap', 'ablocks' ) }
											min={ 0 }
											unitValue={ filterButtonGap }
											hasUnit={ false }
											isInline={ false }
											isResponsive={ true }
											attributeName="filterButtonGap"
											attributeValue={ filterButtonGap }
											setAttributes={ setAttributes }
										/>
									</>
								}
								style={
									<>
										<ABlocksTypography
											label={ __(
												'Typography',
												'ablocks'
											) }
											attributeName="filterButtonTypography"
											attributeValue={
												filterButtonTypography
											}
											setAttributes={ setAttributes }
											isResponsive={ true }
											attributes={ attributes }
										/>

										<ControlLabel
											label="Color"
											isResponsive={ false }
										/>
										<NormalHoverTabs
											normal={
												<>
													<ABlocksColorControl
														label={ __(
															'Color',
															'ablocks'
														) }
														attributeName="filterButtonColor"
														attributeValue={
															filterButtonColor
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="filterButtonBackground"
														attributeValue={
															filterButtonBackground
														}
														setAttributes={
															setAttributes
														}
													/>
												</>
											}
											hover={
												<>
													<ABlocksColorControl
														label={ __(
															'Color',
															'ablocks'
														) }
														attributeName="filterButtonColorH"
														attributeValue={
															filterButtonColorH
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="filterButtonBackgroundH"
														attributeValue={
															filterButtonBackgroundH
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksRangeControl
														label={ __(
															'Transition Duration',
															'ablocks'
														) }
														min={ 0 }
														max={ 5 }
														step={ 0.01 }
														hasUnit={ false }
														isInline={ false }
														isResponsive={ false }
														attributeValue={
															attributes?.filterButtonTransition ||
															0
														}
														attributeName={
															'filterButtonTransition'
														}
														setAttributes={
															setAttributes
														}
													/>
												</>
											}
										/>

										<Separator
											style={ { margin: '30px' } }
										/>
										<ControlLabel
											label="Border"
											isResponsive={ false }
										/>
										<ABlocksBorderControl
											attributeName="filterButtonBorder"
											attributeValue={
												filterButtonBorder
											}
											setAttributes={ setAttributes }
										/>
										<Separator />
										<ABlocksDimensions
											label={ __( 'Padding', 'ablocks' ) }
											isResponsive={ true }
											attributeName="filterButtonPadding"
											attributeValue={
												filterButtonPadding
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksDimensions
											label={ __( 'Margin', 'ablocks' ) }
											isResponsive={ true }
											attributeName="filterButtonMargin"
											attributeValue={
												filterButtonMargin
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }

					{ layout === 'filter&search' && (
						<ABlocksPanelBody
							title={ __( 'Filter & Search Style', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksTextControl
											label={ __(
												'Search Placeholder',
												'ablocks'
											) }
											attributeName="searchPlaceHolder"
											attributeValue={ searchPlaceHolder }
											setAttributes={ setAttributes }
											isInline={ false }
										/>
									</>
								}
								style={
									<>
										<ControlLabel
											label="Filter Menu"
											isResponsive={ false }
										/>
										<NormalHoverTabs
											normal={
												<>
													<ABlocksColorControl
														label={ __(
															'Color',
															'ablocks'
														) }
														attributeName="searchMenuColor"
														attributeValue={
															searchMenuColor
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="searchMenuBackground"
														attributeValue={
															searchMenuBackground
														}
														setAttributes={
															setAttributes
														}
													/>
												</>
											}
											hover={
												<>
													<ABlocksColorControl
														label={ __(
															'Color',
															'ablocks'
														) }
														attributeName="searchMenuColorH"
														attributeValue={
															searchMenuColorH
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="searchMenuBackgroundH"
														attributeValue={
															searchMenuBackgroundH
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksRangeControl
														label={ __(
															'Transition Duration',
															'ablocks'
														) }
														min={ 0 }
														max={ 5 }
														step={ 0.01 }
														hasUnit={ false }
														isInline={ false }
														isResponsive={ false }
														attributeValue={
															attributes?.searchMenuTransition ||
															0
														}
														attributeName={
															'searchMenuTransition'
														}
														setAttributes={
															setAttributes
														}
													/>
												</>
											}
										/>
										<ControlLabel
											label="Border"
											isResponsive={ false }
										/>
										<ABlocksBorderControl
											attributeName="searchMenuBorder"
											attributeValue={ searchMenuBorder }
											setAttributes={ setAttributes }
										/>
										<Separator />
										<ABlocksDimensions
											label={ __( 'Padding', 'ablocks' ) }
											isResponsive={ true }
											attributeName="searchMenuPadding"
											attributeValue={ searchMenuPadding }
											setAttributes={ setAttributes }
										/>
										<ABlocksDimensions
											label={ __( 'Margin', 'ablocks' ) }
											isResponsive={ true }
											attributeName="searchMenuMargin"
											attributeValue={ searchMenuMargin }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }

					{ enableFilter && (
						<ABlocksPanelBody
							title={ __( 'Filter Active Class', 'ablocks' ) }
							initialOpen={ true }
						>
							<ABlocksColorControl
								label={ __( 'Color', 'ablocks' ) }
								isGradient={ true }
								attributeName="activeClassColor"
								attributeValue={ activeClassColor }
								setAttributes={ setAttributes }
							/>
							<ABlocksColorControl
								label={ __( 'Background', 'ablocks' ) }
								isGradient={ true }
								attributeName="activeClassBackground"
								attributeValue={ activeClassBackground }
								setAttributes={ setAttributes }
							/>
							<ControlLabel
								label="Border"
								isResponsive={ false }
								isHeader={ true }
							/>
							<ABlocksBorderControl
								attributeName="activeClassBorder"
								attributeValue={ activeClassBorder }
								setAttributes={ setAttributes }
							/>
						</ABlocksPanelBody>
					) }
					<ABlocksPanelBody
						title={ __( 'Filterable Controls', 'ablocks' ) }
						initialOpen={ true }
					>
						<DragDropContext onDragEnd={ onDragEnd }>
							<Droppable droppableId="droppable">
								{ ( provided ) => (
									<div
										ref={ provided.innerRef }
										{ ...provided.droppableProps }
									>
										{ filterList?.map( ( list, index ) => (
											<Draggable
												key={ list?.id }
												draggableId={ `${ list?.id }` }
												index={ index }
											>
												{ ( providedItem ) => (
													<div
														ref={
															providedItem.innerRef
														}
														{ ...providedItem.draggableProps }
														{ ...providedItem.dragHandleProps }
														className="ablocks-editor-list"
													>
														<div
															className="ablocks-editor-list__wrapper"
															onClick={ () =>
																openListSettingHandler(
																	list?.id
																)
															}
															role="presentation"
															onKeyDown={ () => {} }
															style={ {
																borderBottom:
																	list?.isOpen &&
																	'1px solid #ddd',
															} }
														>
															<div className="ablocks-editor-list__content-wrapper">
																<span className="ablocks-editor-list__grab">
																	{ index !==
																	0 ? (
																		<span className="ablocks-icon ablocks-icon--move"></span>
																	) : (
																		''
																	) }
																</span>
																<span className="ablocks-list-text">
																	{ list?.text
																		.length >
																	20
																		? list?.text.slice(
																				0,
																				20
																		  ) +
																		  '...'
																		: list?.text }
																</span>
															</div>

															<div className="ablocks-editor-list__options-wrapper">
																{ index !==
																0 ? (
																	<span
																		className="ablocks-icon ablocks-icon--delete"
																		onClick={ (
																			e
																		) =>
																			deleteAnItemFromList(
																				e,
																				list?.id
																			)
																		}
																		role="presentation"
																		onKeyDown={ () => {} }
																	></span>
																) : (
																	''
																) }
																{ index !==
																0 ? (
																	<span
																		className="ablocks-icon ablocks-icon--copy"
																		onClick={ (
																			e
																		) =>
																			duplicateAnItemFromList(
																				e,
																				list?.id
																			)
																		}
																		role="presentation"
																		onKeyDown={ () => {} }
																	></span>
																) : (
																	''
																) }
															</div>
														</div>
														{ list?.isOpen && (
															<div className="ablocks-editor-list__inner-content">
																<ABlocksTextControl
																	label={ __(
																		'Filter Name',
																		'ablocks'
																	) }
																	attributeValue={
																		list?.text
																	}
																	setAttributes={
																		setAttributes
																	}
																	onChangeHandler={ (
																		controlValue
																	) => {
																		changeListHandler(
																			list?.id,
																			controlValue,
																			'text'
																		);
																	} }
																	disableDynamicContent={
																		true
																	}
																/>

																<ABlocksToggleControl
																	label="Active as Default"
																	isResponsive={
																		false
																	}
																	attributeValue={
																		list?.isActive
																	}
																	setAttributes={
																		setAttributes
																	}
																	onChangeHandler={ (
																		controlValue
																	) => {
																		changeListHandler(
																			list?.id,
																			controlValue,
																			'isActive'
																		);
																	} }
																/>
															</div>
														) }
													</div>
												) }
											</Draggable>
										) ) }
										{ provided.placeholder }
									</div>
								) }
							</Droppable>
						</DragDropContext>

						<Button
							label="Add item"
							onClick={ addNewListItem }
							className="ablocks-add-list-item-button"
						></Button>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
