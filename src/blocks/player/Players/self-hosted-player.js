import React from 'react';
import PropTypes from 'prop-types';
import { handleStartAndEndTimeSelfHostedVideo } from '../helper';

const propTypes = {
	videoUrl: PropTypes.string,
};

const defaultProps = {
	videoUrl: '',
};

export default function SelfHostedPlayer( props ) {
	const { videoUrl, videoStartTime, videoEndTime, autoplay, mute, loop } =
		props;
	const getStartAndEndTime = handleStartAndEndTimeSelfHostedVideo(
		videoStartTime,
		videoEndTime
	);
	return (
		<div className="ablocks-block-selfhosted-container">
			<video
				id="selfHostedVideo"
				playsInline
				controls
				autoPlay={ autoplay }
				muted={ mute }
				loop={ loop }
			>
				<source
					src={ videoUrl + getStartAndEndTime }
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
		</div>
	);
}

SelfHostedPlayer.propTypes = propTypes;
SelfHostedPlayer.defaultProps = defaultProps;
