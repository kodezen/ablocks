import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const youtubeIconSize = getRangeAttributes( {
	attributeName: 'youtubeIconSize',
	isResponsive: false,
	defaultValue: 20,
	copyStyle: true,
} );
export const youtubePlayPauseIconSize = getRangeAttributes( {
	attributeName: 'youtubePlayPauseIconSize',
	isResponsive: false,
	defaultValue: 20,
	copyStyle: true,
} );
export const selfHostedIconSize = getRangeAttributes( {
	attributeName: 'selfHostedIconSize',
	isResponsive: false,
	defaultValue: 20,
	copyStyle: true,
} );
export const selfHostedPlayIconSize = getRangeAttributes( {
	attributeName: 'selfHostedPlayIconSize',
	isResponsive: false,
	defaultValue: 20,
	copyStyle: true,
} );
export const vimeoIconSize = getRangeAttributes( {
	attributeName: 'vimeoIconSize',
	isResponsive: false,
	defaultValue: 20,
	copyStyle: true,
} );
export const vimeoPlayIconSize = getRangeAttributes( {
	attributeName: 'vimeoPlayIconSize',
	isResponsive: false,
	defaultValue: 20,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	...youtubeIconSize,
	...youtubePlayPauseIconSize,
	...selfHostedIconSize,
	...selfHostedPlayIconSize,
	...vimeoIconSize,
	...vimeoPlayIconSize,
	videoSource: {
		type: 'string',
		default: 'youtube',
	},
	youtubeUrl: {
		type: 'string',
		default: 'https://www.youtube.com/watch?v=Yu0HH5S-8RY&t=1s',
		copyStyle: true,
	},
	selfHostedUrl: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	videoUrl: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	audioUrl: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	vimeoUrl: {
		type: 'string',
		default: 'https://vimeo.com/889428749',
		copyStyle: true,
	},
	videoStartTime: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	videoEndTime: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	youtubeUiColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	youtubeProgressColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	playerbgColor: {
		type: 'string',
		default: '#0077CC',
		copyStyle: true,
	},
	selfVideoUiColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	selfVideoProgressUiColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	selfVideobgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	vimeoUiColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	vimeoProgressUiColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	vimeobgColor: {
		type: 'string',
		default: '',
	},
	posterImage: {
		type: 'string',
		default: '',
		copyStyle: true,
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
	...globalAttributes,
};
export default attributes;
