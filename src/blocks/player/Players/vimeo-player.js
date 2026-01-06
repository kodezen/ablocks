import { getVimeoVideoId } from '../helper';

const VimeoPlayer = ( { vimeoUrl, autoplay, mute, loop } ) => {
	// Extract the video ID from the provided URL
	const vimeoVideoId = getVimeoVideoId( vimeoUrl );

	return (
		<div className="ablocks-block-vimeo-container">
			<div
				id="vimeo"
				data-plyr-provider="vimeo"
				data-plyr-embed-id={ vimeoVideoId }
				data-autoplay={ autoplay }
				data-mute={ mute }
				data-loop={ loop }
			></div>
		</div>
	);
};

export default VimeoPlayer;
