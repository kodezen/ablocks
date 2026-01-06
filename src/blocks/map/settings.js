import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import MarkerModal from './components/modal';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksRangeControl from '@Controls/range';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksSelectControl from '@Controls/select';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksIconUploader from '@Controls/icon-upload';
import AblocksCSSFilter from '@Controls/css-filter';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { uploadJsonFile, third_party_plugin_status } from '@Utils/helper';
import { wpMapBlockToaBlocksMapMigration } from './helper';
import {
	mapWidth as mapWidthDefaultAttributeValue,
	mapHeight as mapHeightDefaultAttribute,
} from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		mapWidth,
		mapHeight,
		mapType,
		mapZoom,
		scrollWheelZoom,
		mapMarkerList,
		centerIndex,
		cssFilter,
		iconHeight,
		iconWidth,
	} = attributes;
	const [ index, setIndex ] = useState( 0 );
	const [ isOpenMarkerModal, setOpenMarkerModal ] = useState( false );
	const [ editingId, setEditingId ] = useState( null );
	const [ editingValue, setEditingValue ] = useState( '' );

	const openMarkerModalModal = ( position ) => {
		setIndex( position );
		setOpenMarkerModal( true );
	};

	const closeMarkerModalModal = () => {
		setIndex( 0 );
		setOpenMarkerModal( false );
	};
	const openListSettingHandler = ( id ) => {
		const updatedLists = mapMarkerList.map( ( list ) => {
			if ( list.id === id ) {
				return { ...list, isOpen: true, isDefault: true };
			}
			return { ...list, isOpen: false, isDefault: false };
		} );
		setAttributes( { mapMarkerList: updatedLists } );
	};

	const changeListHandler = ( id, controlValue, attributeObjectKey ) => {
		const updatedLists = mapMarkerList.map( ( item ) => {
			if ( item.id === id ) {
				return { ...item, [ attributeObjectKey ]: controlValue };
			}
			return item;
		} );
		setAttributes( { mapMarkerList: updatedLists } );
	};

	const handleTextClick = ( id, currentValue ) => {
		setEditingId( id );
		setEditingValue( currentValue );
	};

	const handleTextChange = ( e ) => {
		setEditingValue( e.target.value );
	};

	const handleTextBlur = ( id ) => {
		changeListHandler( id, editingValue, 'label' );
		setEditingId( null );
	};

	const deleteAnItemFromList = ( event, id ) => {
		event.stopPropagation();
		const updatedLists = mapMarkerList.filter(
			( list ) => list?.id !== id
		);
		setAttributes( { mapMarkerList: updatedLists } );
	};

	const duplicateAnItemFromList = ( event, id ) => {
		event.stopPropagation();
		const targetedListItemIndex = mapMarkerList.findIndex(
			( item ) => item?.id === id
		);
		const targetedItem = mapMarkerList[ targetedListItemIndex ];
		const newListSorted = Array.from( mapMarkerList ).sort(
			( a, b ) => a.id - b.id
		);
		const biggestId = newListSorted[ newListSorted.length - 1 ].id;
		const duplicatedItem = {
			id: biggestId + 1,
			label: targetedItem?.label,
			lat: targetedItem?.lat,
			lng: targetedItem?.lng,
			title: targetedItem?.title,
			content: targetedItem?.content,
			iconType: targetedItem?.iconType,
			customIconUrl: targetedItem?.customIconUrl,
			customIconWidth: targetedItem?.customIconWidth,
			customIconHeight: targetedItem?.customIconHeight,
			isOpen: false,
		};
		const updatedLists = [ ...mapMarkerList, duplicatedItem ];
		setAttributes( { mapMarkerList: updatedLists } );
	};

	const uniqueIdCounter = mapMarkerList?.length
		? mapMarkerList[ mapMarkerList.length - 1 ].id + 1
		: 0;
	const addNewListItem = () => {
		const newItem = {
			id: uniqueIdCounter,
			label: `Marker ${ uniqueIdCounter + 1 }`,
			lat: '',
			lng: '',
			title: '',
			content: '',
			iconType: 'default',
			customIconUrl: '',
			customIconWidth: 25,
			customIconHeight: 40,
			isOpen: true,
		};
		const updatedList = mapMarkerList.map( ( item ) => {
			if ( item.isOpen ) {
				return { ...item, isOpen: ! item.isOpen };
			}
			return item;
		} );
		setAttributes( { mapMarkerList: [ ...updatedList, newItem ] } );
	};

	const onDragEnd = ( result ) => {
		if ( ! result.destination ) {
			return;
		}
		const reorderedLists = Array.from( mapMarkerList );
		const [ removedListItem ] = reorderedLists.splice(
			result.source.index,
			1
		);
		reorderedLists.splice( result.destination.index, 0, removedListItem );
		setAttributes( { mapMarkerList: reorderedLists } );
	};

	// Function to import attributes from JSON
	const importAttributes = async () => {
		const data = await uploadJsonFile();
		if ( data ) {
			setAttributes(
				wpMapBlockToaBlocksMapMigration( JSON.parse( data ) )
			);
		}
	};
	return (
		<React.Fragment>
			{ third_party_plugin_status?.wp_map_block && (
				<BlockControls>
					<ToolbarButton
						label="Import Block Settings"
						icon="upload"
						onClick={ importAttributes }
					/>
				</BlockControls>
			) }
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/docs/ablocks-map-block/' }
				>
					<ABlocksPanelBody
						title={ __( 'Map Settings', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'Choose Map', 'ablocks' ) }
										attributeValue={ mapType }
										attributeName="mapType"
										setAttributes={ setAttributes }
										options={ [
											{
												label: __(
													'Google Map',
													'ablocks'
												),
												value: 'GM',
											},
											{
												label: __(
													'Open Street map',
													'ablocks'
												),
												value: 'OSM',
											},
											{
												label: __(
													'Satellite Map',
													'ablocks'
												),
												value: 'GM_SATELLITE',
											},
										] }
										isInline={ false }
										onChangeHandler={ ( value ) =>
											setAttributes( { mapType: value } )
										}
									/>
									<ABlocksRangeControl
										label={ __( 'Zoom Level', 'ablocks' ) }
										attributeValue={ mapZoom }
										attributeName="mapZoom"
										isResponsive={ false }
										setAttributes={ setAttributes }
										min={ 0 }
										max={ 20 }
										isInline={ false }
										onChangeHandler={ ( value ) =>
											setAttributes( { mapZoom: value } )
										}
									/>
									<ABlocksToggleControl
										label={ __(
											'Enable Scroll Wheel Zoom',
											'ablocks'
										) }
										isInline={ false }
										attributeValue={ scrollWheelZoom }
										attributeName="scrollWheelZoom"
										attributes={ setAttributes }
										isResponsive={ false }
										onChangeHandler={ () =>
											setAttributes( {
												scrollWheelZoom:
													! attributes.scrollWheelZoom,
											} )
										}
									/>
								</>
							}
							style={
								<>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeValue={ mapWidth }
										isResponsive={ true }
										attributeObjectKey="value"
										isInline={ false }
										hasUnit={ true }
										attributeName="mapWidth"
										unitOptions={ [
											{ value: '%', label: '%' },
											{ value: 'px', label: 'px' },
											{ value: 'vw', label: 'vw' },
										] }
										setAttributes={ setAttributes }
										min={ 0 }
										max={ 1000 }
										attributeDefaultValue={
											mapWidthDefaultAttributeValue
										}
										autoSyncRange={ true }
									/>

									<ABlocksRangeControl
										label={ __( 'Height', 'ablocks' ) }
										attributeValue={ mapHeight }
										hasUnit={ true }
										isResponsive={ true }
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'vh', label: 'vh' },
										] }
										attributeName="mapHeight"
										setAttributes={ setAttributes }
										isInline={ false }
										min={ 0 }
										max={ 1000 }
										attributeDefaultValue={
											mapHeightDefaultAttribute
										}
										autoSyncRange={ true }
									/>
									<AblocksCSSFilter
										label={ __( 'CSS Filters', 'ablocks' ) }
										isResponsive={ true }
										attributeValue={ cssFilter }
										attributeName="cssFilter"
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Map Marker', 'ablocks' ) }
						initialOpen={ true }
					>
						<DragDropContext onDragEnd={ onDragEnd }>
							<Droppable droppableId="droppable">
								{ ( provided ) => (
									<div
										ref={ provided.innerRef }
										{ ...provided.droppableProps }
									>
										{ mapMarkerList?.map(
											( list, listIndex ) => (
												<Draggable
													key={ list.id }
													draggableId={ `${ list.id }` }
													index={ listIndex }
												>
													{ ( providedItem ) => (
														<div
															ref={
																providedItem.innerRef
															}
															{ ...providedItem.draggableProps }
															{ ...providedItem.dragHandleProps }
															className={ `ablocks-editor-list ${
																centerIndex ===
																	listIndex &&
																'ablocks-editor-list--sclected'
															}` }
														>
															<div
																role="presentation"
																className="ablocks-editor-list__wrapper"
																onClick={ () =>
																	openListSettingHandler(
																		list?.id
																	)
																}
															>
																<div className="ablocks-editor-list__content-wrapper">
																	<span className="ablocks-editor-list__grab">
																		<span className="ablocks-icon ablocks-icon--move"></span>
																	</span>
																	{ editingId ===
																	list.id ? (
																		<input
																			value={
																				editingValue
																			}
																			onChange={
																				handleTextChange
																			}
																			style={ {
																				width: '100px',
																				border: 'none',
																				outline:
																					'none',
																				boxShadow:
																					'none',
																				backgroundColor:
																					'transparent',
																			} }
																			onBlur={ () =>
																				handleTextBlur(
																					list.id
																				)
																			}
																		/>
																	) : (
																		<span
																			role="presentation"
																			className="ablocks-list-text"
																			style={ {
																				color:
																					centerIndex ===
																						listIndex &&
																					'#00AD6B',
																			} }
																			onClick={ () =>
																				handleTextClick(
																					list.id,
																					list.label
																				)
																			}
																		>
																			{ typeof list?.label ===
																				'string' &&
																			list
																				.label
																				.length >
																				20
																				? list.label.slice(
																						0,
																						20
																				  ) +
																				  '...'
																				: list?.label ||
																				  '' }
																		</span>
																	) }
																</div>

																<div className="ablocks-editor-list__options-wrapper">
																	<span
																		role="presentation"
																		className="ablocks-icon ablocks-icon--delete"
																		onClick={ (
																			e
																		) =>
																			deleteAnItemFromList(
																				e,
																				list?.id
																			)
																		}
																	></span>
																	<span
																		role="presentation"
																		className="ablocks-icon ablocks-icon--edit"
																		onClick={ () =>
																			openMarkerModalModal(
																				listIndex
																			)
																		}
																	></span>
																	<span
																		role="presentation"
																		className="ablocks-icon ablocks-icon--copy"
																		onClick={ (
																			e
																		) =>
																			duplicateAnItemFromList(
																				e,
																				list?.id
																			)
																		}
																	></span>
																</div>
															</div>
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
						<button
							className="ablocks-map--add-marker"
							type="button"
							onClick={ () => {
								addNewListItem();
								openMarkerModalModal( mapMarkerList?.length );
							} }
						>
							{ __( '+ Add Marker', 'ablocks' ) }
						</button>
						{ isOpenMarkerModal && (
							<MarkerModal
								index={ index }
								attributes={ attributes }
								setAttributes={ setAttributes }
								isOpen={ isOpenMarkerModal }
								openModal={ openMarkerModalModal }
								closeModal={ closeMarkerModalModal }
							/>
						) }
					</ABlocksPanelBody>
					{ mapMarkerList.length > 0 && (
						<ABlocksPanelBody
							title={ __( `Marker Icon`, 'ablocks' ) }
							initialOpen={ true }
						>
							<ABlocksRangeControl
								label={ __( 'Icon Height', 'ablocks' ) }
								attributeValue={ iconHeight }
								attributeName="iconHeight"
								isResponsive={ false }
								setAttributes={ setAttributes }
								min={ 0 }
								max={ 150 }
								isInline={ false }
							/>
							<ABlocksRangeControl
								label={ __( 'Icon Width', 'ablocks' ) }
								attributeValue={ iconWidth }
								attributeName="iconWidth"
								isResponsive={ false }
								setAttributes={ setAttributes }
								min={ 0 }
								max={ 150 }
								isInline={ false }
							/>
						</ABlocksPanelBody>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
