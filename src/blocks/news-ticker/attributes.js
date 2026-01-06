import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const labelPadding = getRangeAttributes( {
	attributeName: 'labelPadding',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	unitDefaultValue: 'px',
	defaultValue: 10,
	copyStyle: true,
} );

export const tickerHeight = getRangeAttributes( {
	attributeName: 'tickerHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	unitDefaultValue: 'px',
	defaultValue: 50,
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	stickyLabel: {
		type: 'string',
		source: 'text',
		selector: '.ablocks-block-news-ticker__label',
		default: 'Breaking News',
	},
	stickyLabelTag: {
		type: 'string',
		default: 'div',
		copyStyle: true,
	},
	labelPosition: {
		type: 'string',
		default: 'left',
		copyStyle: true,
	},
	queryType: {
		type: 'string',
		default: 'customText',
		copyStyle: true,
	},
	selectedPosts: {
		type: 'array',
		default: [],
	},
	postLink: {
		type: 'boolean',
		default: false,
	},
	selectedPages: {
		type: 'array',
		default: [],
	},
	pageLink: {
		type: 'boolean',
		default: false,
	},
	lists: {
		type: 'array',
		default: [
			{
				id: 0,
				text: 'Stay updated with the latest trends!',
				link: {
					linkDestination: '',
					href: '',
					lightbox: '',
					linkTarget: '',
					rel: '',
					noFollow: '',
					keyValue: '',
					linkClass: '',
				},
				isOpen: false,
			},
		],
	},
	markerType: {
		type: 'string',
		default: 'icon',
		copyStyle: true,
	},
	listIconsClasses: {
		type: 'array',
		default: [],
		copyStyle: true,
	},
	slideDirection: {
		type: 'string',
		default: 'ltr',
		copyStyle: true,
	},
	spaceBetweenItems: {
		type: 'number',
		default: 90,
	},
	slideSpeed: {
		type: 'number',
		default: 2,
	},
	labelColor: {
		type: 'string',
		default: 'white',
		copyStyle: true,
	},
	labelBackgroundColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	labelColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	labelBackgroundColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	labelColorTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},
	tickerColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	tickerColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tickerBgColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tickerColorTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},
	tickerBgColor: {
		type: 'string',
		default: '#E5E5E6',
		copyStyle: true,
	},
	tickerType: {
		type: 'string',
		default: 'marquee',
	},
	...tickerHeight,
	showTickerNavigator: {
		type: 'boolean',
		default: false,
	},

	navigatorBgColor: {
		type: 'string',
		default: '',
	},
	navigatorColor: {
		type: 'string',
		default: '#000000',
	},

	navigatorPosition: {
		type: 'string',
		default: 'right',
	},
	tickerListStyle: {
		type: 'string',
		default: 'none',
		copyStyle: true,
	},
	isPauseOnOver: {
		type: 'boolean',
		default: true,
	},
	isPositionSticky: {
		type: 'boolean',
		default: false,
	},
	stickyPosition: {
		type: 'string',
		default: 'up',
	},
	isShowLabel: {
		type: 'boolean',
		default: true,
	},
	tickerLabelShape: {
		type: 'string',
		default: 'normal',
	},
	...labelPadding,
	isShowTime: {
		type: 'boolean',
		default: false,
	},
	...typographyAttributes( 'labelTypography', true ),
	...textShadowAttributes( 'labelTextShadow' ),
	...textStrokeAttributes( 'labelTextStroke', true ),
	...typographyAttributes( 'tickerTypography', true ),
	...textShadowAttributes( 'tickerTextShadow' ),
	...textStrokeAttributes( 'tickerTextStroke', true ),
	...globalAttributes,
};
export default attributes;
