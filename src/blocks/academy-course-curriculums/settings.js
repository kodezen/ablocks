import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksSelectControl from '@Controls/select';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ControlLabel from '@Components/control-label';

import {
	lockIconSize,
	readIconSize as readIconDefaultAttributeValue,
} from './attributes';
import { useSelect } from '@wordpress/data';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		contentColor,
		contentColorH,
		contentTypography,
		course_id,
		heading_color,
		heading_color_hover,
		heading_typography,
		title_color,
		title_color_hover,
		title_typography,
		lesson_list_bg,
		lesson_list_hover,
		lock_icon_hover,
		lock_icon_color,
		lock_icon_size,
		readIconSize,
		read_icon_color,
		read_icon_hover,
		title_bg,
		title_bg_hover,
	} = attributes;

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
					<ABlocksPanelBody
						title={ __( 'Course Options', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<ABlocksSelectControl
									options={ courseOptions }
									label={ __( 'Select Course', 'ablocks' ) }
									attributeValue={ course_id }
									attributeName={ 'course_id' }
									setAttributes={ setAttributes }
								/>
							}
							style={
								<>
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
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="heading_color"
													attributeValue={
														heading_color
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
													attributeName="heading_color_hover"
													attributeValue={
														heading_color_hover
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator />
									<ControlLabel
										label="Curriculum Header"
										isResponsive={ false }
										isHeader={ true }
									/>

									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="title_typography"
										attributeValue={ title_typography }
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
													attributeName="title_color"
													attributeValue={
														title_color
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="title_bg"
													attributeValue={ title_bg }
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
													attributeName="title_color_hover"
													attributeValue={
														title_color_hover
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="title_bg_hover"
													attributeValue={
														title_bg_hover
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator />
									<ControlLabel
										label={ __(
											'Course Content Style',
											'ablocks'
										) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="contentTypography"
										attributeValue={ contentTypography }
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
													attributeName="contentColor"
													attributeValue={
														contentColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="lesson_list_bg"
													attributeValue={
														lesson_list_bg
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
													attributeName="contentColorH"
													attributeValue={
														contentColorH
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="lesson_list_hover"
													attributeValue={
														lesson_list_hover
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
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Icon Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<h2 className="ablocks-settings-section-title">
							{ __( 'Lock Icon Style', 'academy-blocks' ) }
						</h2>
						<ContentStyleTabs
							content={
								<ABlocksRangeControl
									label={ __( 'Lock Icon' ) }
									attributeValue={ lock_icon_size }
									setAttributes={ setAttributes }
									attributeName="lock_icon_size"
									min={ 0 }
									step={ 1 }
									max={ 200 }
									isInline={ false }
									hasUnit={ true }
									isResponsive={ true }
									attributeObjectKey="value"
									attributeDefaultValue={ lockIconSize }
								/>
							}
							style={
								<>
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
													attributeName="lock_icon_color"
													attributeValue={
														lock_icon_color
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
													attributeName="lock_icon_hover"
													attributeValue={
														lock_icon_hover
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
							label="Read Icon Style"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ContentStyleTabs
							content={
								<ABlocksRangeControl
									label={ __( 'Icon Size', 'ablocks' ) }
									min={ 0 }
									max={ 200 }
									hasUnit={ true }
									isInline={ false }
									isResponsive={ true }
									attributeName="readIconSize"
									attributeValue={ readIconSize }
									setAttributes={ setAttributes }
									attributeObjectKey="value"
									attributeDefaultValue={
										readIconDefaultAttributeValue
									}
								/>
							}
							style={
								<>
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
													attributeName="read_icon_color"
													attributeValue={
														read_icon_color
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
													attributeName="read_icon_hover"
													attributeValue={
														read_icon_hover
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
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
