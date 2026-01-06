import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import RenderContainer from '@Components/block-container/render2';
import {
	MediaPlaceholder,
	BlockControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import classNames from 'classnames';
import metadata from './block.json';
import { useSelect } from '@wordpress/data';
import { getRenderDomElement } from '@Utils/helper';
import './style.css';

export default function Render( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { block_id, backgroundImage, lists, contentTrigger, activeIndex } =
		attributes;

	const Template = [ [ 'ablocks/image-hotspot-child' ] ];

	const innerBlocksProps = useInnerBlocksProps( '', {
		template: Template,
		templateLock: false,
		allowedBlocks: [ 'ablocks/image-hotspot-child' ],
	} );

	const innerBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);

	useEffect( () => {
		const element = getRenderDomElement( `.ablocks-block-${ block_id }` );
		const containerElement = element?.querySelector(
			'.ablocks-image-hotspot__tooltip-content'
		);

		if ( containerElement ) {
			const children = containerElement.children[ 0 ].children;

			if ( activeIndex !== null ) {
				for ( let i = 1; i < children.length; i += 2 ) {
					const childContainer = children[ i ]?.children[ 1 ];

					if ( childContainer ) {
						if ( i === activeIndex * 2 + 1 ) {
							childContainer.classList.add(
								'ablocks-image-hotspot__tooltip--active'
							);
						} else {
							childContainer.classList.remove(
								'ablocks-image-hotspot__tooltip--active'
							);
						}
					}
				}
			}
		}
	}, [ innerBlocks, block_id, clientId, activeIndex ] );

	const handleMouseOver = async ( tooltipId ) => {
		if ( activeIndex === tooltipId ) {
			setAttributes( { activeIndex: null } );
			return;
		}
		await setAttributes( { activeIndex: null } );
		await setAttributes( { activeIndex: tooltipId } );
	};

	return (
		<React.Fragment>
			<BlockControls></BlockControls>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ /* if image not uploaded -- upload button*/ }
				{ ! backgroundImage && (
					<MediaPlaceholder
						icon="format-image"
						labels={ {
							title: __( 'Background Image', 'ablocks' ),
							instructions: __(
								'Drag an image, upload a new one or select a file from your library.',
								'ablocks'
							),
						} }
						onSelect={ ( mediaValue ) => {
							const imageSizes =
								mediaValue.sizes ||
								( mediaValue.media_details
									? mediaValue.media_details.sizes
									: {} );

							setAttributes( {
								imageSizes,
								backgroundImage: mediaValue.url,
							} );
						} }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				) }

				{ backgroundImage && (
					<>
						<img
							className="ablocks-image-hotspot__bg-image"
							alt="ablocks image-hotspot background"
							src={
								attributes.imageSizes[
									attributes.selectedImageSize
								]?.url ||
								attributes.imageSizes[
									attributes.selectedImageSize
								]?.source_url ||
								backgroundImage
							}
						/>

						{ lists?.map( ( list, index ) => {
							const eventHandlers =
								contentTrigger === 'onClick'
									? {
											onClick: () =>
												handleMouseOver( index ),
									  }
									: {
											onMouseOver: () =>
												handleMouseOver( index ),
									  };

							return (
								<div
									key={ list.id }
									className={ classNames(
										'ablocks-image-hotspot__pin',
										`ablocks-image-hotspot-list-${ list.id }`
									) }
									{ ...eventHandlers }
								></div>
							);
						} ) }

						{ activeIndex !== null && (
							<div className="ablocks-image-hotspot__tooltip-content">
								<div { ...innerBlocksProps }></div>

								{ /* eslint-disable-next-line */ }
								<span
									className="ablocks-icon ablocks-icon--close"
									onClick={ () =>
										setAttributes( { activeIndex: null } )
									}
								/>
							</div>
						) }
					</>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}
