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
import { sectionWidth, startSize as startSizeValue } from './attributes';
import { useSelect } from '@wordpress/data';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		course_id,
		box_width,
		box_transition,
		review_bg_hover,
		review_bg,
		padding,
		boxShadow,
		border,
		review_btn,
		review_btn_hover,
		btn_transition,
		review_btn_typography,
		button_padding,
		review_btn_bg_hover,
		review_btn_bg,
		starColorH,
		starColor,
		startT,
		startSize,
		formTypography,
		formBg,
		formBgH,
		formTransition,
		formColor,
		formColorH,
		formBorder,
		formBtnTypography,
		formBtnColorH,
		formBtnColor,
		formBtnBgH,
		formBtnBg,
		formBtnT,
		formBtnPadding,
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
					<ABlocksPanelBody
						title={ __( 'Layout Options', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksSelectControl
							options={ courseOptions }
							label={ __( 'Select Course', 'ablocks' ) }
							attributeValue={ course_id }
							attributeName={ 'course_id' }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __(
							'Average Rating Section',
							'academy-blocks'
						) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<ABlocksRangeControl
									label={ __( 'Width', 'ablocks' ) }
									attributeName="box_width"
									attributeObjectKey="value"
									attributeValue={ box_width }
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
											box_width[
												'valueUnit' + deviceType
											] ?? '%'
										)
											? 100
											: 1600
									}
									attributeDefaultValue={ sectionWidth }
									autoSyncRange={ true }
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
														'Background',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="review_bg"
													attributeValue={ review_bg }
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
														'Background Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="review_bg_hover"
													attributeValue={
														review_bg_hover
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
														box_transition
													}
													attributeName={
														'box_transition'
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
										label={ __( 'Padding', 'ablocks' ) }
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
										label={ __( 'Box Shadow', 'ablocks' ) }
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
										label={ __( 'Border', 'ablocks' ) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="border"
										attributeValue={ border }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Button Setting', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="review_btn_typography"
							attributeValue={ review_btn_typography }
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
										attributeName="review_btn"
										attributeValue={ review_btn }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isResponsive={ false }
										attributeName="review_btn_bg"
										attributeValue={ review_btn_bg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="review_btn_hover"
										attributeValue={ review_btn_hover }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Hover',
											'ablocks'
										) }
										isResponsive={ false }
										attributeName="review_btn_bg_hover"
										attributeValue={ review_btn_bg_hover }
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
										attributeValue={ btn_transition }
										attributeName={ 'btn_transition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Section Padding"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="button_padding"
							attributeValue={ button_padding }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'From Section' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<ABlocksRangeControl
									label={ __( 'Star Width', 'ablocks' ) }
									min={ 0 }
									max={ 100 }
									step={ 1 }
									hasUnit={ true }
									isInline={ false }
									isResponsive={ true }
									attributeValue={ startSize }
									attributeName={ 'startSize' }
									setAttributes={ setAttributes }
									attributeDefaultValue={ startSizeValue }
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
					<ABlocksPanelBody
						title={ __( 'From Style' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="formTypography"
							attributeValue={ formTypography }
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
										label={ __( 'Background', 'ablocks' ) }
										isResponsive={ false }
										attributeName="formBg"
										attributeValue={ formBg }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="formColor"
										attributeValue={ formColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Hover',
											'ablocks'
										) }
										isResponsive={ false }
										attributeName="formBgH"
										attributeValue={ formBgH }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="formColorH"
										attributeValue={ formColorH }
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
										attributeValue={ formTransition }
										attributeName={ 'formTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="formBorder"
							attributeValue={ formBorder }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Form Button Style' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="formBtnTypography"
							attributeValue={ formBtnTypography }
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
										attributeName="formBtnColor"
										attributeValue={ formBtnColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isResponsive={ false }
										attributeName="formBtnBg"
										attributeValue={ formBtnBg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="formBtnColorH"
										attributeValue={ formBtnColorH }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Hover',
											'ablocks'
										) }
										isResponsive={ false }
										attributeName="formBtnBgH"
										attributeValue={ formBtnBgH }
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
										attributeValue={ formBtnT }
										attributeName={ 'formBtnT' }
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
							attributeName="formBtnPadding"
							attributeValue={ formBtnPadding }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
