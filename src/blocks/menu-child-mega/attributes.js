import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
export const positionX = getRangeAttributes( {
	attributeName: 'positionX',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	copyStyle: true,
} );
export const width = getRangeAttributes( {
	attributeName: 'width',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	unitDefaultValue: '%',
	hasUnit: true,
	copyStyle: true,
} );
export const height = getRangeAttributes( {
	attributeName: 'height',
	attributeObjectKey: 'value',
	isResponsive: true,
	unitDefaultValue: 'px',
	hasUnit: true,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	...positionX,
	...width,
	...height,
};
export default attributes;
