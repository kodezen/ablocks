const raf = ( callback ) => {
	if ( typeof window !== 'undefined' && window.requestAnimationFrame ) {
		return window.requestAnimationFrame( callback );
	}
	return setTimeout( callback, 16 ); // Approximate 60 FPS
};
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export default class ABlocksContentTimeline {
	constructor( element, editor = false ) {
		this.contentTimeline = element;
		this.timelineElement = element.querySelector(
			'.ablocks-block-content-timeline'
		);
		this.blockTopHeight =
			this.contentTimeline.getBoundingClientRect().top + window.scrollY;
		this.editor = editor;
		this.arrowAlignment = this.timelineElement.getAttribute(
			'data-arrow-alignment'
		);
		this.animationColor = this.timelineElement.getAttribute(
			'data-animation-color'
		);
		this.showAnimation = this.timelineElement.getAttribute(
			'data-show-animation'
		);
		this.lineElement = this.contentTimeline.querySelector(
			'.ablocks-block-content-timeline__line'
		);
		this.lineInnerElement = this.contentTimeline.querySelector(
			'.ablocks-block-content-timeline__line__inner'
		);
		this.childBlocks = Array.from(
			this.contentTimeline.querySelectorAll(
				'.ablocks-block-content-timeline-child'
			)
		);

		this.handleScroll = this.handleScroll.bind( this );
		this.updateTimeline = this.updateTimeline.bind( this );
		const editorDiv = document.querySelector(
			'.interface-navigable-region.interface-interface-skeleton__content'
		);
		this.editorDiv = editorDiv;
		this.init();
	}

	init() {
		this.updateTimeline();

		this.handleScroll(); // Initial call to set up the state

		// if (this.editor) {
		//   return this.editorDiv.addEventListener('scroll', this.handleScroll);
		// }
		window.addEventListener( 'scroll', this.handleScroll );
	}

	updateTimeline() {
		if ( this.childBlocks.length === 0 || ! this.lineElement ) {
			return;
		}

		const [ firstChild, lastChild ] = [
			this.childBlocks[ 0 ],
			this.childBlocks[ this.childBlocks.length - 1 ],
		];
		const [ firstChildHeight, lastChildHeight ] = [
			firstChild.getBoundingClientRect().height,
			lastChild.getBoundingClientRect().height,
		];

		switch ( this.arrowAlignment ) {
			case 'center':
				this.lineElement.style.top = `${ firstChildHeight / 2 }px`;
				this.lineElement.style.bottom = `${ lastChildHeight / 2 }px`;
				break;
			case 'bottom':
				this.lineElement.style.top = `${ firstChildHeight }px`;
				this.lineElement.style.bottom = `${
					lastChildHeight / lastChildHeight
				}px`;
				break;
			case 'top':
				this.lineElement.style.top = `${
					firstChildHeight / firstChildHeight
				}px`;
				this.lineElement.style.bottom = `${ lastChildHeight }px`;
				break;
			default:
				break;
		}

		this.lineInnerElement.style.height = '0px'; // Initialize lineInnerElement
	}

	handleScroll() {
		raf( () => {
			let totalHeight = 0;
			// const scrollY = this.editor ? this.editorDiv.scrollTop : window.scrollY
			const scrollY = window.scrollY;
			this.childBlocks.forEach( ( child ) => {
				totalHeight += child.getBoundingClientRect().height;
				const inViewIcon = child.querySelector( '.ablocks-icon-wrap' );
				if (
					scrollY - this.blockTopHeight >
					totalHeight - child.getBoundingClientRect().height
				) {
					if (
						this.showAnimation === 'true' &&
						this.editor === false
					) {
						inViewIcon.style.backgroundColor = getTextColorCSS(
							this.animationColor
						);
					}
				} else {
					inViewIcon.style.backgroundColor = '';
				}
			} );

			if ( this.lineInnerElement ) {
				if ( this.showAnimation === 'true' ) {
					this.lineInnerElement.style.backgroundColor =
						getTextColorCSS( this.animationColor );
				}
				if ( ! this.editor ) {
					this.lineInnerElement.style.height = `${
						scrollY - this.blockTopHeight
					}px`;
				}
			}
		} );
	}

	destroy() {
		window.removeEventListener( 'scroll', this.handleScroll );
	}
}
