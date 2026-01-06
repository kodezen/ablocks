import React from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import ABlocksDisable from '@Components/disable';
import RenderContainer from '@Components/block-container/render';
import metadata from './block.json';

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
						fontFamily: attributes.login_btn_typography?.fontFamily,
						weight: attributes.login_btn_typography?.weight,
					},
					{
						fontFamily: attributes.title_typography?.fontFamily,
						weight: attributes.title_typography?.weight,
					},
					{
						fontFamily:
							attributes.input_field_label_typography?.fontFamily,
						weight: attributes.input_field_label_typography?.weight,
					},
					{
						fontFamily:
							attributes.form_footer_title_typography?.fontFamily,
						weight: attributes.form_footer_title_typography?.weight,
					},
				] }
			>
				<ABlocksDisable>
					<ServerSideRender
						block="ablocks/storeengine-continue-button"
						httpMethod="POST"
						attributes={ attributes }
					/>
				</ABlocksDisable>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
