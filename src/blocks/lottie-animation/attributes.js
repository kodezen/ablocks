import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';
import globalAttributes from '@Global/AdvancedSettings/attributes';

const attributes = {
	block_id: {
		type: 'string',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	asset_url: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	custom_url: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	uploaded_json: {
		type: 'object',
		default: '',
	},
	trigger: {
		type: 'string',
		default: 'viewport',
		copyStyle: true,
	},
	hoverArea: {
		type: 'string',
		default: 'animation',
		copyStyle: true,
	},
	onHoverOut: {
		type: 'string',
		default: 'nothing',
		copyStyle: true,
	},
	reverse: {
		type: 'bool',
		default: false,
		copyStyle: true,
	},
	loop: {
		type: 'bool',
		default: false,
		copyStyle: true,
	},
	animationSpeed: {
		type: 'number',
		default: 1,
		copyStyle: true,
	},
	...buttonGroupAttributes( 'animationSource', false, {
		value: 'upload',
	} ),
	...globalAttributes,
};
export default attributes;
