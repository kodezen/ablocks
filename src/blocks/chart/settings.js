import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksTextControl from '@Controls/text';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksRangeControl from '@Controls/range';
import InspectorTabs from '@Components/inspector-tabs';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextareaControl from '@Controls/textarea';

// colors
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
import './editor.scss';
const propTypes = {};

import { chartWidth as chartWidthDefaultAttributeValue } from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { data, options, chartType, chartBG, chartWidth } = attributes;
	const updateLabel = ( value, index ) => {
		setAttributes( {
			data: {
				...data,
				labels: data.labels.map( ( label, i ) =>
					i === index ? value : label
				),
			},
		} );
	};

	const updateDataValue = ( value, index, innerIndex ) => {
		const newData = {
			...data,
			datasets: data?.datasets.map( ( dataset, i ) =>
				i === index
					? {
							...( dataset || {} ),
							data: dataset.data.map( ( item, j ) =>
								j === innerIndex ? value : item
							),
					  }
					: dataset
			),
		};
		setAttributes( { data: newData } );
	};
	function generateUniqueNearbyNumber( arr ) {
		const min = Math.min( ...arr ) - 100;
		const max = Math.max( ...arr ) + 100;
		let uniqueNumber;

		do {
			uniqueNumber =
				Math.floor( Math.random() * ( max - min + 1 ) ) + min;
		} while ( arr.includes( uniqueNumber ) );

		return uniqueNumber;
	}
	function generateUniqueColor( existingColors ) {
		function isColorValid( color ) {
			return ! existingColors.some(
				( existingColor ) =>
					existingColor.toLowerCase() === color.toLowerCase()
			);
		}
		let uniqueColor;
		do {
			uniqueColor = `#${ Math.floor( Math.random() * 16777215 )
				.toString( 16 )
				.padStart( 6, '0' ) }`;
		} while ( ! isColorValid( uniqueColor ) );

		return uniqueColor;
	}
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Manage Datasets', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									{ data?.labels?.map( ( value, index ) => {
										return (
											<div className="ablocks-chart-block-input-label">
												<ABlocksTextControl
													label={ __(
														`Label ${ index + 1 }`,
														'ablocks'
													) }
													attributeValue={ value }
													onChangeHandler={ ( val ) =>
														updateLabel(
															val,
															index
														)
													}
													setAttributes={
														setAttributes
													}
													disableDynamicContent={
														true
													}
												/>
												<span
													className="ablocks-icon ablocks-icon--delete"
													onClick={ () => {
														const newLabels = [
															...data.labels,
														].filter(
															( _, i ) =>
																i !== index
														);
														const newDatasets =
															data.datasets.map(
																(
																	dataset
																) => ( {
																	...dataset,
																	data: [
																		...dataset.data,
																	].filter(
																		(
																			_,
																			i
																		) =>
																			i !==
																			index
																	),
																} )
															);

														const newData = {
															...data,
															labels: newLabels,
															datasets:
																newDatasets,
														};
														setAttributes( {
															data: newData,
														} );
													} }
												></span>
											</div>
										);
									} ) }
									<button
										className="ablocks-chart-block-add-button"
										onClick={ () => {
											const dummy = {
												...data,
												labels: [
													...data.labels,
													'Test',
												],
												datasets: data.datasets.map(
													( val ) => ( {
														...val,
														data: [
															...val.data,
															generateUniqueNearbyNumber(
																val.data
															),
														],
													} )
												),
											};

											setAttributes( { data: dummy } );
										} }
									>
										<span className="ablocks-icon ablocks-icon--plus"></span>
										Add new dataset
									</button>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __(
											'X-axis font Color',
											'ablocks'
										) }
										attributeValue={
											options.scales.x.ticks.color
										}
										onChangeHandler={ ( _, val ) => {
											const colorVal = val.startsWith(
												'var:preset'
											)
												? val.split( '|' )[ 1 ]
												: val;
											const newOptions = {
												...options,
												scales: {
													...( options?.scales ||
														{} ),
													x: {
														...( options?.scales
															?.x || {} ),
														ticks: {
															...( options?.scales
																?.x?.ticks ||
																{} ),
															color: colorVal,
														},
													},
												},
											};

											setAttributes( {
												options: newOptions,
											} );
										} }
										showGlobal={ false }
									/>
									<ABlocksRangeControl
										label={ __(
											'X-axis font size',
											'ablocks'
										) }
										attributeValue={
											options.scales.x.ticks.font.size ??
											'0'
										}
										onChangeHandler={ ( val, _ ) => {
											setAttributes( {
												options: {
													...options,
													scales: {
														...options.scales,
														x: {
															...options.scales.x,
															ticks: {
																...options
																	.scales.x
																	.ticks,
																font: {
																	...options
																		.scales
																		.x.ticks
																		.font,
																	size: val,
																},
															},
														},
													},
												},
											} );
										} }
										min={ 0 }
										max={ 50 }
										isInline={ false }
										hasUnit={ false }
										isResponsive={ false }
										autoSyncRange={ true }
									/>
									<ABlocksColorControl
										label={ __(
											'Y-axis font Color',
											'ablocks'
										) }
										attributeValue={
											options.scales.y.ticks.color
										}
										onChangeHandler={ ( _, val ) => {
											const colorVal = val.startsWith(
												'var:preset'
											)
												? val.split( '|' )[ 1 ]
												: val;
											setAttributes( {
												options: {
													...options,
													scales: {
														...options.scales,
														y: {
															...options.scales.y,
															ticks: {
																...options
																	.scales.y
																	.ticks,
																color: colorVal,
															},
														},
													},
												},
											} );
										} }
										showGlobal={ false }
									/>
									<ABlocksRangeControl
										label={ __(
											'Y-axis font size',
											'ablocks'
										) }
										attributeValue={
											options.scales.y.ticks.font.size ??
											'0'
										}
										onChangeHandler={ ( val, _ ) => {
											setAttributes( {
												options: {
													...options,
													scales: {
														...options.scales,
														y: {
															...options.scales.y,
															ticks: {
																...options
																	.scales.y
																	.ticks,
																font: {
																	...options
																		.scales
																		.y.ticks
																		.font,
																	size: val,
																},
															},
														},
													},
												},
											} );
										} }
										min={ 0 }
										max={ 50 }
										isInline={ false }
										hasUnit={ false }
										isResponsive={ false }
										autoSyncRange={ true }
									/>
								</>
							}
						/>
						{ data?.datasets?.map( ( dataset, index ) => {
							return dataset ? (
								<ABlocksPanelBody
									title={ __(
										`Dataset value ${ index + 1 }`,
										'ablocks'
									) }
									initialOpen={ false }
								>
									<ContentStyleTabs
										content={
											<>
												{
													<ABlocksTextControl
														label={ __(
															`Label :`,
															'ablocks'
														) }
														attributeValue={
															dataset.label
														}
														onChangeHandler={ (
															val
														) => {
															setAttributes( {
																data: {
																	...data,
																	datasets:
																		data.datasets.map(
																			(
																				dataset,
																				i
																			) =>
																				i ===
																				index
																					? {
																							...dataset,
																							label: val,
																					  }
																					: dataset
																		),
																},
															} );
														} }
														setAttributes={
															setAttributes
														}
														disableDynamicContent={
															true
														}
													/>
												}
												<Separator />
												<h3 className="ablocks-chart-block-values-title">
													Values
												</h3>
												{ dataset?.data?.map(
													( value, innerIndex ) => {
														return (
															<ABlocksTextControl
																label={ __(
																	`${ data?.labels[ innerIndex ] }`,
																	'ablocks'
																) }
																attributeValue={
																	value
																}
																onChangeHandler={ (
																	val
																) =>
																	updateDataValue(
																		val,
																		index,
																		innerIndex
																	)
																}
																setAttributes={
																	setAttributes
																}
																disableDynamicContent={
																	true
																}
															/>
														);
													}
												) }
												<div className="ablocks-chart-block-values-actions">
													<button
														className="ablocks-chart-block-duplicate-button"
														onClick={ () => {
															setAttributes( {
																data: {
																	...data,
																	datasets: [
																		...data.datasets,
																		dataset,
																	],
																},
															} );
														} }
													>
														Duplicate
													</button>
													<button
														className="ablocks-chart-block-remove-button"
														onClick={ () => {
															setAttributes( {
																data: {
																	...data,
																	datasets:
																		data.datasets.filter(
																			(
																				_,
																				i
																			) =>
																				i !==
																				index
																		),
																},
															} );
														} }
													>
														Remove
													</button>
												</div>
											</>
										}
										style={
											<>
												<ABlocksColorControl
													label={ __(
														'Background Color',
														'ablocks'
													) }
													attributeValue={
														dataset.backgroundColor
													}
													onChangeHandler={ (
														_,
														val
													) => {
														const colorVal =
															val.startsWith(
																'var:preset'
															)
																? val.split(
																		'|'
																  )[ 1 ]
																: val;
														setAttributes( {
															data: {
																...data,
																datasets:
																	data.datasets.map(
																		(
																			dataset,
																			i
																		) =>
																			i ===
																			index
																				? {
																						...dataset,
																						backgroundColor:
																							colorVal,
																				  }
																				: dataset
																	),
															},
														} );
													} }
													showGlobal={ false }
												/>
												<ABlocksColorControl
													label={ __(
														'Border Color',
														'ablocks'
													) }
													attributeValue={
														dataset.borderColor
													}
													onChangeHandler={ (
														_,
														val
													) => {
														const colorVal =
															val.startsWith(
																'var:preset'
															)
																? val.split(
																		'|'
																  )[ 1 ]
																: val;
														setAttributes( {
															data: {
																...data,
																datasets:
																	data.datasets.map(
																		(
																			dataset,
																			i
																		) =>
																			i ===
																			index
																				? {
																						...dataset,
																						borderColor:
																							colorVal,
																				  }
																				: dataset
																	),
															},
														} );
													} }
													showGlobal={ false }
												/>
												<ABlocksRangeControl
													label={ __(
														'Border width',
														'ablocks'
													) }
													attributeValue={
														dataset.borderWidth ??
														'0'
													}
													onChangeHandler={ (
														val,
														_
													) => {
														setAttributes( {
															data: {
																...data,
																datasets:
																	data.datasets.map(
																		(
																			dataset,
																			i
																		) =>
																			i ===
																			index
																				? {
																						...dataset,
																						borderWidth:
																							val,
																				  }
																				: dataset
																	),
															},
														} );
													} }
													min={ 0 }
													max={ 10 }
													isInline={ false }
													hasUnit={ false }
													isResponsive={ false }
													autoSyncRange={ true }
												/>
												<ABlocksSelectControl
													label={ __(
														'Point style',
														'ablocks'
													) }
													options={ [
														{
															label: 'Circle',
															value: 'circle',
														},
														{
															label: 'Cross',
															value: 'cross',
														},
														{
															label: 'Cross Rot',
															value: 'crossRot',
														},
														{
															label: 'Dash',
															value: 'dash',
														},
														{
															label: 'Line',
															value: 'line',
														},
														{
															label: 'Rect',
															value: 'rect',
														},
														{
															label: 'Rect Rounded',
															value: 'rectRounded',
														},
														{
															label: 'Rect Rot',
															value: 'rectRot',
														},
														{
															label: 'Star',
															value: 'star',
														},
														{
															label: 'Triangle',
															value: 'triangle',
														},
													] }
													attributeValue={
														dataset.pointStyle
													}
													onChangeHandler={ (
														val,
														_
													) => {
														setAttributes( {
															data: {
																...data,
																datasets:
																	data.datasets.map(
																		(
																			dataset,
																			i
																		) =>
																			i ===
																			index
																				? {
																						...dataset,
																						pointStyle:
																							val,
																				  }
																				: dataset
																	),
															},
														} );
													} }
												/>
												<ABlocksRangeControl
													label={ __(
														'Point size',
														'ablocks'
													) }
													attributeValue={
														dataset.pointRadius ??
														'8'
													}
													onChangeHandler={ (
														val,
														_
													) => {
														setAttributes( {
															data: {
																...data,
																datasets:
																	data.datasets.map(
																		(
																			dataset,
																			i
																		) =>
																			i ===
																			index
																				? {
																						...dataset,
																						pointRadius:
																							val,
																				  }
																				: dataset
																	),
															},
														} );
													} }
													min={ 0 }
													max={ 100 }
													isInline={ false }
													hasUnit={ false }
													isResponsive={ false }
													autoSyncRange={ true }
												/>
												<ABlocksRangeControl
													label={ __(
														'Point Hover size',
														'ablocks'
													) }
													attributeValue={
														dataset.pointHoverRadius ??
														'8'
													}
													onChangeHandler={ (
														val,
														_
													) => {
														setAttributes( {
															data: {
																...data,
																datasets:
																	data.datasets.map(
																		(
																			dataset,
																			i
																		) =>
																			i ===
																			index
																				? {
																						...dataset,
																						pointHoverRadius:
																							val,
																				  }
																				: dataset
																	),
															},
														} );
													} }
													min={ 0 }
													max={ 100 }
													isInline={ false }
													hasUnit={ false }
													isResponsive={ false }
													autoSyncRange={ true }
												/>
											</>
										}
									/>
								</ABlocksPanelBody>
							) : null;
						} ) }
						<button
							className="ablocks-chart-block-add-button"
							onClick={ () => {
								setAttributes( {
									data: {
										...data,
										datasets: [
											...data.datasets,
											{
												label: 'Test',
												data: Array.from(
													{
														length: data.labels
															.length,
													},
													() =>
														Math.floor(
															Math.random() *
																( 1000 -
																	100 +
																	1 )
														) + 100
												),
												backgroundColor:
													generateUniqueColor(
														data.datasets.map(
															( val ) =>
																val.backgroundColor
														)
													),
												borderColor:
													generateUniqueColor(
														data.datasets.map(
															( val ) =>
																val.borderColor
														)
													),
												borderWidth: 1,
											},
										],
									},
								} );
							} }
						>
							<span className="ablocks-icon ablocks-icon--plus"></span>
							Add dataset value
						</button>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Chart settings', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'Chart type', 'ablocks' ) }
										options={ [
											{
												label: 'Bar',
												value: 'bar',
											},
											{
												label: 'Line',
												value: 'line',
											},
											{
												label: 'Pie',
												value: 'pie',
											},
											{
												label: 'Polar area',
												value: 'polarArea',
											},
											{
												label: 'Radar',
												value: 'radar',
											},
										] }
										attributeName="chartType"
										attributeValue={ chartType }
										setAttributes={ setAttributes }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow title"
										attributeValue={
											options.plugins.title.display
										}
										onChangeHandler={ ( val ) => {
											setAttributes( {
												options: {
													...options,
													plugins: {
														...options.plugins,
														title: {
															...options.plugins
																.title,
															display: val,
														},
													},
												},
											} );
										} }
										attributeName="allowTitle"
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow subtitle"
										attributeValue={
											options.plugins.subtitle.display
										}
										onChangeHandler={ ( val ) => {
											setAttributes( {
												options: {
													...options,
													plugins: {
														...options.plugins,
														subtitle: {
															...options.plugins
																.subtitle,
															display: val,
														},
													},
												},
											} );
										} }
										attributeName="allowSubTitle"
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow X-axis Title"
										attributeValue={
											options.scales.x.title.display
										}
										onChangeHandler={ ( val ) => {
											setAttributes( {
												options: {
													...options,
													scales: {
														...options.scales,
														x: {
															...options.scales.x,
															title: {
																...options
																	.scales.x
																	.title,
																display: val,
															},
														},
													},
												},
											} );
										} }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow Y-axis Title"
										attributeValue={
											options.scales.y.title.display
										}
										onChangeHandler={ ( val ) => {
											setAttributes( {
												options: {
													...options,
													scales: {
														...options.scales,
														y: {
															...options.scales.y,
															title: {
																...options
																	.scales.y
																	.title,
																display: val,
															},
														},
													},
												},
											} );
										} }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeValue={ chartBG }
										onChangeHandler={ ( _, val ) => {
											const colorVal = val.startsWith(
												'var:preset'
											)
												? val.split( '|' )[ 1 ]
												: val;
											setAttributes( {
												chartBG: colorVal,
											} );
										} }
										showGlobal={ false }
									/>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeValue={ chartWidth }
										attributeName={ 'chartWidth' }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										isInline={ false }
										min={ 0 }
										max={ 100 }
										unitOptions={ [
											{ value: '%', label: '%' },
										] }
										hasUnit={ true }
										isResponsive={ true }
										attributeDefaultValue={
											chartWidthDefaultAttributeValue
										}
									/>

									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow X-axis grid"
										attributeValue={
											options.scales.x.grid.display
										}
										onChangeHandler={ ( val ) => {
											setAttributes( {
												options: {
													...options,
													scales: {
														...options.scales,
														x: {
															...options.scales.x,
															grid: {
																...options
																	.scales.x
																	.grid,
																display: val,
															},
														},
													},
												},
											} );
										} }
									/>
									{ options?.scales.x.grid.display && (
										<>
											<ABlocksColorControl
												label={ __(
													'X-axis grid Color',
													'ablocks'
												) }
												attributeValue={
													options.scales.x.grid.color
												}
												onChangeHandler={ (
													_,
													val
												) => {
													const colorVal =
														val.startsWith(
															'var:preset'
														)
															? val.split(
																	'|'
															  )[ 1 ]
															: val;
													setAttributes( {
														options: {
															...options,
															scales: {
																...options.scales,
																x: {
																	...options
																		.scales
																		.x,
																	grid: {
																		...options
																			.scales
																			.x
																			.grid,
																		color: colorVal,
																	},
																},
															},
														},
													} );
												} }
												showGlobal={ false }
											/>
											<ABlocksRangeControl
												label={ __(
													'X-axis grid size',
													'ablocks'
												) }
												attributeValue={
													options.scales.x.grid
														.lineWidth ?? '1'
												}
												onChangeHandler={ (
													val,
													_
												) => {
													setAttributes( {
														options: {
															...options,
															scales: {
																...options.scales,
																x: {
																	...options
																		.scales
																		.x,
																	grid: {
																		...options
																			.scales
																			.x
																			.grid,
																		lineWidth:
																			val,
																	},
																},
															},
														},
													} );
												} }
												min={ 0 }
												max={ 50 }
												isInline={ false }
												hasUnit={ false }
												isResponsive={ false }
												autoSyncRange={ true }
											/>
										</>
									) }
									<ABlocksToggleControl
										isResponsive={ false }
										label="Allow Y-axis grid"
										attributeValue={
											options.scales.y.grid.display
										}
										onChangeHandler={ ( val ) => {
											setAttributes( {
												options: {
													...options,
													scales: {
														...options.scales,
														y: {
															...options.scales.y,
															grid: {
																...options
																	.scales.y
																	.grid,
																display: val,
															},
														},
													},
												},
											} );
										} }
									/>
									{ options?.scales.y.grid.display && (
										<>
											<ABlocksColorControl
												label={ __(
													'Y-axis grid Color',
													'ablocks'
												) }
												attributeValue={
													options.scales.y.grid.color
												}
												onChangeHandler={ (
													_,
													val
												) => {
													const colorVal =
														val.startsWith(
															'var:preset'
														)
															? val.split(
																	'|'
															  )[ 1 ]
															: val;
													setAttributes( {
														options: {
															...options,
															scales: {
																...options.scales,
																y: {
																	...options
																		.scales
																		.y,
																	grid: {
																		...options
																			.scales
																			.y
																			.grid,
																		color: colorVal,
																	},
																},
															},
														},
													} );
												} }
												showGlobal={ false }
											/>
											<ABlocksRangeControl
												label={ __(
													'Y-axis grid size',
													'ablocks'
												) }
												attributeValue={
													options.scales.y.grid
														.lineWidth ?? '1'
												}
												onChangeHandler={ (
													val,
													_
												) => {
													setAttributes( {
														options: {
															...options,
															scales: {
																...options.scales,
																y: {
																	...options
																		.scales
																		.y,
																	grid: {
																		...options
																			.scales
																			.y
																			.grid,
																		lineWidth:
																			val,
																	},
																},
															},
														},
													} );
												} }
												min={ 0 }
												max={ 50 }
												isInline={ false }
												hasUnit={ false }
												isResponsive={ false }
												autoSyncRange={ true }
											/>
										</>
									) }
								</>
							}
						/>
					</ABlocksPanelBody>

					{ options.scales.x.title.display ? (
						<ABlocksPanelBody
							title={ __( 'X-axis Title', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksTextareaControl
											label={ __( 'Title', 'ablocks' ) }
											attributeValue={
												options.scales.x.title.text
											}
											onChangeHandler={ ( val ) => {
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															x: {
																...options
																	.scales.x,
																title: {
																	...options
																		.scales
																		.x
																		.title,
																	text: val,
																},
															},
														},
													},
												} );
											} }
											placeholder={ __(
												'Enter your title'
											) }
											disableDynamicContent={ true }
										/>
										<ABlocksAlignmentControl
											label={ __(
												'Alignment',
												'ablocks'
											) }
											isResponsive={ false }
											options={ [
												{
													label: __(
														'Start',
														'ablocks'
													),
													value: 'start',
													icon: 'left',
												},
												{
													label: __(
														'Center',
														'ablocks'
													),
													value: 'center',
													icon: 'center',
												},
												{
													label: __(
														'End',
														'ablocks'
													),
													value: 'end',
													icon: 'right',
												},
											] }
											attributeValue={
												options.scales.x.title.align
											}
											onChangeHandler={ ( val ) => {
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															x: {
																...options
																	.scales.x,
																title: {
																	...options
																		.scales
																		.x
																		.title,
																	align: val,
																},
															},
														},
													},
												} );
											} }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeValue={
												options.scales.x.title.color
											}
											onChangeHandler={ ( _, val ) => {
												const colorVal = val.startsWith(
													'var:preset'
												)
													? val.split( '|' )[ 1 ]
													: val;
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															x: {
																...options
																	.scales.x,
																title: {
																	...options
																		.scales
																		.x
																		.title,
																	color: colorVal,
																},
															},
														},
													},
												} );
											} }
											showGlobal={ false }
										/>
										<ABlocksRangeControl
											label={ __(
												'Font size',
												'ablocks'
											) }
											attributeValue={
												options.scales.x.title.font
													.size ?? '0'
											}
											onChangeHandler={ ( val, _ ) => {
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															x: {
																...options
																	.scales.x,
																title: {
																	...options
																		.scales
																		.x
																		.title,
																	font: {
																		...options
																			.scales
																			.x
																			.title
																			.font,
																		size: val,
																	},
																},
															},
														},
													},
												} );
											} }
											min={ 0 }
											max={ 50 }
											isInline={ false }
											hasUnit={ false }
											isResponsive={ false }
											autoSyncRange={ true }
										/>
										<ABlocksSelectControl
											label={ __(
												'Font weight',
												'ablocks'
											) }
											options={ [
												{
													label: 'Normal',
													value: 'normal',
												},
												{
													label: 'Bold',
													value: 'bold',
												},
												{
													label: 'Lighter',
													value: 'lighter',
												},
												{
													label: 'Bolder',
													value: 'bolder',
												},
											] }
											attributeValue={
												options.scales.x.title.font
													.weight ?? 'normal'
											}
											onChangeHandler={ ( val, _ ) => {
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															x: {
																...options
																	.scales.x,
																title: {
																	...options
																		.scales
																		.x
																		.title,
																	font: {
																		...options
																			.scales
																			.x
																			.title
																			.font,
																		weight: val,
																	},
																},
															},
														},
													},
												} );
											} }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) : null }
					{ options.scales.y.title.display ? (
						<ABlocksPanelBody
							title={ __( 'Y-axis Title', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksTextareaControl
											label={ __( 'Title', 'ablocks' ) }
											attributeValue={
												options.scales.y.title.text
											}
											onChangeHandler={ ( val ) => {
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															y: {
																...options
																	.scales.y,
																title: {
																	...options
																		.scales
																		.y
																		.title,
																	text: val,
																},
															},
														},
													},
												} );
											} }
											placeholder={ __(
												'Enter your title'
											) }
											disableDynamicContent={ true }
										/>
										<ABlocksAlignmentControl
											label={ __(
												'Alignment',
												'ablocks'
											) }
											isResponsive={ false }
											options={ [
												{
													label: __(
														'Start',
														'ablocks'
													),
													value: 'start',
													icon: 'left',
												},
												{
													label: __(
														'Center',
														'ablocks'
													),
													value: 'center',
													icon: 'center',
												},
												{
													label: __(
														'End',
														'ablocks'
													),
													value: 'end',
													icon: 'right',
												},
											] }
											attributeValue={
												options.scales.y.title.align
											}
											onChangeHandler={ ( val ) => {
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															y: {
																...options
																	.scales.y,
																title: {
																	...options
																		.scales
																		.y
																		.title,
																	align: val,
																},
															},
														},
													},
												} );
											} }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeValue={
												options.scales.y.title.color
											}
											onChangeHandler={ ( _, val ) => {
												const colorVal = val.startsWith(
													'var:preset'
												)
													? val.split( '|' )[ 1 ]
													: val;
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															y: {
																...options
																	.scales.y,
																title: {
																	...options
																		.scales
																		.y
																		.title,
																	color: colorVal,
																},
															},
														},
													},
												} );
											} }
											showGlobal={ false }
										/>
										<ABlocksRangeControl
											label={ __(
												'Font size',
												'ablocks'
											) }
											attributeValue={
												options.scales.y.title.font
													.size ?? '0'
											}
											onChangeHandler={ ( val, _ ) => {
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															y: {
																...options
																	.scales.y,
																title: {
																	...options
																		.scales
																		.y
																		.title,
																	font: {
																		...options
																			.scales
																			.y
																			.title
																			.font,
																		size: val,
																	},
																},
															},
														},
													},
												} );
											} }
											min={ 0 }
											max={ 50 }
											isInline={ false }
											hasUnit={ false }
											isResponsive={ false }
											autoSyncRange={ true }
										/>
										<ABlocksSelectControl
											label={ __(
												'Font weight',
												'ablocks'
											) }
											options={ [
												{
													label: 'Normal',
													value: 'normal',
												},
												{
													label: 'Bold',
													value: 'bold',
												},
												{
													label: 'Lighter',
													value: 'lighter',
												},
												{
													label: 'Bolder',
													value: 'bolder',
												},
											] }
											attributeValue={
												options.scales.y.title.font
													.weight ?? 'normal'
											}
											onChangeHandler={ ( val, _ ) => {
												setAttributes( {
													options: {
														...options,
														scales: {
															...options.scales,
															y: {
																...options
																	.scales.y,
																title: {
																	...options
																		.scales
																		.y
																		.title,
																	font: {
																		...options
																			.scales
																			.y
																			.title
																			.font,
																		weight: val,
																	},
																},
															},
														},
													},
												} );
											} }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) : null }

					{ options.plugins.title.display ? (
						<ABlocksPanelBody
							title={ __( 'Title', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksTextareaControl
											label={ __( 'Title', 'ablocks' ) }
											attributeValue={
												options.plugins.title.text
											}
											onChangeHandler={ ( val ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															title: {
																...options
																	.plugins
																	.title,
																text: val,
															},
														},
													},
												} );
											} }
											placeholder={ __(
												'Enter your title'
											) }
											disableDynamicContent={ true }
										/>
										<ABlocksAlignmentControl
											label={ __(
												'Alignment',
												'ablocks'
											) }
											isResponsive={ false }
											options={ [
												{
													label: __(
														'Start',
														'ablocks'
													),
													value: 'start',
													icon: 'left',
												},
												{
													label: __(
														'Center',
														'ablocks'
													),
													value: 'center',
													icon: 'center',
												},
												{
													label: __(
														'End',
														'ablocks'
													),
													value: 'end',
													icon: 'right',
												},
											] }
											attributeValue={
												options.plugins.title.align
											}
											onChangeHandler={ ( val ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															title: {
																...options
																	.plugins
																	.title,
																align: val,
															},
														},
													},
												} );
											} }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeValue={
												options.plugins.title.color
											}
											onChangeHandler={ ( _, val ) => {
												const colorVal = val.startsWith(
													'var:preset'
												)
													? val.split( '|' )[ 1 ]
													: val;
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															title: {
																...options
																	.plugins
																	.title,
																color: colorVal,
															},
														},
													},
												} );
											} }
											showGlobal={ false }
										/>
										<ABlocksRangeControl
											label={ __(
												'Font size',
												'ablocks'
											) }
											attributeValue={
												options.plugins.title.font
													.size ?? '0'
											}
											onChangeHandler={ ( val, _ ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															title: {
																...options
																	.plugins
																	.title,
																font: {
																	...options
																		.plugins
																		.title
																		.font,
																	size: val,
																},
															},
														},
													},
												} );
											} }
											min={ 0 }
											max={ 50 }
											isInline={ false }
											hasUnit={ false }
											isResponsive={ false }
											autoSyncRange={ true }
										/>
										<ABlocksSelectControl
											label={ __(
												'Font weight',
												'ablocks'
											) }
											options={ [
												{
													label: 'Normal',
													value: 'normal',
												},
												{
													label: 'Bold',
													value: 'bold',
												},
												{
													label: 'Lighter',
													value: 'lighter',
												},
												{
													label: 'Bolder',
													value: 'bolder',
												},
											] }
											attributeValue={
												options.plugins.title.font
													.weight ?? 'top'
											}
											onChangeHandler={ ( val, _ ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															title: {
																...options
																	.plugins
																	.title,
																font: {
																	...options
																		.plugins
																		.title
																		.font,
																	weight: val,
																},
															},
														},
													},
												} );
											} }
										/>
										<ABlocksRangeControl
											label={ __( 'Padding', 'ablocks' ) }
											attributeValue={
												options.plugins.title.padding ??
												'0'
											}
											onChangeHandler={ ( val, _ ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															title: {
																...options
																	.plugins
																	.title,
																padding: val,
															},
														},
													},
												} );
											} }
											min={ 0 }
											max={ 50 }
											isInline={ false }
											hasUnit={ false }
											isResponsive={ false }
											autoSyncRange={ true }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) : null }
					{ options.plugins.subtitle.display ? (
						<ABlocksPanelBody
							title={ __( 'Sub Title', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksTextareaControl
											label={ __(
												'Sub Title',
												'ablocks'
											) }
											attributeValue={
												options.plugins.subtitle.text
											}
											onChangeHandler={ ( val ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															subtitle: {
																...options
																	.plugins
																	.subtitle,
																text: val,
															},
														},
													},
												} );
											} }
											placeholder={ __(
												'Enter your title'
											) }
											disableDynamicContent={ true }
										/>
										<ABlocksAlignmentControl
											label={ __(
												'Alignment',
												'ablocks'
											) }
											isResponsive={ false }
											options={ [
												{
													label: __(
														'Start',
														'ablocks'
													),
													value: 'start',
													icon: 'left',
												},
												{
													label: __(
														'Center',
														'ablocks'
													),
													value: 'center',
													icon: 'center',
												},
												{
													label: __(
														'End',
														'ablocks'
													),
													value: 'end',
													icon: 'right',
												},
											] }
											attributeValue={
												options.plugins.subtitle.align
											}
											onChangeHandler={ ( val ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															subtitle: {
																...options
																	.plugins
																	.subtitle,
																align: val,
															},
														},
													},
												} );
											} }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeValue={
												options.plugins.subtitle.color
											}
											onChangeHandler={ ( _, val ) => {
												const colorVal = val.startsWith(
													'var:preset'
												)
													? val.split( '|' )[ 1 ]
													: val;
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															subtitle: {
																...options
																	.plugins
																	.subtitle,
																color: colorVal,
															},
														},
													},
												} );
											} }
											showGlobal={ false }
										/>
										<ABlocksRangeControl
											label={ __(
												'Font size',
												'ablocks'
											) }
											attributeValue={
												options.plugins.subtitle.font
													.size ?? '0'
											}
											onChangeHandler={ ( val, _ ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															subtitle: {
																...options
																	.plugins
																	.subtitle,
																font: {
																	...options
																		.plugins
																		.subtitle
																		.font,
																	size: val,
																},
															},
														},
													},
												} );
											} }
											min={ 0 }
											max={ 50 }
											isInline={ false }
											hasUnit={ false }
											isResponsive={ false }
											autoSyncRange={ true }
										/>
										<ABlocksSelectControl
											label={ __(
												'Font weight',
												'ablocks'
											) }
											options={ [
												{
													label: 'Normal',
													value: 'normal',
												},
												{
													label: 'Bold',
													value: 'bold',
												},
												{
													label: 'Lighter',
													value: 'lighter',
												},
												{
													label: 'Bolder',
													value: 'bolder',
												},
											] }
											attributeValue={
												options.plugins.subtitle.font
													.weight ?? 'top'
											}
											onChangeHandler={ ( _, val ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															subtitle: {
																...options
																	.plugins
																	.subtitle,
																font: {
																	...options
																		.plugins
																		.subtitle
																		.font,
																	weight: val,
																},
															},
														},
													},
												} );
											} }
										/>
										<ABlocksRangeControl
											label={ __( 'Padding', 'ablocks' ) }
											attributeValue={
												options.plugins.subtitle
													.padding ?? '0'
											}
											onChangeHandler={ ( val, _ ) => {
												setAttributes( {
													options: {
														...options,
														plugins: {
															...options.plugins,
															subtitle: {
																...options
																	.plugins
																	.subtitle,
																padding: val,
															},
														},
													},
												} );
											} }
											min={ 0 }
											max={ 50 }
											isInline={ false }
											hasUnit={ false }
											isResponsive={ false }
											autoSyncRange={ true }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) : null }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
