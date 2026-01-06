import React, { useEffect, useRef } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import { BlockControls, useInnerBlocksProps } from '@wordpress/block-editor';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import { getRenderDomElement } from '@Utils/helper';
import ablocksCarousel from './carousel';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import './style.css';
const propTypes = {};
const defaultProps = {};
export default function Render( props ) {
	const { attributes, setAttributes, clientId } = props;
	const dispatch = useDispatch();
	const {
		block_id,
		alignment,
		navigation,
		carouselSlideLength,
		pagination,
		paginationClickable,
		paginationType,
	} = attributes;
	const TEMPLATE = [ [ 'ablocks/carousel-child' ] ];
	const { insertBlock } = ! wp.blockEditor
		? dispatch( 'core/editor' )
		: dispatch( 'core/block-editor' );
	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: 'swiper-wrapper',
		},
		{
			template: TEMPLATE,
			// allowedBlocks: ['ablocks/carousel-child'],
			renderAppender: false,
		}
	);
	const swiperOptions = {
		pagination,
		navigation,
		paginationClickable,
	};

	useEffect( () => {
		ablocksCarousel(
			getRenderDomElement( `.ablocks-block-${ block_id }` )
		);
	}, [ pagination, paginationClickable, navigation ] );
	const handleNewSlide = () => {
		const carouselChildBlock = createBlock( 'ablocks/carousel-child' );
		insertBlock( carouselChildBlock, carouselSlideLength, clientId );
		setAttributes( { carouselSlideLength: carouselSlideLength + 1 } );
	};

	const didMount = useRef( false );
	useEffect( () => {
		if ( ! didMount.current ) {
			didMount.current = true;
			return;
		}
		if ( paginationType === 'default' ) {
			setAttributes( {
				paginationColor: 'gray',
				paginationActiveColor: '#000000',
				paginationBorder: {
					...( attributes.paginationBorder || {} ),
					commonWidth: '',
					borderStyle: '',
				},
			} );
		} else if ( paginationType === 'border1' ) {
			setAttributes( {
				paginationColor: '#000000',
				paginationActiveColor: '#000000',
				paginationBorder: {
					...( attributes.paginationBorder || {} ),
					commonWidth: '2',
					borderStyle: 'solid',
				},
			} );
		} else if ( paginationType === 'border2' ) {
			setAttributes( {
				paginationColor: '#000000',
				paginationActiveColor: '#000000',
				paginationBorder: {
					...( attributes.paginationBorder || {} ),
					commonWidth: '2',
					borderStyle: 'solid',
				},
			} );
		} else if ( paginationType === 'border3' ) {
			setAttributes( {
				paginationColor: '#000000',
				paginationActiveColor: '#000000',
				paginationBorder: {
					...( attributes.paginationBorder || {} ),
					commonWidth: '2',
					borderStyle: 'solid',
				},
			} );
		}
	}, [ paginationType ] );

	return (
		<React.Fragment>
			<BlockControls>
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
				/>
			</BlockControls>

			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div
					className="swiper ablocks-carousel-swiper "
					data-swiper-options={ JSON.stringify( swiperOptions ) }
				>
					<div { ...innerBlocksProps }>
						{ children }
						<div
							role="presentation"
							onClick={ handleNewSlide }
							className="swiper-slide ablocks-carousel-swiper-slide--custom"
						>
							<button className="ablocks-carousel-swiper-slide--custom__btn">
								Add new
							</button>
						</div>
					</div>
				</div>
				{ pagination && (
					<div className="ablocks-carousel-pagination"></div>
				) }
				{ navigation && (
					<div className="ablocks-carousel-navigation__buttons">
						<div className="ablocks-carousel-navigation__button ablocks-carousel-navigation__button--prev">
							<RenderIcon
								attributePrefix={ 'leftIcon' }
								attributes={ attributes }
							/>
						</div>

						<div className="ablocks-carousel-navigation__button ablocks-carousel-navigation__button--next">
							<RenderIcon
								attributePrefix={ 'rightIcon' }
								attributes={ attributes }
							/>
						</div>
					</div>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
