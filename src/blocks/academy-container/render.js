import React, { useEffect } from 'react';
import RenderContainer from '@Components/block-container/render';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes, hasChildBlocks } = props;
	const { block_id, pageSize, pageOrientation } = attributes;

	useEffect( () => {
		if ( ! pageOrientation ) {
			setAttributes( { pageOrientation: 'l' } );
		}
	}, [ pageOrientation, setAttributes ] );

	const appender = hasChildBlocks
		? undefined
		: () => <InnerBlocks.ButtonBlockAppender />;

	return (
		<RenderContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
			typography={ [
				{
					fontFamily: attributes.search_typography?.fontFamily,
					weight: attributes.search_typography?.weight,
				},
			] }
		>
			<div className="academy-inner-container">
				<InnerBlocks
					allowedBlocks={ [
						'ablocks/academy-certificate-text',
						'core/image',
						'ablocks/academy-certificate-id',
						'core/spacer',
						'ablocks/academy-container',
					] }
					templateLock={ false }
					renderAppender={ appender }
				/>
			</div>
		</RenderContainer>
	);
}

Render.propTypes = propTypes;
