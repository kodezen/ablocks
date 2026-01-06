import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import RenderContainer from '@Components/block-container/render2';
import AblocksRichText from '@Components/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { Highlight_svg, TOOLBAR_ALIGNMENT_OPTIONS } from './helper';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';
import classNames from 'classnames';
import { getRenderDomElement } from '@Utils/helper';

import metadata from './block.json';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import ABHeadingRotateSlideDown from './heading-animation/rotate-slide-down';
import ABHeadingRotateTyping from './heading-animation/rotate-typing';
import ABHeadingRotateSwirl from './heading-animation/rotate-swirl';
const propTypes = {};

export default function Render( props ) {
	const { attributes, context, setAttributes } = props;
	const {
		block_id,
		headingTag,
		alignment,
		heading,
		link,
		isAnimated,
		startingText,
		animatedText,
		endingText,
		animationType,
		animationStyle,
		isInfiniteLoop,
		highlightDuration,
	} = attributes;

	const {
		isDynamicEnabled: isDynamicEnabledStartingText,
		data: dynamicStartingText,
	} = useDynamicData( {
		attributeValue: startingText,
	} );
	const {
		isDynamicEnabled: isDynamicEnabledAnimatedText,
		data: dynamicAnimatedText,
	} = useDynamicData( {
		attributeValue: animatedText,
	} );
	const {
		isDynamicEnabled: isDynamicEnabledEndingText,
		data: dynamicEndingText,
	} = useDynamicData( {
		attributeValue: endingText,
	} );

	const animationInstance = useRef( null );
	useEffect( () => {
		const element = getRenderDomElement( `.ablocks-block-${ block_id } ` );

		if ( element ) {
			const animatedText = element.querySelector(
				'.ablocks-animated-text'
			);

			if ( animationInstance.current?.stopRotation ) {
				animationInstance.current.stopRotation();
				animationInstance.current = null;
			}

			if ( ! isAnimated || ! animatedText ) {
				return () => {};
			}

			// Reset animation classes with proper timing
			animatedText
				.querySelectorAll( '.ablocks-dynamic-text' )
				.forEach( ( textElement ) => {
					textElement.classList.remove(
						'ablocks-dynamic-text-active'
					);
				} );

			// Force reflow to ensure class removal takes effect
			void animatedText.offsetWidth;

			// Add first element as active after reset
			setTimeout( () => {
				const firstText = animatedText.querySelector(
					'.ablocks-dynamic-text'
				);
				if ( firstText ) {
					firstText.classList.add( 'ablocks-dynamic-text-active' );
				}
			}, 50 );

			if (
				[
					'rotate-slide-down',
					'rotate-clip',
					'rotate-drop-in',
					'rotate-flip',
					'rotate-slide',
				].includes( animationStyle )
			) {
				animationInstance.current = new ABHeadingRotateSlideDown(
					animatedText,
					{
						isloop: isInfiniteLoop,
						duration: highlightDuration,
					}
				);
			}
			if ( [ 'rotate-typing' ].includes( animationStyle ) ) {
				//, "rotate-blind", "rotate-wave"
				animationInstance.current = new ABHeadingRotateTyping(
					animatedText,
					{
						isloop: isInfiniteLoop,
						duration: highlightDuration,
					}
				);
			}
			if ( [ 'rotate-swirl' ].includes( animationStyle ) ) {
				animationInstance.current = new ABHeadingRotateSwirl(
					animatedText,
					{
						isloop: isInfiniteLoop,
						duration: highlightDuration,
					}
				);
			}
		}

		return () => {
			if (
				animationInstance.current &&
				animationInstance.current.stopRotation
			) {
				animationInstance.current.stopRotation();
				animationInstance.current = null;
			}
		};
	}, [
		block_id,
		isAnimated,
		animatedText,
		animationType,
		animationStyle,
		isInfiniteLoop,
		highlightDuration,
		headingTag,
	] );

	// usestate to store previous animation
	const [ highlightAnimationStyle, setHighlightAnimationStyle ] =
		useState( 'highlighter-circle' );
	const [ rotatingAnimationStyle, setRotatingAnimationStyle ] =
		useState( 'rotate-typing' );

	const [ singleLineAnimationText, setSingleLineAnimationText ] =
		useState( 'Animated Text' );
	const [ multiLineAnimationText, setMultiLineAnimationText ] = useState(
		'Animated\nText\nare\nAwesome'
	);

	// set attributes to default values if isAnimated is toggled
	useEffect( () => {
		if ( ! isAnimated ) {
			setAttributes( {
				animationType: 'highlighted',
				animationStyle: 'highlighter-circle',
				startingText: '',
				animatedText: 'Animated',
				endingText: '',
				highlightColor: '#ff000e',
				highlightDuration: 2000,
				isInfiniteLoop: true,
				highlightDelay: 1000,
				animatedTextColor: '',
			} );
			setHighlightAnimationStyle( 'highlighter-circle' );
			setRotatingAnimationStyle( 'rotate-typing' );
			setSingleLineAnimationText( 'Animated Text' );
			setMultiLineAnimationText( 'Animated\nText\nare\nAwesome' );
		} else {
			setAttributes( {
				heading: '',
			} );
		}
	}, [ isAnimated ] );

	// Update the animationStyle based on the animationType
	useEffect( () => {
		if (
			animationType === 'highlighted' &&
			! [
				'highlighter-circle',
				'highlighter-curly',
				'highlighter-underline',
				'highlighter-double',
				'highlighter-double-underline',
				'highlighter-underline-zigzag',
				'highlighter-diagonal',
				'highlighter-strikethrough',
				'highlighter-crossed',
			].includes( animationStyle )
		) {
			setAttributes( {
				animationStyle: highlightAnimationStyle,
			} );
		} else if (
			animationType === 'rotating' &&
			! [
				'rotate-typing',
				'rotate-slide-down',
				'rotate-clip',
				'rotate-drop-in',
				'rotate-flip',
				'rotate-slide',
				'rotate-swirl',
			].includes( animationStyle )
		) {
			setAttributes( {
				animationStyle: rotatingAnimationStyle,
			} );
		}
	}, [ animationType ] );

	useEffect( () => {
		// Update the highlightAnimationStyle or rotatingAnimationStyle based on the animationType
		// Set the animatedText based on the animationStyle and animationType
		if ( animationType === 'highlighted' ) {
			setHighlightAnimationStyle( animationStyle );
			setAttributes( {
				animatedText: singleLineAnimationText,
			} );
		} else if ( animationType === 'rotating' ) {
			setRotatingAnimationStyle( animationStyle );
			setAttributes( {
				animatedText: multiLineAnimationText,
			} );
		}
	}, [ animationStyle, animationType ] );

	// Update the animatedText based on the animationType and animationStyle
	useEffect( () => {
		if ( animationType === 'highlighted' ) {
			setSingleLineAnimationText( animatedText );
			setAttributes( {
				animatedText,
			} );
		} else if ( animationType === 'rotating' ) {
			setMultiLineAnimationText( animatedText );
			setAttributes( {
				animatedText,
			} );
		}
	}, [ animatedText ] );

	// blank span for animation
	const blankSpan = Array.from( { length: 10 }, ( _, i ) => (
		<span key={ i } className="ablocks-dynamic-letter" />
	) );

	const HeadingTag = headingTag || 'h2';
	const { linkTarget, noFollow, keyValue, href } = link || {};
	// const HeadingTag = headingTag || 'h2';

	// Link attributes handling
	let anchorTagAttributes = { href };

	if ( linkTarget ) {
		anchorTagAttributes.target = '_blank';
	}
	if ( noFollow ) {
		anchorTagAttributes.rel = linkTarget
			? 'nofollow noreferrer noopener'
			: 'nofollow';
	} else {
		anchorTagAttributes.rel = 'noopener';
	}
	if ( keyValue ) {
		anchorTagAttributes = {
			...anchorTagAttributes,
			...getAnchorKeyValueAttributes( keyValue ),
		};
	}

	return (
		<React.Fragment>
			<BlockControls>
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
					options={ TOOLBAR_ALIGNMENT_OPTIONS }
				/>
			</BlockControls>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [
					{
						fontFamily: attributes.typography?.fontFamily,
						weight: attributes.typography?.weight,
					},
				] }
			>
				{ href && ! isAnimated ? (
					<a { ...anchorTagAttributes }>
						<AblocksRichText
							value={ heading }
							tagName={ headingTag }
							className={ 'ablocks-heading-text' }
							onChange={ ( heading ) =>
								setAttributes( { heading } )
							}
							placeholder={ 'Enter your heading..' }
							context={ context }
						/>
					</a>
				) : (
					<>
						{ isAnimated ? (
							<>
								<HeadingTag
									className={ classNames(
										'ablocks-animated-text',
										`ablocks-${ animationStyle }`
									) }
								>
									{ isDynamicEnabledStartingText
										? dynamicStartingText
										: startingText }

									<span className="ablocks-animated-text-wrapper">
										{ isDynamicEnabledAnimatedText ? (
											dynamicAnimatedText
										) : animationType === 'highlighted' ? (
											<span className="ablocks-dynamic-text">
												{ animatedText }
											</span>
										) : (
											animatedText
												.split( '\n' )
												.map( ( line, index ) => (
													<span
														key={ index }
														className="ablocks-dynamic-text"
													>
														{ [
															'rotate-slide-down',
															'rotate-clip',
															'rotate-drop-in',
															'rotate-flip',
															'rotate-slide',
														].includes(
															animationStyle
														) ? (
															line + ' '
														) : (
															<>
																{ blankSpan }
																{ line
																	.split( '' )
																	.map(
																		(
																			char,
																			charIndex
																		) => (
																			<span
																				key={
																					charIndex
																				}
																				className="ablocks-dynamic-letter"
																			>
																				{
																					char
																				}
																			</span>
																		)
																	) }
																{ blankSpan }
															</>
														) }
													</span>
												) )
										) }
										{ animationType === 'highlighted' &&
											Highlight_svg( animationStyle ) }
									</span>

									{ isDynamicEnabledEndingText
										? dynamicEndingText
										: endingText }
								</HeadingTag>
							</>
						) : (
							<AblocksRichText
								value={ heading }
								tagName={ headingTag }
								className={ 'ablocks-heading-text' }
								onChange={ ( heading ) =>
									setAttributes( { heading } )
								}
								placeholder={ 'Enter your heading..' }
								context={ context }
							/>
						) }
					</>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
