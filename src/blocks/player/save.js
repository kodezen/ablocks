import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save2';
import YoutubePlayer from './Players/youtube-player';
import AudioPlayer from './Players/audio-player';
import SelfHostedPlayer from './Players/self-hosted-player';
import VimeoPlayer from './Players/vimeo-player';

const propTypes = {};
const defaultProps = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		videoSource,
		audioUrl,
		vimeoUrl,
		videoStartTime,
		videoEndTime,
		autoplay,
		mute,
		loop,
	} = attributes;
	let renderVideo;
	if ( videoSource !== 'none' ) {
		switch ( videoSource ) {
			case 'youtube':
				renderVideo = (
					<YoutubePlayer
						key={ `${ attributes.youtubeUrl }-${ videoStartTime }-${ videoEndTime }-${ autoplay }-${ mute }-${ loop }` }
						youtubeUrl={ attributes?.youtubeUrl }
						videoStartTime={ videoStartTime }
						videoEndTime={ videoEndTime }
						autoplay={ autoplay }
						mute={ mute }
						loop={ loop }
					/>
				);
				break;
			case 'audio':
				renderVideo = (
					<AudioPlayer
						key={ `${ audioUrl }-${ autoplay }-${ mute }-${ loop }` }
						audioUrl={ audioUrl }
						autoplay={ autoplay }
						mute={ mute }
						loop={ loop }
					/>
				);
				break;
			case 'selfHosted':
				renderVideo = (
					<SelfHostedPlayer
						key={ `${ attributes?.videoUrl }-${ videoStartTime }-${ videoEndTime }-${ autoplay }-${ mute }-${ loop }` }
						videoUrl={ attributes?.videoUrl }
						videoStartTime={ videoStartTime }
						videoEndTime={ videoEndTime }
						autoplay={ autoplay }
						mute={ mute }
						loop={ loop }
					/>
				);
				break;

			case 'vimeo':
				renderVideo = (
					<VimeoPlayer
						key={ `${ vimeoUrl }-${ autoplay }-${ mute }-${ loop }` }
						vimeoUrl={ vimeoUrl }
						autoplay={ autoplay }
						mute={ mute }
						loop={ loop }
					/>
				);
				break;
			default:
				renderVideo = null;
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
Save.defaultProps = defaultProps;
