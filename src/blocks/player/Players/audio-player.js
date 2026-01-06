import React from 'react';

const AudioPlayer = ( { audioUrl, autoplay, mute, loop } ) => {
	return (
		<div>
			<audio
				id="audio"
				controls
				autoPlay={ autoplay }
				muted={ mute }
				loop={ loop }
			>
				<source src={ audioUrl } type="audio/mp3" />
			</audio>
		</div>
	);
};

export default AudioPlayer;
