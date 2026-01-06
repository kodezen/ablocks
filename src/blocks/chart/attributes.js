import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const chartHeight = getRangeAttributes( {
	attributeName: 'chartHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 620,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const chartWidth = getRangeAttributes( {
	attributeName: 'chartWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 95,
	hasUnit: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	chartType: {
		type: 'string',
		default: 'bar',
		copyStyle: true,
	},
	// color: {
	// 	type: 'string',
	// 	default: 'red',
	// },
	chartBG: {
		type: 'string',
		default: '#fff',
		copyStyle: true,
	},
	...chartHeight,
	...chartWidth,
	data: {
		type: 'object',
		default: {
			labels: [ 'January', 'February', 'March', 'April', 'May', 'June' ],
			datasets: [
				{
					label: 'Sale',
					data: [ 300, 500, 200, 800, 700, 900 ],
					backgroundColor: 'rgba(75, 192, 192, 0.6)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1,
					pointStyle: 'star',
					pointRadius: 8,
					pointHoverRadius: 12,
				},
				{
					label: 'buys',
					data: [ 400, 600, 300, 900, 800, 800 ],
					backgroundColor: 'yellow',
					borderColor: 'red',
					borderWidth: 1,
					pointStyle: 'triangle',
					pointRadius: 8,
					pointHoverRadius: 12,
				},
			],
		},
	},
	options: {
		type: 'object',
		default: {
			responsive: true,
			aspectRatio: 1,
			maintainAspectRatio: true,
			scales: {
				x: {
					ticks: {
						color: 'blue',
						font: {
							size: 14,
						},
					},
					grid: {
						display: true,
						color: 'lightgray',
						lineWidth: 1,
					},
					title: {
						display: true,
						text: 'X-Axis Label',
						color: 'darkblue',
						align: 'center',
						font: {
							size: 16,
							weight: 'bold',
						},
					},
				},
				y: {
					ticks: {
						color: 'green',
						font: {
							size: 14,
						},
					},
					grid: {
						display: true,
						color: 'gray',
						lineWidth: 1,
					},
					title: {
						display: true,
						text: 'Y-Axis Label',
						color: 'darkgreen',
						align: 'center',
						font: {
							size: 16,
							weight: 'bold',
						},
					},
				},
			},
			plugins: {
				legend: {
					position: 'top',
					labels: {
						usePointStyle: true,
					},
				},
				title: {
					display: true,
					text: 'Monthly Sales',
					position: 'top',
					align: 'center',
					padding: 10,
					font: {
						size: 20,
						weight: 'bold',
					},
				},
				subtitle: {
					display: false,
					text: 'Custom Chart Subtitle',
					position: 'top',
					align: 'center',
					padding: 10,
					font: {
						size: 12,
						weight: 'bold',
					},
				},
			},
		},
	},
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...globalAttributes,
};
export default attributes;
