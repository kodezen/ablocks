import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	tableWidth: {
		type: 'number',
		default: 100,
	},
	tableBackground: {
		type: 'string',
		default: '',
	},
	tableBackgroundH: {
		type: 'string',
		default: '',
	},
	tableColor: {
		type: 'string',
		default: '',
	},
	tableColorH: {
		type: 'string',
		default: '',
	},
	tableLastColorH: {
		type: 'string',
		default: '',
	},
	tableLastColor: {
		type: 'string',
		default: '',
	},
	tableLastBackground: {
		type: 'string',
		default: '',
	},
	tableLastBackgroundH: {
		type: 'string',
		default: '',
	},
	...alignmentAttributes( 'tableAlignment', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'firstTableTypography', true ),
	...typographyAttributes( 'lastTableTypography', true ),
	...globalAttributes,
};
export default attributes;
