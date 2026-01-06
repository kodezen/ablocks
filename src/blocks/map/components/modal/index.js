import React from 'react';
import {
	Button,
	RadioControl,
	TextControl,
	RangeControl,
	ToggleControl,
	TextareaControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import Modal from 'react-modal';
import { wpKsesPostLike } from '@Utils/helper';
import Search from './../search';

const propTypes = {};

const customStyles = {
	overlay: {
		background: 'rgba(35, 40, 45, 0.62)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		width: '850px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export default function MarkerModal( {
	index,
	isOpen,
	attributes,
	setAttributes,
	closeModal,
} ) {
	const { mapMarkerList, centerIndex } = attributes;

	const setMarkerAttributeValue = ( listIndex, name, value ) => {
		const updatedLists = mapMarkerList.map( ( list ) => {
			if ( list.id === listIndex ) {
				return {
					...list,
					[ name ]: value,
				};
			}
			return list;
		} );
		setAttributes( { mapMarkerList: updatedLists } );
	};

	return (
		<>
			<Modal
				bodyOpenClassName="ablocks-block-map-modal"
				isOpen={ isOpen }
				style={ customStyles }
				ariaHideApp={ false }
				contentLabel="Marker Editor"
			>
				<Button
					className="ablocks-block-map-modal__close"
					onClick={ closeModal }
				>
					<span className="dashicons dashicons-no-alt"></span>
				</Button>
				<div className="ablocks-block-map-modal__body">
					<div className="entry-left">
						<Search
							index={ index }
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>

						<div className="ablocks-block-map-modal-group-control">
							<TextControl
								label={ __( 'Latitude', 'ablocks' ) }
								onChange={ ( num ) =>
									setMarkerAttributeValue(
										index,
										'lat',
										! isNaN( num ) ? num : 0
									)
								}
								value={ mapMarkerList[ index ].lat }
							/>
							<TextControl
								label={ __( 'longitude', 'ablocks' ) }
								onChange={ ( num ) =>
									setMarkerAttributeValue(
										index,
										'lng',
										! isNaN( num ) ? num : 0
									)
								}
								value={ mapMarkerList[ index ].lng }
							/>
						</div>
						<div className="ablocks-based-control__label">
							<TextControl
								label={ __( 'Popup Title', 'ablocks' ) }
								onChange={ ( text ) =>
									setMarkerAttributeValue(
										index,
										'title',
										wpKsesPostLike( text )
									)
								}
								value={ mapMarkerList[ index ].title }
							/>
							<TextareaControl
								__nextHasNoMarginBottom
								label={ __( 'Popup Content', 'ablocks' ) }
								onChange={ ( text ) =>
									setMarkerAttributeValue(
										index,
										'content',
										wpKsesPostLike( text )
									)
								}
								value={ mapMarkerList[ index ].content }
							/>
						</div>
						<Button
							className="ablocks-block-map-modal__save"
							isPrimary={ true }
							onClick={ closeModal }
						>
							{ __( 'Save & Close', 'ablocks' ) }
						</Button>
					</div>
					<div className="entry-right">
						<div className="ablocks-block-map-modal-panel">
							<h2 className="ablocks-block-map-modal-panel__title">
								{ __( 'Marker Settings', 'ablocks' ) }
							</h2>
							<div className="ablocks-block-map-modal-panel__body">
								<ToggleControl
									label={ __(
										'Set As Default Position',
										'wp-map-block'
									) }
									checked={ centerIndex === index }
									onChange={ ( option ) => {
										setAttributes( {
											centerIndex: option ? index : 0,
										} );
									} }
								/>
								<div className="ablocks-block-map-modal-panel__body--radio">
									<RadioControl
										label={ __(
											'Choose Icon Type',
											'ablocks'
										) }
										selected={
											mapMarkerList[ index ].iconType
										}
										options={ [
											{
												label: __(
													'Default Icon',
													'ablocks'
												),
												value: 'default',
											},
											{
												label: __(
													'Custom Icon',
													'ablocks'
												),
												value: 'custom',
											},
										] }
										onChange={ ( option ) => {
											setMarkerAttributeValue(
												index,
												'iconType',
												option
											);
										} }
									/>
									{ mapMarkerList[ index ].iconType ===
										'custom' && (
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( media ) =>
													setMarkerAttributeValue(
														index,
														'customIconUrl',
														media.url
													)
												}
												allowedTypes={ [ 'image' ] }
												render={ ( { open } ) => (
													<>
														{ mapMarkerList[ index ]
															.customIconUrl !==
															'' && (
															<div className="ablocks-block-map-modal-panel__icon-size">
																<RangeControl
																	className="ablocks-range-lebel"
																	label={ __(
																		'Icon Width',
																		'ablocks'
																	) }
																	value={ parseInt(
																		mapMarkerList[
																			index
																		]
																			.customIconWidth
																	) }
																	onChange={ (
																		width
																	) =>
																		setMarkerAttributeValue(
																			index,
																			'customIconWidth',
																			width
																		)
																	}
																	min={ 0 }
																	max={ 500 }
																/>
																<RangeControl
																	className="ablocks-range-lebel"
																	label={ __(
																		'Icon Height',
																		'ablocks'
																	) }
																	value={ parseInt(
																		mapMarkerList[
																			index
																		]
																			.customIconHeight
																	) }
																	onChange={ (
																		height
																	) =>
																		setMarkerAttributeValue(
																			index,
																			'customIconHeight',
																			height
																		)
																	}
																	min={ 0 }
																	max={ 500 }
																/>
																<img
																	src={
																		mapMarkerList[
																			index
																		]
																			.customIconUrl
																	}
																	alt={ __(
																		'Icon',
																		'ablocks'
																	) }
																	style={ {
																		width: mapMarkerList[
																			index
																		]
																			.customIconWidth,
																		height: mapMarkerList[
																			index
																		]
																			.customIconHeight,
																	} }
																/>
															</div>
														) }
														<div className="ablocks-block-map-modal-panel__button-group">
															<Button
																className="ablocks-block-map-modal__button"
																isPrimary={
																	true
																}
																onClick={ open }
															>
																{ mapMarkerList[
																	index
																]
																	.customIconUrl ===
																''
																	? __(
																			'Upload Icon',
																			'ablocks'
																	  )
																	: __(
																			'Replace Icon',
																			'ablocks'
																	  ) }
															</Button>
															{ mapMarkerList[
																index
															].customIconUrl !==
																'' && (
																<Button
																	className="ablocks-block-map-modal__button"
																	isPrimary={
																		true
																	}
																	onClick={ () =>
																		setMarkerAttributeValue(
																			index,
																			'customIconUrl',
																			''
																		)
																	}
																>
																	{ __(
																		'Remove Icon',
																		'ablocks'
																	) }
																</Button>
															) }
														</div>
													</>
												) }
											/>
										</MediaUploadCheck>
									) }
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

MarkerModal.propTypes = propTypes;
