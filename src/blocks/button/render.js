import React from 'react';
import metadata from './block.json';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import RenderIcon from '@Controls/icon-upload/render-icon';
import RenderContainer from '@Components/block-container/render2';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import AblocksRichText from '@Components/rich-text';
import classNames from 'classnames';
import './style.css';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes, context } = props;
	const {
		block_id,
		buttonSize,
		iconPosition,
		iconClass,
		showIcon,
		link: { linkTarget, noFollow, keyValue },
		alignment,
		iconImageID,
		iconImageUrl,
	} = attributes;
	const blockProps = useBlockProps();

	let anchorTagAttributes = {};

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
				<a
					{ ...anchorTagAttributes }
					className={ classNames(
						'ablocks-button',
						`ablocks-button--${ buttonSize }`,
						{
							[ `ablocks-button--icon-${ iconPosition }` ]:
								( iconClass && iconPosition ) ||
								( iconImageID && iconImageUrl ),
						}
					) }
				>
					{ showIcon && <RenderIcon attributes={ attributes } /> }
					<AblocksRichText
						{ ...blockProps }
						tagName={ 'span' }
						identifier={ 'text' }
						value={ attributes.text }
						withoutInteractiveFormatting={ true }
						placeholder={ attributes.text }
						className={ 'ablocks-button__text' }
						onChange={ ( text ) => setAttributes( { text } ) }
						context={ context }
					/>
				</a>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
