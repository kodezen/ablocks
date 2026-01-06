import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { dispatch, select as dataSelect } from '@wordpress/data';
import Button from '@Components/Button';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksRangeControl from '@Controls/range';
import MediaUploadField from '@Components/media-upload';
import ABlocksTextControl from '@Controls/text';
import ABlocksSelectControl from '@Controls/select';
import ABlocksColorControl from '@Controls/color';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';

import { childWidth as contentWidthDefaultAttributeValue } from './attributes';

import {
	AnimationTypeOptions,
	ContentPositionOptions,
	contentTriggerOptions,
	TooltipAnimationOptions,
	ImageSizeOptions,
} from './helper';

const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes, clientId } = props;

	const {
		lists,
		animationType,
		contentTrigger,
		contentAnimation,
		contentPosition,
		pinColor,
		pinColorEffect,
		pinHoverColor,
		pinSize,
		pinHoverSize,
		backgroundColor,
		childWidth,
		selectedImageSize,
	} = attributes;
	const getMaxValueForUnit = ( unit ) => {
		if ( unit === 'px' ) {
			return 1600;
		} else if ( unit === '%' ) {
			return 100;
		} else if ( unit === 'vw' ) {
			return 100;
		} else if ( unit === 'rem' ) {
			return 160;
		} else if ( unit === 'em' ) {
			return 160;
		}
		return 1600;
	};

	const { insertBlock, removeBlock } = ! wp.blockEditor
		? dispatch( 'core/editor' )
		: dispatch( 'core/block-editor' );
	const { getBlockOrder } = ! wp.blockEditor
		? dataSelect( 'core/editor' )
		: dataSelect( 'core/block-editor' );

	let uniqueIdCounter =
		lists.length > 0 ? lists[ lists.length - 1 ].id + 1 : 1;

	const handleNewChild = () => {
		const totalChildBlocks = lists.length;
		const hotspotChildBlock = createBlock( 'ablocks/image-hotspot-child' );
		insertBlock( hotspotChildBlock, totalChildBlocks, clientId );
	};

	const openListSettingHandler = ( id ) => {
		const updatedLists = lists.map( ( list ) => {
			if ( list.id === id ) {
				return { ...list, isOpen: ! list.isOpen };
			}
			return { ...list, isOpen: false };
		} );
		setAttributes( { lists: updatedLists } );
	};

	const deleteAnItemFromList = ( event, id, index ) => {
		event.stopPropagation();
		const updatedLists = lists.filter( ( list ) => {
			if ( list?.id === id ) {
				return false;
			}
			return true;
		} );

		const childBlocks = getBlockOrder( clientId );
		removeBlock( childBlocks[ index ], false );

		setAttributes( {
			lists: updatedLists,
		} );
	};

	const duplicateAnItemFromList = ( event, id, index ) => {
		event.stopPropagation();

		const targetedItem = lists[ index ];
		const duplicatedItem = {
			id: uniqueIdCounter,
			text: targetedItem?.text,
			xAxis: targetedItem?.xAxis,
			yAxis: targetedItem?.yAxis,
			isOpen: false,
			pinColor: targetedItem?.pinColor,
			pinColorEffect: targetedItem?.pinColorEffect,
			pinHoverColor: targetedItem?.pinHoverColor,
			pinSize: targetedItem?.pinSize,
			pinHoverSize: targetedItem?.pinHoverSize,
		};
		const updatedLists = [ ...lists, duplicatedItem ];

		handleNewChild();

		setAttributes( {
			lists: updatedLists,
		} );
	};

	const addNewListItem = () => {
		const newItem = {
			id: uniqueIdCounter,
			text: 'Your title here ' + uniqueIdCounter,
			xAxis: 50,
			yAxis: 50,
			isOpen: true,
			pinColor: '',
			pinColorEffect: '',
			pinHoverColor: '',
			pinSize: '',
			pinHoverSize: '',
		};

		const updatedList = lists.map( ( item ) => {
			if ( item.isOpen ) {
				return { ...item, isOpen: ! item.isOpen };
			}
			return item;
		} );
		setAttributes( {
			lists: [ ...updatedList, newItem ],
		} );

		handleNewChild();

		uniqueIdCounter++;
	};

	const handleSetXAxis = ( e, id ) => {
		const updatedLists = lists.map( ( item ) => {
			if ( item.id === id ) {
				return { ...item, xAxis: e };
			}
			return item;
		} );
		setAttributes( { lists: updatedLists } );
	};

	const handleSetYAxis = ( e, id ) => {
		const updatedLists = lists.map( ( item ) => {
			if ( item.id === id ) {
				return { ...item, yAxis: e };
			}
			return item;
		} );
		setAttributes( { lists: updatedLists } );
	};

	const changeIndividualAttribute = ( list, attributeName, value ) => {
		const updatedList = lists.map( ( item ) =>
			item.id === list.id ? { ...item, [ attributeName ]: value } : item
		);

		setAttributes( { lists: updatedList } );
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-image-hotspot-block/'
					}
				>
					{ /* Common setting*/ }
					<ABlocksPanelBody
						title={ __( 'General', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<MediaUploadField
										allowedTypes={ [ 'image' ] }
										attributeValue={ attributes }
										onSelectImageHandler={ ( media ) => {
											setAttributes( {
												imageSizes: media.sizes,
												backgroundImage: media.url,
											} );
										} }
										onRemoveImageHandler={ () => {
											setAttributes( {
												backgroundImage: undefined,
											} );
										} }
										attributeName="backgroundImage"
										setAttributes={ setAttributes }
									/>

									<ABlocksSelectControl
										label={ __( 'Image Size', 'ablocks' ) }
										options={ ImageSizeOptions }
										attributeName="selectedImageSize"
										attributeValue={ selectedImageSize }
										setAttributes={ setAttributes }
									/>

									<Separator Margin="30px" />
									<ControlLabel
										label="Animations"
										isResponsive={ false }
										isHeader={ true }
									/>

									<ABlocksSelectControl
										label={ __( 'Trigger', 'ablocks' ) }
										options={ contentTriggerOptions }
										attributeName="contentTrigger"
										attributeValue={ contentTrigger }
										setAttributes={ setAttributes }
									/>

									<ABlocksSelectControl
										label={ __( 'Hotspot', 'ablocks' ) }
										options={ AnimationTypeOptions }
										attributeName="animationType"
										attributeValue={ animationType }
										setAttributes={ setAttributes }
									/>

									<ABlocksSelectControl
										label={ __( 'Content', 'ablocks' ) }
										options={ TooltipAnimationOptions }
										attributeName="contentAnimation"
										attributeValue={ contentAnimation }
										setAttributes={ setAttributes }
									/>

									<ABlocksSelectControl
										label={ __( 'Position', 'ablocks' ) }
										options={ ContentPositionOptions }
										attributeName="contentPosition"
										attributeValue={ contentPosition }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName={ 'pinColor' }
										attributeValue={ pinColor }
										setAttributes={ setAttributes }
										resetHandler={ () => {
											setAttributes( {
												pinColor: '',
											} );
										} }
										onChangeHandler={ (
											attributeName,
											value
										) => {
											setAttributes( {
												pinColor: value,
											} );
										} }
									/>

									<ABlocksColorControl
										label={ __(
											'Color Effect',
											'ablocks'
										) }
										attributeName={ 'pinColorEffect' }
										attributeValue={ pinColorEffect }
										setAttributes={ setAttributes }
										resetHandler={ () =>
											setAttributes( {
												pinColorEffect: '',
											} )
										}
										onChangeHandler={ (
											attributeName,
											value
										) => {
											setAttributes( {
												pinColorEffect: value,
											} );
										} }
									/>

									<ABlocksColorControl
										label={ __( 'Hover Color', 'ablocks' ) }
										attributeName={ 'pinHoverColor' }
										attributeValue={ pinHoverColor }
										setAttributes={ setAttributes }
										resetHandler={ () =>
											setAttributes( {
												pinHoverColor: '',
											} )
										}
										onChangeHandler={ (
											attributeName,
											value
										) => {
											setAttributes( {
												pinHoverColor: value,
											} );
										} }
									/>

									<ABlocksRangeControl
										label={ __(
											'Hotspot Size',
											'ablocks'
										) }
										min={ 1 }
										max={ 100 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={ pinSize }
										onChangeHandler={ ( e ) => {
											setAttributes( {
												pinSize: e,
											} );
										} }
										setAttributes={ setAttributes }
									/>

									<ABlocksRangeControl
										label={ __(
											'Effect Size(on Hover)',
											'ablocks'
										) }
										min={ 1 }
										max={ 10 }
										step={ 0.1 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={ pinHoverSize }
										onChangeHandler={ ( e ) => {
											setAttributes( {
												pinHoverSize: e,
											} );
										} }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					{ /* Hotspot Content settings */ }
					<ABlocksPanelBody
						title={ __( 'Hotspot', 'ablocks' ) }
						initialOpen={ false }
					>
						<>
							<div>
								{ lists?.map( ( list, index ) => (
									<div key={ list?.id }>
										<div className="ablocks-editor-list">
											{ /* each option -- wrapper */ }
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
												{ /* each option -- text */ }
												<div className="ablocks-editor-list__content-wrapper">
													<span className="ablocks-list-text">
														{ list?.text.length > 20
															? list?.text.slice(
																	0,
																	20
															  ) + '...'
															: list?.text }
													</span>
												</div>

												{ /* each option -- two button */ }
												<div className="ablocks-editor-list__options-wrapper">
													{ /* delete button */ }
													<span
														className="ablocks-icon ablocks-icon--delete"
														onClick={ ( e ) =>
															deleteAnItemFromList(
																e,
																list?.id,
																index
															)
														}
														role="presentation"
														onKeyDown={ () => {} }
													></span>
													{ /* duplicate button */ }
													<span
														className="ablocks-icon ablocks-icon--copy"
														onClick={ ( e ) =>
															duplicateAnItemFromList(
																e,
																list?.id,
																index
															)
														}
														role="presentation"
														onKeyDown={ () => {} }
													></span>
												</div>
											</div>
											{ /* each option -- content */ }
											{ list?.isOpen && (
												<div className="ablocks-editor-list__inner-content">
													<ContentStyleTabs
														content={
															<>
																<ABlocksTextControl
																	label={ __(
																		'Text',
																		'ablocks'
																	) }
																	attributeValue={
																		list?.text
																	}
																	onChangeHandler={ (
																		newValue
																	) => {
																		const updatedLists =
																			lists.map(
																				(
																					item
																				) =>
																					item.id ===
																					list.id
																						? {
																								...item,
																								text: newValue,
																						  }
																						: item //? oK?
																			);
																		setAttributes(
																			{
																				lists: updatedLists,
																			}
																		);
																	} }
																	setAttributes={
																		setAttributes
																	}
																	isInline={
																		false
																	}
																/>

																<ABlocksRangeControl
																	label={ __(
																		'Horizontal Position',
																		'ablocks'
																	) }
																	min={ 0 }
																	max={ 100 }
																	hasUnit={
																		false
																	}
																	isInline={
																		false
																	}
																	isResponsive={
																		false
																	}
																	// attributeName="markerSize"
																	attributeValue={
																		lists[
																			index
																		]?.xAxis
																	}
																	onChangeHandler={ (
																		e
																	) =>
																		handleSetXAxis(
																			e,
																			list?.id
																		)
																	}
																	setAttributes={
																		setAttributes
																	}
																	attributeObjectKey="value"
																/>

																<ABlocksRangeControl
																	label={ __(
																		'Vertical Position',
																		'ablocks'
																	) }
																	min={ 0 }
																	max={ 100 }
																	hasUnit={
																		false
																	}
																	isInline={
																		false
																	}
																	isResponsive={
																		false
																	}
																	attributeValue={
																		lists[
																			index
																		]?.yAxis
																	}
																	onChangeHandler={ (
																		e
																	) =>
																		handleSetYAxis(
																			e,
																			list?.id
																		)
																	}
																	setAttributes={
																		setAttributes
																	}
																	attributeObjectKey="value"
																/>
															</>
														}
														style={
															<>
																<ABlocksColorControl
																	label={ __(
																		'Hotspot Color',
																		'ablocks'
																	) }
																	attributeName={
																		'pinColor'
																	}
																	attributeValue={
																		list.pinColor
																	}
																	setAttributes={
																		setAttributes
																	}
																	resetHandler={ () =>
																		changeIndividualAttribute(
																			list,
																			'pinColor',
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
																		'Color Effect',
																		'ablocks'
																	) }
																	attributeName={
																		'pinColorEffect'
																	}
																	attributeValue={
																		list.pinColorEffect
																	}
																	setAttributes={
																		setAttributes
																	}
																	resetHandler={ () =>
																		changeIndividualAttribute(
																			list,
																			'pinColorEffect',
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
																		'Hover Color',
																		'ablocks'
																	) }
																	attributeName={
																		'pinHoverColor'
																	}
																	attributeValue={
																		list.pinHoverColor
																	}
																	setAttributes={
																		setAttributes
																	}
																	resetHandler={ () =>
																		changeIndividualAttribute(
																			list,
																			'pinHoverColor',
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

																<ABlocksRangeControl
																	label={ __(
																		'Hotspot Size',
																		'ablocks'
																	) }
																	min={ 1 }
																	max={ 100 }
																	hasUnit={
																		false
																	}
																	isInline={
																		false
																	}
																	isResponsive={
																		false
																	}
																	attributeValue={
																		lists[
																			index
																		]
																			.pinSize
																	}
																	onChangeHandler={ (
																		e
																	) => {
																		const updatedLists =
																			lists.map(
																				(
																					item
																				) =>
																					item.id ===
																					list.id
																						? {
																								...item,
																								pinSize:
																									e,
																						  }
																						: item
																			);
																		setAttributes(
																			{
																				lists: updatedLists,
																			}
																		);
																	} }
																	setAttributes={
																		setAttributes
																	}
																/>

																<ABlocksRangeControl
																	label={ __(
																		'Effect Size(on Hover)',
																		'ablocks'
																	) }
																	min={ 1 }
																	max={ 10 }
																	step={ 0.1 }
																	hasUnit={
																		false
																	}
																	isInline={
																		false
																	}
																	isResponsive={
																		false
																	}
																	attributeValue={
																		lists[
																			index
																		]
																			.pinHoverSize
																	}
																	onChangeHandler={ (
																		e
																	) => {
																		const updatedLists =
																			lists.map(
																				(
																					item
																				) =>
																					item.id ===
																					list.id
																						? {
																								...item,
																								pinHoverSize:
																									e,
																						  }
																						: item
																			);
																		setAttributes(
																			{
																				lists: updatedLists,
																			}
																		);
																	} }
																	setAttributes={
																		setAttributes
																	}
																/>
															</>
														}
													/>
												</div>
											) }
										</div>
									</div>
								) ) }
							</div>

							<Button
								label="Add item"
								onClick={ addNewListItem }
								className="ablocks-add-list-item-button"
							></Button>
						</>
					</ABlocksPanelBody>

					{ /* Child content commmon style */ }
					<ABlocksPanelBody
						title={ __( 'Content', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeName="childWidth"
										attributeValue={ childWidth }
										setAttributes={ setAttributes }
										isResponsive={ true }
										hasUnit={ true }
										isInline={ false }
										attributeObjectKey="value"
										unitOptions={ [
											{
												value: 'px',
												label: 'px',
											},
											{
												value: '%',
												label: '%',
											},
											{
												value: 'em',
												label: 'em',
											},
											{
												value: 'rem',
												label: 'rem',
											},
											{
												value: 'vw',
												label: 'vw',
											},
										] }
										min={ 0 }
										max={ getMaxValueForUnit(
											childWidth?.valueUnit || 'px'
										) }
										step={ 1 }
										attributeDefaultValue={
											contentWidthDefaultAttributeValue
										}
										autoSyncRange={ false }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName={ 'backgroundColor' }
										attributeValue={ backgroundColor }
										setAttributes={ setAttributes }
										resetHandler={ () => {
											setAttributes( {
												backgroundColor: '',
											} );
										} }
										onChangeHandler={ (
											attributeName,
											value
										) => {
											setAttributes( {
												backgroundColor: value,
											} );
										} }
									/>

									<Separator Margin="30px" />
									<ControlLabel
										label="Shadow"
										isResponsive={ false }
										isHeader={ true }
									/>

									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeValue={
											attributes.commonBoxShadow
										}
										setAttributes={ setAttributes }
										attributeName="commonBoxShadow"
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
