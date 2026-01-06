import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import badgeAttributes from './components/badge/attributes';
import btnAttributes from './components/button/attributes';
import headingAttributes from './components/heading/attributes';
import iconAttributes from './components/icon/attributes';
import desAttributes from './components/description/attributes';
import ratingAttributes from './components/star-rating/attributes';
import subHeadingAttributes from './components/sub-heading/attributes';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const iconGap = getRangeAttributes( {
	attributeName: 'iconGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 16,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const contentGap = getRangeAttributes( {
	attributeName: 'contentGap',
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
	blockElements: {
		type: 'array',
		default: [
			{
				id: 0,
				slug: 'heading',
			},
			{
				id: 1,
				slug: 'sub-heading',
			},
			{
				id: 2,
				slug: 'description',
			},
			{
				id: 3,
				slug: 'rating',
			},
			{
				id: 4,
				slug: 'button',
			},
		],
	},
	...iconGap,
	...contentGap,
	allowBadgeHover: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	allowButtonHover: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	allowBadge: {
		type: 'boolean',
		default: false,
	},
	allowIcon: {
		type: 'boolean',
		default: true,
	},
	allowHeading: {
		type: 'boolean',
		default: true,
	},
	allowSubHeading: {
		type: 'boolean',
		default: false,
	},
	allowDes: {
		type: 'boolean',
		default: true,
	},
	allowRating: {
		type: 'boolean',
		default: false,
	},
	allowButton: {
		type: 'boolean',
		default: true,
	},
	//badge
	...badgeAttributes,

	//icon
	...iconAttributes,

	// heading
	...headingAttributes,

	// sub heading
	...subHeadingAttributes,

	// paragraph
	...desAttributes,

	//button
	...btnAttributes,

	//star rating
	...ratingAttributes,

	...alignmentAttributes( 'alignment', true ),
	stack: {
		type: 'string',
		default: '',
	},
	...buttonGroupAttributes( 'iconPlacement', true, {
		value: '',
	} ),

	...globalAttributes,
};
export default attributes;
