import React from 'react';
import SaveChildContainer from '@Components/block-container/childSave';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';

const propTypes = {};

const defaultProps = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id } = attributes;
	return (
		<div className="swiper-slide ablocks-carousel-swiper-slide">
			<SaveChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<InnerBlocks.Content />
			</SaveChildContainer>
		</div>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
