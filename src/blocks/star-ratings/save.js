/**
 * WordPress dependencies
 */
import React from 'react';

import RenderIcon from '@Controls/icon-upload/render-icon';
import SaveContainer from '@Components/block-container/save2';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import metadata from './block.json';
// import PropTypes from 'prop-types';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, scale, rating, showRatingNumber, showCount } = attributes;
	return (
		<React.Fragment>
			<SaveContainer
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
						{ rating }
						{ showCount ? `/${ scale }` : '' }
					</span>
				) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
