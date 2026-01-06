import React from 'react';
import SaveContainer from '@Components/block-container/save';
import metadata from './block.json';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, chartType, chartBG } = attributes;

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ {
					'data-chart-type': chartType,
					'data-data': JSON.stringify( attributes.data ),
					'data-options': JSON.stringify( attributes.options ),
				} }
			>
				<canvas
					style={ `display: block;box-sizing: border-box;background: ${ chartBG };` }
					className="ablocks-chart-canvas"
				></canvas>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
