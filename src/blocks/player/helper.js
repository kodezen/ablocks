export const videoSourceOption = [
	{
		label: 'Youtube',
		value: 'youtube',
	},
	{
		label: 'Audio',
		value: 'audio',
	},
	{
		label: 'Self hosted',
		value: 'selfHosted',
	},
	{
		label: 'Vimeo',
		value: 'vimeo',
	},
];
export function getYouTubeVideoId( url = '' ) {
	const match = url?.match(
		/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
	);
	return match ? match[ 1 ] : null;
}
export function getVimeoVideoId( url ) {
	const match = url?.match( /vimeo\.com\/(\d+)/ );
	return match && match[ 1 ];
}

export const handleStartAndEndTimeSelfHostedVideo = (
	videoStartTime,
	videoEndTime
) => {
	const formattedStartTime = videoStartTime || 0;
	const formattedEndTime = videoEndTime || '';

	let isVideoTimeSet;
	if ( formattedStartTime && formattedEndTime ) {
		isVideoTimeSet = `#t=${ formattedStartTime },${ formattedEndTime }`;
	} else {
		isVideoTimeSet = formattedStartTime ? `#t=${ formattedStartTime }` : '';
	}

	return isVideoTimeSet;
};
