import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getCSSFilterAttributes } from '@Controls/css-filter/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';

export const mapWidth = getRangeAttributes( {
	attributeName: 'mapWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	unitDefaultValue: '%',
	defaultValue: 100,
	copyStyle: true,
} );

export const mapHeight = getRangeAttributes( {
	attributeName: 'mapHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	unitDefaultValue: 'px',
	defaultValue: 500,
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
	mapMarkerList: {
		type: 'array',
		default: [
			{
				content: '',
				customIconHeight: 40,
				customIconUrl: '',
				customIconWidth: 25,
				iconType: 'default',
				id: 0,
				isDefault: true,
				isOpen: true,
				label: 'Jhenaidah',
				lat: '23.5433525',
				lng: '89.1696229',
				title: 'Jhenaidah',
			},
		],
		copyStyle: true,
	},
	mapZoom: {
		type: 'number',
		default: 10,
		copyStyle: true,
	},
	mapType: {
		type: 'string',
		default: 'GM',
		copyStyle: true,
	},
	...mapWidth,
	...mapHeight,
	scrollWheelZoom: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	centerIndex: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},
	iconHeight: {
		type: 'number',
		default: 40,
	},
	iconWidth: {
		type: 'number',
		default: 25,
	},
	...iconPickerAttributes( 'icon', {
		path: 'M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z',
		viewBox: '0 0 512 512',
		className: '',
		size: 20,
	} ),
	...globalAttributes,
	...getCSSFilterAttributes( 'cssFilter' ),
};
export default attributes;
