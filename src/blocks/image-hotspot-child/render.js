import React from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render';
import { InnerBlocks } from '@wordpress/block-editor';

const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes } = props;
	const { block_id } = attributes;
	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<InnerBlocks
					template={ [
						[ 'ablocks/heading', { heading: 'Content Title' } ],
						[ 'ablocks/button', { text: 'Buy Now' } ],
					] }
					templateLock={ false }
				/>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
