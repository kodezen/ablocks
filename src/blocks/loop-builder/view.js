import LoopBuilder from './loop';
document.addEventListener( 'DOMContentLoaded', () => {
	const loopBuilders = document.querySelectorAll(
		'.ablocks-block--loop-builder'
	);

	loopBuilders.forEach( ( element ) => {
		new LoopBuilder( element );
	} );
} );
