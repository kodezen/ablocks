import React, { useEffect } from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import { BlockControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { TOOLBAR_ALIGNMENT_OPTIONS } from './helper';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import metadata from './block.json';
import { useSelect } from '@wordpress/data';
import { getRenderDomElement } from '@Utils/helper';
import ABlockFormMultiStep from './multiForm';

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { block_id, alignment, steps } = attributes;
	const innerBlockProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: [ 'ablocks/form-multi-step-child' ],
			template: [ [ 'ablocks/form-multi-step-child' ] ],
			renderAppender: false,
		}
	);
	const innerBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( block_id ),
		[ block_id ]
	);
	const innerBlocksLength = innerBlocks.length;

	useEffect( () => {
		const element = getRenderDomElement( `.ablocks-block-${ block_id }` );
		if ( innerBlocksLength > 0 && element !== null ) {
			new ABlockFormMultiStep( element, true );
		}
	}, [ steps, innerBlocksLength ] );
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
				<div
					className="ablocks-form-multi-step"
					data-step={ steps.length }
				>
					<div className="ablocks-form-multi-step__progress">
						{ steps?.map( ( step, index ) => (
							<div
								className="ablocks-form-multi-step__step-wrapper"
								key={ step.id }
							>
								<div className="ablocks-form-multi-step__step ">
									<div className="ablocks-form-multi-step__step-number">
										{ index + 1 }
									</div>
									<span className="ablocks-form-multi-step__step-title">
										{ step.value }
									</span>
								</div>
								<div className="ablocks-form-multi-step__divider">
									{ '>' }
								</div>
							</div>
						) ) }
					</div>

					<div { ...innerBlockProps }></div>
				</div>
				<div className="ablocks-form-multi-step__btns">
					<button
						type="button"
						className="ablocks-form-multi-step__prev-btn"
					>
						{ '<-' } Back
					</button>

					<button
						type="button"
						className="ablocks-form-multi-step__next-btn"
					>
						Next { '->' }
					</button>
				</div>
			</RenderChildContainer>
		</React.Fragment>
	);
}
