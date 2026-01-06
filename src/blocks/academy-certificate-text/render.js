import React from 'react';
import { __ } from '@wordpress/i18n';
import RenderContainer from '@Components/block-container/render';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { TOOLBAR_ALIGNMENT_OPTIONS } from './helper';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import metadata from './block.json';
const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { block_id, headingTag, alignment } = attributes;
	return (
		<React.Fragment>
			<BlockControls>
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
					options={ TOOLBAR_ALIGNMENT_OPTIONS }
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
				<RichText
					tagName={ headingTag }
					value={ attributes.heading }
					className="ablocks-block--certificate__heading-text"
					onChange={ ( heading ) => setAttributes( { heading } ) }
					placeholder={ __( 'Enter your title…', 'ablocks' ) }
				/>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
