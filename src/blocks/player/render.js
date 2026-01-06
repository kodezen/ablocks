import React, { useEffect, useRef } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import ABlocksPlayer from './player';
const propTypes = {};
const defaultProps = {};
import { getRenderDomElement } from '@Utils/helper';
import AudioPlayer from './Players/audio-player';
import SelfHostedPlayer from './Players/self-hosted-player';
import YoutubePlayer from './Players/youtube-player';
import VimeoPlayer from './Players/vimeo-player';

export default function Render( props ) {
	const { attributes } = props;
	const {
		block_id,
		videoSource,
		videoUrl,
		audioUrl,
		vimeoUrl,
		youtubeUrl,
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
						key={ `${ videoUrl }-${ videoStartTime }-${ videoEndTime }-${ autoplay }-${ mute }-${ loop }` }
						videoUrl={ videoUrl }
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
	useEffect( () => {
		let player;
		const element = getRenderDomElement(
			`.ablocks-block-${ block_id }.ablocks-block--player`
		);
		if ( element !== null ) {
			player = new ABlocksPlayer( element );
		}
		return () => {
			player?.destroy(); // Clean up the instance on unmount
		};
	}, [
		videoSource,
		videoUrl,
		youtubeUrl,
		vimeoUrl,
		videoStartTime,
		videoEndTime,
		autoplay,
		mute,
		loop,
	] );
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
Render.defaultProps = defaultProps;
