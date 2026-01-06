import { __ } from '@wordpress/i18n';
import { plugin_root_url } from '../../utils/helper';
const variations = [
	{
		name: 'normal-loo',
		title: __( 'Normal Loop' ),
		icon: (
			<img
				src={
					plugin_root_url +
					'assets/images/loop-builder/normal-loop.svg'
				}
				alt={ __( 'Normal Loop', 'ablocks' ) }
			/>
		),
		attributes: {},
		innerBlocks: [
			[
				'ablocks/loop-template',
				{},
				[
					[
						'ablocks/featured-image',
						{
							imgUrl: 'ablocks_dc:image|featured-image:ablocks_dc',
						},
					],
					[
						'ablocks/heading',
						{
							heading:
								'ablocks_dc:current|page|180|post-title|||:ablocks_dc',
						},
					],
					[
						'ablocks/paragraph',
						{
							paragraph:
								'ablocks_dc:current|page|183|post-date||||post_modified|F j, Y:ablocks_dc',
						},
					],
					[
						'ablocks/paragraph',
						{
							paragraph:
								'ablocks_dc:current|page|183|post-excerpt||||:ablocks_dc',
						},
					],

					[
						'ablocks/button',
						{
							text: 'Read More',
							link: {
								href: 'ablocks_dc:link|post-url:ablocks_dc',
							},
						},
					],
				],
			],
			[ 'core/query-pagination' ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'filterable-loop',
		title: __( 'Filterable Loop' ),
		icon: (
			<img
				src={
					plugin_root_url +
					'assets/images/loop-builder/filterable-loop.svg'
				}
				alt={ __( 'Filterable Loop', 'ablocks' ) }
			/>
		),
		attributes: {},
		innerBlocks: [
			[ 'ablocks/loop-filter' ],
			[
				'ablocks/loop-template',
				{},
				[
					[
						'ablocks/featured-image',
						{
							imgUrl: 'ablocks_dc:image|featured-image:ablocks_dc',
						},
					],
					[
						'ablocks/heading',
						{
							heading:
								'ablocks_dc:current|page|180|post-title|||:ablocks_dc',
						},
					],
					[
						'ablocks/paragraph',
						{
							paragraph:
								'ablocks_dc:current|page|183|post-date||||post_modified|F j, Y:ablocks_dc',
						},
					],
					[
						'ablocks/paragraph',
						{
							paragraph:
								'ablocks_dc:current|page|183|post-excerpt||||:ablocks_dc',
						},
					],

					[
						'ablocks/button',
						{
							text: 'Read More',
							link: {
								href: 'ablocks_dc:link|post-url:ablocks_dc',
							},
						},
					],
				],
			],
			[ 'ablocks/loop-load-more' ],
		],
		scope: [ 'block' ],
	},
];

export default variations;
