import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	PointElement,
	// PolarAreaElement,
	LineElement,
	LineController,
	PieController,
	RadarController,
	PolarAreaController,
	RadialLinearScale,
	ArcElement,
	Filler,
	Title,
	SubTitle,
	Tooltip,
	Legend,
} from 'chart.js';

// Register the required chart types and elements
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	PointElement,
	LineElement,
	// PolarAreaElement,
	LineController,
	PieController,
	RadarController,
	PolarAreaController,
	RadialLinearScale,
	ArcElement,
	Filler,
	Title,
	SubTitle,
	Tooltip,
	Legend
);

function Chart( element, attributes, ctx ) {
	if ( ! element ) {
		return null;
	}
	const newChart = new ChartJS( ctx, {
		type: attributes.chartType || 'bar', // Default to bar if not specified
		data: attributes.data,
		options: {
			...attributes.options,
			maintainAspectRatio: false,
		},
	} );
	return newChart;
}

export default Chart;
