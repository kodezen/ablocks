import React, { useEffect, useRef, useState } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import lottie from 'lottie-web';

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		animationSource,
		asset_url,
		custom_url,
		uploaded_json,
		trigger,
		hoverArea,
		onHoverOut,
		reverse,
		loop,
		animationSpeed,
	} = attributes;

	const [ urlInput, setUrlInput ] = useState( '' );
	const animationContainer = useRef( null );
	const animationInstance = useRef( null );

	useEffect( () => {
		if ( ! animationContainer.current ) {
			return;
		}

		const loadAnimation = async () => {
			if ( animationInstance.current ) {
				animationInstance.current.destroy();
			}

			const animationConfig = {
				container: animationContainer.current,
				renderer: 'svg',
				loop,
				autoplay: trigger === 'viewport',
			};

			switch ( animationSource ) {
				case 'custom':
					animationConfig.path = custom_url;
					break;
				case 'upload':
					if ( uploaded_json?.url ) {
						try {
							const response = await fetch( uploaded_json.url );
							animationConfig.animationData =
								await response.json();
						} catch ( error ) {
							console.error(
								'Error loading animation JSON:',
								error
							);
							return;
						}
					}
					break;
				case 'default':
				default:
					animationConfig.path =
						asset_url;
					break;
			}

			if ( animationConfig.path || animationConfig.animationData ) {
				animationInstance.current =
					lottie.loadAnimation( animationConfig );
				applyAnimationSettings();
				setupEventHandlers();
			}
		};

		const applyAnimationSettings = () => {
			if ( ! animationInstance.current ) {
				return;
			}

			animationInstance.current.setSpeed( animationSpeed || 1 );
			animationInstance.current.setDirection( reverse ? -1 : 1 );
		};

		const setupEventHandlers = () => {
			if ( ! animationInstance.current ) {
				return;
			}

			const hoverElement =
				hoverArea === 'animation'
					? animationContainer.current
					: animationContainer.current.parentElement;

			// Destroy previous event listeners
			hoverElement?.removeEventListener( 'mouseenter', handleMouseEnter );
			hoverElement?.removeEventListener( 'mouseleave', handleMouseLeave );
			animationContainer.current?.removeEventListener(
				'click',
				handleClick
			);

			if ( trigger === 'hover' && hoverElement ) {
				hoverElement.addEventListener( 'mouseenter', handleMouseEnter );
				hoverElement.addEventListener( 'mouseleave', handleMouseLeave );
			}

			if ( trigger === 'click' ) {
				animationContainer.current.addEventListener(
					'click',
					handleClick
				);
			}
		};

		const handleMouseEnter = () => {
			animationInstance.current?.play();
		};

		const handleMouseLeave = () => {
			if ( ! animationInstance.current ) {
				return;
			}

			if ( onHoverOut === 'reverse' ) {
				animationInstance.current.setDirection( -1 );
				animationInstance.current.play();
			} else if ( onHoverOut === 'pause' ) {
				animationInstance.current.pause();
			} else if ( onHoverOut === 'stop' ) {
				animationInstance.current.stop();
			}
		};

		const handleClick = () => {
			if ( ! animationInstance.current ) {
				return;
			}

			if ( animationInstance.current.isPaused ) {
				animationInstance.current.play();
			} else {
				animationInstance.current.pause();
			}
		};

		loadAnimation();

		return () => {
			animationInstance.current?.destroy();
		};
	}, [
		animationSource,
		asset_url,
		custom_url,
		uploaded_json,
		trigger,
		hoverArea,
		onHoverOut,
		reverse,
		loop,
	] );

	// Handle animation speed changes separately for Re render
	useEffect( () => {
		if ( animationInstance.current ) {
			animationInstance.current.setSpeed( animationSpeed || 1 );
		}
	}, [ animationSpeed ] );

	return (
		<RenderContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ {
				...attributes,
				className: 'ablocks-prevent-select',
			} }
		>
			<div
				ref={ animationContainer }
				style={ {
					width: '100%',
					height: '100%',
					cursor: trigger === 'click' ? 'pointer' : 'default',
				} }
			/>

			{ ! uploaded_json && animationSource === 'upload' && (
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) =>
							setAttributes( { uploaded_json: media } )
						}
						allowedTypes={ [ 'application/json' ] }
						value={ uploaded_json?.id }
						render={ ( { open } ) => (
							<div className="ablocks-image-upload">
								<h2 className="ablocks-image-upload__title">
									Lottie Animation
								</h2>
								<p className="ablocks-image-upload__description">
									Upload a JSON file or pick one from your
									media library
								</p>
								<div className="ablocks-image-upload__buttons">
									<button
										onClick={ open }
										className="ablocks-image-upload__button ablocks-image-upload__button--primary"
									>
										Upload JSON
									</button>
									<button
										onClick={ () =>
											setAttributes( {
												animationSource: 'custom',
											} )
										}
										className="ablocks-image-upload__button ablocks-image-upload__button--url"
									>
										Use URL Instead
									</button>
								</div>
							</div>
						) }
					/>
				</MediaUploadCheck>
			) }

			{ ! custom_url && animationSource === 'custom' && (
				<div className="ablocks-image-upload">
					<h2 className="ablocks-image-upload__title">
						Enter Lottie URL
					</h2>
					<p className="ablocks-image-upload__description">
						Paste the URL of your Lottie JSON animation
					</p>
					<div className="ablocks-image-upload__buttons">
						<input
							type="text"
							className="ablocks-image-upload__input"
							placeholder="https://example.com/animation.json"
							value={ urlInput }
							onChange={ ( e ) => setUrlInput( e.target.value ) }
						/>
						<button
							onClick={ () =>
								setAttributes( { custom_url: urlInput } )
							}
							className="ablocks-image-upload__button ablocks-image-upload__button--primary"
						>
							Use This URL
						</button>
					</div>
				</div>
			) }
		</RenderContainer>
	);
}
