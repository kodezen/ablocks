import React from 'react';
import SaveContainer from '@Components/block-container/save2';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import './style.css';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { parseArgs } from '@Utils/helper';
const propTypes = {};

const defaultProps = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		isLoop,
		autoplayDelay,
		reverseDirection,
		autoplay,
		autoplayPauseOnHover,
		autoPlayReverse,
		grabCursor,
		mousewheel,
		navigation,
		speed,
		pagination,
		paginationClickable,
		effect,
		slidesPerView,
		gap,
		carouselSlideLength,
	} = attributes;
	const swiperOptions = {
		pagination,
		navigation,
		paginationClickable,
	};
	const swiperFrontendOptions = {
		effect,
		loop: isLoop,
		grabCursor,
		mousewheel,
		speed,
	};
	if ( reverseDirection ) {
		swiperFrontendOptions.initialSlide = carouselSlideLength - 1;
	}
	if ( autoplay ) {
		swiperFrontendOptions.autoplay = {
			delay: autoplayDelay,
			pauseOnMouseEnter: autoplayPauseOnHover,
			reverseDirection: autoPlayReverse,
		};
	}
	if ( effect === 'fade' ) {
		swiperFrontendOptions.fadeEffect = {
			crossFade: true,
		};
	} else if ( effect === 'cube' ) {
		swiperFrontendOptions.cubeEffect = {
			shadow: false,
			slideShadows: true,
			shadowOffset: 20,
			shadowScale: 0.94,
		};
	}
	const storingSlidesPerView = parseArgs( slidesPerView, {
		value: 1,
		valueMobile: 1,
		valueTablet: 1,
	} );
	const storingGap = parseArgs( gap, {
		value: 0,
		valueMobile: 0,
		valueTablet: 0,
	} );
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div
					className="swiper ablocks-carousel-swiper"
					data-swiper-options={ JSON.stringify( swiperOptions ) }
					data-swiper-frontend-options={ JSON.stringify(
						swiperFrontendOptions
					) }
					data-swiper-slides-per-view={ JSON.stringify(
						storingSlidesPerView
					) }
					data-swiper-gap={ JSON.stringify( storingGap ) }
				>
					<div className="swiper-wrapper">
						<InnerBlocks.Content />
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
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
