import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import { HTMLTagLists } from '@Controls/select/helper';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksTextareaControl from '@Controls/textarea';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';

// colors
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';

const HeadingSettings = ( props ) => {
	const { attributes, setAttributes, context } = props;
	const {
		heading,
		headingTag,
		headingTypography,
		headingTextShadow,
		headingTextStroke,
		headingTextColor,
		headingTextColorHover,
		headingMargin,
	} = attributes;
	return (
		<ABlocksPanelBody
			title={ __( 'Heading', 'ablocks' ) }
			initialOpen={ false }
		>
			<ContentStyleTabs
				content={
					<>
						<ABlocksTextareaControl
							label={ __( 'Title', 'ablocks' ) }
							attributeName="heading"
							attributeValue={ heading }
							setAttributes={ setAttributes }
							placeholder={ __( 'Enter your title' ) }
							context={ context }
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
					</>
				}
				style={
					<>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="headingTypography"
							attributeValue={ headingTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksTextShadow
							label={ __( 'Text Shadow', 'ablocks' ) }
							attributeName="headingTextShadow"
							attributeValue={ headingTextShadow }
							setAttributes={ setAttributes }
							isResponsive={ false }
						/>
						<ABlocksTextStroke
							label={ __( 'Text Stroke', 'ablocks' ) }
							attributeName="headingTextStroke"
							attributeValue={ headingTextStroke }
							setAttributes={ setAttributes }
							isResponsive={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="headingTextColor"
										attributeValue={ headingTextColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="headingTextColorHover"
										attributeValue={ headingTextColorHover }
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
											attributes?.headingTransition || 0
										}
										attributeName={ 'headingTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<ABlocksDimensions
							label={ __( 'Margin', 'ablocks' ) }
							isResponsive={ true }
							attributeName="headingMargin"
							attributeValue={ headingMargin }
							setAttributes={ setAttributes }
						/>
					</>
				}
			/>
		</ABlocksPanelBody>
	);
};

export default HeadingSettings;
