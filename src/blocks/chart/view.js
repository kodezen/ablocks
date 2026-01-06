import ABlocksChart from './front-chart';

function initializeChart() {
	const chartElements = document.querySelectorAll( '.ablocks-chart-canvas' );
	chartElements.forEach( ( element ) => {
		new ABlocksChart( element );
	} );
}
document.addEventListener( 'DOMContentLoaded', () => {
	initializeChart();
} );
