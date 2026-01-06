import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';

export const boxSizeAttribute = getRangeAttributes( {
	attributeName: 'boxSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 130,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const boxRowGapAttribute = getRangeAttributes( {
	attributeName: 'boxRowGap',
	isResponsive: true,
	attributeObjectKey: 'value',
	defaultValue: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const boxColumGapAttribute = getRangeAttributes( {
	attributeName: 'boxColumnGap',
	isResponsive: true,
	attributeObjectKey: 'value',
	defaultValue: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const numberAndLabelGapAttribute = getRangeAttributes( {
	attributeName: 'numberAndLabelGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 5,
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
	...alignmentAttributes( 'alignment', true, {
		value: 'center',
	} ),
	targetTime: {
		type: 'string',
		default: '',
		// copyStyle: true,
	},
	// flex direction start
	direction: {
		type: 'string',
		default: 'row',
		copyStyle: true,
	},
	directionTablet: {
		type: 'string',
		default: 'row',
		copyStyle: true,
	},
	directionMobile: {
		type: 'string',
		default: 'row',
		copyStyle: true,
	},
	// flex direction end
	// flex 'justify content' start
	justify: {
		type: 'string',
		default: 'center',
		copyStyle: true,
	},
	justifyTablet: {
		type: 'string',
		default: 'center',
		copyStyle: true,
	},
	justifyMobile: {
		type: 'string',
		default: 'center',
		copyStyle: true,
	},
	// flex 'justify content' end

	// flex 'align items" start
	align: {
		type: 'string',
		default: 'stretch',
		copyStyle: true,
	},
	alignTablet: {
		type: 'string',
		default: 'stretch',
		copyStyle: true,
	},
	alignMobile: {
		type: 'string',
		default: 'stretch',
		copyStyle: true,
	},

	//wrap start
	wrap: {
		type: 'string',
		default: 'wrap',
		copyStyle: true,
	},
	wrapTablet: {
		type: 'string',
		default: 'wrap',
		copyStyle: true,
	},
	wrapMobile: {
		type: 'string',
		default: 'wrap',
		copyStyle: true,
	},
	showDay: {
		type: 'bool',
		default: true,
	},
	showHour: {
		type: 'bool',
		default: true,
	},
	showMinute: {
		type: 'bool',
		default: true,
	},
	showSecond: {
		typ: 'bool',
		default: true,
	},
	dayLabel: {
		type: 'string',
		default: 'Days',
	},
	hourLabel: {
		type: 'string',
		default: 'Hours',
	},
	minuteLabel: {
		type: 'string',
		default: 'Minutes',
	},
	secondLabel: {
		type: 'string',
		default: 'Seconds',
	},

	isAction: {
		type: 'bool',
		default: true,
		copyStyle: true,
	},

	action: {
		type: 'string',
		default: 'none',
		copyStyle: true,
	},
	actionMessage: {
		type: 'string',
		default: 'Time Expire',
		copyStyle: true,
	},
	actionMessageColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	...typographyAttributes( 'actionMessageTypography', true ),
	actionRedirectURL: {
		type: 'string',
		default: '',
		copyStyle: true,
	},

	labelPosition: {
		type: 'string',
		default: 'column',
		copyStyle: true,
	},

	...boxSizeAttribute,
	...numberAndLabelGapAttribute,
	boxBackgroundColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...boxRowGapAttribute,
	...boxColumGapAttribute,
	...getBorderAttributes( 'boxBorder', true ),
	...getBoxShadowAttributes( 'boxShadow', true ),
	labelColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	showLabels: {
		type: 'bool',
		default: true,
		copyStyle: true,
	},
	labelBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...typographyAttributes( 'labelTypography', true ),

	numberColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	numberBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...typographyAttributes( 'numberTypography', true ),
	showSeparator: {
		type: 'bool',
		default: true,
		copyStyle: true,
	},

	separatorColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	...typographyAttributes( 'separatorTypography', true ),
	...buttonGroupAttributes( 'separator', false, {
		value: ':',
	} ),
	...buttonGroupAttributes( 'orient', true, {
		value: 'row',
	} ),
	...buttonGroupAttributes( 'justificationAlign', true, {
		value: 'center',
	} ),
	...buttonGroupAttributes( 'alignment', true, {
		value: 'stretch',
	} ),
	...buttonGroupAttributes( 'wrapping', true, {
		value: 'wrap',
	} ),
	...getDimensionsAttributes( 'padding', true ),

	...globalAttributes,
};
export default attributes;
