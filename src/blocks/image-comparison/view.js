import ABlocksImageComparison from './image-comparison';

function initImageComparison() {
	const imageComparisons = document.querySelectorAll(
		'[data-ablocks-slider-container]'
	);

	imageComparisons.forEach( ( imageComparison ) => {
		new ABlocksImageComparison( imageComparison );
	} );
}

document.addEventListener( 'DOMContentLoaded', () => {
	initImageComparison();
} );
