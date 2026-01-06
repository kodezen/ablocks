import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import QueryContent from './queryContent';

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
				<QueryContent
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</RenderContainer>
		</React.Fragment>
	);
}
