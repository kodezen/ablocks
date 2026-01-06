export class MarqueeHandler {
	constructor( marqueeElements ) {
		this.marqueeElements = marqueeElements;
		if ( ! this.marqueeElements ) {
		}
	}

	addMarqueeAnimation() {
		this.marqueeElements.forEach( ( marqueeElement ) => {
			marqueeElement.setAttribute( 'data-animated', 'true' );

			const speed =
				parseFloat( marqueeElement.getAttribute( 'data-speed' ) ) || 10;
			const direction =
				marqueeElement.getAttribute( 'data-direction' ) || 'normal';
			const contentGap =
				parseFloat(
					marqueeElement.getAttribute( 'data-content-gap' )
				) || 12;
			const pauseOnHover =
				marqueeElement.getAttribute( 'data-pause' ) === 'true';
			const loop = marqueeElement.getAttribute( 'data-loop' ) === 'true';
			const loopCount =
				parseInt(
					marqueeElement.getAttribute( 'data-loop-count' ),
					10
				) || 1;

			const isVertical = direction === 'up' || direction === 'down';
			const animationName = isVertical
				? 'marquee-scroll-vertical'
				: 'marquee-scroll';
			const animationDirection =
				direction === 'up'
					? 'reverse'
					: direction === 'down'
					? 'normal'
					: direction;

			marqueeElement.style.setProperty(
				'--ablocks-block-animation-speed',
				`${ speed }s`
			);
			marqueeElement.style.setProperty(
				'--ablocks-block-animation-name',
				animationName
			);
			marqueeElement.style.setProperty(
				'--ablocks-block-animation-direction',
				animationDirection
			);
			marqueeElement.style.setProperty(
				'--ablocks-block-content-gap',
				`${ contentGap }px`
			);

			const marqueeInner = marqueeElement.querySelector(
				'.ablocks-block-marquee__children'
			);
			if ( ! marqueeInner ) {
				return;
			}

			const clonedMarqueeInner = marqueeInner.cloneNode( true );
			clonedMarqueeInner.classList.add(
				'ablocks-block-marquee__children-mirror'
			);
			clonedMarqueeInner.setAttribute( 'aria-hidden', 'true' );

			marqueeElement.appendChild( clonedMarqueeInner );
			// eslint-disable-next-line
			requestAnimationFrame(() => {
				if ( isVertical ) {
					const totalHeight = marqueeInner.scrollHeight;
					marqueeElement.style.setProperty(
						'--ablocks-block-total-height',
						`${ totalHeight + contentGap }px`
					);
				} else {
					const totalWidth = marqueeInner.scrollWidth;
					marqueeElement.style.setProperty(
						'--ablocks-block-total-width',
						`${ totalWidth + contentGap }px`
					);
				}
			} );

			if ( loop && loopCount > 0 ) {
				let currentLoop = 0;
				const handleAnimationIteration = () => {
					currentLoop++;
					if ( currentLoop >= loopCount ) {
						marqueeInner.style.animation = 'none';
						clonedMarqueeInner.style.animation = 'none';

						marqueeInner.removeEventListener(
							'animationiteration',
							handleAnimationIteration
						);
						clonedMarqueeInner.removeEventListener(
							'animationiteration',
							handleAnimationIteration
						);
					}
				};

				marqueeInner.addEventListener(
					'animationiteration',
					handleAnimationIteration
				);
				clonedMarqueeInner.addEventListener(
					'animationiteration',
					handleAnimationIteration
				);
			}

			if ( pauseOnHover ) {
				marqueeElement.addEventListener( 'mouseenter', () => {
					marqueeInner.style.animationPlayState = 'paused';
					clonedMarqueeInner.style.animationPlayState = 'paused';
				} );
				marqueeElement.addEventListener( 'mouseleave', () => {
					marqueeInner.style.animationPlayState = 'running';
					clonedMarqueeInner.style.animationPlayState = 'running';
				} );
			}
		} );
	}
}
