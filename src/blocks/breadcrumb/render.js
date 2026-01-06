import React from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import ABlocksDisable from '@Components/disable';
import RenderContainer from '@Components/block-container/render2';
import metadata from './block.json';
import './style.css';

const propTypes = {};

export default function Render( props ) {
	const { attributes } = props;
	const { block_id } = attributes;

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [
					{
						fontFamily:
							attributes.breadcrumbTitleTypography?.fontFamily,
						weight: attributes.breadcrumbTitleTypography?.weight,
					},
				] }
			>
				<ABlocksDisable>
					<ServerSideRender
						block="ablocks/breadcrumb"
						httpMethod="POST"
						attributes={ attributes }
					/>
				</ABlocksDisable>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
