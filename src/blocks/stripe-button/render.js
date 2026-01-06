import React, { useEffect } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import RenderIcon from '@Controls/icon-upload/render-icon';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import classNames from 'classnames';
import './style.css';
import AblocksRichText from '@Components/rich-text';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		buttonSize,
		iconPosition,
		iconClass,
		showIcon,
		alignment,
		iconImageID,
		iconImageUrl,
	} = attributes;
	const blockProps = useBlockProps();

	useEffect( () => {
		const currentPostId = wp.data
			.select( 'core/editor' )
			.getCurrentPostId();
		setAttributes( {
			postId: currentPostId,
		} );
	}, [] );

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
				typography={ [
					{
						fontFamily: attributes.typography?.fontFamily,
						weight: attributes.typography?.weight,
					},
				] }
			>
				<div
					className={ classNames(
						'ablocks-stripe-button',
						`ablocks-stripe-button--${ buttonSize }`,
						{
							[ `ablocks-stripe-button--icon-${ iconPosition }` ]:
								( iconClass && iconPosition ) ||
								( iconImageID && iconImageUrl ),
						}
					) }
				>
					{ showIcon && <RenderIcon attributes={ attributes } /> }
					<AblocksRichText
						{ ...blockProps }
						tagName={ 'span' }
						identifier="text"
						value={ attributes.text }
						withoutInteractiveFormatting
						placeholder={ attributes.text }
						className="ablocks-stripe-button__text"
						onChange={ ( text ) => setAttributes( { text } ) }
					/>
				</div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
