import React from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import metadata from './block.json';
import PostTemplateEdit from './loop';

const propTypes = {};

export default function Render( props ) {
	const {
		attributes,
		clientId,
		context,
		setAttributes,
		__unstableLayoutClassNames,
	} = props;
	const { block_id } = attributes;

	return (
		<div className="ablocks-loop-template-child ablocks-loop-template-child__editor">
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<PostTemplateEdit
					clientId={ clientId }
					context={ context }
					setAttributes={ setAttributes }
					attributes={ attributes }
					__unstableLayoutClassNames={ __unstableLayoutClassNames }
				/>
			</RenderChildContainer>
		</div>
	);
}

Render.propTypes = propTypes;
