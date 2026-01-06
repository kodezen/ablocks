import React from 'react';
import RenderIcon from '@Controls/icon-upload/render-icon';
import AblocksRichText from '@Components/rich-text';

const StarRatingRender = ( props ) => {
	const { attributes } = props;
	const { ratingScale, rating, showCount, showRatingNumber } = attributes;

	return (
		<React.Fragment>
			<div className="ablocks-info-box-star-ratings">
				<div className="ablocks-info-box-star-ratings-icons">
					{ Array.from( {
						length: ratingScale ? Number( ratingScale ) : 5,
					} ).map( ( _, index ) => {
						const starValue = index + 1;
						const starClass = 'ablocks-info-box-rating';
						let fillPercentage = 0;
						if ( starValue <= Math.floor( rating ) ) {
							// Full star
							fillPercentage = 100;
						} else if ( starValue === Math.floor( rating ) + 1 ) {
							// Partially filled star
							fillPercentage = ( rating % 1 ) * 100;
						}
						return (
							<div key={ index } className={ starClass }>
								<div
									className="ablocks-info-box-rating__fill"
									style={ {
										width: `${ fillPercentage }%`,
									} }
								>
									<RenderIcon
										attributePrefix={ 'starIcon' }
										attributes={ attributes }
									/>
								</div>
								<div className="ablocks-info-box-rating__unfill">
									<RenderIcon
										attributePrefix={ 'starIcon' }
										attributes={ attributes }
									/>
								</div>
							</div>
						);
					} ) }
				</div>
				{ showRatingNumber && (
					<span className="ablocks-info-box-star-rating-number">
						<AblocksRichText
							tagName="span"
							value={ `${ rating }` }
							onChange={ ( rating ) =>
								setAttributes( { rating } )
							}
							placeholder={ 'Enter your rating..' }
						/>
						{ showCount ? `/${ ratingScale }` : '' }
					</span>
				) }
			</div>
		</React.Fragment>
	);
};

export default StarRatingRender;
