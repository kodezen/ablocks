import React from 'react';
import SaveContainer from '@Components/block-container/save';
import BadgeSave from '../components/badge/save';
import IconSave from '../components/icon/save';
import HeadingSave from '../components/heading/save';
import SubHeadingSave from '../components/sub-heading/save';
import DescriptionSave from '../components/description/save';
import StarRatingSave from '../components/star-rating/save';
import ButtonSave from '../components/button/save';
import metadata from '../block.json';

const propTypes = {};

export default function Save( props ) {
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
				return allowHeading && <HeadingSave { ...props } />;
			case 1:
				return allowSubHeading && <SubHeadingSave { ...props } />;
			case 2:
				return allowDes && <DescriptionSave { ...props } />;
			case 3:
				return allowRating && <StarRatingSave { ...props } />;
			case 4:
				return allowButton && <ButtonSave { ...props } />;

			default:
				return allowHeading && <HeadingSave { ...props } />;
		}
	};
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ attributes.allowBadge ? <BadgeSave { ...props } /> : null }
				{ /* icon part */ }
				{ attributes.allowIcon ? <IconSave { ...props } /> : null }

				<div className="ablocks-block--info-box__content">
					{ blockElements?.map( ( list ) => {
						return getAttribute( list?.id );
					} ) }
				</div>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
