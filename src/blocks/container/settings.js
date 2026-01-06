import React, { useEffect } from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksRangeControl from '@Controls/range';
import GetDeviceType from '@Utils/get-device-type';
import ABlocksSelectControl from '@Controls/select';
import ABlocksToggleControl from '@Controls/toggleButton';
import ContentStyleTabs from '@Components/content-style-tabs';
import { settings } from '@Utils/helper';
import SelectParentBlockButton from '@Components/select-parent-block';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import ABlockLinkControl from '@Controls/link-control';
import { gridOption, flexOption } from './helper';
import ABlocksColorControl from '@Controls/color';
import ABlocksReactSelect from '@Components/ablocks-react-select';
const propTypes = {};

import {
	minimumHeight as minimumHeightDefaultAttributeValue,
	containerWidth as containerWidthDefaultAttributeValue,
	containerContentWidth as containerContentWidthDefaultAttributeValue,
	gap as gapDefaultAttributeValue,
	shapeBottomHeight as shapeBottomHeightDefaultAttributeValue,
	shapeBottomWidth as shapeBottomWidthDefaultAttributeValue,
	shapeTopHeight as shapeTopHeightDefaultAttributeValue,
	shapeTopWidth as shapeTopWidthDefaultAttributeValue,
} from './attributes';
import { getMaxValueForUnit, shapeOptions, HtmlTagOption } from './helper';

