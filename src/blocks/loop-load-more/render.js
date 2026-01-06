import React from 'react';
import metadata from './block.json';
import RenderChildContainer from '@Components/block-container/childRender';
import AblocksRichText from '@Components/rich-text';
import { useBlockProps } from '@wordpress/block-editor';

const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes, setAttributes, context } = props;
	const { block_id, loadMoreButtonText, noMoreItemsText } = attributes;
	const blockProps = useBlockProps();
	return (
		<React.Fragment>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ {
					'data-no-item-text': noMoreItemsText,
					'data-more-button-text': loadMoreButtonText,
				} }
			>
				<AblocksRichText
					{ ...blockProps }
					tagName={ 'span' }
					identifier={ 'loadMoreButtonText' }
					value={ attributes.loadMoreButtonText }
					withoutInteractiveFormatting={ true }
					placeholder={ attributes.loadMoreButtonText }
					className={ 'ablocks-loop-load-more__text' }
					onChange={ ( text ) =>
						setAttributes( { loadMoreButtonText: text } )
					}
					context={ context }
				/>
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
