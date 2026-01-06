import './style.css';
import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as linkAttributes } from '@Controls/link-control/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';

const attributes = {
	block_id: {
		type: 'string',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	headingTag: {
		type: 'string',
		default: 'h1',
	},
	heading: {
		type: 'string',
		source: 'text',
		selector: '.ablocks-notice-title',
		default: 'New Block Added',
	},
	isDismissible: {
		type: 'boolean',
		default: true,
	},
	textColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	backgroundColor: {
		type: 'string',
		default: '#EFEFF0',
		copyStyle: true,
	},
	noticeClose: {
		type: 'string',
		default: 'oneTime',
		copyStyle: true,
	},
	...iconPickerAttributes( 'icon', {
		path: 'M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z',
		viewBox: '0 0 512 512',
		className: 'far fa-window-close',
		size: 20,
	} ),

	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'typography', true ),
	...textShadowAttributes( 'textShadow' ),
	...linkAttributes( 'link' ),
	...textStrokeAttributes( 'textStroke', true ),
	...getDimensionsAttributes( 'noticeHeaderPadding', true ),
	...globalAttributes,
};
export default attributes;
