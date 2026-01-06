import React from 'react';
import { __ } from '@wordpress/i18n';
import Button from '@Components/Button';
import ABlocksTextControl from '@Controls/text';
import ABlocksRangeControl from '@Controls/range';
import ABlocksSelectControl from '@Controls/select';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksTypography from '@Controls/typography';
import ABlocksPanelBody from '@Components/panel-body';
import ABlockLinkControl from '@Controls/link-control';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksAlignmentControl from '@Controls/alignment';
import ControlLabel from '@Components/control-label';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksColorControl from '@Controls/color';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ABlocksButtonGroupControl from '@Components/button-group';
import Separator from '@Components/separator';
import ABlocksBorderControl from '@Controls/border';
import ABlocksToggleControl from '@Controls/toggleButton';

import {
	iconSize as iconSizeDefaultAttributeValue,
	spaceBetween as spacebetweenDefaultAttributeValue,
	markerSize as markerSizeDefaultAttributeValue,
	textIndent as textIndentDefaultAttributeValue,
	width as widthDefaultValueAttribute,
	weight as weightDefaultValueAttribute,
} from './attributes';
import {
	regularIcons,
	brandsIcons,
	solidIcons,
} from '@Controls/icon-upload/icons-svg-data';
import {
	markerTypeOptions,
	iconTypeOption,
	iconShapeOption,
	borderOptions,
} from './helper';
import './styles.scss';