export default function Settings( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		dir,
		justification,
		alignment,
		wrapping,
		isRootContainer,
		containerWidth,
		containerContentWidth,
		containerWidthType,
		minimumHeight = {},
		gap = {},
		overflow,
		layout,
		gridRow,
		gridColumn,
		link,
		shapeTop,
		shapeBottom,
		shapeTopColor,
		shapeBottomColor,
		shapeTopHeight,
		shapeTopWidth,
		shapeBottomHeight,
		shapeBottomWidth,
		topShapeBringToFront,
		bottomShapeBringToFront,
		topShapeFlip,
		bottomShapeFlip,
		htmlTag,
	} = attributes;
	useEffect( () => {
		if ( ! containerContentWidth?.value ) {
			setAttributes( {
				containerContentWidth: {
					value: settings?.default_container_width,
				}, // Correctly update the value
			} );
		}
	}, [] );
	const deviceType = GetDeviceType();
	const isShowMainWrapWidth =
		containerWidthType === 'custom' || ! isRootContainer;
	const hasParentBlock = useSelect(
		( select ) => {
			const { getBlockHierarchyRootClientId } =
				select( blockEditorStore );
			const rootClientId = getBlockHierarchyRootClientId(
				props.clientId
			);
			return rootClientId !== props.clientId;
		},
		[ props.clientId ]
	);

	const parentLayout = useSelect(
		( select ) => {
			// If the current block already uses Flexbox, no need to query the parent
			if ( layout === 'flexBox' ) {
				return layout;
			}

			const { getBlockParents, getBlockAttributes } =
				select( 'core/block-editor' );
			const parentId = getBlockParents( clientId )?.[ 0 ];

			if ( ! parentId ) {
				return undefined;
			}

			return getBlockAttributes( parentId )?.layout;
		},
		[ clientId, layout ]
	);

	const isLayoutWrap =
		layout === 'flexBox' ||
		parentLayout === 'flexBox' ||
		parentLayout === 'grid';

	return (
		<React.Fragment>
			<InspectorControls>
				{ hasParentBlock && (
					<ABlocksPanelBody>
						<div className="ablocks-modal-triger">
							<div className="ablocks-modal-triger-area">
								<p className="ablocks-modal-triger-area__title">
									{ __(
										'Explore container Blocks Options',
										'ablocks'
									) }
								</p>
								<span className="ablocks-modal-triger-area__title--des">
									{ __(
										'Access the container block setting to customize container for easy navigation.',
										'ablocks'
									) }
								</span>
							</div>
							<SelectParentBlockButton
								clientId={ props?.clientId }
							/>
						</div>
					</ABlocksPanelBody>
				) }

				<div className="ablocks-block-container-settings-wrapper">
					<InspectorTabs
						attributes={ attributes }
						setAttributes={ setAttributes }
						docs_url={
							'https://ablocks.pro/docs/ablocks-container-block/'
						}
						isDisableLeftRightMargin={ isRootContainer }
						isContainer={ true }
					>
						<ABlocksPanelBody
							title={ __( 'Container', 'ablocks' ) }
							initialOpen={ true }
						>
							{ isRootContainer && (
								<>
									<ABlocksSelectControl
										label={ __(
											'Container layout',
											'ablocks'
										) }
										options={ [
											{
												label: 'Flex Box',
												value: 'flexBox',
											},
											{
												label: 'Grid',
												value: 'grid',
											},
										] }
										attributeValue={ layout }
										attributeName="layout"
										setAttributes={ setAttributes }
									/>
									<ABlocksButtonGroupControl
										isResponsive={ false }
										allowDeselect={ false }
										label={ __(
											'Container Width',
											'ablocks'
										) }
										options={ [
											{
												value: 'full',
												label: __(
													'Full Width',
													'ablocks'
												),
											},
											{
												value: 'boxed',
												label: __( 'Boxed', 'ablocks' ),
											},
											{
												value: 'custom',
												label: __(
													'Custom',
													'ablocks'
												),
											},
										] }
										attributeName="containerWidthType"
										attributeValue={ containerWidthType }
										setAttributes={ setAttributes }
									/>
								</>
							) }
							{ isRootContainer &&
							containerWidthType === 'boxed' ? (
								<>
									<ABlocksRangeControl
										label={ __(
											'Content Width',
											'ablocks'
										) }
										attributeName="containerContentWidth"
										attributeObjectKey="value"
										attributeValue={ containerContentWidth }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ true }
										unitOptions={ [
											{
												value: 'px',
												label: 'px',
											},
											{
												value: '%',
												label: '%',
											},
											{
												value: 'em',
												label: 'em',
											},
											{
												value: 'rem',
												label: 'rem',
											},
											{
												value: 'vw',
												label: 'vw',
											},
										] }
										min={ 0 }
										max={
											[ 'vw', '%' ].includes(
												containerContentWidth[
													'valueUnit' + deviceType
												]
											)
												? 100
												: 1600
										}
										attributeDefaultValue={
											containerContentWidthDefaultAttributeValue
										}
										autoSyncRange={ true }
									/>
								</>
							) : (
								<>
									{ isShowMainWrapWidth && (
										<ABlocksRangeControl
											label={ __( 'Width', 'ablocks' ) }
											attributeName="containerWidth"
											attributeObjectKey="value"
											attributeValue={ containerWidth }
											setAttributes={ setAttributes }
											isInline={ false }
											hasUnit={ true }
											attributeDataType="object"
											unitOptions={ [
												{
													value: 'px',
													label: 'px',
												},
												{
													value: '%',
													label: '%',
												},
												{
													value: 'em',
													label: 'em',
												},
												{
													value: 'rem',
													label: 'rem',
												},
												{
													value: 'vw',
													label: 'vw',
												},
											] }
											min={ 0 }
											max={
												[ 'vw', '%' ].includes(
													containerWidth[
														'valueUnit' + deviceType
													] ?? '%'
												)
													? 100
													: 1600
											}
											attributeDefaultValue={
												containerWidthDefaultAttributeValue
											}
											autoSyncRange={ true }
										/>
									) }
								</>
							) }
							<ABlocksRangeControl
								label={ __( 'Minimum Height' ) }
								attributeName="minimumHeight"
								attributeObjectKey="value"
								attributeValue={ minimumHeight }
								setAttributes={ setAttributes }
								isInline={ false }
								hasUnit={ true }
								attributeDataType="object"
								unitOptions={ [
									{
										value: 'px',
										label: 'px',
									},
									{
										value: 'em',
										label: 'em',
									},
									{
										value: 'rem',
										label: 'rem',
									},
									{
										value: 'vh',
										label: 'vh',
									},
								] }
								min={ 0 }
								max={
									'vh' ===
									minimumHeight[ 'valueUnit' + deviceType ]
										? 100
										: 1600
								}
								attributeDefaultValue={
									minimumHeightDefaultAttributeValue
								}
								autoSyncRange={ true }
							/>
							<ABlocksButtonGroupControl
								isResponsive={ false }
								label={ __( 'Overflow', 'ablocks' ) }
								options={ [
									{
										label: 'Visible',
										value: 'visible',
									},
									{
										label: 'Hidden',
										value: 'hidden',
									},
									{
										label: 'Auto',
										value: 'auto',
									},
								] }
								attributeName="overflow"
								attributeValue={ overflow }
								setAttributes={ setAttributes }
							/>

							<hr />
							<h3>Items</h3>
							{ layout !== 'grid' && (
								<ABlocksButtonGroupControl
									isInline
									label={ __( 'Direction', 'ablocks' ) }
									options={ [
										{
											label: __( 'Row', 'ablocks' ),
											value: 'row',
											icon: (
												<span className="ablocks-icon ablocks-icon--arrow-right" />
											),
										},
										{
											label: __( 'Column', 'ablocks' ),
											value: 'column',
											icon: (
												<span className="ablocks-icon ablocks-icon--arrow-down" />
											),
										},
										{
											label: __(
												'Row Reverse',
												'ablocks'
											),
											value: 'row-reverse',
											icon: (
												<span className="ablocks-icon ablocks-icon--arrow-left" />
											),
										},
										{
											label: __(
												'Column Reverse',
												'ablocks'
											),
											value: 'column-reverse',
											icon: (
												<span className="ablocks-icon ablocks-icon--arrow-up" />
											),
											tooltipPosition: 'top-left',
										},
									] }
									attributeName="dir"
									attributeValue={ dir }
									setAttributes={ setAttributes }
								/>
							) }

							<div
								className={ classNames(
									'ablocks-buttongroup-flex-justify-content',
									`ablocks-rotate-children-icons-for-${
										attributes[ 'dir' + deviceType ] ||
										'column'
									}`
								) }
							>
								<ABlocksButtonGroupControl
									isInline
									label={ __( 'Justify', 'ablocks' ) }
									options={
										layout === 'grid'
											? gridOption
											: flexOption
									}
									attributeName="justification"
									attributeValue={ justification }
									setAttributes={ setAttributes }
								/>
							</div>

							<div
								className={ classNames(
									'ablocks-buttongroup-flex-align-items',
									`ablocks-rotate-children-icons-for-${
										attributes[ 'dir' + deviceType ] ||
										'column'
									}`
								) }
							>
								<ABlocksButtonGroupControl
									isInline
									label={ __( 'Align Items', 'ablocks' ) }
									options={ [
										{
											label: __( 'Start', 'ablocks' ),
											value: 'flex-start',
											icon: (
												<span className="ablocks-icon ablocks-icon--align-start" />
											),
										},
										{
											label: __( 'Center', 'ablocks' ),
											value: 'center',
											icon: (
												<span className="ablocks-icon ablocks-icon--align-center-two" />
											),
										},
										{
											label: __( 'End', 'ablocks' ),
											value: 'flex-end',
											icon: (
												<span className="ablocks-icon ablocks-icon--align-end" />
											),
										},
										{
											label: __( 'Stretch', 'ablocks' ),
											value: 'stretch',
											icon: (
												<span className="ablocks-icon ablocks-icon--align-stretch" />
											),
											tooltipPosition: 'top-left',
										},
									] }
									attributeName="alignment"
									attributeValue={ alignment }
									setAttributes={ setAttributes }
								/>
							</div>

							<hr />
							{ layout === 'grid' && (
								<>
									<ABlocksRangeControl
										label={ __(
											'Grid Columns',
											'ablocks'
										) }
										attributeName="gridColumn"
										attributeObjectKey="value"
										attributeValue={ gridColumn }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ false }
										min={ 0 }
										max={ 10 }
										attributeDefaultValue={ '' }
									/>
									<ABlocksRangeControl
										label={ __( 'Grid Rows', 'ablocks' ) }
										attributeName="gridRow"
										attributeObjectKey="value"
										attributeValue={ gridRow }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ false }
										min={ 0 }
										max={ 10 }
										attributeDefaultValue={ '' }
									/>
								</>
							) }
							<ABlocksRangeControl
								label={ __( 'Columns Gap', 'ablocks' ) }
								attributeName="gap"
								attributeObjectKey="columnGap"
								attributeValue={ gap }
								setAttributes={ setAttributes }
								isInline={ false }
								hasUnit={ true }
								unitOptions={ [
									{
										value: 'px',
										label: 'px',
									},
									{
										value: '%',
										label: '%',
									},
									{
										value: 'em',
										label: 'em',
									},
									{
										value: 'rem',
										label: 'rem',
									},
									{
										value: 'vw',
										label: 'vw',
									},
								] }
								min={ 0 }
								max={
									[ 'vw', '%' ].includes(
										gap[ 'columnGapUnit' + deviceType ]
									)
										? 100
										: 1000
								}
								attributeDefaultValue={
									gapDefaultAttributeValue
								}
								autoSyncRange={ true }
							/>

							<ABlocksRangeControl
								label={ __( 'Rows Gap', 'ablocks' ) }
								attributeName="gap"
								attributeObjectKey="rowGap"
								attributeValue={ gap }
								setAttributes={ setAttributes }
								isInline={ false }
								hasUnit={ true }
								unitOptions={ [
									{
										value: 'px',
										label: 'px',
									},
									{
										value: '%',
										label: '%',
									},
									{
										value: 'em',
										label: 'em',
									},
									{
										value: 'rem',
										label: 'rem',
									},
									{
										value: 'vw',
										label: 'vw',
									},
								] }
								min={ 0 }
								max={
									[ 'vw', '%' ].includes(
										gap[ 'rowGapUnit' + deviceType ]
									)
										? 100
										: 1000
								}
								attributeDefaultValue={
									gapDefaultAttributeValue
								}
								autoSyncRange={ true }
							/>

							{ isLayoutWrap && (
								<ABlocksButtonGroupControl
									isInline
									label={ __( 'Wrap', 'ablocks' ) }
									options={ [
										{
											label: __( 'Wrap', 'ablocks' ),
											value: 'wrap',
											icon: (
												<span className="ablocks-icon ablocks-icon--wrap" />
											),
										},
										{
											label: __( 'No Wrap', 'ablocks' ),
											value: 'nowrap',
											icon: (
												<span className="ablocks-icon ablocks-icon--no-wrap" />
											),
										},
										{
											label: __(
												'Wrap Reverse',
												'ablocks'
											),
											value: 'wrap-reverse',
											icon: (
												<span className="ablocks-icon ablocks-icon--wrap ablocks-icon-rotate-180-deg" />
											),
											tooltipPosition: 'top-left',
										},
									] }
									attributeName="wrapping"
									attributeValue={ wrapping }
									setAttributes={ setAttributes }
								/>
							) }
						</ABlocksPanelBody>
						<ABlocksPanelBody
							title={ __( 'Container Shape', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								firstTabLabel="Top"
								secondTabLabel="Bottom"
								content={
									<>
										<ABlocksSelectControl
											label={ __( 'Type', 'ablocks' ) }
											options={ shapeOptions }
											isSearch={ false }
											attributeName="shapeTop"
											attributeValue={ shapeTop }
											setAttributes={ setAttributes }
											isInline={ false }
										/>
										{ shapeTop && (
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeName="shapeTopColor"
													attributeValue={
														shapeTopColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Height',
														'ablocks'
													) }
													attributeName="shapeTopHeight"
													attributeObjectKey="value"
													attributeValue={
														shapeTopHeight
													}
													setAttributes={
														setAttributes
													}
													isInline={ false }
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
													isResponsive={ true }
													min={ 0 }
													max={ 500 }
													attributeDefaultValue={
														shapeTopHeightDefaultAttributeValue
													}
													autoSyncRange={ true }
												/>
												{ shapeTop !== 'clouds' &&
													shapeTop !== 'drops' &&
													shapeTop !== 'tilt' && (
														<ABlocksRangeControl
															label={ __(
																'Width',
																'ablocks'
															) }
															attributeName="shapeTopWidth"
															attributeObjectKey="value"
															attributeValue={
																shapeTopWidth
															}
															setAttributes={
																setAttributes
															}
															isInline={ false }
															hasUnit={ true }
															unitOptions={ [
																{
																	value: '%',
																	label: '%',
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
															isResponsive={
																true
															}
															min={ 0 }
															max={ 100 }
															attributeDefaultValue={
																shapeTopWidthDefaultAttributeValue
															}
														/>
													) }
												<ABlocksToggleControl
													label={ __(
														'Bring to Front',
														'ablocks'
													) }
													attributeValue={
														topShapeBringToFront
													}
													setAttributes={
														setAttributes
													}
													attributeName="topShapeBringToFront"
													isResponsive={ false }
												/>
												<ABlocksToggleControl
													label={ __(
														'Flip',
														'ablocks'
													) }
													attributeValue={
														topShapeFlip
													}
													setAttributes={
														setAttributes
													}
													attributeName="topShapeFlip"
													isResponsive={ false }
												/>
											</>
										) }
									</>
								}
								style={
									<>
										<ABlocksSelectControl
											label={ __( 'Type', 'ablocks' ) }
											options={ shapeOptions }
											isSearch={ false }
											attributeName="shapeBottom"
											attributeValue={ shapeBottom }
											setAttributes={ setAttributes }
											isInline={ false }
										/>

										{ shapeBottom && (
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeName="shapeBottomColor"
													attributeValue={
														shapeBottomColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Height',
														'ablocks'
													) }
													attributeName="shapeBottomHeight"
													attributeObjectKey="value"
													attributeValue={
														shapeBottomHeight
													}
													setAttributes={
														setAttributes
													}
													isInline={ false }
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
													isResponsive={ true }
													min={ 0 }
													max={ 500 }
													attributeDefaultValue={
														shapeBottomHeightDefaultAttributeValue
													}
													autoSyncRange={ true }
												/>
												{ shapeBottom !== 'clouds' &&
													shapeBottom !== 'drops' &&
													shapeBottom !== 'tilt' && (
														<ABlocksRangeControl
															label={ __(
																'Width',
																'ablocks'
															) }
															attributeName="shapeBottomWidth"
															attributeObjectKey="value"
															attributeValue={
																shapeBottomWidth
															}
															setAttributes={
																setAttributes
															}
															isInline={ false }
															hasUnit={ true }
															unitOptions={ [
																{
																	value: '%',
																	label: '%',
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
															isResponsive={
																true
															}
															min={ 0 }
															max={ 100 }
															attributeDefaultValue={
																shapeBottomWidthDefaultAttributeValue
															}
															autoSyncRange={
																true
															}
														/>
													) }
												<ABlocksToggleControl
													label={ __(
														'Bring to Front',
														'ablocks'
													) }
													attributeValue={
														bottomShapeBringToFront
													}
													setAttributes={
														setAttributes
													}
													attributeName="bottomShapeBringToFront"
													isResponsive={ false }
												/>
												<ABlocksToggleControl
													label={ __(
														'Flip',
														'ablocks'
													) }
													attributeValue={
														bottomShapeFlip
													}
													setAttributes={
														setAttributes
													}
													attributeName="bottomShapeFlip"
													isResponsive={ false }
												/>
											</>
										) }
									</>
								}
							/>
						</ABlocksPanelBody>
					</InspectorTabs>
				</div>
				<ABlocksPanelBody
					title={ __( 'Additional Option', 'ablocks' ) }
					initialOpen={ false }
				>
					<ABlocksReactSelect
						label={ __( 'HTML Tag', 'ablocks' ) }
						isSearchable
						options={ HtmlTagOption }
						value={
							HtmlTagOption.find(
								( opt ) => opt.value === htmlTag
							) ||
							HtmlTagOption.find(
								( opt ) => opt.label === 'default'
							)
						}
						onChange={ ( selected ) => {
							setAttributes( { htmlTag: selected?.value } );
						} }
					/>

					{ htmlTag === 'a' && (
						<>
							<span className="ablocks-container__note">
								<b>Note:</b>Don’t add links to elements nested
								in this container - it will break the layout.
							</span>
							<ABlockLinkControl
								label={ __( 'Link', 'ablocks' ) }
								attributeName="link"
								attributeValue={ link }
								setAttributes={ setAttributes }
							/>
						</>
					) }
				</ABlocksPanelBody>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
