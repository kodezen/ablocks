import React from 'react';
import { __ } from '@wordpress/i18n';
import Button from '@Components/Button';
import ABlocksRangeControl from '@Controls/range';
import ABlocksReactSelect from '@Components/ablocks-react-select';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ABlocksButtonGroupControl from '@Components/button-group';
import Separator from '@Components/separator';
import ABlocksSelectControl from '@Controls/select';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ControlLabel from '@Components/control-label';
import ABlocksBorderControl from '@Controls/border';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTypography from '@Controls/typography';
import ABlocksAlignmentControl from '@Controls/alignment';
import {
	spaceBetween as spacebetweenDefaultAttributeValue,
	shareIconSize as shareIconSizeDefaultAttributeValue,
	shareItemIconSize as shareItemIconSizeDefaultAttributeValue,
	shareSize as shareSizeDefaultAttributeValue,
	itemIconHeight as iconHeightDefaultAttributeValue,
	itemIconWidth as iconWidthDefaultAttributeValue,
	itemTextHeight as textHeightDefaultAttributeValue,
	itemTextWidth as textWidthDefaultAttributeValue,
} from './attributes';
import {
	iconShare,
	buttonTypeOptions,
	viewButtonOption,
	shapeOption,
	getMaxValueForUnit,
} from './helper';
const propTypes = {};
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		lists,
		stack,
		spaceBetween,
		verticalAlignment,
		viewButton,
		shape,
		windowsPopUp,
		buttonHover,
		buttonBackground,
		shareSize,
		shareIconSize,
		shareButtonIconColor,
		shareBar,
		textStroke,
		textShadow,
		typography,
		shareItemIconSize,
		itemIconHeight,
		itemIconWidth,
		itemTextHeight,
		itemTextWidth,
		horizontalAlignment,
		shareButtonIconColorH,
	} = attributes;

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
		const selectedOption = iconShare.find(
			( option ) => option.text === controlValue
		);

		const updatedLists = lists.map( ( item ) => {
			if ( item.id === id ) {
				return {
					...item,
					[ attributeObjectKey ]: controlValue,
					text: selectedOption?.text || item.text,
					icon: selectedOption?.icon || item.icon,
					buttonBackgroundColor:
						selectedOption?.buttonBackgroundColor ||
						item.buttonBackgroundColor,
					iconBackgroundColor:
						selectedOption?.iconBackgroundColor ||
						item.iconBackgroundColor,
					link: selectedOption?.link,
					backgroundH: selectedOption?.backgroundH,
				};
			}
			return item;
		} );
		setAttributes( { lists: updatedLists } );
	};

	const deleteAnItemFromList = ( event, id ) => {
		event.stopPropagation();
		const updatedLists = lists.filter( ( list ) => list?.id !== id );
		setAttributes( { lists: updatedLists } );
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
		const biggestId = newListSorted[ newListSorted.length - 1 ].id;
		const duplicatedItem = {
			id: biggestId + 1,
			text: targetedItem?.text,
			icon: targetedItem?.icon,
			buttonBackgroundColor: targetedItem?.buttonBackgroundColor,
			iconBackgroundColor: targetedItem?.iconBackgroundColor,
			link: targetedItem?.link,
			backgroundH: targetedItem?.backgroundH,
			isOpen: false,
		};
		const updatedLists = [ ...lists, duplicatedItem ];
		setAttributes( { lists: updatedLists } );
	};
	const uniqueIdCounter = lists?.length
		? lists[ lists.length - 1 ].id + 1
		: 0;
	const addNewListItem = () => {
		const newItem = {
			id: uniqueIdCounter,
			text: 'Facebook',
			icon: {
				viewBox: '0 0 320 512',
				path: 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z',
			},
			buttonBackgroundColor: 'ablocks-social-share-item--facebook-bg',
			iconBackgroundColor: 'ablocks-social-share-item--facebook-icon-bg',
			link: 'https://www.facebook.com/sharer.php?u=',
			isOpen: true,
			backgroundH: '#2d4373',
			buttonType: 'Facebook',
		};
		const updatedList = lists.map( ( item ) => {
			if ( item.isOpen ) {
				return { ...item, isOpen: ! item.isOpen };
			}
			return item;
		} );
		setAttributes( { lists: [ ...updatedList, newItem ] } );
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
		setAttributes( { lists: reorderedLists } );
	};
	const changeIndividualAttribute = ( list, attributeName, value ) => {
		const previousList = [ ...lists ];
		const updatedList = { ...list, [ attributeName ]: value };
		previousList[ list?.id ] = updatedList;
		setAttributes( { lists: previousList } );
	};
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-social-shares-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Social Share', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksButtonGroupControl
										isResponsive={ false }
										allowDeselect={ true }
										label={ __( 'Stack', 'ablocks' ) }
										options={ [
											{
												value: 'horizontal',
												label: __(
													'Horizontal',
													'ablocks'
												),
											},
											{
												value: 'vertical',
												label: __(
													'Vertical',
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
											isInline={ false }
											attributeName="horizontalAlignment"
											attributeValue={
												horizontalAlignment
											}
											setAttributes={ setAttributes }
										/>
									) }

									<ABlocksSelectControl
										label={ __( 'View', 'ablocks' ) }
										options={ viewButtonOption }
										attributeName="viewButton"
										attributeValue={ viewButton }
										setAttributes={ setAttributes }
									/>
									<Separator margin={ '30px' } />
									<ABlocksSelectControl
										label={ __( 'Shape', 'ablocks' ) }
										options={ shapeOption }
										attributeName="shape"
										attributeValue={ shape }
										setAttributes={ setAttributes }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="windows PopUp"
										attributeValue={ windowsPopUp }
										setAttributes={ setAttributes }
										attributeName="windowsPopUp"
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Share Bar"
										attributeValue={ shareBar }
										setAttributes={ setAttributes }
										attributeName="shareBar"
									/>

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
																key={ list.id }
																draggableId={ `${ list.id }` }
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
																							<ABlocksReactSelect
																								label={ __(
																									'Button type',
																									'ablocks'
																								) }
																								options={
																									buttonTypeOptions
																								}
																								value={ buttonTypeOptions.find(
																									(
																										option
																									) =>
																										option.value ===
																										list?.buttonType
																								) }
																								onChange={ (
																									selectedOption
																								) => {
																									const controlValue =
																										selectedOption?.value;
																									changeListHandler(
																										list?.id,
																										controlValue,
																										'buttonType'
																									);
																									setAttributes(
																										{
																											buttonType:
																												controlValue,
																										}
																									);
																								} }
																							/>
																						</>
																					}
																					style={
																						<>
																							<NormalHoverTabs
																								normal={
																									<>
																										{ ! (
																											viewButton ===
																												'Text' ||
																											( viewButton ===
																												'Icon & Text' &&
																												( shape ===
																													'Rounded' ||
																													shape ===
																														'Circle' ) )
																										) && (
																											<>
																												<ABlocksColorControl
																													label={ __(
																														'Icon  color',
																														'ablocks'
																													) }
																													attributeName={
																														'shareBgColor' +
																														list?.id
																													}
																													attributeValue={
																														list[
																															'shareBgColor' +
																																list?.id
																														]
																													}
																													setAttributes={
																														setAttributes
																													}
																													resetHandler={ () =>
																														changeIndividualAttribute(
																															list,
																															'shareBgColor' +
																																list?.id,
																															''
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
																												<ABlocksColorControl
																													label={ __(
																														'Icon fill  color',
																														'ablocks'
																													) }
																													attributeName={
																														'iconFillColor' +
																														list?.id
																													}
																													attributeValue={
																														list[
																															'iconFillColor' +
																																list?.id
																														]
																													}
																													setAttributes={
																														setAttributes
																													}
																													resetHandler={ () =>
																														changeIndividualAttribute(
																															list,
																															'iconFillColor' +
																																list?.id,
																															''
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
																										{ ! (
																											viewButton ===
																												'Icon' ||
																											( viewButton ===
																												'Icon & Text' &&
																												( shape ===
																													'Rounded' ||
																													shape ===
																														'Circle' ) )
																										) && (
																											<ABlocksColorControl
																												label={ __(
																													'Text backgroun color',
																													'ablocks'
																												) }
																												attributeName={
																													'shareTextBgColor' +
																													list?.id
																												}
																												attributeValue={
																													list[
																														'shareTextBgColor' +
																															list?.id
																													]
																												}
																												setAttributes={
																													setAttributes
																												}
																												resetHandler={ () =>
																													changeIndividualAttribute(
																														list,
																														'shareTextBgColor' +
																															list?.id,
																														''
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

																										{ viewButton ===
																											'Icon & Text' &&
																										( shape ===
																											'Circle' ||
																											shape ===
																												'Rounded' ) ? (
																											<ABlocksColorControl
																												label={ __(
																													'Background Color',
																													'ablocks'
																												) }
																												attributeName={
																													'backgroundColor' +
																													list?.id
																												}
																												attributeValue={
																													list[
																														'backgroundColor' +
																															list?.id
																													]
																												}
																												setAttributes={
																													setAttributes
																												}
																												resetHandler={ () =>
																													changeIndividualAttribute(
																														list,
																														'backgroundColor' +
																															list?.id,
																														''
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
																										) : null }
																									</>
																								}
																								hover={
																									<>
																										{ ! (
																											viewButton ===
																												'Text' ||
																											( viewButton ===
																												'Icon & Text' &&
																												( shape ===
																													'Rounded' ||
																													shape ===
																														'Circle' ) )
																										) && (
																											<ABlocksColorControl
																												label={ __(
																													'Icon  Color',
																													'ablocks'
																												) }
																												attributeName={
																													'shareIconH' +
																													list?.id
																												}
																												attributeValue={
																													list[
																														'shareIconH' +
																															list?.id
																													]
																												}
																												setAttributes={
																													setAttributes
																												}
																												resetHandler={ () =>
																													changeIndividualAttribute(
																														list,
																														'shareIconH' +
																															list?.id,
																														''
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

																										{ ! (
																											viewButton ===
																												'Icon' ||
																											( viewButton ===
																												'Icon & Text' &&
																												( shape ===
																													'Rounded' ||
																													shape ===
																														'Circle' ) )
																										) && (
																											<ABlocksColorControl
																												label={ __(
																													'Text background Color',
																													'ablocks'
																												) }
																												attributeName={
																													'shareTextH' +
																													list?.id
																												}
																												attributeValue={
																													list[
																														'shareTextH' +
																															list?.id
																													]
																												}
																												setAttributes={
																													setAttributes
																												}
																												resetHandler={ () =>
																													changeIndividualAttribute(
																														list,
																														'shareTextH' +
																															list?.id,
																														''
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

																										{ viewButton ===
																											'Icon & Text' &&
																										( shape ===
																											'Circle' ||
																											shape ===
																												'Rounded' ) ? (
																											<ABlocksColorControl
																												label={ __(
																													'Background Hover Color',
																													'ablocks'
																												) }
																												attributeName={
																													'backgroundColorH' +
																													list?.id
																												}
																												attributeValue={
																													list[
																														'backgroundColorH' +
																															list?.id
																													]
																												}
																												setAttributes={
																													setAttributes
																												}
																												resetHandler={ () =>
																													changeIndividualAttribute(
																														list,
																														'backgroundColorH' +
																															list?.id,
																														''
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
																										) : null }
																									</>
																								}
																							/>
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
										label={ __( 'Add item', 'ablocks' ) }
										onClick={ addNewListItem }
										className="ablocks-add-list-item-button"
									></Button>
								</>
							}
							style={
								<>
									<ABlocksRangeControl
										label={ __(
											'Space between',
											'ablocks'
										) }
										min={ 0 }
										hasUnit={ true }
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
								</>
							}
						/>
					</ABlocksPanelBody>

					{ shareBar && (
						<ABlocksPanelBody
							title={ __( 'Share Bar', 'ablocks' ) }
							initialOpen={ true }
						>
							<ContentStyleTabs
								content={
									<React.Fragment>
										<ABlocksRangeControl
											label={ __(
												'Share Size',
												'ablocks'
											) }
											isResponsive={ false }
											min={ 0 }
											hasUnit={ true }
											attributeName="shareSize"
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
											attributeValue={ shareSize }
											setAttributes={ setAttributes }
											isInline={ false }
											attributeDefaultValue={
												shareSizeDefaultAttributeValue
											}
										/>
										<ABlocksRangeControl
											label={ __(
												'Share Icon Size',
												'ablocks'
											) }
											isResponsive={ false }
											min={ 0 }
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
											hasUnit={ true }
											attributeName="shareIconSize"
											attributeValue={ shareIconSize }
											setAttributes={ setAttributes }
											isInline={ false }
											attributeDefaultValue={
												shareIconSizeDefaultAttributeValue
											}
										/>
									</React.Fragment>
								}
								style={
									<React.Fragment>
										<NormalHoverTabs
											normal={
												<>
													<ABlocksColorControl
														label={ __(
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="buttonBackground"
														attributeValue={
															buttonBackground
														}
														setAttributes={
															setAttributes
														}
													/>

													<ABlocksColorControl
														label={ __(
															'Icon Color',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="shareButtonIconColor"
														attributeValue={
															shareButtonIconColor
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
															'Background',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="buttonHover"
														attributeValue={
															buttonHover
														}
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksColorControl
														label={ __(
															'Icon Color',
															'ablocks'
														) }
														isGradient={ true }
														attributeName="shareButtonIconColorH"
														attributeValue={
															shareButtonIconColorH
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
											label={ __( 'Border', 'ablocks' ) }
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
										<Separator />
									</React.Fragment>
								}
							/>
						</ABlocksPanelBody>
					) }
					<ABlocksPanelBody
						title={ __( 'Share Items', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<React.Fragment>
									{ viewButton !== 'Text' && (
										<ABlocksRangeControl
											label={ __(
												'Share Item Icon Size',
												'ablocks'
											) }
											isResponsive={ false }
											min={ 0 }
											max={ 100 }
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
											hasUnit={ true }
											attributeName="shareItemIconSize"
											attributeValue={ shareItemIconSize }
											setAttributes={ setAttributes }
											isInline={ false }
											attributeDefaultValue={
												shareItemIconSizeDefaultAttributeValue
											}
										/>
									) }

									{ ( viewButton === 'Icon & Text' ||
										viewButton === 'Icon' ) && (
										<>
											<ControlLabel
												label="Icon Label Settings"
												isResponsive={ false }
												isHeader={ true }
											/>
											<ABlocksRangeControl
												label={ __(
													'Icon Width',
													'ablocks'
												) }
												attributeName="itemIconWidth"
												attributeValue={ itemIconWidth }
												setAttributes={ setAttributes }
												isResponsive={ false }
												min={ 0 }
												max={ getMaxValueForUnit(
													itemIconWidth?.valueUnit ||
														'px'
												) }
												hasUnit={ true }
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
												step={ 1 }
												isInline={ false }
												attributeDefaultValue={
													iconWidthDefaultAttributeValue
												}
											/>
											<ABlocksRangeControl
												label={ __(
													'Icon Height',
													'ablocks'
												) }
												attributeName="itemIconHeight"
												attributeValue={
													itemIconHeight
												}
												setAttributes={ setAttributes }
												isResponsive={ false }
												min={ 0 }
												max={ getMaxValueForUnit(
													itemIconHeight?.valueUnit ||
														'px'
												) }
												hasUnit={ true }
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
												step={ 1 }
												isInline={ false }
												attributeDefaultValue={
													iconHeightDefaultAttributeValue
												}
											/>
										</>
									) }

									<Separator margin={ '30px' } />

									{ ( viewButton === 'Icon & Text' ||
										viewButton === 'Text' ) && (
										<>
											<ControlLabel
												label="Text Label Settings"
												isResponsive={ false }
												isHeader={ true }
											/>
											<ABlocksRangeControl
												label={ __(
													'Text Width',
													'ablocks'
												) }
												attributeName="itemTextWidth"
												attributeValue={ itemTextWidth }
												setAttributes={ setAttributes }
												isResponsive={ false }
												min={ 0 }
												max={ 200 }
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
												hasUnit={ true }
												step={ 1 }
												isInline={ false }
												attributeDefaultValue={
													textWidthDefaultAttributeValue
												}
											/>
											<ABlocksRangeControl
												label={ __(
													'Text Height',
													'ablocks'
												) }
												attributeName="itemTextHeight"
												attributeValue={
													itemTextHeight
												}
												setAttributes={ setAttributes }
												isResponsive={ false }
												min={ 0 }
												max={ 200 }
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
												hasUnit={ true }
												step={ 1 }
												isInline={ false }
												attributeDefaultValue={
													textHeightDefaultAttributeValue
												}
											/>
										</>
									) }
								</React.Fragment>
							}
							style={
								<React.Fragment>
									{ viewButton !== 'Icon' && (
										<>
											<ABlocksTypography
												label={ __(
													'Typography',
													'ablocks'
												) }
												attributeName="typography"
												attributeValue={ typography }
												setAttributes={ setAttributes }
												isResponsive={ true }
												attributes={ attributes }
											/>
											<ABlocksTextShadow
												label={ __(
													'Text Shadow',
													'ablocks'
												) }
												attributeName="textShadow"
												attributeValue={ textShadow }
												setAttributes={ setAttributes }
												isResponsive={ false }
											/>
											<ABlocksTextStroke
												label={ __(
													'Text Stroke',
													'ablocks'
												) }
												attributeName="textStroke"
												attributeValue={ textStroke }
												setAttributes={ setAttributes }
												isResponsive={ true }
											/>
										</>
									) }

									<Separator />
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="itemBorder"
										attributeValue={
											attributes?.itemBorder
										}
										setAttributes={ setAttributes }
										hasTransition={ false }
									/>
									<ControlLabel
										label="Box shadow"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeName="shareItemShadow"
										attributeValue={
											attributes?.shareItemShadow || 0
										}
										setAttributes={ setAttributes }
									/>
									<Separator />
								</React.Fragment>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
