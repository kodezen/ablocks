class ABlocksChart {
	constructor( element ) {
		this.chart = element;
		if ( this.chart.parentNode.getAttribute( 'data-chart-type' ) ) {
			this.parentChart = this.chart.parentNode;
		} else {
			this.parentChart = this.chart.parentNode.parentNode;
		}
		this.chartType = this.parentChart.getAttribute( 'data-chart-type' );
		this.dataString = this.parentChart.getAttribute( 'data-data' );
		this.optionsString = this.parentChart.getAttribute( 'data-options' );
		this.getChart();
	}
	getChart() {
		const ctx = this.chart.getContext( '2d' );
		const myChart = new Chart( ctx, {
			type: this.chartType, // Type of chart (bar, line, pie, etc.)
			data: JSON.parse( this.dataString ),
			options: JSON.parse( this.optionsString ),
		} );
	}
}

export default ABlocksChart;
