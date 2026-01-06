import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { __ } from '@wordpress/i18n';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const spacingAttribute = getRangeAttributes( {
	attributeName: 'spacing',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const tabsWidthAttribute = getRangeAttributes( {
	attributeName: 'tabsWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 30,
	hasUnit: false,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const contentWidthAttribute = getRangeAttributes( {
	attributeName: 'contentWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 70,
	hasUnit: false,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const tabsGapAttribute = getRangeAttributes( {
	attributeName: 'tabsGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 10,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const contentGapAttribute = getRangeAttributes( {
	attributeName: 'contentGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 2,
	hasUnit: true,
	unitDefaultValue: 'px',
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
	className: {
		type: 'string',
		default: '',
	},
	tabIcons: {
		type: 'array',
		selector: 'svg.ablocks-svg-icon',
		source: 'query',
		query: {
			viewBox: {
				type: 'string',
				source: 'attribute',
				attribute: 'viewBox',
			},
			path: {
				type: 'string',
				selector: 'path',
				source: 'attribute',
				attribute: 'd',
			},
		},
		copyStyle: true,
	},
	tabIconsClasses: {
		type: 'array',
		default: [],
		copyStyle: true,
	},
	tabMenusBackgroundColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tabPositionChange: {
		type: 'boolean',
		default: false,
	},
	clickedTabIndex: {
		type: 'number',
		default: 0,
	},
	tabHeaders: {
		type: 'array',
		default: [
			__( 'Tab 1', 'ablocks' ),
			__( 'Tab 2', 'ablocks' ),
			__( 'Tab 3', 'ablocks' ),
		],
	},

	tabSubTitles: {
		// New attribute for subtitles
		type: 'array',
		default: [
			__(
				'Subtitle 1 Content: This tab provides general information about our company',
				'ablocks'
			),
			__(
				'Subtitle 2 Content: This tab provides general information about our company',
				'ablocks'
			),
			__(
				'Subtitle 3 Content: This tab provides general information about our company',
				'ablocks'
			),
		],
	},
	tabActive: {
		type: 'number',
		default: 0,
	},
	previousTotalBlock: {
		type: 'number',
		default: 3,
	},
	tabsMenuPosition: {
		type: 'string',
		default: 'left',
		copyStyle: true,
	},
	tabsMenuPositionTablet: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tabsMenuPositionMobile: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	initialOpen: {
		type: 'number',
		default: 1,
	},
	activeDuration: {
		type: 'number',
		default: 5000,
	},
	activeColorOptions: {
		type: 'string',
		default: 'background',
		copyStyle: true,
	},
	enableHoverSwitch: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	tabMenuAlign: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tabMenuAlignTablet: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tabMenuAlignMobile: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...tabsGapAttribute,
	menuContentAlign: {
		type: 'string',
		default: 'center',
		copyStyle: true,
	},
	menuContentAlignTablet: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	menuContentAlignMobile: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tabBackgroundColor: {
		type: 'string',
		default: '#F9F9F9',
		copyStyle: true,
	},
	contentBackgroundColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tabActiveBackgroundColor: {
		type: 'string',
		default: '#61CE70',
		copyStyle: true,
	},
	titleTextColor: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	titleTextActiveColor: {
		type: 'string',
		default: '#0A0909',
		copyStyle: true,
	},
	subTitleTextColor: {
		type: 'string',
		default: '#3A3A3A',
		copyStyle: true,
	},
	subTitleTextActiveColor: {
		type: 'string',
		default: '#3A3A3A',
		copyStyle: true,
	},
	contentBackgroundColor: {
		type: 'string',
		default: '#ffffff00',
		copyStyle: true,
	},
	activeBorderColor: {
		type: 'string',
		default: '#61CE70',
		copyStyle: true,
	},
	showTitle: {
		type: 'boolean',
		default: true,
	},
	showSubTitle: {
		type: 'boolean',
		default: false,
	},
	showActiveSubTitle: {
		type: 'boolean',
		default: false,
	},
	tabsChangingEffect: {
		type: 'string',
		default: 'default',
	},
	showIcon: {
		type: 'boolean',
		default: false,
	},
	progressBarColor: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	...spacingAttribute,
	...iconPickerAttributes( 'icon', {
		path: 'M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z',
		viewBox: '0 0 512 512',
		className: 'far fa-arrow-alt-circle-up',
		hasNoSelectorOrSource: true,
	} ),
	...buttonGroupAttributes( 'tabsMenuPositioning', true, {
		value: 'left',
	} ),
	...buttonGroupAttributes( 'tabsMenuDirection', true, {
		value: 'row',
	} ),
	...buttonGroupAttributes( 'tabsWidthType', true, {
		value: 'auto',
	} ),
	...buttonGroupAttributes( 'tabsContentWidthType', true, {
		value: 'auto',
	} ),
	...buttonGroupAttributes( 'tabWrap', true, {
		value: 'wrap',
	} ),
	...buttonGroupAttributes( 'iconPosition', true, {
		value: 'left',
	} ),
	...buttonGroupAttributes( 'tabMenuAlignment', true, {
		value: 'center',
	} ),
	...buttonGroupAttributes( 'menuContentAlignment', true, {
		value: 'center',
	} ),

	...getDimensionsAttributes( 'tabMenusPadding', true ),
	...getDimensionsAttributes( 'tabMenusMargin', true ),
	...getBorderAttributes( 'tabMenusBorder', true ),
	...getDimensionsAttributes( 'contentMargin', true ),
	...getDimensionsAttributes( 'iconPositionMargin', true ),
	...getTypographyAttributes( 'titleTypography', true ),
	...getTypographyAttributes( 'subTitleTypography', true ),
	...getDimensionsAttributes( 'menuContentPadding', true ),
	...getDimensionsAttributes( 'contentPadding', true ),
	...getBorderAttributes( 'menuContentBorder', true ),
	...getBorderAttributes( 'contentBorder', true ),
	...getBoxShadowAttributes( 'boxShadow' ),
	...globalAttributes,
};

export default attributes;
