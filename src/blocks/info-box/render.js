import React from 'react';
import RenderContainer from '@Components/block-container/render2';
import { BlockControls } from '@wordpress/block-editor';
import BadgeRender from './components/badge/render';
import IconRender from './components/icon/render';
import HeadingRender from './components/heading/render';
import SubHeadingRender from './components/sub-heading/render';
import DescriptionRender from './components/description/render';
import StarRatingRender from './components/star-rating/render';
import ButtonRender from './components/button/render';
import metadata from './block.json';
const propTypes = {};

export default function Render( props ) {
	const { attributes } = props;
	const {
		block_id,
		blockElements,
		allowHeading,
		allowSubHeading,
		allowDes,
		allowRating,
		allowButton,
	} = attributes;

	const getAttribute = ( id ) => {
		switch ( id ) {
			case 0:
				return allowHeading && <HeadingRender { ...props } />;
			case 1:
				return allowSubHeading && <SubHeadingRender { ...props } />;
			case 2:
				return allowDes && <DescriptionRender { ...props } />;
			case 3:
				return allowRating && <StarRatingRender { ...props } />;
			case 4:
				return allowButton && <ButtonRender { ...props } />;

			default:
				return allowHeading && <HeadingRender { ...props } />;
		}
	};

	return (
		<React.Fragment>
			<BlockControls></BlockControls>
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
				{ attributes.allowBadge ? <BadgeRender { ...props } /> : null }
				{ /* icon part */ }
				{ attributes.allowIcon ? <IconRender { ...props } /> : null }

				<div className="ablocks-block--info-box__content">
					{ blockElements?.map( ( list ) => {
						return getAttribute( list?.id );
					} ) }
				</div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
