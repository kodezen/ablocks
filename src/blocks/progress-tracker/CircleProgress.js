import './style.css';

const CircleProgress = ( {
	barColor,
	trackColor,
	isShowPercentage,
	circleSize,
} ) => {
	const circleRadius = circleSize / 2;
	const circumference = 2 * Math.PI * circleRadius;

	return (
		<div className="ablocks-block-progress-circle">
			<div className="ablocks-block-progress-circle__wrapper">
				<svg
					className="ablocks-block-progress-circle__svg"
					width={ circleSize }
					height={ circleSize }
					style={ { rotate: '-90deg' } }
				>
					<circle
						className="ablocks-block-progress-circle__svg-track"
						cx={ circleSize / 2 }
						cy={ circleSize / 2 }
						r={ circleRadius }
						stroke={ trackColor }
						strokeWidth="10"
						fill="none"
						strokeDasharray={ circumference }
					/>
					<circle
						className="ablocks-block-progress-circle__svg-bar"
						cx={ circleSize / 2 }
						cy={ circleSize / 2 }
						r={ circleRadius }
						stroke={ barColor }
						strokeWidth="10"
						fill="none"
						strokeDasharray={ circumference }
						strokeDashoffset={ circumference }
					/>
				</svg>
				{ isShowPercentage && (
					<div className="ablocks-block-progress__text">0%</div>
				) }
			</div>
		</div>
	);
};

export default CircleProgress;
