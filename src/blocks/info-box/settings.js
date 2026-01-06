import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksRangeControl from '@Controls/range';
import ABlocksToggleControl from '@Controls/toggleButton';
import InspectorTabs from '@Components/inspector-tabs';
import Separator from '@Components/separator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SwitchHeading from './components/heading/switch';
import SwitchSubHeading from './components/sub-heading/switch';
import SwitchDescription from './components/description/switch';
import SwitchRating from './components/star-rating/switch';
import SwitchButton from './components/button/switch';
import './styles.scss';

//components
import BadgeSettings from './components/badge/settings';
import IconSettings from './components/icon/settings';
import HeadingSettings from './components/heading/settings';
import SubHeadingSettings from './components/sub-heading/settings';
import DescriptionSettings from './components/description/settings';
import StarRatingSettings from './components/star-rating/settings';
import ButtonSettings from './components/button/settings';

// colors
import ABlocksAlignmentControl from '@Controls/alignment';

const propTypes = {};

import {
	iconGap as iconGapDefaultAttributeValue,
	contentGap as contentGapDefaultAttributeValue,
} from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		iconPlacement,
		iconGap,
		contentGap,
		blockElements,
		alignment,
		iconAlignment,
		allowButtonHover,
		allowBadge,
		allowIcon,
		allowBadgeHover,
		allowHeading,
		allowSubHeading,
		allowDes,
		allowRating,
		allowButton,
	} = attributes;

	const onDragEnd = ( result ) => {
		if ( ! result.destination ) {
			return;
		}

		const reorderedLists = Array.from( blockElements );
		const [ removedListItem ] = reorderedLists.splice(
			result.source.index,
			1
		);
		reorderedLists.splice( result.destination.index, 0, removedListItem );
		setAttributes( { blockElements: reorderedLists } );
	};

	const getSwitchComp = ( id ) => {
		switch ( id ) {
			case 0:
				return <SwitchHeading { ...props } />;
			case 1:
				return <SwitchSubHeading { ...props } />;
			case 2:
				return <SwitchDescription { ...props } />;
			case 3:
				return <SwitchRating { ...props } />;
			case 4:
				return <SwitchButton { ...props } />;

			default:
		}
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-flip-box-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Info Box', 'ablocks' ) }
						initialOpen={ true }
					>
						<>
							{ attributes.allowIcon ? (
								<>
									<ABlocksButtonGroupControl
										allowDeselect={ true }
										isResponsive={ true }
										label={ __(
											'Icon placement',
											'ablocks'
										) }
										options={ [
											{
												value: 'row',
												label: __( 'Left', 'ablocks' ),
											},
											{
												value: 'column',
												label: __( 'Top', 'ablocks' ),
											},
											{
												value: 'row-reverse',
												label: __( 'Right', 'ablocks' ),
											},
										] }
										attributeName="iconPlacement"
										attributeValue={ iconPlacement }
										setAttributes={ setAttributes }
									/>
									<ABlocksAlignmentControl
										label={ __(
											'Icon Alignment',
											'ablocks'
										) }
										options={ [
											{
												label: 'flex-start',
												value: 'flex-start',
												icon: 'left',
											},
											{
												label: 'center',
												value: 'center',
												icon: 'center',
											},
											{
												label: 'flex-end',
												value: 'flex-end',
												icon: 'right',
											},
										] }
										attributeName="iconAlignment"
										attributeValue={ iconAlignment }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									<ABlocksRangeControl
										label={ __( 'Icon Gap', 'ablocks' ) }
										min={ 0 }
										max={ 100 }
										hasUnit={ true }
										unitOptions={ [
											{
												value: 'px',
												label: 'px',
											},
											{
												value: 'rem',
												label: 'rem',
											},
											{
												value: 'em',
												label: 'em',
											},
										] }
										isInline={ false }
										isResponsive={ true }
										attributeName="iconGap"
										attributeValue={ iconGap }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										attributeDefaultValue={
											iconGapDefaultAttributeValue
										}
									/>
								</>
							) : null }
							<ABlocksAlignmentControl
								label={ __( 'Content Alignment', 'ablocks' ) }
								options={ [
									{
										label: 'flex-start',
										value: 'flex-start',
										icon: 'left',
									},
									{
										label: 'center',
										value: 'center',
										icon: 'center',
									},
									{
										label: 'flex-end',
										value: 'flex-end',
										icon: 'right',
									},
								] }
								attributeName="alignment"
								attributeValue={ alignment }
								setAttributes={ setAttributes }
								isInline={ false }
							/>
							<ABlocksRangeControl
								label={ __( 'Content Gap', 'ablocks' ) }
								min={ 0 }
								max={ 100 }
								hasUnit={ true }
								unitOptions={ [
									{
										value: 'px',
										label: 'px',
									},
									{
										value: 'rem',
										label: 'rem',
									},
									{
										value: 'em',
										label: 'em',
									},
								] }
								isInline={ false }
								isResponsive={ true }
								attributeName="contentGap"
								attributeValue={ contentGap }
								setAttributes={ setAttributes }
								attributeObjectKey="value"
								attributeDefaultValue={
									contentGapDefaultAttributeValue
								}
							/>
							{ allowButton ? (
								<ABlocksToggleControl
									isResponsive={ false }
									label="Enable Button hover"
									attributeValue={ allowButtonHover }
									setAttributes={ setAttributes }
									attributeName="allowButtonHover"
								/>
							) : null }
							<ABlocksToggleControl
								isResponsive={ false }
								label="Enable Badge"
								attributeValue={ allowBadge }
								setAttributes={ setAttributes }
								attributeName="allowBadge"
							/>
							{ allowBadge ? (
								<ABlocksToggleControl
									isResponsive={ false }
									label="Enable Badge hover"
									attributeValue={ allowBadgeHover }
									setAttributes={ setAttributes }
									attributeName="allowBadgeHover"
								/>
							) : null }
							<ABlocksToggleControl
								isResponsive={ false }
								label="Enable Icon"
								attributeValue={ attributes.allowIcon }
								setAttributes={ setAttributes }
								attributeName="allowIcon"
							/>
							<Separator />
							<DragDropContext onDragEnd={ onDragEnd }>
								<Droppable droppableId="droppable">
									{ ( provided ) => (
										<div
											ref={ provided.innerRef }
											{ ...provided.droppableProps }
										>
											<h3 className="ablocks-info-drag">
												Draggable items
											</h3>
											{ blockElements?.map(
												( list, index ) => (
													<Draggable
														key={ list.id }
														draggableId={ `${ list.id }` }
														index={ index }
													>
														{ ( providedItem ) => (
															<div
																ref={
																	providedItem.innerRef
																}
																{ ...providedItem.draggableProps }
																{ ...providedItem.dragHandleProps }
																className="ablocks-editor-list"
															>
																<div
																	className="ablocks-editor-list__wrapper info"
																	role="presentation"
																	onKeyDown={ () => {} }
																>
																	<div className="ablocks-editor-list__content-wrapper">
																		<span className="ablocks-editor-list__grab">
																			<span className="ablocks-icon ablocks-icon--move"></span>
																		</span>
																		<span className="ablocks-list-text">
																			{
																				list?.slug
																			}
																		</span>
																	</div>
																	{ getSwitchComp(
																		list?.id
																	) }
																</div>
															</div>
														) }
													</Draggable>
												)
											) }
											{ provided.placeholder }
										</div>
									) }
								</Droppable>
							</DragDropContext>
						</>
					</ABlocksPanelBody>

					{ allowBadge && <BadgeSettings { ...props } /> }
					{ allowIcon && <IconSettings { ...props } /> }
					{ allowHeading && <HeadingSettings { ...props } /> }
					{ allowSubHeading && <SubHeadingSettings { ...props } /> }
					{ allowDes && <DescriptionSettings { ...props } /> }
					{ allowRating && <StarRatingSettings { ...props } /> }
					{ allowButton && <ButtonSettings { ...props } /> }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
