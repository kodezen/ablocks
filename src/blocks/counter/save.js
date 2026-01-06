import React from 'react';
import SaveContainer from '@Components/block-container/save2';
import RenderIcon from '@Controls/icon-upload/render-icon';
import metadata from './block.json';
const propTypes = {};
import { RichText } from '@wordpress/block-editor';

export default function Save( props ) {
	const { attributes } = props;
	const {
		barHeadingPosition,
		startNumber,
		endNumber,
		duration,
		animationRepeat,
		counterPrefix,
		counterSuffix,
		decimalPlaces,
		separator,
		isShowIcon,
		layout,
		counterTitle,
		block_id,
		mediaPosition,
		totalNumber,

		circleSize,
	} = attributes;

	const title = (
		<RichText.Content
			tagName="div"
			value={ counterTitle }
			className="ablocks-counter__text"
		/>
	);
	const media = isShowIcon && (
		<div className="ablocks-counter__icon">
			<RenderIcon attributes={ attributes } />
		</div>
	);

	const content = (
		<div className="ablocks-counter__content">
			<span className="ablocks-counter__content-prefix">
				{ counterPrefix }
			</span>
			<span className="ablocks-counter__content-number">
				{ startNumber }
			</span>
			<span className="ablocks-counter__content-suffix">
				{ counterSuffix }
			</span>
		</div>
	);
	const number = (
		<React.Fragment>
			{ mediaPosition === 'top' && media }
			{ content }
			{ title }
			{ mediaPosition === 'bottom' && media }
		</React.Fragment>
	);
	const circleRadius = circleSize / 2; // Adjust radius based on the size with padding
	const circumference = 2 * Math.PI * circleRadius;
	const circle = (
		<div className="ablocks-circle-counter__outer">
			<div className="ablocks-circle-counter__inner">{ number }</div>
			<svg
				className="ablocks-circle-counter__svg"
				width={ circleSize }
				height={ circleSize }
				style={ { rotate: '-90deg' } }
			>
				<circle
					className="ablocks-circle-counter__background"
					cx={ circleSize / 2 }
					cy={ circleSize / 2 }
					r={ circleRadius }
					strokeWidth="10"
					fill="none"
					strokeDasharray={ circumference }
				/>
				<circle
					className="ablocks-circle-counter__progress"
					cx={ circleSize / 2 }
					cy={ circleSize / 2 }
					r={ circleRadius }
					strokeWidth="10"
					fill="none"
					strokeDasharray={ circumference }
					strokeDashoffset={ circumference }
				/>
			</svg>
		</div>
	);
	const startWidth = ( startNumber / totalNumber ) * 100;

	const bar = (
		<div className="ablocks-bar-counter__background">
			<div
				className="ablocks-bar-counter__progress"
				style={ { width: `${ startWidth }%` } }
			>
				{ barHeadingPosition === 'inner' && title }
				{ content }
			</div>
		</div>
	);
	const counterOptions = { number, circle, bar };
	const dataProps = {
		'data-start': startNumber.toString(),
		'data-end': endNumber.toString(),
		'data-total': totalNumber.toString(),
		'data-duration': duration,
		'data-separator': separator,
		'data-decimalPlaces': decimalPlaces,
		'data-circleSize': circleSize,
		'data-layout': layout,
		'data-animationRepeat': animationRepeat,
	};
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ {
					...dataProps,
				} }
				className={ `ablocks-block--counter--${ layout }` }
			>
				{ layout === 'number' && (
					<>
						{ mediaPosition === 'leftOfNumber' && media }
						<div className="ablocks-counter__content-text-wrapper">
							{ layout === 'bar' && title }
							{ counterOptions[ layout ] }
						</div>
						{ mediaPosition === 'rightOfNumber' && media }
					</>
				) }
				{ layout === 'circle' && (
					<>
						{ layout === 'bar' && title }
						{ counterOptions[ layout ] }
					</>
				) }
				{ layout === 'bar' && (
					<>
						{ layout === 'bar' &&
							barHeadingPosition === 'top' &&
							title }
						{ counterOptions[ layout ] }

						{ layout === 'bar' &&
							barHeadingPosition === 'bottom' &&
							title }
					</>
				) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
