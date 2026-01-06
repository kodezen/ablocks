import React from 'react';
import RenderContainer from '@Components/block-container/render2';
import metadata from './block.json';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { renderHeadings, extractHeadings } from './helper';
import AblocksRichText from '@Components/rich-text';

const propTypes = {};

export default function Render( props ) {
	const [ headings, setHeadings ] = useState( [] );

	const { attributes, setAttributes } = props;
	const {
		block_id,
		tocTableTitle,
		hideTitle,
		openIconClass,
		closeIconClass,
		collapSible,
		isCollapsed,
	} = attributes;

	const content = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostContent();
	} );

	useEffect( () => {
		const newHeadings = extractHeadings( content, attributes );
		setHeadings( newHeadings );
	}, [ content ] );

	const toggleCollapse = () => {
		setAttributes( { isCollapsed: ! isCollapsed } );
	};
	const blockProps = useBlockProps();
	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [
					{
						fontFamily: attributes.search_typography?.fontFamily,
						weight: attributes.search_typography?.weight,
					},
				] }
			>
				{ hideTitle && (
					<div className="ablocks-toc__header">
						<AblocksRichText
							{ ...blockProps }
							aria-label={ __( 'Add title' ) }
							className="ablocks-toc__header-title"
							value={ tocTableTitle }
							placeholder={ attributes.tocTableTitle }
							tagName={ 'span' }
							identifier="text"
							withoutInteractiveFormatting
							onChange={ ( newTitle ) =>
								setAttributes( {
									tocTableTitle: newTitle,
								} )
							}
						/>
						{ collapSible && (
							<span
								role="presentation"
								className="ablocks-toc__header-toggle-icon"
								onClick={ toggleCollapse }
							>
								{ isCollapsed
									? closeIconClass && (
											<RenderIcon
												attributePrefix={ 'closeIcon' }
												attributes={ attributes }
											/>
									  )
									: openIconClass && (
											<RenderIcon
												attributePrefix={ 'openIcon' }
												attributes={ attributes }
											/>
									  ) }
							</span>
						) }
					</div>
				) }

				{ isCollapsed && (
					<div className="ablocks-toc-body">
						{ ' ' }
						{ renderHeadings( headings ) }{ ' ' }
					</div>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
