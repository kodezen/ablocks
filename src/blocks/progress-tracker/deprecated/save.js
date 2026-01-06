import React from 'react';
import CircleProgress from '../CircleProgress';
import SaveContainer from '@Components/block-container/save';
import metadata from './block.json';
const save = ( props ) => {
	const { attributes } = props;
	const {
		block_id,
		direction,
		isShowPercentage,
		layout,
		_position,
		circleProgressColor,
		circleBackgroundColor,
		circleSize,
		progressRelative,
		progressRelativeSelector,
	} = attributes;
	const { positionType } = _position;
	const absolutePosition =
		positionType === 'absolute' ? 'ablocks-block-progress--absolute' : '';
	const positionClass =
		layout === 'bar' && positionType === 'fixed'
			? 'ablocks-block-progress--fixed'
			: absolutePosition;
	const directionClass =
		direction === 'right'
			? 'ablocks-block-progress-bar-right'
			: 'ablocks-block-progress-bar-left';
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ {
					'data-layout': layout,
					'data-progress-relative': progressRelative,
					'data-progress-relative-selector': progressRelativeSelector,
					'data-direction': direction,
				} }
				className={ positionClass }
			>
				{ layout === 'circle' ? (
					<CircleProgress
						progress={ 0 }
						barColor={ circleProgressColor }
						trackColor={ circleBackgroundColor }
						isShowPercentage={ isShowPercentage }
						direction={ direction }
						circleSize={ circleSize }
					/>
				) : (
					<div
						className={ `ablocks-block-progress-bar-track ${ directionClass }` }
					>
						<div className="ablocks-block-progress-bar">
							{ isShowPercentage && (
								<span className="ablocks-block-progress__text">
									0%
								</span>
							) }
						</div>
					</div>
				) }
			</SaveContainer>
		</React.Fragment>
	);
};

export default save;
