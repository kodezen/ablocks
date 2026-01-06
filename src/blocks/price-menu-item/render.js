import React, { useEffect } from 'react';
import metadata from './block.json';
import GetDeviceType from '@Utils/get-device-type';
import RenderChildContainer from '@Components/block-container/childRender';
import { useSelect } from '@wordpress/data';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import AblocksRichText from '@Components/rich-text';
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

export default function Render( props ) {
	const { attributes, setAttributes, clientId } = props;
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
		dividerPatternUrl,
		dividerType,
		size,
		color,
		weight,
	} = attributes;
	const blockProps = useBlockProps();
	const newDevice = GetDeviceType();

	useEffect( () => {
		setAttributes( { device: newDevice } );
	}, [ newDevice ] );

	const parentAttributes = useSelect(
		( select ) => {
			const { getBlockParents } = select( 'core/block-editor' );
			const parentId = getBlockParents( clientId )[ 0 ];
			return select( 'core/block-editor' ).getBlockAttributes( parentId );
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( dividerPatternUrl && color === '' ) {
			setAttributes( { color: parentAttributes.color } );
		}
		if ( dividerType === 'mask-style' ) {
			if ( dividerPatternUrl && size === null ) {
				setAttributes( { size: parentAttributes.size } );
			}
		} else if ( dividerPatternUrl && weight === null ) {
			setAttributes( { weight: parentAttributes.weight } );
		}
	}, [ dividerPatternUrl ] );

	return (
		<React.Fragment>
			<BlockControls></BlockControls>
			<RenderChildContainer
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
				<div className="ablocks-price-menu-item">
					{ allowIcon && <RenderIcon attributes={ attributes } /> }

					<div className="ablocks-price-menu-item-details">
						<div className="ablocks-price-menu-item-details-brief">
							<AblocksRichText
								{ ...blockProps }
								tagName={ titleTag }
								identifier={ 'title' }
								value={ attributes.title }
								withoutInteractiveFormatting={ true }
								placeholder={ attributes.title }
								className={
									'ablocks-price-menu-item-details-title'
								}
								onChange={ ( title ) =>
									setAttributes( { title } )
								}
							/>
							{ placeDivider === 'near title' ? (
								<DividerComp
									allowDivider={ allowDivider }
									dividerType={ dividerType }
								/>
							) : null }
							{ placePrice === 'right' ? (
								<AblocksRichText
									{ ...blockProps }
									tagName={ priceTag }
									identifier={ 'price' }
									value={ attributes.price }
									withoutInteractiveFormatting={ true }
									placeholder={ attributes.price }
									className={
										'ablocks-price-menu-item-price'
									}
									onChange={ ( price ) =>
										setAttributes( { price } )
									}
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
							<AblocksRichText
								{ ...blockProps }
								tagName={ descriptionTag }
								identifier={ 'description' }
								value={ attributes.description }
								withoutInteractiveFormatting={ true }
								placeholder={ attributes.description }
								className={
									'ablocks-price-menu-item-details-des'
								}
								onChange={ ( description ) =>
									setAttributes( { description } )
								}
							/>
						) }
						{ placeDivider === 'under des' ? (
							<DividerComp
								allowDivider={ allowDivider }
								dividerType={ dividerType }
							/>
						) : null }
						{ placePrice === 'bottom' ? (
							<AblocksRichText
								{ ...blockProps }
								tagName={ priceTag }
								identifier={ 'price' }
								value={ attributes.price }
								withoutInteractiveFormatting={ true }
								placeholder={ attributes.price }
								className={ 'ablocks-price-menu-item-price' }
								onChange={ ( price ) =>
									setAttributes( { price } )
								}
							/>
						) : null }
					</div>
				</div>
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
