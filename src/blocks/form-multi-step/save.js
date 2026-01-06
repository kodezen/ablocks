import React from 'react';
import SaveChildContainer from '@Components/block-container/childSave';
import metadata from './block.json';

import { useInnerBlocksProps } from '@wordpress/block-editor';
export default function Save( props ) {
	const { attributes } = props;
	const { block_id, steps } = attributes;

	const innerBlockProps = useInnerBlocksProps.save();
	return (
		<React.Fragment>
			<SaveChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<form>
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
						<button className="ablocks-form-multi-step__prev-btn">
							{ '<-' } Back
						</button>

						<button className="ablocks-form-multi-step__next-btn">
							Next { '->' }
						</button>
					</div>
				</form>
			</SaveChildContainer>
		</React.Fragment>
	);
}
