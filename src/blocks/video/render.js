import React from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import YoutubeIframe from '@Components/youtube-video';
import ABlocksVideoPlayer from '@Components/video-player';
import VimeoVideo from '@Components/vimeo-video';

const propTypes = {};

export default function Render( props ) {
	const { attributes } = props;
	const {
		block_id,
		videoSource,
		loop,
		mute,
		autoplay,
		videoUrl,
		selfHostedURL,
		externalLink,
		playerControl,
		downloadButton,
		vimeoURL,
		youtubeURL,
		privacyMode,
		introPortrait,
		introTitle,
		introByline,
		videoStartTime,
		videoEndTime,
		poster,
		preload,
	} = attributes;

	let renderVideo;

	if ( videoSource !== 'none' ) {
		switch ( videoSource ) {
			case 'youtube':
				renderVideo = (
					<YoutubeIframe
						block_id={ block_id }
						autoplay={ autoplay }
						mute={ mute }
						loop={ loop }
						youtubeURL={ youtubeURL }
						videoStartTime={ videoStartTime }
						videoEndTime={ videoEndTime }
						externalLink={ externalLink }
						selfHostedURL={ selfHostedURL }
						playerControl={ playerControl }
						downloadButton={ ! downloadButton }
						privacyMode={ privacyMode }
					/>
				);
				break;

			case 'selfHosted':
				renderVideo = (
					<ABlocksVideoPlayer
						block_id={ block_id }
						autoplay={ autoplay }
						mute={ mute }
						loop={ loop }
						poster={ poster }
						preload={ preload }
						videoUrl={ videoUrl }
						videoStartTime={ videoStartTime }
						videoEndTime={ videoEndTime }
						externalLink={ externalLink }
						selfHostedURL={ selfHostedURL }
						playerControl={ playerControl }
						downloadButton={ ! downloadButton }
					/>
				);
				break;

			case 'vimeo':
				renderVideo = (
					<VimeoVideo
						block_id={ block_id }
						autoplay={ autoplay }
						mute={ mute }
						loop={ loop }
						vimeoURL={ vimeoURL }
						privacyMode={ privacyMode }
						videoStartTime={ videoStartTime }
						introPortrait={ introPortrait }
						introTitle={ introTitle }
						introByline={ introByline }
						isBackground={ false }
					/>
				);
				break;

			default:
				renderVideo = undefined;
		}
	}
	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ {
					...attributes,
					className: 'ablocks-prevent-select',
				} }
			>
				{ renderVideo }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
