import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getTextShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getLinkAttributes } from '@Controls/link-control/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const iconSpace = getRangeAttributes( {
	attributeName: 'iconSpace',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 10,
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
	postId: {
		type: 'number',
		default: '',
	},
	// button's
	text: {
		type: 'string',
		default: 'Buy Now',
	},
	buttonType: {
		type: 'string',
		default: '#635bff',
		copyStyle: true,
	},
	buttonSize: {
		type: 'string',
		default: 'small',
		copyStyle: true,
	},
	textColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	textColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	background: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	backgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	transition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},
	iconPosition: {
		type: 'string',
		default: 'left',
		copyStyle: true,
	},
	// stripe's
	stripeAccount: {
		type: 'string',
		default: '',
	},
	itemName: {
		type: 'string',
		default: '',
	},
	sku: {
		type: 'string',
		default: '',
	},
	price: {
		type: 'number',
		default: 0,
	},
	currency: {
		type: 'string',
		default: '',
	},
	quantity: {
		type: 'number',
		default: '0',
	},
	shippingPrice: {
		type: 'number',
		default: 0,
	},
	hasTax: {
		type: 'boolean',
		default: false,
	},
	tax: {
		type: 'array',
		default: [],
	},
	taxId: {
		type: 'string',
		default: '',
	},
	isAmountFixed: {
		type: 'boolean',
		default: false,
	},
	isAutoRenewal: {
		type: 'boolean',
		default: true,
	},
	billingCycle: {
		type: 'string',
		default: 'M',
	},

	// adv options
	redirectionAfterPayment: {
		type: 'string',
		default: '',
	},
	openInNewTab: {
		type: 'boolean',
		default: true,
	},
	customMessage: {
		type: 'boolean',
		default: false,
	},
	errorMessage: {
		type: 'string',
		default: 'No payment method connected. Contact seller.',
	},

	...iconSpace,
	showIcon: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	...iconPickerAttributes( 'icon', {
		size: 16,
		className: 'fab fa-stripe',
		path: 'M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z',
		viewBox: '0 0 384 512',
		iconType: 'default',
	} ),
	...getLinkAttributes( 'link' ),
	...getAlignmentAttributes( 'position', true, {
		value: 'left',
	} ),
	...getAlignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...getTypographyAttributes( 'typography', true ),
	...getTextShadowAttributes( 'textShadow' ),
	...getDimensionsAttributes( 'padding', true ),
	...getBorderAttributes( 'border', true ),
	...getBoxShadowAttributes( 'boxShadow' ),
	...globalAttributes,
};

export default attributes;
