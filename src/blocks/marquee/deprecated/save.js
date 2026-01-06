import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save';
import { InnerBlocks } from '@wordpress/block-editor';
import '../style.css';
const propTypes = {};
const defaultProps = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		pauseOnHover,
		marqueeDirection,
		marqueeSpeed,
		loop,
		loopCount,
		gap,
	} = attributes;
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div
					className="ablocks-block-marquee"
					data-direction={ marqueeDirection }
					data-speed={ marqueeSpeed }
					data-pause={ pauseOnHover }
					data-loop={ loop }
					data-loop-count={ loopCount }
					data-content-gap={ gap }
				>
					<div className="ablocks-block-marquee__children">
						<InnerBlocks.Content />
					</div>
				</div>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
