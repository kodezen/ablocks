import React, { useEffect, useRef, useState } from 'react';
// import RenderContainer from '@Components/block-container/render';
import RenderContainer from '@Components/block-container/render2';
import metadata from './block.json';
import {
	MediaPlaceholder,
	MediaReplaceFlow,
	BlockControls,
} from '@wordpress/block-editor';
import { Button, Notice, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import classNames from 'classnames';
import { handleSelectImage } from './utils';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		beforeImage,
		afterImage,
		sliderPosition,
		sliderOrientation,
		showLabels,
		beforeImageLabel,
		afterImageLabel,
		swapImages,
		showHandle,
		moveOnHover,
		labelWithOverlay,
		labelOnHover,
	} = attributes;

	const {
		isDynamicEnabled: isDynamicBeforeImageLabel,
		data: dynamicBeforeImageLabel,
	} = useDynamicData( {
		attributeValue: beforeImageLabel,
	} );

	const {
		isDynamicEnabled: isDynamicAfterImageLabel,
		data: dynamicAfterImageLabel,
	} = useDynamicData( {
		attributeValue: afterImageLabel,
	} );

	const [ leftImageLoading, setLeftImageLoading ] = useState( false );
	const [ rightImageLoading, setRightImageLoading ] = useState( false );
	const [ showBalanceMessage, setShowBalanceMessage ] = useState( false );
	const [ loading, setLoading ] = useState( false );
	const [ balanceStatus, setBalanceStatus ] = useState( '' );

	const onSelectImage1 = ( mediaValue ) => {
		setLeftImageLoading( true );
		if ( ! mediaValue.url.includes( 'blob' ) ) {
			setAttributes( { beforeImage: mediaValue.url } );
			setLeftImageLoading( false );
		}
	};

	const onSelectImage2 = ( mediaValue ) => {
		setRightImageLoading( true );
		if ( ! mediaValue.url.includes( 'blob' ) ) {
			setAttributes( { afterImage: mediaValue.url } );
			setRightImageLoading( false );
		}
	};

	const handleSliderChange = ( e ) => {
		setAttributes( { sliderPosition: parseInt( e.target.value, 10 ) } );
	};

	// Show message to balance images
	useEffect( () => {
		if ( beforeImage && afterImage ) {
			// check if images have different dimensions
			const beforeImg = new window.Image();
			beforeImg.src = beforeImage;
			const afterImg = new window.Image();
			afterImg.src = afterImage;

			beforeImg.onload = () => {
				afterImg.onload = () => {
					if (
						beforeImg.width !== afterImg.width ||
						beforeImg.height !== afterImg.height
					) {
						setShowBalanceMessage( true );
					}
				};
			};
		}
	}, [ beforeImage, afterImage ] );

	// Handle when user chooses to balance images
	const handleBalanceImages = () => {
		// loading true & handleSelectImage
		setShowBalanceMessage( false );
		setLoading( true );
		handleSelectImage(
			afterImage,
			beforeImage,
			( url ) => {
				setAttributes( { afterImage: url } );
			},
			setBalanceStatus,
			setLoading
		);
	};

	// Handle when user chooses not to balance images
	const handleSkipBalance = () => {
		setShowBalanceMessage( false );
	};

	// Swap image
	useEffect( () => {
		setAttributes( {
			beforeImage: afterImage,
			afterImage: beforeImage,
		} );
	}, [ swapImages ] );

	// handle move with mouse move
	const sliderRef = useRef( null );
	const sliderContainerRef = useRef( null );

	useEffect( () => {
		const slider = sliderRef.current;
		const sliderContainer = sliderContainerRef.current;

		if ( moveOnHover && slider && sliderContainer ) {
			const handleMouseMove = ( e ) => {
				let newValue;
				if ( sliderOrientation === 'horizontal' ) {
					const rect = sliderContainer.getBoundingClientRect();
					const offsetX = e.clientX - rect.left;
					newValue = Math.round( ( offsetX / rect.width ) * 100 );
				} else {
					const rect = sliderContainer.getBoundingClientRect();
					const offsetY = e.clientY - rect.top;
					newValue = Math.round( ( offsetY / rect.height ) * 100 );
				}

				newValue = Math.max( 0, Math.min( 100, newValue ) );

				setAttributes( { sliderPosition: newValue } );
			};

			slider.addEventListener( 'mousemove', handleMouseMove );

			return () => {
				slider.removeEventListener( 'mousemove', handleMouseMove );
			};
		}
	}, [ sliderOrientation, moveOnHover ] );

	return (
		<React.Fragment>
			<BlockControls group="other">
				<MediaReplaceFlow
					name={
						<span className="ablocks-icon ablocks-icon--left-image"></span>
					}
					mediaURL={ beforeImage }
					allowedTypes={ [ 'image' ] }
					accept="image/*"
					onSelect={ onSelectImage1 }
				/>
				<MediaReplaceFlow
					name={
						<span className="ablocks-icon ablocks-icon--right-image"></span>
					}
					mediaURL={ afterImage }
					allowedTypes={ [ 'image' ] }
					accept="image/*"
					onSelect={ onSelectImage2 }
				/>
			</BlockControls>

			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ showBalanceMessage && (
					<Notice status="info" isDismissible={ false }>
						<p>
							{ __(
								'The images have different dimensions. Would you like to balance them?',
								'ablocks'
							) }
						</p>
						<Button isPrimary onClick={ handleBalanceImages }>
							{ __( 'Balance Images', 'ablocks' ) }
						</Button>
						<Button isSecondary onClick={ handleSkipBalance }>
							{ __( 'Skip', 'ablocks' ) }
						</Button>
					</Notice>
				) }
				{ ! showBalanceMessage && balanceStatus === 'error' && (
					<Notice status="error" isDismissible={ false }>
						<p>
							{ __(
								'An error occurred while balancing the images. Please try again.',
								'ablocks'
							) }
						</p>
						<Button isPrimary onClick={ handleBalanceImages }>
							{ __( 'Try Again', 'ablocks' ) }
						</Button>
						<Button isSecondary onClick={ handleSkipBalance }>
							{ __( 'Cancel', 'ablocks' ) }
						</Button>
					</Notice>
				) }
				{ loading ? (
					<Spinner />
				) : (
					<div
						className={ classNames(
							sliderOrientation === 'horizontal' &&
								'ablocks-image-comparison__images-container',
							sliderOrientation === 'vertical' &&
								'ablocks-image-comparison__images-container-vertical'
						) }
						ref={ sliderContainerRef }
					>
						{ /* Left/ Top image */ }
						{ leftImageLoading ? (
							<Spinner />
						) : (
							<>
								{ beforeImage ? (
									<img
										className="ablocks-image-comparison__before-image"
										src={ beforeImage }
										alt="Before"
									/>
								) : (
									<MediaPlaceholder
										icon="format-image"
										labels={ {
											title: __(
												'Before Image',
												'ablocks'
											),
											instructions: __(
												'Drag an image, upload a new one or select a file from your library.',
												'ablocks'
											),
										} }
										onSelect={ ( mediaValue ) =>
											onSelectImage1( mediaValue )
										}
										accept="image/*"
										allowedTypes={ [ 'image' ] }
									/>
								) }
							</>
						) }

						{ /* right/bottom image */ }
						{ rightImageLoading ? (
							<Spinner />
						) : (
							<>
								{ afterImage ? (
									<img
										className="ablocks-image-comparison__after-image"
										src={ afterImage }
										alt="After"
									/>
								) : (
									<MediaPlaceholder
										icon="format-image"
										labels={ {
											title: __(
												'After Image',
												'ablocks'
											),
											instructions: __(
												'Drag an image, upload a new one or select a file from your library.',
												'ablocks'
											),
										} }
										onSelect={ ( mediaValue ) =>
											onSelectImage2( mediaValue )
										}
										accept="image/*"
										allowedTypes={ [ 'image' ] }
									/>
								) }
							</>
						) }

						{ /* slider line */ }
						{ beforeImage && afterImage && (
							<div className="ablocks-image-comparison__slider-line"></div>
						) }

						{ /* slider icon */ }
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

						{ /* input */ }
						{ beforeImage && afterImage && (
							<input
								aria-label="Image comparison slider"
								type="range"
								className={ classNames(
									'ablocks-image-comparison__slider',
									sliderOrientation === 'vertical' &&
										'ablocks-image-comparison__input--vertical'
								) }
								min="0"
								max="100"
								value={ sliderPosition }
								onChange={ handleSliderChange }
								ref={ sliderRef }
							/>
						) }

						{ /* label */ }
						{ showLabels && beforeImage && afterImage && (
							<div
								className={ classNames(
									labelOnHover &&
										'ablocks-image-comparison__labels'
								) }
							>
								{ /* overlay */ }
								<div
									className={ classNames(
										! labelOnHover &&
											labelWithOverlay &&
											'ablocks-image-comparison__overlay',
										labelOnHover &&
											labelWithOverlay &&
											'ablocks-image-comparison__overlay--hover'
									) }
								></div>

								{ /* before image */ }
								<div
									className={ classNames(
										'ablocks-image-comparison__beforeImage-label',
										sliderOrientation === 'horizontal' &&
											'ablocks-image-comparison__beforeImage-label--horizontal',
										sliderOrientation === 'vertical' &&
											'ablocks-image-comparison__beforeImage-label--vertical'
									) }
								>
									{ isDynamicBeforeImageLabel
										? dynamicBeforeImageLabel
										: beforeImageLabel }
								</div>

								{ /* after image */ }
								<div
									className={ classNames(
										'ablocks-image-comparison__afterImage-label',
										sliderOrientation === 'horizontal' &&
											'ablocks-image-comparison__afterImage-label--horizontal',
										sliderOrientation === 'vertical' &&
											'ablocks-image-comparison__afterImage-label--vertical'
									) }
								>
									{ isDynamicAfterImageLabel
										? dynamicAfterImageLabel
										: afterImageLabel }
								</div>
							</div>
						) }
					</div>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
