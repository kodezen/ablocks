import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as dimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as borderAttributes } from '@Controls/border/helper';

const badgeAttributes = {
	//badge starts
	badgeText: {
		type: 'string',
		default: 'Featured',
	},
	badgeSize: {
		type: 'string',
		default: 'xs',
		copyStyle: true,
	},
	badgeTextColor: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	badgeTextColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	badgeBackground: {
		type: 'string',
		default: '#DDDDDF',
		copyStyle: true,
	},
	badgeBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	badgeTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},

	//badge starts
	...alignmentAttributes( 'badgePosition', true, {
		value: 'top-right',
		valueTablet: 'top-right',
		valueMobile: 'top-right',
	} ),
	...alignmentAttributes( 'badgeAlignment', true, {
		value: 'center',
	} ),
	...typographyAttributes( 'badgeTypography', true, {
		fontFamily: 'Roboto',
		weight: '400',
		fontSize: '12',
	} ),
	...textShadowAttributes( 'badgeTextShadow' ),
	...dimensionsAttributes( 'badgePadding', true ),
	...borderAttributes( 'badgeBorder', true ),
};
export default badgeAttributes;
