import React from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import ServerSideRender from '@wordpress/server-side-render';
import ABlocksDisable from '@Components/disable';
import './style.css';

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
				attributes={ {
					...attributes,
					className: 'ablocks-prevent-select',
				} }
			>
				<ABlocksDisable>
					<ServerSideRender
						block="ablocks/logout"
						httpMethod="POST"
						attributes={ attributes }
					/>
				</ABlocksDisable>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
