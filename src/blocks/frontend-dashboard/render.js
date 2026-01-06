import React from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import ABlocksDisable from '@Components/disable';
import { __ } from '@wordpress/i18n';
import RenderContainer from '@Components/block-container/render';
import metadata from './block.json';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { block_id } = attributes;

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<ABlocksDisable>
					<ServerSideRender
						block="ablocks/frontend-dashboard"
						httpMethod="POST"
						attributes={ attributes }
					/>
				</ABlocksDisable>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
