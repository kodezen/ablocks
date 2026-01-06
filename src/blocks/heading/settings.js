import React from 'react';
import { __ } from '@wordpress/i18n';
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
import ABlockLinkControl from '@Controls/link-control';
import ABlocksRangeControl from '@Controls/range';
import ABlocksNumberControl from '@Controls/number';
import ControlLabel from '@Components/control-label';

// colors
import ABlocksTextControl from '@Controls/text';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlockSelectControl from '@Controls/select';
import {
	Animation_Highlighted_Options,
	Animation_Rotating_Options,
	Animation_Type_Options,
	StrokeWidthUnitOptions,
} from './helper';

import { highlightStrokeWidth as highlightStrokeWidthDefaultAttributeValue } from './attributes';

export default function Settings( props ) {
	const { attributes, setAttributes, context } = props;
	const {
		isAnimated,
		heading,
		headingTag,
		alignment,
		typography,
		textShadow,
		textStroke,
		textColor,
		link,
		animationType,
		animationStyle,
		startingText,
		animatedText,
		endingText,

		highlightColor,
		highlightStrokeWidth,
		highlightDuration,
		isInfiniteLoop,
		animatedTextColor,
	} = attributes;

	const getMaxValueForUnit = ( unit ) =>
		( {
			px: 160,
			'%': 100,
			vw: 100,
			rem: 100,
			em: 100,
		} )[ unit ] || 160;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-heading-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Title', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Animated Heading"
										attributeValue={ isAnimated }
										setAttributes={ setAttributes }
										attributeName="isAnimated"
									/>
									{ isAnimated ? (
										<>
											<ABlockSelectControl
												label={ __(
													'Animation Type',
													'ablocks'
												) }
												isResponsive={ false }
												options={
													Animation_Type_Options
												}
												attributeName="animationType"
												attributeValue={ animationType }
												setAttributes={ setAttributes }
											/>

											<ABlockSelectControl
												label={ __(
													'Animation',
													'ablocks'
												) }
												isResponsive={ false }
												options={
													animationType ===
													'highlighted'
														? Animation_Highlighted_Options
														: Animation_Rotating_Options
												}
												attributeName="animationStyle"
												attributeValue={
													animationStyle
												}
												setAttributes={ setAttributes }
											/>

											<Separator />

											<ABlocksTextControl
												label={ __(
													'Starting Text',
													'ablocks'
												) }
												attributeName="startingText"
												attributeValue={ startingText }
												setAttributes={ setAttributes }
												placeholder={ __(
													'Enter your starting text'
												) }
												isInline={ false }
												disableDynamicContent={ true }
											/>

											{ animationType ===
											'highlighted' ? (
												<ABlocksTextControl
													label={ __(
														'Animated Text',
														'ablocks'
													) }
													attributeName="animatedText"
													attributeValue={
														animatedText
													}
													setAttributes={
														setAttributes
													}
													placeholder={ __(
														'Enter your animated text'
													) }
													isInline={ false }
													disableDynamicContent={
														true
													}
												/>
											) : (
												<ABlocksTextareaControl
													label={ __(
														'Animated Text',
														'ablocks'
													) }
													attributeName="animatedText"
													attributeValue={
														animatedText
													}
													setAttributes={
														setAttributes
													}
													placeholder={ __(
														'Enter your animated text'
													) }
												/>
											) }

											<ABlocksTextControl
												label={ __(
													'Ending Text',
													'ablocks'
												) }
												attributeName="endingText"
												attributeValue={ endingText }
												setAttributes={ setAttributes }
												placeholder={ __(
													'Enter your ending text'
												) }
												isInline={ false }
												disableDynamicContent={ true }
											/>

											<Separator />

											<ABlocksNumberControl
												label={ __(
													'Duration(ms)',
													'ablocks'
												) }
												attributeName="highlightDuration"
												attributeValue={
													highlightDuration
												}
												setAttributes={ setAttributes }
											/>

											<ABlocksToggleControl
												isResponsive={ false }
												label="Infinite Loop"
												attributeValue={
													isInfiniteLoop
												}
												setAttributes={ setAttributes }
												attributeName="isInfiniteLoop"
											/>
										</>
									) : (
										<>
											<ABlocksTextareaControl
												label={ __(
													'Title',
													'ablocks'
												) }
												attributeName="heading"
												attributeValue={ heading }
												setAttributes={ setAttributes }
												placeholder={ __(
													'Enter your title'
												) }
												context={ context }
											/>
											<Separator />
											<ABlocksSelectControl
												label={ __(
													'HTML Tag',
													'ablocks'
												) }
												options={ HTMLTagLists }
												isSearch={ true }
												attributeName="headingTag"
												attributeValue={ headingTag }
												setAttributes={ setAttributes }
											/>
											<ABlocksAlignmentControl
												label={ __(
													'Alignment',
													'ablocks'
												) }
												attributeName="alignment"
												attributeValue={ alignment }
												setAttributes={ setAttributes }
												isInline={ false }
											/>
											<ABlockLinkControl
												label={ __(
													'Link',
													'ablocks'
												) }
												attributeName="link"
												attributeValue={ link }
												setAttributes={ setAttributes }
											/>
										</>
									) }
								</>
							}
							style={
								isAnimated ? (
									<>
										<ABlocksColorControl
											label={ __(
												'Regular Text',
												'ablocks'
											) }
											attributeName="textColor"
											attributeValue={ textColor }
											setAttributes={ setAttributes }
										/>

										<ABlocksColorControl
											label={ __(
												'Animated Text',
												'ablocks'
											) }
											attributeName="animatedTextColor"
											attributeValue={ animatedTextColor }
											setAttributes={ setAttributes }
										/>

										{ animationType == 'highlighted' ? (
											<>
												<ABlocksColorControl
													label={ __(
														'Stroke Color',
														'ablocks'
													) }
													attributeName="highlightColor"
													attributeValue={
														highlightColor
													}
													setAttributes={
														setAttributes
													}
												/>

												<ABlocksRangeControl
													label={ __(
														'Width',
														'ablocks'
													) }
													attributeName="highlightStrokeWidth"
													attributeValue={
														highlightStrokeWidth
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ false }
													hasUnit={ true }
													isInline={ false }
													attributeObjectKey="value"
													unitOptions={
														StrokeWidthUnitOptions
													}
													min={ 0 }
													max={ getMaxValueForUnit(
														highlightStrokeWidth?.valueUnit ||
															'px'
													) }
													step={ 0.1 }
													attributeDefaultValue={
														highlightStrokeWidthDefaultAttributeValue
													}
													autoSyncRange={ false }
												/>
											</>
										) : (
											<>
												<ABlocksTypography
													label={ __(
														'Typography',
														'ablocks'
													) }
													attributeName="typography"
													attributeValue={
														typography
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ true }
												/>

												<ABlocksTextShadow
													label={ __(
														'Text Shadow',
														'ablocks'
													) }
													attributeName="textShadow"
													attributeValue={
														textShadow
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ false }
												/>
											</>
										) }
									</>
								) : (
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="textColor"
											attributeValue={ textColor }
											setAttributes={ setAttributes }
										/>
										<ABlocksTypography
											label={ __(
												'Typography',
												'ablocks'
											) }
											attributeName="typography"
											attributeValue={ typography }
											setAttributes={ setAttributes }
											isResponsive={ true }
											attributes={ attributes }
										/>
										<ABlocksTextShadow
											label={ __(
												'Text Shadow',
												'ablocks'
											) }
											attributeName="textShadow"
											attributeValue={ textShadow }
											setAttributes={ setAttributes }
											isResponsive={ false }
										/>
										<ABlocksTextStroke
											label={ __(
												'Text Stroke',
												'ablocks'
											) }
											attributeName="textStroke"
											attributeValue={ textStroke }
											setAttributes={ setAttributes }
											isResponsive={ true }
										/>
									</>
								)
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
