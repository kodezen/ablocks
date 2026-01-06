import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	titleContentColor: {
		type: 'string',
		default: '',
	},
	titleContentColorH: {
		type: 'string',
		default: '',
	},
	detailsColor: {
		type: 'string',
		default: '',
	},
	detailsColorH: {
		type: 'string',
		default: '',
	},
	emailColor: {
		type: 'string',
		default: '',
	},
	emailColorH: {
		type: 'string',
		default: '',
	},
	...typographyAttributes( 'titleContentTypography', true ),
	...typographyAttributes( 'detailsTypography', true ),
	...typographyAttributes( 'emailTypography', true ),
	...globalAttributes,
};
export default attributes;
