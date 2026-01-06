import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import { HTMLTagLists } from '@Controls/select/helper';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextareaControl from '@Controls/textarea';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksRangeControl from '@Controls/range';

// colors
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';

const SubHeadingSettings = ( props ) => {
	const { attributes, setAttributes, context } = props;
	const {
		subHeading,
		subHeadingTag,
		subHeadingTypography,
		subHeadingTextShadow,
		subHeadingTextStroke,
		subHeadingTextColor,
		subHeadingTextColorHover,
		subHeadingMargin,
	} = attributes;
	return (
		<ABlocksPanelBody
			title={ __( 'Sub Heading', 'ablocks' ) }
			initialOpen={ false }
		>
			<ContentStyleTabs
				content={
					<>
						<ABlocksTextareaControl
							label={ __( 'Title', 'ablocks' ) }
							attributeName="subHeading"
							attributeValue={ subHeading }
							setAttributes={ setAttributes }
							placeholder={ __( 'Enter your title' ) }
							context={ context }
						/>
						<Separator />
						<ABlocksSelectControl
							label={ __( 'HTML Tag', 'ablocks' ) }
							options={ HTMLTagLists }
							isSearch={ true }
							attributeName="subHeadingTag"
							attributeValue={ subHeadingTag }
							setAttributes={ setAttributes }
						/>
					</>
				}
				style={
					<>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="subHeadingTypography"
							attributeValue={ subHeadingTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksTextShadow
							label={ __( 'Text Shadow', 'ablocks' ) }
							attributeName="subHeadingTextShadow"
							attributeValue={ subHeadingTextShadow }
							setAttributes={ setAttributes }
							isResponsive={ false }
						/>
						<ABlocksTextStroke
							label={ __( 'Text Stroke', 'ablocks' ) }
							attributeName="subHeadingTextStroke"
							attributeValue={ subHeadingTextStroke }
							setAttributes={ setAttributes }
							isResponsive={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="subHeadingTextColor"
										attributeValue={ subHeadingTextColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="subHeadingTextColorHover"
										attributeValue={
											subHeadingTextColorHover
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Duration',
											'ablocks'
										) }
										min={ 0 }
										max={ 5 }
										step={ 0.01 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={
											attributes?.subHeadingTransition ||
											0
										}
										attributeName={ 'subHeadingTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<ABlocksDimensions
							label={ __( 'Margin', 'ablocks' ) }
							isResponsive={ true }
							attributeName="subHeadingMargin"
							attributeValue={ subHeadingMargin }
							setAttributes={ setAttributes }
						/>
					</>
				}
			/>
		</ABlocksPanelBody>
	);
};

export default SubHeadingSettings;
