import React from 'react';
import RenderIcon from '@Controls/icon-upload/render-icon';
import SaveChildContainer from '@Components/block-container/childSave';
import { RichText } from '@wordpress/block-editor';
import metadata from './block.json';

const propTypes = {};

const DividerComp = ( { allowDivider, dividerType } ) => {
	if ( allowDivider ) {
		if ( dividerType === 'mask-style' ) {
			return (
				<div className=" ablocks-divider ablocks-price-menu-divider__pattern-mask "></div>
			);
		}
		return (
			<div className=" ablocks-divider ablocks-price-menu-divider__pattern-css "></div>
		);
	}
};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		allowIcon,
		allowDescription,
		allowDivider,
		titleTag,
		description,
		descriptionTag,
		price,
		placePrice,
		priceTag,
		placeDivider,
		dividerType,
	} = attributes;

	return (
		<React.Fragment>
			<SaveChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div className="ablocks-price-menu-item">
					{ allowIcon && <RenderIcon attributes={ attributes } /> }

					<div className="ablocks-price-menu-item-details">
						<div className="ablocks-price-menu-item-details-brief">
							<RichText.Content
								value={ attributes.title }
								tagName={ titleTag }
								className="ablocks-price-menu-item-details-title"
							/>
							{ placeDivider === 'near title' ? (
								<DividerComp
									allowDivider={ allowDivider }
									dividerType={ dividerType }
								/>
							) : null }
							{ placePrice === 'right' ? (
								<RichText.Content
									value={ `${ price }` }
									tagName={ priceTag }
									className="ablocks-price-menu-item-price"
								/>
							) : null }
						</div>
						{ placeDivider === 'under title' ? (
							<DividerComp
								allowDivider={ allowDivider }
								dividerType={ dividerType }
							/>
						) : null }
						{ allowDescription && (
							<RichText.Content
								value={ description }
								tagName={ descriptionTag }
								className="ablocks-price-menu-item-details-des"
							/>
						) }
						{ placeDivider === 'under des' ? (
							<DividerComp
								allowDivider={ allowDivider }
								dividerType={ dividerType }
							/>
						) : null }
						{ placePrice === 'bottom' ? (
							<RichText.Content
								value={ `${ price }` }
								tagName={ priceTag }
								className="ablocks-price-menu-item-price"
							/>
						) : null }
					</div>
				</div>
			</SaveChildContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
