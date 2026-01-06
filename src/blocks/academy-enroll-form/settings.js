import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import { useSelect } from '@wordpress/data';
import ABlocksSelectControl from '@Controls/select';
import { layoutOption } from './helper';
import ABlocksRangeControl from '@Controls/range';
import { modalWidth as modalWidthDefault } from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		course_id,
		start_btn_typography,
		start_btn_color,
		enroll_btn_color,
		start_btn_bg_color,
		enroll_btn_bg_color,
		start_btn_color_hover,
		enroll_btn_color_hover,
		start_btn_bg_hover_color,
		enroll_btn_bg_hover_color,
		start_btn_padding,
		enroll_btn_padding,
		start_btn_border,
		enroll_btn_border,
		enroll_btn_typography,
		layout,
		modalWidth,
		massage_title_bg,
		massage_title_color,
		massage_title_hover_bg,
		massage_title_hover_color,
		list_color,
		list_hover_color,
		price_hover_color,
		price_color,
		massage_title_typography,
		list_typography,
		price_typography,
		price_title_typography,
		price_title_hover_color,
		price_title_color,
		info_bg,
		info_bg_hover,
		info_color,
		info_color_hover,
		bgTransition,
		info_typography,
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
				const courseType = course.meta?.academy_course_type;
				return (
					courseType === 'free' ||
					courseType === 'paid' ||
					courseType === 'rcp_membership'
				);
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
						title={ __( 'Enroll Form Option', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksSelectControl
							options={ layoutOption }
							label={ __( 'Select Layout', 'ablocks' ) }
							attributeValue={ layout }
							attributeName={ 'layout' }
							setAttributes={ setAttributes }
						/>
						<ABlocksSelectControl
							options={ courseOptions }
							label={ __( 'Select Course', 'ablocks' ) }
							attributeValue={ course_id }
							attributeName={ 'course_id' }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Enroll Button Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="enroll_btn_typography"
							attributeValue={ enroll_btn_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color Settings"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="enroll_btn_color"
										attributeValue={ enroll_btn_color }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="enroll_btn_bg_color"
										attributeValue={ enroll_btn_bg_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="enroll_btn_color_hover"
										attributeValue={
											enroll_btn_color_hover
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="enroll_btn_bg_hover_color"
										attributeValue={
											enroll_btn_bg_hover_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>

						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="enroll_btn_padding"
							attributeValue={ enroll_btn_padding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border Settings"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="enroll_btn_border"
							attributeValue={ enroll_btn_border }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						initialOpen={ true }
						title={ __( 'Price Style', 'ablocks' ) }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="price_typography"
							attributeValue={ price_typography }
							setAttributes={ setAttributes }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="price_color"
										attributeValue={ price_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="price_hover_color"
										attributeValue={ price_hover_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<h2 className="ablocks-settings-section-title">
							{ __( 'Price Title', 'ablocks' ) }
						</h2>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="price_title_typography"
							attributeValue={ price_title_typography }
							setAttributes={ setAttributes }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="price_title_color"
										attributeValue={ price_title_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="price_title_hover_color"
										attributeValue={
											price_title_hover_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Enroll Info Style' ) }
						initialOpen={ true }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="info_typography"
							attributeValue={ info_typography }
							setAttributes={ setAttributes }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="info_color"
										attributeValue={ info_color }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="info_bg"
										attributeValue={ info_bg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="info_color_hover"
										attributeValue={ info_color_hover }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="info_bg_hover"
										attributeValue={ info_bg_hover }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Duration(ms)',
											'ablocks'
										) }
										min={ 0 }
										max={ 5 }
										step={ 0.1 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={ bgTransition }
										attributeName="bgTransition"
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					{ layout === 'new' ? (
						<>
							<ABlocksPanelBody
								title={ __( 'Prerequisites Style', 'ablocks' ) }
								initialOpen={ true }
							>
								<ABlocksRangeControl
									label={ __( 'Modal Width', 'ablocks' ) }
									min={ 0 }
									max={ 500 }
									step={ 1 }
									hasUnit={ false }
									isInline={ false }
									isResponsive={ true }
									attributeValue={ modalWidth }
									attributeName="modalWidth"
									setAttributes={ setAttributes }
									attributeDefaultValue={ modalWidthDefault }
								/>
								<ABlocksTypography
									label={ __( 'Typography', 'ablocks' ) }
									attributeName="massage_title_typography"
									attributeValue={ massage_title_typography }
									setAttributes={ setAttributes }
									isResponsive={ false }
									attributes={ attributes }
								/>
								<NormalHoverTabs
									normal={
										<>
											<ABlocksColorControl
												label={ __(
													'Background',
													'ablocks'
												) }
												attributeName="massage_title_bg"
												attributeValue={
													massage_title_bg
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="massage_title_color"
												attributeValue={
													massage_title_color
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
									hover={
										<>
											<ABlocksColorControl
												label={ __(
													'Background',
													'ablocks'
												) }
												attributeName="massage_title_hover_bg"
												attributeValue={
													massage_title_hover_bg
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="massage_title_hover_color"
												attributeValue={
													massage_title_hover_color
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
								/>
							</ABlocksPanelBody>
							<ABlocksPanelBody
								initialOpen={ true }
								title={ __(
									'Prerequisites List Style',
									'ablocks'
								) }
							>
								<ABlocksTypography
									label={ __( 'Typography', 'ablocks' ) }
									attributeName="list_typography"
									attributeValue={ list_typography }
									setAttributes={ setAttributes }
									isResponsive={ false }
									attributes={ attributes }
								/>
								<NormalHoverTabs
									normal={
										<>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="list_color"
												attributeValue={ list_color }
												setAttributes={ setAttributes }
											/>
										</>
									}
									hover={
										<>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="list_hover_color"
												attributeValue={
													list_hover_color
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
								/>
							</ABlocksPanelBody>
						</>
					) : (
						<>
							<ABlocksPanelBody
								title={ __( 'Start Button Style', 'ablocks' ) }
								initialOpen={ false }
							>
								<ABlocksTypography
									label={ __( 'Typography', 'ablocks' ) }
									attributeName="start_btn_typography"
									attributeValue={ start_btn_typography }
									setAttributes={ setAttributes }
									isResponsive={ true }
									attributes={ attributes }
								/>
								<Separator />
								<ControlLabel
									label="Color Settings"
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
												attributeName="start_btn_color"
												attributeValue={
													start_btn_color
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Background Color',
													'ablocks'
												) }
												attributeName="start_btn_bg_color"
												attributeValue={
													start_btn_bg_color
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
									hover={
										<>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="start_btn_color_hover"
												attributeValue={
													start_btn_color_hover
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Background Color',
													'ablocks'
												) }
												attributeName="start_btn_bg_hover_color"
												attributeValue={
													start_btn_bg_hover_color
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
								/>

								<ABlocksDimensions
									label={ __( 'Padding', 'ablocks' ) }
									isResponsive={ true }
									attributeName="start_btn_padding"
									attributeValue={ start_btn_padding }
									setAttributes={ setAttributes }
								/>
								<Separator />
								<ControlLabel
									label="Border Settings"
									isResponsive={ false }
									isHeader={ true }
								/>
								<ABlocksBorderControl
									attributeName="start_btn_border"
									attributeValue={ start_btn_border }
									setAttributes={ setAttributes }
								/>
							</ABlocksPanelBody>
						</>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