const propTypes = {};
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		lists,
		markerType,
		emoji,
		iconSize,
		iconColor,
		padding,
		position,
		stack,
		iconType,
		iconShape,
		textColor,
		typography,
		textIndent,
		spaceBetween,
		iconBackgroundColor,
		verticalAlignment,
		horizontalAlignment,
		markerColor,
		markerSize,
		listIcons,
		listIconsClasses,
		divider,
		dividerPatternUrl,
		weight,
		width,
		borderColor,
	} = attributes;
	const isIconType = iconType === 'stack' || iconType === 'framed';

	const openListSettingHandler = ( id ) => {
		const updatedLists = lists.map( ( list ) => ( {
			...list,
			isOpen: list.id === id ? ! list.isOpen : false,
		} ) );
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
		const deletedIndex = lists.findIndex( ( list ) => list.id === id );
		if ( deletedIndex === -1 ) {
			return;
		}

		const updatedLists = lists.filter(
			( _, index ) => index !== deletedIndex
		);
		const updatedListIconsClasses = listIconsClasses.filter(
			( _, index ) => index !== deletedIndex
		);

		setAttributes( {
			lists: updatedLists,
			listIconsClasses: updatedListIconsClasses,
		} );
	};

	const duplicateAnItemFromList = ( event, id ) => {
		event.stopPropagation();

		const targetedListItemIndex = lists.findIndex(
			( item ) => item?.id === id
		);

		const targetedItem = lists[ targetedListItemIndex ];
		const newListSorted = [ ...lists ].sort( ( a, b ) => a.id - b.id );
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
			listIconsClasses[ targetedListItemIndex ] || '',
		];

		setAttributes( {
			lists: updatedLists,
			listIconsClasses: updatedListIconsClasses,
		} );
	};

	const addNewListItem = () => {
		const uniqueIdCounter = lists.length
			? Math.max( ...lists.map( ( l ) => l.id ) ) + 1
			: 0;
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
		const updatedListIconsClasses = [
			...listIconsClasses,
			listIconsClasses[ lists.length - 1 ] || '',
		];
		setAttributes( {
			lists: [ ...updatedList, newItem ],
			listIconsClasses: [ ...updatedListIconsClasses ],
		} );
	};

	const reorder = ( list, startIndex, endIndex ) => {
		const result = Array.from( list );
		const [ removed ] = result.splice( startIndex, 1 );
		result.splice( endIndex, 0, removed );
		return result;
	};

	const onDragEnd = ( result ) => {
		if ( ! result.destination ) {
			return;
		}

		const reorderedLists = reorder(
			lists,
			result.source.index,
			result.destination.index
		);
		const reorderedListIconsClasses = reorder(
			listIconsClasses,
			result.source.index,
			result.destination.index
		);

		setAttributes( {
			lists: reorderedLists,
			listIconsClasses: reorderedListIconsClasses,
		} );

		if ( markerType === 'icon' ) {
			const reorderedListIcons = reorder(
				listIcons,
				result.source.index,
				result.destination.index
			);
			setAttributes( {
				listIcons: reorderedListIcons,
			} );
		}
	};

	const iconUploaderChangeHandler = ( className, id ) => {
		let iconsArray = [];
		const parsedIconType = className.substring( 2, 3 );

		switch ( parsedIconType ) {
			case 'r':
				iconsArray = regularIcons.icons;
				break;
			case 's':
				iconsArray = solidIcons.icons;
				break;
			case 'b':
				iconsArray = brandsIcons.icons;
				break;
		}

		const iconKey = className.substring( 7 );
		const iconData = iconsArray[ iconKey ];
		const iconSvgViewBox = `0 0 ${ iconData[ 0 ] } ${ iconData[ 1 ] }`;
		const iconSvgPath = iconData[ 4 ];

		const iconsList = [ ...( listIcons || [] ) ];
		const iconsClassNamesList = [ ...( listIconsClasses || [] ) ];

		const targetIndex = lists.findIndex( ( l ) => l.id === id );
		if ( targetIndex === -1 ) {
			return;
		} // safety

		const newIconsList = [
			...( iconsList.slice( 0, targetIndex ) || [] ),
			{
				path: iconSvgPath,
				viewBox: iconSvgViewBox,
			},
			...( iconsList.slice( targetIndex + 1 ) || [] ),
		];

		const newIconsClassNamesList = [
			...( iconsClassNamesList.slice( 0, targetIndex ) || [] ),
			className,
			...( iconsClassNamesList.slice( targetIndex + 1 ) || [] ),
		];

		setAttributes( {
			listIcons: newIconsList,
			listIconsClasses: newIconsClassNamesList,
		} );
	};

	const deleteHandler = ( index ) => {
		const iconsList = listIcons || [];
		const iconsClassNamesList = listIconsClasses || [];

		const newIconsList = [
			...( iconsList.slice( 0, index ) || [] ),
			{ path: '', viewBox: '' },
			...( iconsList.slice( index + 1 ) || [] ),
		];
		const newIconsClassNamesList = [
			...( iconsClassNamesList.slice( 0, index ) || [] ),
			'',
			...( iconsClassNamesList.slice( index + 1 ) || [] ),
		];
		setAttributes( {
			listIcons: newIconsList,
			listIconsClasses: newIconsClassNamesList,
		} );
	};

	const changeIndividualAttribute = ( list, attributeName, value ) => {
		const updatedLists = lists.map( ( item ) =>
			item.id === list.id ? { ...item, [ attributeName ]: value } : item
		);
		setAttributes( {
			lists: updatedLists,
		} );
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/docs/ablocks-list-block/' }
				>
					<ABlocksPanelBody
						title={ __( 'Lists', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'Marker type', 'ablocks' ) }
										options={ markerTypeOptions }
										attributeName="markerType"
										attributeValue={ markerType }
										setAttributes={ setAttributes }
									/>

									{ markerType === 'icon' && (
										<ABlocksAlignmentControl
											label={ __(
												'Icon Position',
												'ablocks'
											) }
											isResponsive={ true }
											options={ [
												{
													label: 'editor-flex-start',
													value: 'flex-start',
													icon: 'align-top',
												},
												{
													label: 'editor-align-center',
													value: 'center',
													icon: 'align-center',
												},
												{
													label: 'editor-align-bottom',
													value: 'flex-end',
													icon: 'align-bottom',
													tooltipPosition: 'top-left',
												},
											] }
											setAttributes={ setAttributes }
											attributeValue={ position }
											attributeName="position"
											isInline={ false }
										/>
									) }

									{ markerType === 'emoji' && (
										<ABlocksTextControl
											label={ __( 'Emoji', 'ablocks' ) }
											attributeName="emoji"
											attributeValue={ emoji }
											setAttributes={ setAttributes }
											isInline={ false }
										/>
									) }

									<ABlocksButtonGroupControl
										isResponsive={ false }
										allowDeselect={ true }
										label={ __( 'Layout', 'ablocks' ) }
										options={ [
											{
												value: 'vertical',
												label: __(
													'Vertical',
													'ablocks'
												),
											},
											{
												value: 'horizontal',
												label: __(
													'Horizontal',
													'ablocks'
												),
											},
										] }
										attributeName="stack"
										attributeValue={ stack }
										setAttributes={ setAttributes }
									/>

									{ stack === 'vertical' ? (
										<>
											<ABlocksButtonGroupControl
												isResponsive={ false }
												isInline={ true }
												allowDeselect={ true }
												label={ __(
													'Vertical alignment',
													'ablocks'
												) }
												options={ [
													{
														label: __(
															'Left',
															'ablocks'
														),
														value: 'flex-start',
														icon: (
															<span className="ablocks-icon ablocks-icon--left" />
														),
													},
													{
														label: __(
															'Center',
															'ablocks'
														),
														value: 'center',
														icon: (
															<span className="ablocks-icon ablocks-icon--center" />
														),
													},
													{
														label: __(
															'Right',
															'ablocks'
														),
														value: 'flex-end',
														icon: (
															<span className="ablocks-icon ablocks-icon--right" />
														),
													},
												] }
												attributeName="verticalAlignment"
												attributeValue={
													verticalAlignment
												}
												setAttributes={ setAttributes }
											/>
										</>
									) : (
										<ABlocksAlignmentControl
											allowDeselect={ true }
											label={ __(
												'Horizontal alignment',
												'ablocks'
											) }
											options={ [
												{
													label: __(
														'Flex Start',
														'ablocks'
													),
													value: 'flex-start',
													icon: 'left',
												},
												{
													label: __(
														'Center',
														'ablocks'
													),
													value: 'center',
													icon: 'center',
												},
												{
													label: __(
														'Flex End',
														'ablocks'
													),
													value: 'flex-end',
													icon: 'right',
												},
												{
													label: __(
														'Space Between',
														'ablocks'
													),
													value: 'space-between',
													icon: 'justify',
												},
											] }
											attributeName="horizontalAlignment"
											attributeValue={
												horizontalAlignment
											}
											setAttributes={ setAttributes }
										/>
									) }

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
																				<ContentStyleTabs
																					content={
																						<>
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
																								disableDynamicContent={
																									true
																								}
																							/>

																							{ markerType ===
																								'icon' && (
																								<ABlocksIconUploader
																									label={ __(
																										'Icon',
																										'ablocks'
																									) }
																									attributes={
																										attributes
																									}
																									setAttributes={
																										setAttributes
																									}
																									onChangeHandler={ (
																										className
																									) =>
																										iconUploaderChangeHandler(
																											className,
																											list.id
																										)
																									}
																									deleteHandler={ () =>
																										deleteHandler(
																											index
																										)
																									}
																									getIconClass={ () =>
																										listIconsClasses?.[
																											index
																										]
																									}
																									legacySupport={
																										true
																									}
																								/>
																							) }

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
																						</>
																					}
																					style={
																						<>
																							<ABlocksColorControl
																								label={ __(
																									'Text color',
																									'ablocks'
																								) }
																								attributeName={
																									'textColor'
																								}
																								attributeValue={
																									list.textColor
																								}
																								setAttributes={
																									setAttributes
																								}
																								resetHandler={ () =>
																									changeIndividualAttribute(
																										list,
																										'textColor'
																									)
																								}
																								onChangeHandler={ (
																									attributeName,
																									value
																								) => {
																									changeIndividualAttribute(
																										list,
																										attributeName,
																										value
																									);
																								} }
																							/>

																							{ markerType ===
																								'icon' && (
																								<ABlocksColorControl
																									label={ __(
																										'Icon color',
																										'ablocks'
																									) }
																									attributeName={
																										'iconColor'
																									}
																									attributeValue={
																										list.iconColor
																									}
																									setAttributes={
																										setAttributes
																									}
																									resetHandler={ () =>
																										changeIndividualAttribute(
																											list,
																											'iconColor'
																										)
																									}
																									onChangeHandler={ (
																										attributeName,
																										value
																									) => {
																										changeIndividualAttribute(
																											list,
																											attributeName,
																											value
																										);
																									} }
																								/>
																							) }

																							{ ( markerType ===
																								'disc' ||
																								markerType ===
																									'square' ) && (
																								<>
																									<ABlocksColorControl
																										label={ __(
																											'Marker color',
																											'ablocks'
																										) }
																										attributeName={
																											'markerColor'
																										}
																										attributeValue={
																											list.markerColor
																										}
																										setAttributes={
																											setAttributes
																										}
																										resetHandler={ () =>
																											changeIndividualAttribute(
																												list,
																												'markerColor'
																											)
																										}
																										onChangeHandler={ (
																											attributeName,
																											value
																										) => {
																											changeIndividualAttribute(
																												list,
																												attributeName,
																												value
																											);
																										} }
																									/>
																								</>
																							) }
																						</>
																					}
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
							}
							style={
								<>
									{ /* Show list layouts settings  */ }
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="textColor"
										attributeValue={ textColor }
										setAttributes={ setAttributes }
									/>

									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="typography"
										attributeValue={ typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>

									{ ( markerType === 'disc' ||
										markerType === 'square' ) && (
										<>
											<ABlocksColorControl
												label={ __(
													'Marker color',
													'ablocks'
												) }
												attributeName="markerColor"
												attributeValue={ markerColor }
												setAttributes={ setAttributes }
											/>
											<ABlocksRangeControl
												label={ __(
													'Marker size',
													'ablocks'
												) }
												min={ 0 }
												max={ 50 }
												hasUnit={ false }
												isInline={ false }
												isResponsive={ true }
												attributeName="markerSize"
												attributeValue={ markerSize }
												setAttributes={ setAttributes }
												attributeObjectKey="value"
												attributeDefaultValue={
													markerSizeDefaultAttributeValue
												}
											/>
										</>
									) }

									<ABlocksRangeControl
										label={ __(
											'Space Between Horizontal',
											'ablocks'
										) }
										min={ 0 }
										max={ 50 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ true }
										attributeName="textIndent"
										attributeValue={ textIndent }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										attributeDefaultValue={
											textIndentDefaultAttributeValue
										}
									/>

									<ABlocksRangeControl
										label={ __(
											'Space Between Vertical',
											'ablocks'
										) }
										min={ 0 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ true }
										attributeName="spaceBetween"
										attributeValue={ spaceBetween }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										attributeDefaultValue={
											spacebetweenDefaultAttributeValue
										}
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Divider"
										attributeValue={ divider }
										setAttributes={ setAttributes }
										attributeName="divider"
									/>
									{ divider && (
										<>
											<ABlocksSelectControl
												label={ __(
													'Style',
													'ablocks'
												) }
												options={ borderOptions }
												attributeName="dividerPatternUrl"
												attributeValue={
													dividerPatternUrl
												}
												onChangeHandler={ ( value ) => {
													const matchDivider =
														borderOptions?.find(
															( dividers ) =>
																dividers.value ===
																value
														);
													setAttributes( {
														dividerPatternUrl:
															matchDivider.value,
														dividerType:
															matchDivider.type,
													} );
												} }
											/>
											<ABlocksRangeControl
												label={ __(
													'Weight',
													'ablocks'
												) }
												attributeName="weight"
												attributeObjectKey="value"
												attributeValue={ weight }
												isResponsive={ true }
												setAttributes={ setAttributes }
												hasUnit={ true }
												step={ 1 }
												min={ 1 }
												max={ 100 }
												autoSyncRange={ true }
												isInline={ false }
												attributeDefaultValue={
													weightDefaultValueAttribute
												}
												unitOptions={ [
													{
														value: 'px',
														label: 'px',
													},
													{
														value: 'rem',
														label: 'rem',
													},
													{
														value: 'em',
														label: 'em',
													},
												] }
											/>
											{ stack === 'vertical' && (
												<ABlocksRangeControl
													label={ __(
														'Width',
														'ablocks'
													) }
													attributeName="width"
													attributeObjectKey="value"
													attributeValue={ width }
													setAttributes={
														setAttributes
													}
													hasUnit={ true }
													step={ 1 }
													min={ 1 }
													max={ 100 }
													isInline={ false }
													autoSyncRange={ true }
													attributeDefaultValue={
														widthDefaultValueAttribute
													}
												/>
											) }
											<ABlocksColorControl
												label={ __(
													'Divider Color',
													'ablocks'
												) }
												attributeName="borderColor"
												attributeValue={ borderColor }
												setAttributes={ setAttributes }
											/>
										</>
									) }
								</>
							}
						/>
					</ABlocksPanelBody>

					{ /* Show icon settings  */ }
					{ markerType === 'icon' && (
						<ABlocksPanelBody
							title={ __( 'Icon', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksSelectControl
											label={ __( 'View', 'ablocks' ) }
											options={ iconTypeOption }
											attributeName="iconType"
											attributeValue={ iconType }
											setAttributes={ setAttributes }
										/>
										{ isIconType && (
											<ABlocksSelectControl
												label={ __(
													'Shape',
													'ablocks'
												) }
												options={ iconShapeOption }
												attributeValue={ iconShape }
												attributeName="iconShape"
												setAttributes={ setAttributes }
											/>
										) }
										<ABlocksRangeControl
											label={ __( 'Size', 'ablocks' ) }
											min={ 0 }
											max={ 300 }
											hasUnit={ true }
											isInline={ false }
											isResponsive={ true }
											attributeName="iconSize"
											attributeValue={ iconSize }
											setAttributes={ setAttributes }
											attributeObjectKey="value"
											attributeDefaultValue={
												iconSizeDefaultAttributeValue
											}
											unitOptions={ [
												{ value: 'px', label: 'px' },
												{ value: 'rem', label: 'rem' },
												{ value: 'em', label: 'em' },
											] }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="iconColor"
											attributeValue={ iconColor }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Primary Color',
												'ablocks'
											) }
											attributeName="iconBackgroundColor"
											attributeValue={
												iconBackgroundColor
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksDimensions
											label={ __( 'Padding', 'ablocks' ) }
											isResponsive={ true }
											attributeName="padding"
											attributeValue={ padding }
											setAttributes={ setAttributes }
										/>
										<Separator />
										<ControlLabel
											label="Border"
											isResponsive={ false }
											isHeader={ true }
										/>
										<ABlocksBorderControl
											attributeName="border"
											attributeValue={
												attributes?.border
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
