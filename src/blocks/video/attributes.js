import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as cssFilterAttributes } from '@Controls/css-filter/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	videoSource: {
		type: 'string',
		default: 'youtube',
	},
	videoStartTime: {
		type: 'number',
		default: 0,
	},
	videoEndTime: {
		type: 'number',
		default: 0,
	},
	videoUrl: {
		type: 'string',
		default: '',
	},
	selfHostedURL: {
		type: 'string',
		default: '',
	},
	externalLink: {
		type: 'boolean',
		default: false,
	},
	autoplay: {
		type: 'boolean',
		default: false,
	},
	mute: {
		type: 'boolean',
		default: false,
	},
	loop: {
		type: 'boolean',
		default: false,
	},
	playerControl: {
		type: 'boolean',
		default: true,
	},
	downloadButton: {
		type: 'boolean',
		default: false,
	},
	vimeoURL: {
		type: 'string',
		default: 'https://vimeo.com/1034907087',
	},
	youtubeURL: {
		type: 'string',
		default:
			'https://www.youtube.com/watch?v=oh0NDa_oVuI&ab_channel=aBlocks',
	},
	privacyMode: {
		type: 'boolean',
		default: false,
	},
	introTitle: {
		type: 'boolean',
		default: true,
	},
	introPortrait: {
		type: 'boolean',
		default: true,
	},
	introByline: {
		type: 'boolean',
		default: true,
	},
	poster: {
		type: 'string',
		default: '',
	},
	preload: {
		type: 'string',
		default: 'metadata',
	},
	aspectRatio: {
		type: 'string',
		default: '1.77777',
		copyStyle: true,
	},
	...cssFilterAttributes( 'cssFilter' ),
	...globalAttributes,
};
export default attributes;
