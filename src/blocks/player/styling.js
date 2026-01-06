import attributes from './attributes';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getYoutubePlayPauseButtonStyleCSS = ( attributes, device ) => {
	const css = {};
	if ( attributes?.youtubeUiColor ) {
		css[ '--plyr-color-main' ] = getTextColorCSS(
			attributes?.youtubeUiColor
		);
	}
	if ( attributes?.youtubePlayPauseIconSize ) {
		css[
			'--plyr-control-icon-size'
		] = `${ attributes?.youtubePlayPauseIconSize }px`;
	}
	return css;
};
export const getYoutubeProgressStyleCSS = ( attributes ) => {
	const css = {};
	if ( attributes?.youtubeProgressColor ) {
		css[ '--plyr-color-main' ] = getTextColorCSS(
			attributes?.youtubeProgressColor
		);
	}
	if ( attributes?.youtubeIconSize ) {
		css[
			'--plyr-control-icon-size'
		] = `${ attributes?.youtubeIconSize }px`;
	}
	if ( attributes?.playerbgColor ) {
		css[ '--plyr-video-controls-background' ] = getTextColorCSS(
			attributes?.playerbgColor
		);
		css.padding = '0';
	}
	return css;
};
export const getSelfVideoStyleCSS = ( attributes, device ) => {
	const css = {};
	if ( attributes?.selfVideoProgressUiColor ) {
		css[ '--plyr-color-main' ] = getTextColorCSS(
			attributes?.selfVideoProgressUiColor
		);
	}
	if ( attributes?.selfHostedPlayIconSize ) {
		css[
			'--plyr-control-icon-size'
		] = `${ attributes?.selfHostedPlayIconSize }px`;
	}
	if ( attributes?.selfVideobgColor ) {
		css[ '--plyr-video-controls-background' ] = getTextColorCSS(
			attributes?.selfVideobgColor
		);
		css.padding = '0';
	}
	return css;
};

export const getSelfHostControlStyleCSS = ( attributes, device ) => {
	const css = {};
	if ( attributes?.selfVideoUiColor ) {
		css[ '--plyr-color-main' ] = attributes?.selfVideoUiColor;
	}
	if ( attributes?.selfHostedIconSize ) {
		css[
			'--plyr-control-icon-size'
		] = `${ attributes?.selfHostedIconSize }px`;
	}
	return css;
};
export const getVimeoVideoStyleCSS = ( attributes, device ) => {
	const css = {};
	if ( attributes?.vimeoProgressUiColor ) {
		css[ '--plyr-color-main' ] = getTextColorCSS(
			attributes?.vimeoProgressUiColor
		);
	}
	if ( attributes?.vimeoPlayIconSize ) {
		css[
			'--plyr-control-icon-size'
		] = `${ attributes?.vimeoPlayIconSize }px`;
	}
	if ( attributes?.vimeobgColor ) {
		css[ '--plyr-video-controls-background' ] = getTextColorCSS(
			attributes?.vimeobgColor
		);
		css.padding = '0';
	}
	return css;
};

export const getVimeoPlayerControlStyleCSS = ( attributes, device ) => {
	const css = {};
	if ( attributes?.vimeoUiColor ) {
		css[ '--plyr-color-main' ] = getTextColorCSS(
			attributes?.vimeoUiColor
		);
	}
	if ( attributes?.vimeoIconSize ) {
		css[ '--plyr-control-icon-size' ] = `${ attributes?.vimeoIconSize }px`;
	}
	return css;
};
export const getPosterImage = ( attributes, device ) => {
	const css = {};
	if ( attributes?.posterImage ) {
		css[
			'background-image'
		] = `url(${ attributes.posterImage }) !important`;
	}
	css[ 'background-size' ] = 'cover';
	// css['background-image'] = 'var(--plyr-poster-image, none) !important';
	return css;
};
