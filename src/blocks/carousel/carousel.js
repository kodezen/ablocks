function ablocksCarousel( element, isFrontend ) {
	if ( ! element ) {
		return null;
	}

	const swiperContainer = element?.querySelector(
		'.ablocks-carousel-swiper'
	);
	const prevButton = element?.querySelector(
		'.ablocks-carousel-navigation__button--prev'
	);
	const nextButton = element?.querySelector(
		'.ablocks-carousel-navigation__button--next'
	);
	const swiperPagination = element?.querySelector(
		'.ablocks-carousel-pagination'
	);
	const swiperOptions = swiperContainer?.getAttribute(
		'data-swiper-options'
	);
	const swiperFrontendOptions = swiperContainer?.getAttribute(
		'data-swiper-frontend-options'
	);
	const swiperSlidesPerView = JSON.parse(
		swiperContainer?.getAttribute( 'data-swiper-slides-per-view' )
	);
	const swiperGap = JSON.parse(
		swiperContainer?.getAttribute( 'data-swiper-gap' )
	);
	const progressCircle = element?.querySelector(
		'.ablocks-carousel-autoplay-progress svg'
	);
	const progressContent = element?.querySelector(
		'.ablocks-carousel-autoplay-progress span'
	);
	const parsedSwiperOptions = JSON.parse( swiperOptions );
	const parsedSwiperFrontendOptions = JSON.parse( swiperFrontendOptions );

	const newParsedSwiperOptions = {
		navigation: {
			nextEl: nextButton,
			prevEl: prevButton,
			disabledClass: 'ablocks-carousel-navigation__button--disabled',
		},
		pagination: {
			el: swiperPagination,
			clickable: !! parsedSwiperOptions.paginationClickable,
		},
	};

	if ( swiperContainer ) {
		// eslint-disable-next-line
		const swiperInstance = new Swiper(swiperContainer, {
			observer: true,
			observeParents: true,
			...newParsedSwiperOptions,
			...parsedSwiperFrontendOptions,
			breakpoints:
				isFrontend && parsedSwiperFrontendOptions?.effect === 'slide'
					? {
							0: {
								slidesPerView: swiperSlidesPerView.valueMobile,
								spaceBetween: swiperGap.valueMobile,
							},
							480: {
								slidesPerView: swiperSlidesPerView.valueTablet,
								spaceBetween: swiperGap.valueTablet,
							},
							840: {
								slidesPerView: swiperSlidesPerView.value,
								spaceBetween: swiperGap.value,
							},
					  }
					: {},
			on: {
				autoplayTimeLeft( s, time, progress ) {
					if ( progressCircle ) {
						progressCircle.style.setProperty(
							'--progress',
							1 - progress
						);
					}
					if ( progressContent ) {
						progressContent.textContent = `${ Math.ceil(
							time / 1000
						) }s`;
					}
				},
			},
		} );

		return swiperInstance;
	}

	return null;
}

export default ablocksCarousel;
