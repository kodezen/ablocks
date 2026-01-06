import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { useSelect } from '@wordpress/data';
import Button from '@Components/Button';
import { Modal } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import RenderIconLists from './options/RenderIcons';
import ControlLabel from '@Components/control-label';
import { plugin_root_url as PluginURL } from '@Utils/helper';
import { regularIcons, brandsIcons, solidIcons } from './icons-svg-data';
import { convertToObjectArray } from '@Blocks/image/utils';
import ABlocksRangeControl from '@Controls/range';
import ABlocksSelectControl from '@Controls/select';
import { runMediaUploader } from './helper';

import './styles.scss';

const propTypes = {
	label: PropTypes.string,
	attributePrefix: PropTypes.string,
	setAttributes: PropTypes.func,
	attributes: PropTypes.object,
	onChangeHandler: PropTypes.func,
	deleteHandler: PropTypes.func,
	getIconClass: PropTypes.func,
	legacySupport: PropTypes.bool,
	legacyIconSizeSupport: PropTypes.bool,
};

export default function ABlocksIconUploader( {
	label,
	attributePrefix = 'icon',
	attributes,
	setAttributes,
	onChangeHandler,
	deleteHandler,
	getIconClass,
	legacySupport = false,
	legacyIconSizeSupport = false,
	hasImageSize = true,
	isNotIconLibrary = true,
	disableIconLibrary = false,
} ) {
	const [ openIconLibrary, setOpenIconLibrary ] = useState( false );
	const [ searchIcons, setSearchIcons ] = useState( '' );
	const [ modalIconType, setModalIconType ] = useState( 'all' );
	const [ imageSizes, setImageSizes ] = useState( [] );
	const imageUrlAttribute = attributePrefix + 'ImageUrl';
	const imgSizeAttributeName = attributePrefix + 'ImageSize';
	const iconImageSize = attributes[ imgSizeAttributeName ];
	const iconType = attributes[ attributePrefix + 'Type' ];
	const iconShape = attributes[ attributePrefix + 'Shape' ];
	const imgId = attributes[ attributePrefix + 'ImageID' ];

	const { image } = useSelect(
		( select ) => {
			const { getMedia } = select( coreStore );
			return {
				image: imgId ? getMedia( imgId ) : null,
			};
		},
		[ imgId ]
	);

	useEffect( () => {
		const mediaDetails = image?.media_details?.sizes;
		const extractImageSizes = convertToObjectArray( mediaDetails );
		setImageSizes( extractImageSizes );

		if ( image && ! iconImageSize ) {
			setAttributes( {
				[ imageUrlAttribute ]:
					image?.media_details?.sizes?.thumbnail?.source_url,
				[ imgSizeAttributeName ]: 'thumbnail',
			} );
		}
	}, [ image, iconImageSize ] );

	const iconClass = getIconClass
		? getIconClass()
		: attributes[ attributePrefix + 'Class' ];

	const changeHandler = ( className ) => {
		if ( onChangeHandler ) {
			onChangeHandler( className );
		} else {
			defaultChangeHandler( className );
		}
		setOpenIconLibrary( false );
	};

	const defaultChangeHandler = ( className ) => {
		const iconsList = {};
		const classType = className.substring( 2, 3 );

		switch ( classType ) {
			case 'r':
				iconsList.data = regularIcons.icons;
				break;

			case 's':
				iconsList.data = solidIcons.icons;
				break;

			case 'b':
				iconsList.data = brandsIcons.icons;
				break;
		}

		const iconKey = className.substring( 7 );
		const iconData = iconsList.data[ iconKey ];
		const iconSvgViewBox = `0 0 ${ iconData[ 0 ] } ${ iconData[ 1 ] }`;
		const iconSvgPath = iconData[ 4 ];

		setAttributes( {
			[ attributePrefix + 'SvgPath' ]: iconSvgPath,
			[ attributePrefix + 'SvgViewBox' ]: iconSvgViewBox,
			[ attributePrefix + 'Class' ]: className,
			[ attributePrefix + 'ImageUrl' ]: undefined,
			[ attributePrefix + 'ImageID' ]: undefined,
			[ attributePrefix + 'ImageSize' ]: undefined,
		} );
	};

	const imageUrl = attributes[ attributePrefix + 'ImageUrl' ];

	return (
		<div>
			<ControlLabel label={ label } isResponsive={ false }></ControlLabel>

			<div
				role="presentation"
				className="ablocks-placeholder-icon-wrapper"
				onClick={ () => {
					if ( imageUrl ) {
						runMediaUploader().then( ( res ) => {
							setAttributes( {
								[ attributePrefix + 'SvgPath' ]: undefined,
								[ attributePrefix + 'SvgViewBox' ]: undefined,
								[ attributePrefix + 'Class' ]: '',
								[ attributePrefix + 'ImageUrl' ]: res?.url,
								[ attributePrefix + 'ImageID' ]: res?.id,
								[ attributePrefix + 'ImageSize' ]: 'thumbnail',
							} );
						} );
					} else if ( ! disableIconLibrary ) {
						setOpenIconLibrary( true );
					}
				} }
			>
				<img
					className="ablocks-placeholder-image"
					src={ PluginURL + '/assets/images/placeholder-image.svg' }
					alt=""
				/>
				{ ( iconClass || imageUrl ) && (
					<>
						{ iconClass && (
							<div className="iconWrapper">
								{ /* Render the icon in the icon uploader */ }
								<i className={ iconClass }></i>
							</div>
						) }
						{ imageUrl && (
							<div className="imageWrapper">
								<img src={ imageUrl } alt="" />
							</div>
						) }
						<button
							className="ablocks-delete-icon"
							onClick={ ( e ) => {
								e.stopPropagation();
								if ( deleteHandler ) {
									deleteHandler();
								} else {
									setAttributes( {
										[ attributePrefix + 'Class' ]: '',
									} );
								}
								setAttributes( {
									[ attributePrefix + 'SvgPath' ]: undefined,
									[ attributePrefix + 'SvgViewBox' ]:
										undefined,
									[ attributePrefix + 'Class' ]: undefined,
									[ attributePrefix + 'ImageUrl' ]: undefined,
									[ attributePrefix + 'ImageID' ]: undefined,
									[ attributePrefix + 'ImageSize' ]:
										undefined,
								} );
							} }
						>
							<span className="ablocks-icon ablocks-icon--delete"></span>
						</button>
					</>
				) }

				{ ! legacySupport && (
					<div className="ablocks-icon-selector__actions">
						{ isNotIconLibrary && (
							<button
								onClick={ ( e ) => {
									e.stopPropagation();
									setOpenIconLibrary( true );
								} }
								className="ablocks-icon-selector__action--icon-button"
							>
								{ __( 'Icon Library', 'ablocks' ) }
							</button>
						) }

						<button
							onClick={ ( e ) => {
								e.stopPropagation();
								runMediaUploader().then( ( res ) => {
									setAttributes( {
										[ attributePrefix + 'SvgPath' ]:
											undefined,
										[ attributePrefix + 'SvgViewBox' ]:
											undefined,
										[ attributePrefix + 'Class' ]: '',
										[ attributePrefix + 'ImageUrl' ]:
											res?.url,
										[ attributePrefix + 'ImageID' ]:
											res?.id,
										[ attributePrefix + 'ImageSize' ]:
											'thumbnail',
									} );
								} );
							} }
							className="ablocks-icon-selector__action--svg-button"
						>
							{ __( 'Upload Image', 'ablocks' ) }
						</button>
					</div>
				) }
			</div>
			{ legacyIconSizeSupport && (
				<ABlocksRangeControl
					label={ __( 'Size', 'ablocks' ) }
					min={ 0 }
					max={ 300 }
					isInline={ false }
					isResponsive={ false }
					attributeName={ attributePrefix + 'Size' }
					attributeValue={ attributes?.[ attributePrefix + 'Size' ] }
					setAttributes={ setAttributes }
				/>
			) }

			{ ! legacySupport && (
				<>
					{ imageUrl
						? hasImageSize && (
								<>
									<ABlocksSelectControl
										label={ __( 'Image sizes', 'ablocks' ) }
										options={ imageSizes }
										attributeName={ imgSizeAttributeName }
										setAttributes={ setAttributes }
										attributeValue={ iconImageSize }
										onChangeHandler={ (
											iconImageSizes
										) => {
											setAttributes( {
												[ imageUrlAttribute ]:
													image?.media_details
														?.sizes?.[
														iconImageSizes
													]?.source_url,
												[ imgSizeAttributeName ]:
													iconImageSizes,
											} );
										} }
									/>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										min={ 0 }
										max={ 600 }
										isInline={ false }
										isResponsive={ false }
										attributeName={
											attributePrefix + 'Size'
										}
										attributeValue={
											attributes?.[
												attributePrefix + 'Size'
											]
										}
										setAttributes={ setAttributes }
									/>
								</>
						  )
						: hasImageSize && (
								<ABlocksRangeControl
									label={ __( 'Size', 'ablocks' ) }
									min={ 0 }
									max={ 300 }
									isInline={ false }
									isResponsive={ false }
									attributeName={ attributePrefix + 'Size' }
									attributeValue={
										attributes?.[ attributePrefix + 'Size' ]
									}
									setAttributes={ setAttributes }
								/>
						  ) }

					{ hasImageSize && (
						<ABlocksSelectControl
							label={ __( 'View', 'ablocks' ) }
							options={ [
								{ value: 'default', label: 'Default' },
								{ value: 'stacked', label: 'Stacked' },
								{ value: 'framed', label: 'Framed' },
							] }
							attributeName={ attributePrefix + 'Type' }
							attributeValue={ iconType || 'default' }
							setAttributes={ setAttributes }
						/>
					) }
					{ iconType !== 'default' && (
						<ABlocksSelectControl
							label={ __( 'Shape', 'ablocks' ) }
							options={ [
								{
									label: 'Circle',
									value: 'circle',
								},
								{
									label: 'Square',
									value: 'square',
								},
							] }
							isResponsive={ false }
							attributeValue={ iconShape }
							attributeName={ attributePrefix + 'Shape' }
							setAttributes={ setAttributes }
						/>
					) }
				</>
			) }

			{ /* Icon library modal  */ }
			{ openIconLibrary && (
				<Modal
					className="ablocks-icon-uploader-modal-root-wrapper"
					onRequestClose={ () => {
						setOpenIconLibrary( false );
					} }
				>
					<div className="ablocks-icon-library">
						<div className="ablocks-icon-library--wrapper">
							<div className="ablocks-icon-library--header">
								<input
									type="text"
									className="ablocks-icon-library--icons-search"
									placeholder={ __(
										'search icons…',
										'ablocks'
									) }
									value={ searchIcons }
									onChange={ ( e ) =>
										setSearchIcons( e.target.value )
									}
								/>
								<div className="ablocks-icon-library--header--btn-wrapper">
									<Button
										icon={
											<span className="ablocks-icon ablocks-icon--close"></span>
										}
										onClick={ () => {
											setOpenIconLibrary( false );
										} }
									></Button>
								</div>
							</div>
							<div className="ablocks-icon-library--content-area">
								<div className="ablocks-icon-library--icons-type">
									<span
										role="presentation"
										className={ `${
											modalIconType === 'all'
												? 'active'
												: ''
										}` }
										onClick={ () =>
											setModalIconType( 'all' )
										}
										onKeyDown={ () => {} }
									>
										{ __( 'All', 'ablocks' ) }
									</span>
									<span
										role="presentation"
										className={ `${
											modalIconType === 'solid'
												? 'active'
												: ''
										}` }
										onClick={ () =>
											setModalIconType( 'solid' )
										}
										onKeyDown={ () => {} }
									>
										{ __( 'Solid', 'ablocks' ) }
									</span>
									<span
										role="presentation"
										className={ `${
											modalIconType === 'brands'
												? 'active'
												: ''
										}` }
										onClick={ () =>
											setModalIconType( 'brands' )
										}
										onKeyDown={ () => {} }
									>
										{ __( 'Brands', 'ablocks' ) }
									</span>
								</div>
								<div className="ablocks-icon-library--icons">
									<h2 className="ablocks-icon-library--icons--total-icon">
										{ __( 'All Icons', 'ablocks' ) }
									</h2>
								</div>
								{ /* Rendering all of icons  */ }
								<RenderIconLists
									changeHandler={ changeHandler }
									searchIconQuery={ searchIcons }
									modalIconType={ modalIconType }
								/>
							</div>
						</div>
					</div>
				</Modal>
			) }
		</div>
	);
}

ABlocksIconUploader.propTypes = propTypes;
