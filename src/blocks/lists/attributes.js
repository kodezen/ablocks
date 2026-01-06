import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as dimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const iconSize = getRangeAttributes( {
	attributeName: 'iconSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 20,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const textIndent = getRangeAttributes( {
	attributeName: 'textIndent',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 8,
	defaultValueTablet: 8,
	defaultValueMobile: 8,
	copyStyle: true,
} );

export const spaceBetween = getRangeAttributes( {
	attributeName: 'spaceBetween',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 20,
	defaultValueTablet: 20,
	defaultValueMobile: 20,
	copyStyle: true,
} );
export const width = getRangeAttributes( {
	attributeName: 'width',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const weight = getRangeAttributes( {
	attributeName: 'weight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 5,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const markerSize = getRangeAttributes( {
	attributeName: 'markerSize',
	attributeObjectKey: 'value',
	defaultValue: 10,
	defaultValueMobile: 10,
	defaultValueTablet: 10,
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
	markerType: {
		type: 'string',
		default: 'icon',
		copyStyle: true,
	},
	markerColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...markerSize,
	emoji: {
		type: 'string',
		default: '✍',
		copyStyle: true,
	},
	iconColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	lists: {
		type: 'array',
		default: [
			{
				id: 0,
				text: '',
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
				iconColor: '',
				textColor: '',
				markerColor: '',
				isOpen: false,
			},
		],
	},
	listIconsClasses: {
		type: 'array',
		default: [],
		copyStyle: true,
	},
	listIcons: {
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
	iconType: {
		type: 'string',
		default: 'default',
		copyStyle: true,
	},
	iconShape: {
		type: 'string',
		default: 'circle',
		copyStyle: true,
	},
	...iconSize,
	iconBackground: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	iconBackgroundColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	textColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	...textIndent,
	...spaceBetween,

	belowItem: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},
	divider: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	dividerPatternUrl: {
		type: 'string',
		default: 'solid',
		copyStyle: true,
	},
	...width,
	...weight,
	borderColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	...getAlignmentAttributes( 'position', true, {
		value: 'center',
	} ),
	...getAlignmentAttributes( 'horizontalAlignment', true, {
		value: 'flex-start',
	} ),
	...buttonGroupAttributes( 'stack', false, {
		value: 'vertical',
	} ),
	...buttonGroupAttributes( 'verticalAlignmentment', false, {
		value: 'flex-start',
	} ),
	...dimensionsAttributes( 'padding', false ),
	...getBorderAttributes( 'border', true ),
	...typographyAttributes( 'typography', true ),
	...globalAttributes,
};
export default attributes;
