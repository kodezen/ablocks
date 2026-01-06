import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';

export const headingTransition = getRangeAttributes( {
	attributeName: 'headingTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );

export const listTransition = getRangeAttributes( {
	attributeName: 'listTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const tabTransition = getRangeAttributes( {
	attributeName: 'tabTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	course_id: {
		type: 'number',
		default: 0,
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	headingColor: {
		type: 'string',
		default: '#111',
	},
	headingColorH: {
		type: 'string',
		default: '#111',
	},
	listColor: {
		type: 'string',
		default: '#999',
	},
	listColorH: {
		type: 'string',
		default: '#999',
	},
	tabColor: {
		type: 'string',
		default: '#999',
	},
	tabColorH: {
		type: 'string',
		default: '#999',
	},
	...listTransition,
	...headingTransition,
	...tabTransition,
	...typographyAttributes( 'headingTypography', true ),
	...typographyAttributes( 'listTypography', true ),
	...typographyAttributes( 'tabTypography', true ),
	...getDimensionsAttributes( 'listMargin', true ),
	...getBorderAttributes( 'listBorder', true ),
	...globalAttributes,
};
export default attributes;
