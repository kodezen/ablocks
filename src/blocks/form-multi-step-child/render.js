import React from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import {
	BlockControls,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { TOOLBAR_ALIGNMENT_OPTIONS } from './helper';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import metadata from './block.json';

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { block_id, alignment } = attributes;
	// Separate inner blocks for form input and form textarea
	const allowedBlocks = [
		'ablocks/form-input',
		'ablocks/form-password',
		'ablocks/form-email',
		'ablocks/form-textarea',
		'ablocks/form-checkbox',
		'ablocks/form-select',
		'ablocks/form-radio',
		'ablocks/heading',
		'ablocks/paragraph',
		'ablocks/icon',
		'ablocks/image',
		'ablocks/divider',
		'ablocks/form-hidden',
		'ablocks/form-rating',
		'ablocks/form-datepicker',
		'ablocks/form-upload',
		'ablocks/form-timepicker',
	];
	const innerBlockProps = useInnerBlocksProps(
		{ className: 'ablocks-form-multi-step-child' },
		{
			renderAppender: InnerBlocks.ButtonBlockAppender,
			allowedBlocks,
		}
	);

	return (
		<React.Fragment>
			<BlockControls>
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
					options={ TOOLBAR_ALIGNMENT_OPTIONS }
				/>
			</BlockControls>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div { ...innerBlockProps }></div>
			</RenderChildContainer>
		</React.Fragment>
	);
}
