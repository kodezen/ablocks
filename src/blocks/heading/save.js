import React from 'react';
import SaveContainer from '@Components/block-container/save2';
import { RichText } from '@wordpress/block-editor';
import metadata from './block.json';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import classNames from 'classnames';
import { Highlight_svg } from './helper';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		headingTag,
		link,
		heading,
		isAnimated,
		startingText,
		animatedText,
		endingText,
		animationType,
		animationStyle,
		isInfiniteLoop,
		highlightDuration,
	} = attributes;

	// blank span for animation
	const blankSpan = [ ...Array( 10 ) ].map( ( _, blankIndex ) => (
		<span key={ blankIndex } className="ablocks-dynamic-letter"></span>
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
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
			blockProps={
				isAnimated
					? {
							'data-isLoop': isInfiniteLoop,
							'data-duration': highlightDuration,
					  }
					: {}
			}
		>
			{ link && href && ! isAnimated ? (
				<a { ...anchorTagAttributes }>
					<RichText.Content
						tagName={ headingTag }
						className="ablocks-heading-text"
						value={ attributes.heading }
					/>
				</a>
			) : (
				<>
					{ isAnimated ? (
						<HeadingTag
							className={ classNames(
								'ablocks-animated-text',
								`ablocks-${ animationStyle }`
							) }
						>
							{ startingText }

							<span className="ablocks-animated-text-wrapper">
								{ animationType === 'highlighted' ? (
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
												].includes( animationStyle ) ? (
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
																		{ char }
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

							{ endingText }
						</HeadingTag>
					) : (
						<RichText.Content
							tagName={ headingTag }
							className={ 'ablocks-heading-text' }
							value={ heading }
						/>
					) }
				</>
			) }
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
