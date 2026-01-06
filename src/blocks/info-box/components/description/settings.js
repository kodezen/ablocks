import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksToggleControl from '@Controls/toggleButton';
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

const ParagraphSettings = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		desSize,
		desTextShadow,
		desTypography,
		desTextColor,
		desTextColorHover,
		des,
		desTextStroke,
		desDropCaps,
		desDropCapsTextColor,
		desMargin,
	} = attributes;
	return (
		<ABlocksPanelBody
			title={ __( 'Description', 'ablocks' ) }
			initialOpen={ false }
		>
			<ContentStyleTabs
				content={
					<>
						<ABlocksTextareaControl
							label={ __( 'Title', 'ablocks' ) }
							attributeName="des"
							attributeValue={ des }
							setAttributes={ setAttributes }
							placeholder={ __( 'Enter your title' ) }
						/>
						<Separator />
						<ABlocksToggleControl
							isResponsive={ false }
							label="Drop caps"
							attributeValue={ attributes.desDropCaps }
							setAttributes={ setAttributes }
							attributeName="desDropCaps"
						/>

						{ desDropCaps && (
							<>
								<Separator />
								<ABlocksColorControl
									label={ __( 'Color', 'ablocks' ) }
									attributeName="desDropCapsTextColor"
									attributeValue={ desDropCapsTextColor }
									setAttributes={ setAttributes }
								/>
							</>
						) }
					</>
				}
				style={
					<>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="desTypography"
							attributeValue={ desTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksTextShadow
							label={ __( 'Text Shadow', 'ablocks' ) }
							attributeName="desTextShadow"
							attributeValue={ desTextShadow }
							setAttributes={ setAttributes }
							isResponsive={ false }
						/>
						<ABlocksTextStroke
							label={ __( 'Text Stroke', 'ablocks' ) }
							attributeName="desTextStroke"
							attributeValue={ desTextStroke }
							setAttributes={ setAttributes }
							isResponsive={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="desTextColor"
										attributeValue={ desTextColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="desTextColorHover"
										attributeValue={ desTextColorHover }
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
											attributes?.desTransition || 0
										}
										attributeName={ 'desTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<ABlocksDimensions
							label={ __( 'Margin', 'ablocks' ) }
							isResponsive={ true }
							attributeName="desMargin"
							attributeValue={ desMargin }
							setAttributes={ setAttributes }
						/>
					</>
				}
			/>
		</ABlocksPanelBody>
	);
};

export default ParagraphSettings;
