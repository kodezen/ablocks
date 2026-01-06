import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, select } from '@wordpress/data';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextareaControl from '@Controls/textarea';
import SelectParentBlockButton from '@Components/select-parent-block';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { steps, block_id } = attributes;
	const dispatch = useDispatch();
	const [ stepVal, setStepVal ] = useState( '' );
	const { insertBlock, removeBlock } = ! wp.blockEditor
		? dispatch( 'core/editor' )
		: dispatch( 'core/block-editor' );
	const { getBlockOrder } = ! wp.blockEditor
		? select( 'core/editor' )
		: select( 'core/block-editor' );
	const handleNewSteps = () => {
		const largestObject =
			steps.length > 0
				? steps.reduce( ( prev, current ) =>
						prev.id > current.id ? prev : current
				  )
				: undefined;

		const newObj = {
			id: largestObject ? largestObject.id + 1 : 1,
			value: stepVal,
		};

		const formStepChildBlock = createBlock(
			'ablocks/form-multi-step-child'
		);
		insertBlock( formStepChildBlock, newObj.id, block_id );
		setAttributes( { steps: [ ...steps, newObj ] } );
		setStepVal( '' );
	};
	const deleteOption = ( index ) => {
		const childBlocks = getBlockOrder( block_id );
		// Remove the block at the correct position based on the index
		removeBlock( childBlocks[ index ], false );
		// Update the steps state
		const newSteps = steps.filter( ( step, i ) => i !== index ); // Filter out the deleted step by index
		setAttributes( {
			steps: newSteps,
		} );
	};
	const openOptionHandler = ( id ) => {
		const updatedOptions = steps.map( ( step ) => {
			if ( step.id === id ) {
				return { ...step, isOpen: ! step.isOpen };
			}
			return { ...step, isOpen: false };
		} );
		setAttributes( { steps: updatedOptions } );
	};
	const changeListHandler = ( id, controlValue, attributeObjectKey ) => {
		const updatedOptions = steps.map( ( item ) => {
			if ( item.id === id ) {
				return {
					...item,
					[ attributeObjectKey ]: controlValue,
				};
			}
			return item;
		} );
		setAttributes( { steps: updatedOptions } );
	};

	const handleInput = ( event ) => setStepVal( event.target.value );

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/form-builder/' }
				>
					<ABlocksPanelBody>
						<div className="ablocks-modal-triger">
							<div className="ablocks-modal-triger-area">
								<p className="ablocks-modal-triger-area__title">
									{ __(
										'Explore Form Builder Options',
										'ablocks'
									) }
								</p>
								<span className="ablocks-modal-triger-area__title--des">
									{ __(
										'Design and customize forms easily for login, registration, and more.',
										'ablocks'
									) }
								</span>
							</div>
							<SelectParentBlockButton
								clientId={ props?.clientId }
							/>
						</div>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						initialOpen={ true }
						title={ __( 'Multi step', 'ablocks' ) }
					>
						{ steps.map( ( step, index ) => (
							<div
								key={ index }
								className="ablocks-editor-multi-step"
							>
								<div
									className="ablocks-editor-multi-step__wrapper"
									role="presentation"
								>
									<div
										className="ablocks-editor-multi-step__content-wrapper"
										role="presentation"
										onClick={ () =>
											openOptionHandler( step?.id )
										}
									>
										<span className="ablocks-select-text">
											{ step.value }
										</span>
									</div>

									<div className="ablocks-editor-multi-step__options-wrapper">
										<span
											className="ablocks-icon ablocks-icon--delete"
											role="presentation"
											onClick={ () =>
												deleteOption( index )
											} // Use the index here
										></span>
									</div>
								</div>
								{ step?.isOpen && (
									<div className="ablocks-editor-select__inner-content">
										<ABlocksTextareaControl
											label={ __( 'Text', 'ablocks' ) }
											attributeValue={ step?.value }
											setAttributes={ setAttributes }
											onChangeHandler={ (
												controlValue
											) =>
												changeListHandler(
													step?.id,
													controlValue,
													'value'
												)
											}
											placeholder={ __(
												'Enter your text'
											) }
										/>
									</div>
								) }
							</div>
						) ) }
						<div className="ablocks-editor-multi-step__new-option">
							<input value={ stepVal } onChange={ handleInput } />
							<button onClick={ handleNewSteps }>Add</button>
						</div>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
