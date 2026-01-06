import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	qrValue: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	bgColor: {
		type: 'string',
		default: '#FFF',
		copyStyle: true,
	},
	qrLevel: {
		type: 'string',
		default: 'M',
		copyStyle: true,
	},
	fgColor: {
		type: 'string',
		default: '#000',
		copyStyle: true,
	},
	imageSrc: {
		type: 'string',
		default: '',
	},
	logoOpacity: {
		type: 'number',
		default: 0.6,
	},
	logoWidth: {
		type: 'number',
		default: 50,
	},
	logoHeight: {
		type: 'number',
		default: 50,
	},
	qrData: {
		type: 'object',
		default: {},
		copyStyle: true,
	},
	imagevalue: {
		type: 'object',
		default: {},
	},
	qrSize: {
		type: 'number',
		default: 250,
		copyStyle: true,
	},
	isImage: {
		type: 'boolean',
		default: false,
	},
	excavateValue: {
		type: 'boolean',
		default: false,
	},
	positionX: {
		type: 'number',
		default: 0,
	},
	positionY: {
		type: 'number',
		default: 0,
	},
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...globalAttributes,
};
export default attributes;
