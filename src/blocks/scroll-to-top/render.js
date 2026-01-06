import React, { useEffect } from 'react';
import RenderContainer from '@Components/block-container/render2';
import RenderContent from './RenderContent';
import metadata from './block.json';
import { getRenderDomElement } from '@Utils/helper';
import ScrollToTop from './scroll';
const propTypes = {};

export default function Render( props ) {
	const { attributes, appearance } = props;
	const { block_id } = attributes;

	useEffect( () => {
		new ScrollToTop(
			getRenderDomElement( `.ablocks-block-${ block_id }` )
		);
	}, [ attributes, appearance, block_id ] );
	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ RenderContent( attributes ) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
