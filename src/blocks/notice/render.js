import React, { useState } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { __ } from '@wordpress/i18n';
import AblocksRichText from '@Components/rich-text';
import './style.css';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { block_id, headingTag, isDismissible } = attributes;

	const [ isVisible, setIsVisible ] = useState( true );

	const handleIconClick = () => {
		setIsVisible( false ); // Set visibility to false to hide content
	};
	// Define a template with default content
	const TEMPLATE = [
		[
			'ablocks/paragraph',
			{
				paragraph:
					'Stay up-to-date with our latest updates and offers. Don’t miss out on important announcements!',
			},
		],
	];
	const blockProps = useBlockProps();

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ {
					...attributes,
					className: 'ablocks-prevent-select-notice',
				} }
			>
				{ isVisible && (
					<>
						<div className="ablocks-notice-header">
							<AblocksRichText
								{ ...blockProps }
								tagName={ headingTag }
								value={ attributes.heading }
								withoutInteractiveFormatting
								className="ablocks-notice-title"
								onChange={ ( heading ) =>
									setAttributes( { heading } )
								}
								placeholder={ __( 'Notice Title', 'ablocks' ) }
							/>
							{ isDismissible && (
								<RenderIcon
									onClick={ handleIconClick }
									attributes={ attributes }
								/>
							) }
						</div>
						<div className="ablocks-notice-content">
							<InnerBlocks
								template={ TEMPLATE }
								templateLock={ false }
							/>
						</div>
					</>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
