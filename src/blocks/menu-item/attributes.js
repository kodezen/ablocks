import { getAttribute as getLinkAttributes } from '@Controls/link-control/helper';
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	label: {
		type: 'string',
		default: 'Menu',
	},
	isSubMenu: {
		type: 'boolean',
		default: false,
	},
	hasMegaMenu: {
		type: 'boolean',
		default: false,
	},
	hasLink: {
		type: 'boolean',
		default: false,
	},
	link: {
		type: 'string',
		default: '#',
	},
	...getLinkAttributes( 'link' ),
};
export default attributes;
