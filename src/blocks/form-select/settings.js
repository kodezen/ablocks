import React, { useState, useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextControl from '@Controls/text';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksRangeControl from '@Controls/range';
import { inputWidth as inputWidthDefaultValueAttribute } from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { isRequired, label, name, options, helperText, inputWidth } =
		attributes;
	const [ value, setValue ] = useState( '' );
	const hasReturnedEmpty = useRef( false );

	useEffect( () => {
		if (
			label === `What's your favorite programming lang?` &&
			! hasReturnedEmpty.current
		) {
			setAttributes( {
				label: ` What's your favorite programming lang? `,
			} );
			hasReturnedEmpty.current = true;
		}
		if ( name === '' && ! hasReturnedEmpty.current ) {
			hasReturnedEmpty.current = true;
			return;
		}
		if ( ! name || name.trim() === '' || name.startsWith( 'field-' ) ) {
			const generateShortUniqueName = `Select-${
				Math.floor( Math.random() * 1000 ) + 1
			}`;
			setAttributes( { name: generateShortUniqueName } );
		}
	}, [ name, label, setAttributes ] );

	const handleInput = ( event ) => {
		setValue( event.target.value );
	};
	const handleNewOption = () => {
		const largestObject =
			options.length > 0
				? options.reduce( ( prev, current ) =>
						prev.id > current.id ? prev : current
				  )
				: undefined;

		const newObj = {
			id: largestObject ? largestObject.id + 1 : 1,
			value,
		};

		setAttributes( { options: [ ...options, newObj ] } );
		setValue( '' );
	};

	const onDragEnd = ( result ) => {
		if ( ! result.destination ) {
			return;
		}

		const items = Array.from( options );
		const [ reorderedItem ] = items.splice( result.source.index, 1 );
		items.splice( result.destination.index, 0, reorderedItem );
		setAttributes( { options: items } );
	};

	const deleteOption = ( id ) => {
		setAttributes( {
			options: options.filter( ( option ) => option.id !== id ),
		} );
	};
	const openOptionHandler = ( id ) => {
		const updatedOptions = options.map( ( option ) => {
			if ( option.id === id ) {
				return { ...option, isOpen: ! option.isOpen };
			}
			return { ...option, isOpen: false };
		} );
		setAttributes( { options: updatedOptions } );
	};

	const changeListHandler = ( id, controlValue, attributeObjectKey ) => {
		const updatedOptions = options.map( ( item ) => {
			if ( item.id === id ) {
				return {
					...item,
					[ attributeObjectKey ]: controlValue,
				};
			}
			return item;
		} );
		setAttributes( { options: updatedOptions } );
	};
	return (
		<React.Fragment>
			<InspectorControls>
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
						<SelectParentBlockButton clientId={ props?.clientId } />
					</div>
				</ABlocksPanelBody>
				<Separator />
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/form-builder/' }
				>
					<ABlocksPanelBody
						title={ __( 'Select', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksRangeControl
							label={ __( 'Select Width', 'ablocks' ) }
							attributeName="inputWidth"
							attributeObjectKey="value"
							attributeValue={ inputWidth }
							setAttributes={ setAttributes }
							isResponsive={ true }
							hasUnit={ true }
							step={ 1 }
							min={ 0 }
							max={ 100 }
							unitValue={ inputWidth }
							unitOptions={ [ { value: '%', label: '%' } ] }
							isInline={ false }
							attributeDefaultValue={
								inputWidthDefaultValueAttribute
							}
						/>
						<ABlocksTextControl
							label={ __( 'Name', 'ablocks' ) }
							attributeName="name"
							setAttributes={ setAttributes }
							attributeValue={ name }
							isInline={ false }
							disableDynamicContent={ true }
						/>
						<ABlocksTextControl
							label={ __( 'Label', 'ablocks' ) }
							attributeName="label"
							setAttributes={ setAttributes }
							attributeValue={ label }
							isInline={ false }
							disableDynamicContent={ true }
						/>

						<ABlocksTextControl
							label={ __( 'Helper Text', 'ablocks' ) }
							attributeName="helperText"
							setAttributes={ setAttributes }
							attributeValue={ helperText }
							isInline={ false }
							disableDynamicContent={ true }
						/>
						<ABlocksToggleControl
							label={ __( 'Required', 'ablocks' ) }
							attributeValue={ isRequired }
							setAttributes={ setAttributes }
							attributeName="isRequired"
							isResponsive={ false }
						/>
						<DragDropContext onDragEnd={ onDragEnd }>
							<Droppable droppableId="droppable">
								{ ( provided ) => (
									<div
										ref={ provided.innerRef }
										{ ...provided.droppableProps }
									>
										{ options.map( ( option, index ) => (
											<Draggable
												key={ option.id }
												draggableId={ `${ option.id }` }
												index={ index }
											>
												{ ( providedItem ) => (
													<div
														ref={
															providedItem.innerRef
														}
														{ ...providedItem.draggableProps }
														{ ...providedItem.dragHandleProps }
														className="ablocks-editor-select"
													>
														<div className="ablocks-editor-select__wrapper">
															<div
																className="ablocks-editor-select__content-wrapper"
																role="presentation"
																onClick={ () =>
																	openOptionHandler(
																		option?.id
																	)
																}
															>
																<span className="ablocks-editor-select__grab">
																	<span className="ablocks-icon ablocks-icon--move"></span>
																</span>
																<span className="ablocks-select-text">
																	{
																		option.value
																	}
																</span>
															</div>

															<div className="ablocks-editor-select__options-wrapper">
																<span
																	className="ablocks-icon ablocks-icon--delete"
																	role="presentation"
																	onKeyDown={ () => {} }
																	onClick={ () =>
																		deleteOption(
																			option?.id
																		)
																	}
																></span>
															</div>
														</div>
														{ option?.isOpen && (
															<div className="ablocks-editor-select__inner-content">
																<ABlocksTextareaControl
																	label={ __(
																		'Text',
																		'ablocks'
																	) }
																	attributeValue={
																		option?.value
																	}
																	setAttributes={
																		setAttributes
																	}
																	onChangeHandler={ (
																		controlValue
																	) =>
																		changeListHandler(
																			option?.id,
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
												) }
											</Draggable>
										) ) }
									</div>
								) }
							</Droppable>
						</DragDropContext>
						<div className="ablocks-editor-select__new-option">
							<input value={ value } onChange={ handleInput } />
							<button onClick={ handleNewOption }>Add</button>
						</div>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
