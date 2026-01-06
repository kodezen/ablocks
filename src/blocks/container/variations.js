export const variationsFlex = [
	{
		name: 'one-column-column',
		icon: (
			<span className="ablocks-icon ablocks-icon--column-bottom-direction"></span>
		),
		attributes: {
			variationSelected: true,
			gap: { columnGap: 20, rowGap: 20 },
			dir: { value: 'column' },
			containerWidth: {
				valueTablet: 100,
			},
			gridColumn: {
				value: 1,
			},
			gridRow: {
				value: 1,
			},
			layout: 'flexBox',
		},
		scope: [ 'block' ],
	},
	{
		name: 'one-column-row',
		icon: (
			<span className="ablocks-icon ablocks-icon--column-right-direction"></span>
		),
		attributes: {
			variationSelected: true,
			gap: { columnGap: 20, rowGap: 20 },
			dir: { value: 'row' },
			containerWidth: {
				valueTablet: 100,
			},
			gridColumn: {
				value: 1,
			},
			gridRow: {
				value: 1,
			},
			layout: 'flexBox',
		},
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-split',
		icon: <span className="ablocks-icon ablocks-icon--column-2"></span>,
		attributes: {
			variationSelected: true,
			wrapTablet: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 2,
			},
			gridRow: {
				value: 1,
			},
			layout: 'flexBox',
			wrapping: { valueTablet: 'wrap' },
			dir: { value: 'row' },
		},
		isDefault: true,
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 50,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 50,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: 'three-columns-equal',
		icon: <span className="ablocks-icon ablocks-icon--column-3"></span>,
		attributes: {
			variationSelected: true,
			wrapTablet: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 3,
			},
			gridRow: {
				value: 1,
			},
			layout: 'flexBox',
			wrapping: { valueTablet: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 33.33,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 33.33,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 33.33,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: 'four-columns-equal',
		icon: <span className="ablocks-icon ablocks-icon--column-4"></span>,
		attributes: {
			variationSelected: true,
			wrapTablet: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 4,
			},
			gridRow: {
				value: 1,
			},
			layout: 'flexBox',
			wrapping: { valueTablet: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: '75-25',
		icon: <span className="ablocks-icon ablocks-icon--column-5"></span>,
		attributes: {
			variationSelected: true,
			wrapTablet: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 2,
			},
			gridRow: {
				value: 1,
			},
			layout: 'flexBox',
			wrapping: { valueTablet: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 75,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: '25-75',
		icon: <span className="ablocks-icon ablocks-icon--column-6"></span>,
		attributes: {
			variationSelected: true,
			wrap: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 2,
			},
			gridRow: {
				value: 1,
			},
			layout: 'flexBox',

			wrapping: { value: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 75,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: '50-50_50-50',
		icon: <span className="ablocks-icon ablocks-icon--column-7"></span>,
		attributes: {
			variationSelected: true,
			wrap: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 2,
			},
			gridRow: {
				value: 2,
			},
			layout: 'flexBox',
			wrapping: { value: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 50,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 50,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 50,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 50,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: '33-33-33_33-33-33',
		icon: <span className="ablocks-icon ablocks-icon--column-8"></span>,
		attributes: {
			variationSelected: true,
			wrap: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 3,
			},
			gridRow: {
				value: 3,
			},
			layout: 'flexBox',
			wrapping: { value: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 33,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 33,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 33,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 33,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 33,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 33,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: '25-50-25',
		icon: <span className="ablocks-icon ablocks-icon--column-9"></span>,
		attributes: {
			variationSelected: true,
			wrapTablet: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 3,
			},
			gridRow: {
				value: 1,
			},
			layout: 'flexBox',
			wrapping: { valueTablet: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 50,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: '75-25_25-75',
		icon: <span className="ablocks-icon ablocks-icon--column-10"></span>,
		attributes: {
			variationSelected: true,
			wrap: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 2,
			},
			gridRow: {
				value: 2,
			},
			layout: 'flexBox',
			wrapping: { value: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 75,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 75,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: '25-75_75-25',
		icon: <span className="ablocks-icon ablocks-icon--column-11"></span>,
		attributes: {
			variationSelected: true,
			wrap: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 2,
			},
			gridRow: {
				value: 2,
			},
			layout: 'flexBox',
			wrapping: { value: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 75,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 75,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 25,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: '50-50_100',
		icon: <span className="ablocks-icon ablocks-icon--column-12"></span>,
		attributes: {
			variationSelected: true,
			wrap: 'wrap',
			direction: 'row',
			gridColumn: {
				value: 2,
			},
			gridRow: {
				value: 2,
			},
			layout: 'flexBox',
			wrapping: { value: 'wrap' },
			dir: { value: 'row' },
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 50,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 50,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					gap: { columnGap: 20, rowGap: 20 },
					dir: { value: 'column' },
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
];

export const variationsGrid = [
	{
		name: 'two-columns',
		icon: <span className="ablocks-icon ablocks-icon--grid-1"></span>,
		attributes: {
			variationSelected: true,
			gridColumn: {
				value: 2,
			},
			gridRow: {
				value: 1,
			},
			layout: 'grid',
		},
		isDefault: true,
		innerBlocks: [
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: 'one-columns',
		icon: <span className="ablocks-icon ablocks-icon--grid-2"></span>,
		attributes: {
			variationSelected: true,
			gridColumn: {
				value: 1,
			},
			gridRow: {
				value: 2,
			},
			layout: 'grid',
		},
		isDefault: true,
		innerBlocks: [
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: 'three-columns',
		icon: <span className="ablocks-icon ablocks-icon--grid-3"></span>,
		attributes: {
			variationSelected: true,
			gridColumn: {
				value: 3,
			},
			gridRow: {
				value: 1,
			},
			layout: 'grid',
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: 'three-rows',
		icon: <span className="ablocks-icon ablocks-icon--grid-4"></span>,
		attributes: {
			variationSelected: true,
			gridColumn: {
				value: 1,
			},
			gridRow: {
				value: 3,
			},
			layout: 'grid',
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-two-rows',
		icon: <span className="ablocks-icon  ablocks-icon--grid-5"></span>,
		attributes: {
			variationSelected: true,
			gridColumn: {
				value: 2,
			},
			gridRow: {
				value: 2,
			},
			layout: 'grid',
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
	{
		name: 'three-columns-three-rows',
		icon: <span className="ablocks-icon  ablocks-icon--grid-6"></span>,
		attributes: {
			variationSelected: true,
			gridColumn: {
				value: 3,
			},
			gridRow: {
				value: 2,
			},
			layout: 'grid',
		},
		innerBlocks: [
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
			[
				'ablocks/container',
				{
					direction: 'column',
					containerWidth: {
						value: 100,
						valueUnit: '%',
						valueUnitTablet: '%',
						valueTablet: 100,
					},
				},
			],
		],
		scope: [ 'block' ],
	},
];
