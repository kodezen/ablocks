import RenderIcon from '@Controls/icon-upload/render-icon';
import React from 'react';
import RenderContainer from '../../components/block-container/render2';
import metadata from './block.json';
import './style.css';
const propTypes = {};
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import AblocksRichText from '@Components/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { block_id, scale, rating, showCount, showRatingNumber, alignment } =
		attributes;
	return (
		<React.Fragment>
			<BlockControls>
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
				/>
			</BlockControls>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div className="ablocks-star-ratings-icons">
					{ Array.from( { length: scale ? Number( scale ) : 5 } ).map(
						( _, index ) => {
							const starValue = index + 1;
							const starClass = 'ablocks-rating';
							let fillPercentage = 0;
							if ( starValue <= Math.floor( rating ) ) {
								// Full star
								fillPercentage = 100;
							} else if (
								starValue ===
								Math.floor( rating ) + 1
							) {
								// Partially filled star
								fillPercentage = ( rating % 1 ) * 100;
							}
							return (
								<div
									key={ index }
									className={ starClass }
									style={ {
										'--marked-color': getTextColorCSS(
											attributes?.ratingColor
										),
										'--unmarked-color': getTextColorCSS(
											attributes?.ratingUnmarkedColor
										),
									} }
								>
									<div
										className="ablocks-rating__fill"
										style={ {
											width: `${ fillPercentage }%`,
										} }
									>
										<RenderIcon attributes={ attributes } />
									</div>
									<div className="ablocks-rating__unfill">
										<RenderIcon attributes={ attributes } />
									</div>
								</div>
							);
						}
					) }
				</div>
				{ showRatingNumber && (
					<span className="ablocks-star-rating-number">
						<AblocksRichText
							tagName="span"
							value={ `${ rating }` }
							onChange={ ( rating ) =>
								setAttributes( { rating } )
							}
							placeholder={ 'Enter your rating..' }
						/>
						{ showCount ? `/${ scale }` : '' }
					</span>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
