import React, { useEffect } from 'react';
import RenderContainer from '@Components/block-container/render';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { block_id, pageSize, pageOrientation } = attributes;

	useEffect( () => {
		if ( ! pageSize ) {
			setAttributes( { pageSize: 'A4' } );
		}
		if ( ! pageOrientation ) {
			setAttributes( { pageOrientation: 'L' } );
		}
	}, [] );

	return (
		<React.Fragment>
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
				<div className="ablocks-block--certificate__background-image">
					<div className="ablocks-block--certificate__background-image-inner-block">
						<InnerBlocks
							allowedBlocks={ [
								'ablocks/academy-certificate-text',
								'core/image',
								'ablocks/academy-certificate-id',
								'core/spacer',
								'ablocks/academy-container',
							] }
							templateLock={ false }
						/>
					</div>
				</div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
