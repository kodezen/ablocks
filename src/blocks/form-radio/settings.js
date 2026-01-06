import React, { useState, useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksColorControl from '@Controls/color';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksToggleControl from '@Controls/toggleButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksSelectControl from '@Controls/select';
import { widthList } from './helper';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksNumberControl from '@Controls/number';
import ABlocksRangeControl from '@Controls/range';
import { inputWidth as inputWidthDefaultValueAttribute } from './attributes';
import {
	regularIcons,
	brandsIcons,
	solidIcons,
} from '@Controls/icon-upload/icons-svg-data';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		label,
		labelColor,
		radioArr,
		isRequired,
		name,
		helperText,
		inputType,
		optionWidth,
		markerType,
		listIconsClasses,
		listIcons,
		maximumValue,
		minimumValue,
		inputWidth,
	} = attributes;
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
		if (
			! name ||
			name.trim() === '' ||
			name.startsWith( 'MulSefield-' )
		) {
			const generateShortUniqueName = `MultiSelect-${
				Math.floor( Math.random() * 1000 ) + 1
			}`;
			setAttributes( { name: generateShortUniqueName } );
		}
	}, [ name, label, setAttributes ] );

	const iconUploaderChangeHandler = ( className, index ) => {
		let iconsArray = [];
		const parsedIconType = className.substring( 2, 3 );

		switch ( parsedIconType ) {
			case 'r':
				iconsArray = regularIcons.icons;
				break;

			case 's':
				iconsArray = solidIcons.icons;
				break;

			case 'b':
				iconsArray = brandsIcons.icons;
				break;
		}

		const iconKey = className.substring( 7 );
		const iconData = iconsArray[ iconKey ];
		const iconSvgViewBox = `0 0 ${ iconData[ 0 ] } ${ iconData[ 1 ] }`;
		const iconSvgPath = iconData[ 4 ];

		const iconsList = listIcons || [];
		const iconsClassNamesList = listIconsClasses || [];

		const newIconsList = [
			...( iconsList.slice( 0, index ) || [] ),
			{
				path: iconSvgPath,
				viewBox: iconSvgViewBox,
			},
			...( iconsList.slice( index + 1 ) || [] ),
		];

		const newIconsClassNamesList = [
			...( iconsClassNamesList.slice( 0, index ) || [] ),
			className,
			...( iconsClassNamesList.slice( index + 1 ) || [] ),
		];

		setAttributes( {
			listIcons: newIconsList,
			listIconsClasses: newIconsClassNamesList,
		} );
	};
	const deleteHandler = ( index ) => {
		const iconsList = listIcons || [];
		const iconsClassNamesList = listIconsClasses || [];

		const newIconsList = [
			...( iconsList.slice( 0, index ) || [] ),
			{ path: '', viewBox: '' },
			...( iconsList.slice( index + 1 ) || [] ),
		];
		const newIconsClassNamesList = [
			...( iconsClassNamesList.slice( 0, index ) || [] ),
			'',
			...( iconsClassNamesList.slice( index + 1 ) || [] ),
		];
		setAttributes( {
			listIcons: newIconsList,
			listIconsClasses: newIconsClassNamesList,
		} );
	};
	const handleInput = ( event ) => {
		setValue( event.target.value );
	};

	const handleNewOption = () => {
		const largestObject =
			radioArr.length > 0
				? radioArr.reduce( ( prev, current ) =>
						prev.id > current.id ? prev : current
				  )
				: undefined;

		const newObj = {
			id: largestObject ? largestObject.id + 1 : 1,
			value,
		};

		setAttributes( { radioArr: [ ...radioArr, newObj ] } );
		setValue( '' );
	};
	const onDragEnd = ( result ) => {
		if ( ! result.destination ) {
			return;
		}

		const items = Array.from( radioArr );
		const [ reorderedItem ] = items.splice( result.source.index, 1 );
		items.splice( result.destination.index, 0, reorderedItem );
		setAttributes( { radioArr: items } );
	};

	const deleteOption = ( event, id ) => {
		const newDeletedArr = radioArr.filter( ( option ) => option.id !== id );
		setAttributes( { radioArr: newDeletedArr } );
	};
	const openOptionHandler = ( id ) => {
		const updatedRadioArr = radioArr.map( ( option ) => {
			if ( option.id === id ) {
				return { ...option, isOpen: ! option.isOpen };
			}
			return { ...option, isOpen: false };
		} );
		setAttributes( { radioArr: updatedRadioArr } );
	};

	const changeListHandler = ( id, controlValue, attributeObjectKey ) => {
		const updatedRadioArr = radioArr.map( ( item ) => {
			if ( item.id === id ) {
				return {
					...item,
					[ attributeObjectKey ]: controlValue,
				};
			}
			return item;
		} );
		setAttributes( { radioArr: updatedRadioArr } );
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
						title={ __( 'Multi Select Block Settings', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksRangeControl
							label={ __( 'Multi Select Width', 'ablocks' ) }
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
						<ABlocksButtonGroupControl
							allowDeselect={ false }
							isResponsive={ false }
							label={ __( 'Option Type', 'ablocks' ) }
							options={ [
								{
									label: 'Checkbox',
									value: 'checkbox',
								},
								{
									label: 'Radio',
									value: 'radio',
								},
							] }
							attributeName="inputType"
							attributeValue={ inputType }
							setAttributes={ setAttributes }
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
						<ABlocksSelectControl
							label={ __( 'Choice Width', 'ablocks' ) }
							options={ widthList }
							isSearch={ true }
							attributeName="optionWidth"
							attributeValue={ optionWidth }
							setAttributes={ setAttributes }
						/>
						{ inputType !== 'radio' && (
							<>
								<ABlocksNumberControl
									label={ __( 'Minimum Value', 'ablocks' ) }
									attributeName="minimumValue"
									attributeValue={ minimumValue }
									setAttributes={ setAttributes }
								/>
								<ABlocksNumberControl
									label={ __( 'Maximum Value', 'ablocks' ) }
									attributeName="maximumValue"
									attributeValue={ maximumValue }
									setAttributes={ setAttributes }
								/>
							</>
						) }
						<DragDropContext onDragEnd={ onDragEnd }>
							<Droppable droppableId="droppable">
								{ ( provided ) => (
									<div
										ref={ provided.innerRef }
										{ ...provided.droppableProps }
									>
										{ radioArr.map( ( option, index ) => (
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
														className="ablocks-editor-radio"
													>
														<div
															className="ablocks-editor-radio__wrapper"
															role="presentation"
															onKeyDown={ () => {} }
														>
															<div
																className="ablocks-editor-radio__content-wrapper"
																role="presentation"
																onClick={ () =>
																	openOptionHandler(
																		option?.id
																	)
																}
															>
																<span className="ablocks-editor-radio__grab">
																	<span className="ablocks-icon ablocks-icon--move"></span>
																</span>
																<span className="ablocks-radio-text">
																	{
																		option.value
																	}
																</span>
															</div>

															<div className="ablocks-editor-radio__options-wrapper">
																<span
																	className="ablocks-icon ablocks-icon--delete"
																	onClick={ (
																		e
																	) =>
																		deleteOption(
																			e,
																			option?.id
																		)
																	}
																	role="presentation"
																	onKeyDown={ () => {} }
																></span>
															</div>
														</div>
														{ option?.isOpen && (
															<>
																<div className="ablocks-editor-radio__inner-content">
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

																{ markerType ===
																	'icon' && (
																	<ABlocksIconUploader
																		label={ __(
																			'Icon',
																			'ablocks'
																		) }
																		attributes={
																			attributes
																		}
																		setAttributes={
																			setAttributes
																		}
																		onChangeHandler={ (
																			className
																		) =>
																			iconUploaderChangeHandler(
																				className,
																				index
																			)
																		}
																		deleteHandler={ () =>
																			deleteHandler(
																				index
																			)
																		}
																		getIconClass={ () =>
																			listIconsClasses?.[
																				index
																			]
																		}
																		legacySupport={
																			true
																		}
																	/>
																) }
															</>
														) }
													</div>
												) }
											</Draggable>
										) ) }
									</div>
								) }
							</Droppable>
						</DragDropContext>
						<div className="ablocks-editor-radio__new-option">
							<input value={ value } onChange={ handleInput } />
							<button onClick={ handleNewOption }>Add</button>
						</div>
						{ /* <ContentStyleTabs
							content={
								<>

								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={__('Color', 'ablocks')}
										attributeName="labelColor"
										attributeValue={labelColor}
										setAttributes={setAttributes}
									/>
								</>
							}
						/> */ }
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
