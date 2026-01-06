import CircleProgress from './CircleProgress';

const ProgressTracker = ( { attributes } ) => {
	const {
		direction,
		isShowPercentage,
		layout,
		circleSize,
		circleBackgroundColor,
		circleProgressColor,
	} = attributes;

	const directionClass =
		direction === 'right'
			? 'ablocks-block-progress-bar-right'
			: 'ablocks-block-progress-bar-left';

	return (
		<>
			{ layout === 'circle' && (
				<CircleProgress
					barColor={ circleProgressColor }
					trackColor={ circleBackgroundColor }
					isShowPercentage={ isShowPercentage }
					circleSize={ circleSize }
				/>
			) }
			{ layout === 'bar' && (
				<div
					className={ `ablocks-block-progress-bar-track ${ directionClass }` }
				>
					<div
						className="ablocks-block-progress-bar"
						style={ { width: '20%' } }
					>
						{ isShowPercentage && (
							<span className="ablocks-block-progress__text">
								{ ' ' }
							</span>
						) }
					</div>
				</div>
			) }
		</>
	);
};

export default ProgressTracker;
