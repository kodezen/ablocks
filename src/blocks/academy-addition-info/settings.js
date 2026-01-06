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
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';
import {} from './attributes';
import { useSelect } from '@wordpress/data';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		course_id,
		headingTypography,
		headingTransition,
		headingColorH,
		headingColor,
		listTransition,
		listTypography,
		listColorH,
		listColor,
		tabTypography,
		tabColor,
		tabColorH,
		tabTransition,
		listBorder,
		listMargin,
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
						title={ __( 'Heading Style', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="headingTypography"
							attributeValue={ headingTypography }
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
										attributeName="headingColor"
										attributeValue={ headingColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="headingColorH"
										attributeValue={ headingColorH }
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
										attributeValue={ headingTransition }
										attributeName={ 'headingTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'list Style', 'ablocks' ) }
						initialOpen={ true }
					>
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
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="listColor"
										attributeValue={ listColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="listColorH"
										attributeValue={ listColorH }
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
										attributeValue={ listTransition }
										attributeName={ 'listTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Tab Style', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="tabTypography"
							attributeValue={ tabTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel />
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="tabColor"
										attributeValue={ tabColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="tabColorH"
										attributeValue={ tabColorH }
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
										attributeValue={ tabTransition }
										attributeName={ 'tabTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Margin"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksDimensions
							label={ __( 'Margin', 'ablocks' ) }
							isResponsive={ true }
							attributeName="listMargin"
							attributeValue={ listMargin }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="listBorder"
							attributeValue={ listBorder }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
