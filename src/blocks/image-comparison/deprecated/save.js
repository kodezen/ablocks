import React from 'react';
import SaveContainer from '@Components/block-container/save';
import metadata from './block.json';
import classNames from 'classnames';
import '../style.css';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;

	const {
		block_id,
		beforeImage,
		afterImage,
		sliderPosition,
		sliderOrientation,
		showLabels,
		beforeImageLabel,
		afterImageLabel,
		showHandle,
		moveOnHover,
		labelWithOverlay,
		labelOnHover,
	} = attributes;

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div
					className={ classNames( {
						'ablocks-image-comparison__images-container':
							sliderOrientation === 'horizontal',
						'ablocks-image-comparison__images-container-vertical':
							sliderOrientation === 'vertical',
					} ) }
					data-ablocks-slider-container
					data-ablocks-move-on-hover={ moveOnHover }
					data-ablocks-slider-orientation={ sliderOrientation }
				>
					<img
						className="ablocks-image-comparison__before-image"
						src={ beforeImage }
						alt="Before"
					/>
					<img
						className="ablocks-image-comparison__after-image"
						src={ afterImage }
						alt="After"
					/>
					<div className="ablocks-image-comparison__slider-line"></div>
					{ beforeImage && afterImage && showHandle && (
						<div className="ablocks-image-comparison__slider-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
								/>
							</svg>
						</div>
					) }
					<input
						type="range"
						className={ classNames(
							'ablocks-image-comparison__slider',
							{
								'ablocks-image-comparison__input--vertical':
									sliderOrientation === 'vertical',
							}
						) }
						min="0"
						max="100"
						defaultValue={ sliderPosition }
						data-ablocks-slider-input
					/>
					{ showLabels && beforeImage && afterImage && (
						<div
							className={ classNames(
								labelOnHover &&
									'ablocks-image-comparison__labels'
							) }
						>
							<div
								className={ classNames( {
									'ablocks-image-comparison__overlay':
										! labelOnHover && labelWithOverlay,
									'ablocks-image-comparison__overlay--hover':
										labelOnHover && labelWithOverlay,
								} ) }
							></div>
							<div
								className={ classNames(
									'ablocks-image-comparison__beforeImage-label',
									{
										'ablocks-image-comparison__beforeImage-label--horizontal':
											sliderOrientation === 'horizontal',
										'ablocks-image-comparison__beforeImage-label--vertical':
											sliderOrientation === 'vertical',
									}
								) }
							>
								{ beforeImageLabel }
							</div>
							<div
								className={ classNames(
									'ablocks-image-comparison__afterImage-label',
									{
										'ablocks-image-comparison__afterImage-label--horizontal':
											sliderOrientation === 'horizontal',
										'ablocks-image-comparison__afterImage-label--vertical':
											sliderOrientation === 'vertical',
									}
								) }
							>
								{ afterImageLabel }
							</div>
						</div>
					) }
				</div>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
