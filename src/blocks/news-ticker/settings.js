import React from 'react';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import { HTMLTagLists } from '@Controls/select/helper';
import ABlocksSelectControl from '@Controls/select';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksRangeControl from '@Controls/range';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTextControl from '@Controls/text';
import ABlocksTextareaControl from '@Controls/textarea';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ABlockLinkControl from '@Controls/link-control';
import Button from '@Components/Button';
import NormalHoverTabs from '@Components/normal-hover-tabs';

import {
	labelPadding as labelPaddingDefaultAttributeValue,
	tickerHeight as tickerHeightDefaultAttributeValue,
} from './attributes';

import {
	labelPositionOptions,
	slideDirectionOptions,
	// tickerTypeOptions,
	tickerLabelShapeOptions,
	tickerListStyleOptions,
	positionStickyOptions,
	getMaxValueForPadding,
	queryTypeOptions,
	useFetch,
	navigatorPositionOptions,
} from './helper';

const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;

	const {
		labelTypography,
		labelTextShadow,
		labelTextStroke,
		tickerTypography,
		tickerTextShadow,
		tickerTextStroke,

		labelColor,
		labelBackgroundColor,
		labelColorH,
		labelBackgroundColorH,
		labelPosition,
		stickyLabelTag,
		stickyLabel,
		isShowLabel,
		labelPadding,
		tickerHeight,
		showTickerNavigator,
		navigatorPosition,
		navigatorBgColor,
		navigatorColor,
		tickerListStyle,
		isShowTime,

		tickerColor,
		tickerColorH,
		tickerBgColorH,
		tickerBgColor,
		slideSpeed,
		slideDirection,

		selectedPosts,
		selectedPages,
		tickerType,
		queryType,
		isPauseOnOver,
		isPositionSticky,
		stickyPosition,
		tickerLabelShape,
		lists,
		listIconsClasses,
		postLink,
		pageLink,
	} = attributes;

	const queryOptions = ( items ) => {
		return items
			? items.map( ( item ) => ( {
					value: item.id,
					label: item.title.rendered,
			  } ) )
			: [];
	};

	const pageOptions = queryOptions( useFetch( 'page' ) );
	const postOptions = queryOptions( useFetch( 'post' ) );
	const isLoading = ! postOptions || ! pageOptions;

	const openListSettingHandler = ( id ) => {
		const updatedLists = lists.map( ( list ) => {
			if ( list.id === id ) {
				return { ...list, isOpen: ! list.isOpen };
			}
			return { ...list, isOpen: false };
		} );
		setAttributes( { lists: updatedLists } );
	};

	const changeListHandler = ( id, controlValue, attributeObjectKey ) => {
		const updatedLists = lists.map( ( item ) => {
			if ( item.id === id ) {
				return {
					...item,
					[ attributeObjectKey ]: controlValue,
				};
			}
			return item;
		} );
		setAttributes( { lists: updatedLists } );
	};

	const deleteAnItemFromList = ( event, id ) => {
		event.stopPropagation();
		setAttributes( {
			lists: lists.filter( ( list ) => list?.id !== id ),
		} );
	};

	const duplicateAnItemFromList = ( event, id ) => {
		event.stopPropagation();

		const targetedListItemIndex = lists.findIndex(
			( item ) => item?.id === id
		);

		const targetedItem = lists[ targetedListItemIndex ];
		const newListSorted = Array.from( lists ).sort(
			( a, b ) => a.id - b.id
		);
		const biggestId = newListSorted[ newListSorted.length - 1 ]?.id ?? 0;
		const duplicatedItem = {
			id: biggestId + 1,
			text: targetedItem?.text,
			[ `link` ]: targetedItem.link,
			[ `iconColor` ]: targetedItem.iconColor,
			[ `textColor` ]: targetedItem.textColor,
			[ `markerColor` ]: targetedItem.markerColor,
			isOpen: false,
		};
		const updatedLists = [ ...lists, duplicatedItem ];
		const updatedListIconsClasses = [
			...listIconsClasses,
			listIconsClasses[ targetedListItemIndex ],
		];

		setAttributes( {
			lists: updatedLists,
			listIconsClasses: updatedListIconsClasses,
		} );
	};

	const uniqueIdCounter = lists?.length
		? lists[ lists.length - 1 ].id + 1
		: 0;

	const addNewListItem = () => {
		const newItem = {
			id: uniqueIdCounter,
			text: '',
			link: {
				linkDestination: '',
				href: '',
				lightbox: '',
				linkTarget: '',
				rel: '',
				noFollow: '',
				keyValue: '',
				linkClass: '',
			},
			iconColor: '',
			textColor: '',
			markerColor: '',
			isOpen: false,
		};

		const updatedList = lists.map( ( item ) => {
			if ( item.isOpen ) {
				return { ...item, isOpen: ! item.isOpen };
			}
			return item;
		} );
		setAttributes( {
			lists: [ ...updatedList, newItem ],
			listIconsClasses: [ ...listIconsClasses ],
		} );
	};

	const onDragEnd = ( result ) => {
		if ( ! result.destination ) {
			return;
		}

		const reorderedLists = Array.from( lists );
		const [ removedListItem ] = reorderedLists.splice(
			result.source.index,
			1
		);
		reorderedLists.splice( result.destination.index, 0, removedListItem );

		setAttributes( {
			lists: reorderedLists,
		} );
	};

	const changeIndividualAttribute = ( list, attributeName, value ) => {
		const previousList = [ ...lists ];
		const updatedList = {
			...list,
			[ attributeName ]: value,
		};
		previousList[ list?.id ] = updatedList;
		setAttributes( {
			lists: previousList,
		} );
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-news-ticker-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'General', 'ablocks' ) }
						initialOpen={ true }
					>
						<>
							{ tickerType === 'marquee' && (
								<>
									<ABlocksSelectControl
										label={ __( 'Direction', 'ablocks' ) }
										options={ slideDirectionOptions }
										isSearch={ true }
										attributeName="slideDirection"
										attributeValue={ slideDirection }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Speed (Slow To Fast)',
											'ablocks'
										) }
										attributeName="slideSpeed"
										attributeValue={ slideSpeed }
										setAttributes={ setAttributes }
										min={ 0 }
										max={ 50 }
										step={ 1 }
										isInline={ false }
										isResponsive={ false }
									/>
								</>
							) }
							<ABlocksToggleControl
								label={ __( 'Pause On Hover', 'ablocks' ) }
								attributeName="isPauseOnOver"
								attributeValue={ isPauseOnOver }
								setAttributes={ setAttributes }
								isResponsive={ false }
								allowDeselect={ false }
							/>
							<ABlocksToggleControl
								label={ __( 'Position sticky', 'ablocks' ) }
								attributeName="isPositionSticky"
								attributeValue={ isPositionSticky }
								setAttributes={ setAttributes }
								isResponsive={ false }
								allowDeselect={ false }
							/>
							{ isPositionSticky && (
								<ABlocksSelectControl
									label={ __( 'Select Position', 'ablocks' ) }
									options={ positionStickyOptions }
									attributeName="stickyPosition"
									attributeValue={ stickyPosition }
									setAttributes={ setAttributes }
								/>
							) }
							<ABlocksToggleControl
								label={ __( 'Show Label', 'ablocks' ) }
								attributeName="isShowLabel"
								attributeValue={ isShowLabel }
								setAttributes={ setAttributes }
								isResponsive={ false }
								allowDeselect={ false }
							/>
							<ABlocksToggleControl
								label={ __( 'Show Navigator', 'ablocks' ) }
								attributeName="showTickerNavigator"
								attributeValue={ showTickerNavigator }
								setAttributes={ setAttributes }
								isResponsive={ false }
								allowDeselect={ false }
							/>
							{ queryType !== 'customText' && (
								<ABlocksToggleControl
									label={ __( 'Show Time', 'ablocks' ) }
									attributeName="isShowTime"
									attributeValue={ isShowTime }
									setAttributes={ setAttributes }
									isResponsive={ false }
									allowDeselect={ false }
								/>
							) }
						</>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Query Builder', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksSelectControl
							label={ __( 'Query Type', 'ablocks' ) }
							options={ queryTypeOptions }
							attributeName="queryType"
							attributeValue={ queryType }
							setAttributes={ setAttributes }
							isSearchable={ true }
						/>
						{ queryType === 'posts' && (
							<>
								{ isLoading ? (
									<Spinner />
								) : (
									<>
										<ABlocksSelectControl
											label={ __(
												'Selected Posts',
												'ablocks'
											) }
											options={ postOptions }
											attributeName="selectedPosts"
											attributeValue={ selectedPosts }
											setAttributes={ setAttributes }
											isMulti={ true }
											isSearchable={ true }
										/>
										<ABlocksToggleControl
											label={ __(
												'Post Link',
												'ablocks'
											) }
											attributeName="postLink"
											attributeValue={ postLink }
											setAttributes={ setAttributes }
											isResponsive={ false }
											allowDeselect={ false }
										/>
									</>
								) }
							</>
						) }
						{ queryType === 'pages' && (
							<>
								{ isLoading ? (
									<Spinner />
								) : (
									<>
										<ABlocksSelectControl
											label={ __(
												'Selected Pages',
												'ablocks'
											) }
											options={ pageOptions }
											attributeName="selectedPages"
											attributeValue={ selectedPages }
											setAttributes={ setAttributes }
											isMulti={ true }
											isSearchable={ true }
										/>
										<ABlocksToggleControl
											label={ __(
												'Page Link',
												'ablocks'
											) }
											attributeName="pageLink"
											attributeValue={ pageLink }
											setAttributes={ setAttributes }
											isResponsive={ false }
											allowDeselect={ false }
										/>
									</>
								) }
							</>
						) }
						{ queryType === 'customText' && (
							<>
								<DragDropContext onDragEnd={ onDragEnd }>
									<Droppable droppableId="droppable">
										{ ( provided ) => (
											<div
												ref={ provided.innerRef }
												{ ...provided.droppableProps }
											>
												{ lists?.map(
													( list, index ) => (
														<Draggable
															key={ list?.id }
															draggableId={ `${ list?.id }` }
															index={ index }
														>
															{ (
																providedItem
															) => (
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
																				<span className="ablocks-icon ablocks-icon--move"></span>
																			</span>
																			<span className="ablocks-list-text">
																				{ list
																					?.text
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
																		</div>
																	</div>
																	{ list?.isOpen && (
																		<div className="ablocks-editor-list__inner-content">
																			<ABlocksTextareaControl
																				label={ __(
																					'Text',
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
																				) =>
																					changeListHandler(
																						list?.id,
																						controlValue,
																						'text'
																					)
																				}
																				placeholder={ __(
																					'Enter your text'
																				) }
																			/>

																			<ABlockLinkControl
																				label={ __(
																					'Link',
																					'ablocks'
																				) }
																				attributeName={
																					'link'
																				}
																				attributeValue={
																					list.link
																				}
																				setAttributes={
																					setAttributes
																				}
																				onChangeHandler={ (
																					key,
																					value
																				) => {
																					changeIndividualAttribute(
																						list,
																						'link',
																						{
																							...list.link,
																							[ key ]:
																								value,
																						}
																					);
																				} }
																			/>
																		</div>
																	) }
																</div>
															) }
														</Draggable>
													)
												) }
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
							</>
						) }
					</ABlocksPanelBody>
					{ showTickerNavigator && (
						<>
							<ABlocksPanelBody
								title={ __( 'Ticker Navigator', 'ablocks' ) }
								initialOpen={ false }
							>
								<ABlocksSelectControl
									label={ __(
										'Navigator Position',
										'ablocks'
									) }
									options={ navigatorPositionOptions }
									attributeName="navigatorPosition"
									attributeValue={ navigatorPosition }
									setAttributes={ setAttributes }
								/>
								<ABlocksColorControl
									label={ __( 'Color', 'ablocks' ) }
									attributeName="navigatorColor"
									attributeValue={ navigatorColor }
									setAttributes={ setAttributes }
								/>
								<ABlocksColorControl
									label={ __(
										'Background Color',
										'ablocks'
									) }
									attributeName="navigatorBgColor"
									attributeValue={ navigatorBgColor }
									setAttributes={ setAttributes }
								/>
							</ABlocksPanelBody>
						</>
					) }
					{ isShowLabel && (
						<>
							<ABlocksPanelBody
								title={ __( 'Ticker Label', 'ablocks' ) }
								initialOpen={ false }
							>
								<ContentStyleTabs
									content={
										<>
											{ isShowLabel && (
												<>
													<ABlocksTextControl
														label={ __(
															'Sticky Label',
															'ablocks'
														) }
														attributeName="stickyLabel"
														attributeValue={
															stickyLabel
														}
														setAttributes={
															setAttributes
														}
														placeholder={
															'Breaking News'
														}
													/>
													<ABlocksSelectControl
														label={ __(
															'Ticker Shape',
															'ablocks'
														) }
														options={
															tickerLabelShapeOptions
														}
														attributeName="tickerLabelShape"
														attributeValue={
															tickerLabelShape
														}
														setAttributes={
															setAttributes
														}
													/>

													<ABlocksSelectControl
														label={ __(
															'Label Tag',
															'ablocks'
														) }
														options={ HTMLTagLists }
														isSearch={ true }
														attributeName="stickyLabelTag"
														attributeValue={
															stickyLabelTag
														}
														setAttributes={
															setAttributes
														}
														onChangeHandler={ (
															value
														) =>
															setAttributes( {
																stickyLabelTag:
																	value,
															} )
														}
													/>
													<ABlocksSelectControl
														label={ __(
															'Label Position',
															'ablocks'
														) }
														options={
															labelPositionOptions
														}
														attributeName="labelPosition"
														attributeValue={
															labelPosition
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksRangeControl
														label={ __(
															'Padding',
															'ablocks'
														) }
														attributeName="labelPadding"
														attributeValue={
															labelPadding
														}
														setAttributes={
															setAttributes
														}
														hasUnit={ true }
														unitOptions={ [
															{
																value: 'px',
																label: 'px',
															},
															{
																value: 'em',
																label: 'em',
															},
															{
																value: 'rem',
																label: 'rem',
															},
														] }
														min={ 0 }
														max={ getMaxValueForPadding(
															labelPadding?.valueUnit ||
																'px'
														) }
														step={ 1 }
														isInline={ false }
														isResponsive={ true }
														attributeDefaultValue={
															labelPaddingDefaultAttributeValue
														}
													/>
												</>
											) }
										</>
									}
									style={
										<>
											<NormalHoverTabs
												normal={
													<>
														<ABlocksColorControl
															label={ __(
																'Color',
																'ablocks'
															) }
															attributeName="labelColor"
															attributeValue={
																labelColor
															}
															setAttributes={
																setAttributes
															}
														/>
														<ABlocksColorControl
															label={ __(
																'Background Color',
																'ablocks'
															) }
															attributeName="labelBackgroundColor"
															attributeValue={
																labelBackgroundColor
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
															attributeName="labelColorH"
															attributeValue={
																labelColorH
															}
															setAttributes={
																setAttributes
															}
														/>
														<ABlocksColorControl
															label={ __(
																'Background Color',
																'ablocks'
															) }
															attributeName="labelBackgroundColorH"
															attributeValue={
																labelBackgroundColorH
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
															isResponsive={
																false
															}
															attributeValue={
																attributes?.labelColorTransition ||
																0
															}
															attributeName={
																'labelColorTransition'
															}
															setAttributes={
																setAttributes
															}
														/>
													</>
												}
											/>
											<ABlocksTypography
												label={ __(
													'Typography',
													'ablocks'
												) }
												attributeName="labelTypography"
												attributeValue={
													labelTypography
												}
												setAttributes={ setAttributes }
												isResponsive={ true }
												attributes={ attributes }
											/>
											<ABlocksTextShadow
												label={ __(
													'Text Shadow',
													'ablocks'
												) }
												attributeName="labelTextShadow"
												attributeValue={
													labelTextShadow
												}
												setAttributes={ setAttributes }
												isResponsive={ false }
											/>
											<ABlocksTextStroke
												label={ __(
													'Text Stroke',
													'ablocks'
												) }
												attributeName="labelTextStroke"
												attributeValue={
													labelTextStroke
												}
												setAttributes={ setAttributes }
												isResponsive={ true }
											/>
										</>
									}
								/>
							</ABlocksPanelBody>
						</>
					) }
					<ABlocksPanelBody
						title={ __( 'Ticker Body', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __(
											'Ticker List Style',
											'ablocks'
										) }
										options={ tickerListStyleOptions }
										attributeName="tickerListStyle"
										attributeValue={ tickerListStyle }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksRangeControl
										label={ __(
											'Content Height',
											'ablocks'
										) }
										attributeName="tickerHeight"
										attributeValue={ tickerHeight }
										setAttributes={ setAttributes }
										hasUnit={ true }
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'em', label: 'em' },
											{ value: 'rem', label: 'rem' },
										] }
										min={ 0 }
										max={ 100 }
										isInline={ false }
										isResponsive={ true }
										attributeDefaultValue={
											tickerHeightDefaultAttributeValue
										}
										autoSyncRange={ true }
									/>

									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeName="tickerColor"
													attributeValue={
														tickerColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background Color',
														'ablocks'
													) }
													attributeName="tickerBgColor"
													attributeValue={
														tickerBgColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksTypography
													label={ __(
														'Typography',
														'ablocks'
													) }
													attributeName="tickerTypography"
													attributeValue={
														tickerTypography
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ true }
													attributes={ attributes }
												/>
												<ABlocksTextShadow
													label={ __(
														'Text Shadow',
														'ablocks'
													) }
													attributeName="tickerTextShadow"
													attributeValue={
														tickerTextShadow
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ false }
												/>
												<ABlocksTextStroke
													label={ __(
														'Text Stroke',
														'ablocks'
													) }
													attributeName="tickerTextStroke"
													attributeValue={
														tickerTextStroke
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ true }
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
													attributeName="tickerColorH"
													attributeValue={
														tickerColorH
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background Color',
														'ablocks'
													) }
													attributeName="tickerBgColorH"
													attributeValue={
														tickerBgColorH
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
														attributes?.tickerColorTransition ||
														0
													}
													attributeName={
														'tickerColorTransition'
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
