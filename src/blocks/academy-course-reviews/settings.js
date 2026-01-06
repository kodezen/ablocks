import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksSelectControl from '@Controls/select';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksBorderControl from '@Controls/border';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ControlLabel from '@Components/control-label';
import ContentStyleTabs from '@Components/content-style-tabs';
import Separator from '@Components/separator';
import getDeviceType from '@Utils/get-device-type';
import { ratingSize, sectionHeight, sectionWidth } from './attributes';
import { useSelect } from '@wordpress/data';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		course_id,
		heading_color,
		heading_hover_color,
		heading_typography,
		padding,
		boxShadow,
		border,
		transition,
		section_bg,
		section_bg_hover,
		avg_typography,
		avg_color,
		avg_transition,
		avg_color_hover,
		rating_color,
		rating_color_hover,
		rating_transition,
		rating_size,
		section_height,
		section_width,
		total_transition,
		total_typography,
		total_rating_color,
		total_rating_hover,
		listT,
		listColorH,
		listColor,
		listTypography,
		startSize,
		startT,
		starColorH,
		starColor,
		fillBg,
		fillBgH,
		fillT,
		fillAT,
		fillABg,
		fillABgH,
	} = attributes;
	const deviceType = getDeviceType();

	const courses = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords(
			'postType',
			'academy_courses',
			{
				per_page: -1,
			}
		);
	}, [] );

	const filteredCourses = courses
		? courses.filter( ( course ) => {
				return course;
		  } )
		: [];

	const courseOptions = filteredCourses
		? filteredCourses.map( ( p ) => ( {
				label: p.title?.rendered,
				value: p.id,
		  } ) )
		: [];
	courseOptions.unshift( {
		label: 'Select a Course',
		value: 0,
	} );

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					{ /* <ABlocksPanelBody
						title={__('Layout Options', 'ablocks')}
						initialOpen={true}
					>
						<ABlocksSelectControl
							options={courseOptions}
							label={__('Select Course', 'ablocks')}
							attributeValue={course_id}
							attributeName={'course_id'}
							setAttributes={setAttributes}
						/>

					</ABlocksPanelBody> */ }
					<ABlocksPanelBody
						title={ __( 'Heading Style Options', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="heading_typography"
							attributeValue={ heading_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="heading_color"
										attributeValue={ heading_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="heading_hover_color"
										attributeValue={ heading_hover_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Rating Section', 'ablocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label={ __( 'Color' ) }
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isResponsive={ false }
										attributeName="section_bg"
										attributeValue={ section_bg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="section_bg_hover"
										attributeValue={ section_bg_hover }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Duration (ms)',
											'ablocks'
										) }
										min={ 0 }
										max={ 5 }
										step={ 0.01 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={ transition }
										attributeName={ 'transition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Padding"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="padding"
							attributeValue={ padding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Boz Shadow"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBoxShadowControl
							label={ __( 'Box shadow', 'ablocks' ) }
							attributeName="boxShadow"
							attributeValue={ boxShadow }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="border"
							attributeValue={ border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Average Rating', 'academy-blocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __(
											'Rating Icon Size',
											'ablocks'
										) }
										min={ 0 }
										step={ 1 }
										max={ 100 }
										hasUnit={ true }
										isInline={ false }
										isResponsive={ true }
										attributeValue={ rating_size }
										attributeName={ 'rating_size' }
										setAttributes={ setAttributes }
										attributeDefaultValue={ ratingSize }
									/>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeName="section_width"
										attributeObjectKey="value"
										attributeValue={ section_width }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ true }
										attributeDataType="object"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: '%', label: '%' },
											{ value: 'em', label: 'em' },
											{ value: 'rem', label: 'rem' },
											{ value: 'vw', label: 'vw' },
										] }
										min={ 0 }
										max={
											[ 'vw', '%' ].includes(
												section_width[
													'valueUnit' + deviceType
												] ?? '%'
											)
												? 100
												: 1600
										}
										attributeDefaultValue={ sectionWidth }
										autoSyncRange={ true }
									/>
									<ABlocksRangeControl
										label={ __( 'Height', 'ablocks' ) }
										attributeName="section_height"
										attributeObjectKey="value"
										attributeValue={ section_height }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ true }
										attributeDataType="object"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'vh', label: 'vh' },
											{ value: 'em', label: 'em' },
											{ value: 'rem', label: 'rem' },
											{ value: 'vw', label: 'vw' },
										] }
										min={ 0 }
										max={
											[ 'vw', 'vh' ].includes(
												section_height[
													'valueUnit' + deviceType
												] ?? 'vh'
											)
												? 100
												: 1600
										}
										attributeDefaultValue={ sectionHeight }
										autoSyncRange={ true }
									/>
								</>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="avg_typography"
										attributeValue={ avg_typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />
									<ControlLabel
										label="Color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="avg_color"
													attributeValue={ avg_color }
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="avg_color_hover"
													attributeValue={
														avg_color_hover
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Transition Duration (ms)',
														'ablocks'
													) }
													min={ 0 }
													max={ 5 }
													step={ 0.01 }
													hasUnit={ false }
													isInline={ false }
													isResponsive={ false }
													attributeValue={
														avg_transition
													}
													attributeName={
														'avg_transition'
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<ControlLabel
										label="Rating Icon Color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="rating_color"
													attributeValue={
														rating_color
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="rating_color_hover"
													attributeValue={
														rating_color_hover
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Transition Duration (ms)',
														'ablocks'
													) }
													min={ 0 }
													max={ 5 }
													step={ 0.01 }
													hasUnit={ false }
													isInline={ false }
													isResponsive={ false }
													attributeValue={
														rating_transition
													}
													attributeName={
														'rating_transition'
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Rating Text"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="total_typography"
							attributeValue={ total_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="total_rating_color"
										attributeValue={ total_rating_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="total_rating_hover"
										attributeValue={ total_rating_hover }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Duration (ms)',
											'ablocks'
										) }
										min={ 0 }
										max={ 5 }
										step={ 0.01 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={ total_transition }
										attributeName={ 'total_transition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Rating Fill Style"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="fillBg"
										attributeValue={ fillBg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="fillBgH"
										attributeValue={ fillBgH }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Duration (ms)',
											'ablocks'
										) }
										min={ 0 }
										max={ 5 }
										step={ 0.01 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={ fillT }
										attributeName={ 'fillT' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Rating Active Style"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="fillABg"
										attributeValue={ fillABg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="fillABgH"
										attributeValue={ fillABgH }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Duration (ms)',
											'ablocks'
										) }
										min={ 0 }
										max={ 5 }
										step={ 0.01 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={ fillAT }
										attributeName={ 'fillAT' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Feedback Overview', 'academy-blocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<ABlocksRangeControl
									label={ __( 'Icon Size', 'ablocks' ) }
									min={ 0 }
									max={ 500 }
									step={ 1 }
									hasUnit={ true }
									isInline={ false }
									isResponsive={ true }
									attributeValue={ startSize }
									attributeName={ 'startSize' }
									setAttributes={ setAttributes }
									attributeDefaultValue={ ratingSize }
								/>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="listTypography"
										attributeValue={ listTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />
									<ControlLabel
										label="Color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="listColor"
													attributeValue={ listColor }
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="listColorH"
													attributeValue={
														listColorH
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Transition Duration (ms)',
														'ablocks'
													) }
													min={ 0 }
													max={ 5 }
													step={ 0.01 }
													hasUnit={ false }
													isInline={ false }
													isResponsive={ false }
													attributeValue={ listT }
													attributeName={ 'listT' }
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator />
									<ControlLabel
										label="Icon Color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="starColor"
													attributeValue={ starColor }
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="starColorH"
													attributeValue={
														starColorH
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksRangeControl
													label={ __(
														'Transition Duration (ms)',
														'ablocks'
													) }
													min={ 0 }
													max={ 5 }
													step={ 0.01 }
													hasUnit={ false }
													isInline={ false }
													isResponsive={ false }
													attributeValue={ startT }
													attributeName={ 'startT' }
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
