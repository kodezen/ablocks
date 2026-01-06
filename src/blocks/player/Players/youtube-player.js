import React from 'react';
import { getYouTubeVideoId } from '../helper';

const YoutubePlayer = ( {
	youtubeUrl,
	videoStartTime,
	videoEndTime,
	autoplay,
	mute,
	loop,
} ) => {
	const videoID = getYouTubeVideoId( youtubeUrl );
	return (
		<div className="ablocks-block-youtube-container">
			<div
				id="youtube"
				data-plyr-provider="youtube"
				data-plyr-embed-id={ videoID }
				data-video-start-time={ videoStartTime ? videoStartTime : 0 }
				data-video-end-time={ videoEndTime ? videoEndTime : '' }
				data-autoplay={ autoplay }
				data-mute={ mute }
				data-loop={ loop }
			></div>
		</div>
	);
};

export default YoutubePlayer;
