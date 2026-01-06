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
import { useSelect } from '@wordpress/data';
import ContentStyleTabs from '@Components/content-style-tabs';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		course_id,
		avatarWidth,
		avatarHeight,
		authorTransition,
		authorTypography,
		authorColor,
		authorHoverColor,
		dateTransition,
		dateHoverColor,
		dateColor,
		dateTypography,
		desTransition,
		desHoverColor,
		desTypography,
		desColor,
		sumTransition,
		sumColor,
		sumColorH,
		sumTypography,
		iconSize,
		iconColor,
		iconColorH,
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
						title={ __( 'Avatar Style', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksRangeControl
							label={ __( 'Avatar Height', 'ablocks' ) }
							min={ 0 }
							max={ 200 }
							step={ 1 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeValue={ avatarHeight }
							attributeName={ 'avatarHeight' }
							setAttributes={ setAttributes }
						/>
						<ABlocksRangeControl
							label={ __( 'Avatar Width', 'ablocks' ) }
							min={ 0 }
							max={ 200 }
							step={ 1 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeValue={ avatarWidth }
							attributeName={ 'avatarWidth' }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Author Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="authorTypography"
							attributeValue={ authorTypography }
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
										attributeName="authorColor"
										attributeValue={ authorColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="authorHoverColor"
										attributeValue={ authorHoverColor }
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
										attributeValue={ authorTransition }
										attributeName={ 'authorTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Date Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="dateTypography"
							attributeValue={ dateTypography }
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
										attributeName="dateColor"
										attributeValue={ dateColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="dateHoverColor"
										attributeValue={ dateHoverColor }
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
										attributeValue={ dateTransition }
										attributeName={ 'dateTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Description Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="desTypography"
							attributeValue={ desTypography }
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
										attributeName="desColor"
										attributeValue={ desColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="desHoverColor"
										attributeValue={ desHoverColor }
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
										attributeValue={ desTransition }
										attributeName={ 'desTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Rating Summary', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<ABlocksRangeControl
									label={ __( 'star Icon size', 'ablocks' ) }
									min={ 0 }
									max={ 200 }
									step={ 1 }
									hasUnit={ true }
									isInline={ false }
									isResponsive={ true }
									attributeValue={ iconSize }
									attributeName={ 'iconSize' }
									setAttributes={ setAttributes }
								/>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="sumTypography"
										attributeValue={ sumTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />
									<ControlLabel
										label={ __(
											'Rating Summary Color',
											'ablocks'
										) }
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
													attributeName="sumColor"
													attributeValue={ sumColor }
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
													attributeName="sumColorH"
													attributeValue={ sumColorH }
													setAttributes={
														setAttributes
													}
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
													attributeValue={
														sumTransition
													}
													attributeName={
														'sumTransition'
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
													attributeName="iconColor"
													attributeValue={ iconColor }
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
													attributeName="iconColorH"
													attributeValue={
														iconColorH
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
