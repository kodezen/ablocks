import React from 'react';
import classNames from 'classnames';
import metadata from './block.json';
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import AblocksRichText from '@Components/rich-text';
import { TOOLBAR_ALIGNMENT_OPTIONS } from './helper';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import './style.css';
import RenderContainer from '@Components/block-container/render2';
const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes, context } = props;
	const {
		block_id,
		paragraph,
		paragraphTag,
		dropCaps,
		paragraphSize,
		alignment,
	} = attributes;
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
			>
				<AblocksRichText
					tagName={ paragraphTag || 'p' }
					value={ paragraph }
					className={ classNames(
						'ablocks-paragraph-text',
						`ablocks-paragraph-text-${ paragraphSize }`,
						{
							'ablocks-paragraph-text-drop-caps': dropCaps,
						}
					) }
					onChange={ ( changeParagraph ) =>
						setAttributes( { paragraph: changeParagraph } )
					}
					placeholder={ __( 'Add your paragraph text', 'ablocks' ) }
					context={ context }
				/>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
