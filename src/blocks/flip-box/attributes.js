import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBackgroundAttribute } from '@Controls/background/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const transitionSpeed = getRangeAttributes( {
	attributeName: 'transitionSpeed',
	attributeObjectKey: 'value',
	defaultValue: 0.6,
	copyStyle: true,
	unitDefaultValue: 's',
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	...transitionSpeed,

	...buttonGroupAttributes( 'flipDirection', false, {
		value: 'left',
	} ),
	...buttonGroupAttributes( 'showSide', false, {
		value: 'front',
	} ),
	...getBorderAttributes( 'cardBorder', true ),
	...getBackgroundAttribute( 'frontCardBackground', true ),
	...getBackgroundAttribute( 'backCardBackground', true ),
	...getDimensionsAttributes( 'frontPadding', true ),
	...getDimensionsAttributes( 'backPadding', true ),
	...globalAttributes,
};
export default attributes;
