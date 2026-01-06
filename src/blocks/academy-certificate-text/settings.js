import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { HTMLTagLists } from '@Controls/select/helper';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import InspectorTabs from '@Components/inspector-tabs';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextareaControl from '@Controls/textarea';
// colors
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
import { select, dispatch } from '@wordpress/data';
import { certificateFont } from './helper';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		heading,
		headingTag,
		alignment,
		typography,
		textShadow,
		textStroke,
		textColor,
	} = attributes;

	const postType = select( 'core/editor' ).getCurrentPostType();

	const description = (
		<>
			{ 'qp_certificate' === postType ? (
				<>
					{ sprintf(
						// translators: %1$s learner, %2$s: quiz title, %3$s completion date, %4$s total questions,
						__(
							'Customize certificate with these values: %1$s, %2$s, %3$s, %4$s',
							'ablocks'
						),
						'{{learner}}',
						'{{quiz_title}}',
						'{{completion_date}}',
						'{{total_questions}}'
					) }
				</>
			) : (
				<>
					{ sprintf(
						// translators: %1$s learner, %2$s: course title, %3$s instructor, %4$s course place, %5$s completion date, %6$s verification ID
						__(
							'Customize certificate with these values: %1$s, %2$s, %3$s, %4$s, %5$s, %6$s, %7$s, %8$s, %9$s, %10$s',
							'ablocks'
						),
						'{{learner}}',
						'{{course_title}}',
						'{{instructor}}',
						'{{course_place}}',
						'{{completion_date}}',
						'{{verification_id}}',
						'{{total_topics}}',
						'{{course_requirements}}',
						'{{course_materials}}',
						'{{what_you_will_learn}}'
					) }
					<br />
					{ sprintf(
						// translators: %s verification ID
						__( 'Academy LMS Pro Codes: %s', 'ablocks' ),
						'{{verification_id}}'
					) }
				</>
			) }
		</>
	);

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Title', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextareaControl
										label={ __( 'Title', 'ablocks' ) }
										description={ description }
										attributeName="heading"
										attributeValue={ heading }
										setAttributes={ setAttributes }
										placeholder={ __( 'Enter your title' ) }
									/>
									<Separator />
									<ABlocksSelectControl
										label={ __( 'HTML Tag', 'ablocks' ) }
										options={ HTMLTagLists }
										isSearch={ true }
										attributeName="headingTag"
										attributeValue={ headingTag }
										setAttributes={ setAttributes }
									/>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="textColor"
										attributeValue={ textColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="typography"
										attributeValue={ typography }
										setAttributes={ setAttributes }
										isResponsive={ false }
										showOnlyCustomFonts={ true }
										customFontsOption={ certificateFont }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="textShadow"
										attributeValue={ textShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksTextStroke
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeName="textStroke"
										attributeValue={ textStroke }
										setAttributes={ setAttributes }
										isResponsive={ true }
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
