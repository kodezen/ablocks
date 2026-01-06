import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save2';
import ABlocksVideoPlayer from '@Components/video-player';
import YoutubeIframe from '@Components/youtube-video';
import VimeoVideo from '@Components/vimeo-video';

const propTypes = {};

export default function Save( props ) {
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
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ renderVideo }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
