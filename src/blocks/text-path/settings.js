import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksColorControl from '@Controls/color';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlockLinkControl from '@Controls/link-control';
import ABlocksTypography from '@Controls/typography';
import ABlocksTextShadow from '@Controls/textShadow';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksIconUploader from '@Controls/icon-upload';

const Settings = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		alignment,
		text,
		pathType,
		isShowIcon,
		strokeColor,
		link,
		iconSvgPath,
		textColorH,
		typography,
		textColor,
		textStrokeShow,
		strokeTextColor,
		textShadow,
		iconSize,
		strokeWidth,
		offsetControl,
		rotate,
		textStroke,
		iconClass,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-text-path-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Text Path', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextareaControl
										label={ __( 'Title', 'ablocks' ) }
										attributeName="text"
										attributeValue={ text }
										setAttributes={ setAttributes }
										placeholder={ __( 'Enter your title' ) }
									/>

									<Separator />

									<ABlocksSelectControl
										label={ __( 'Path Type', 'ablocks' ) }
										options={ [
											{ label: 'Wave', value: 'wave' },
											{ label: 'Arc', value: 'arc' },
											{
												label: 'Circle',
												value: 'circle',
											},
											{ label: 'Line', value: 'line' },
											{ label: 'Oval', value: 'oval' },
											{
												label: 'Spiral',
												value: 'spiral',
											},
											{
												label: 'Custom',
												value: 'custom',
											},
										] }
										isSearch={ true }
										attributeName="pathType"
										attributeValue={ pathType }
										setAttributes={ setAttributes }
										onChange={ ( newType ) =>
											setAttributes( {
												pathType: newType,
											} )
										}
									/>
									{ pathType === 'custom' && (
										<ABlocksIconUploader
											label={ __(
												'Icon Upload',
												'ablocks'
											) }
											attributes={ attributes }
											setAttributes={ setAttributes }
											legacySupport={ true }
											// getIconClass={()=> {
											//   return iconClass;
											// }}
										/>
									) }
									<ABlocksRangeControl
										label={ __( 'Path Size', 'ablocks' ) }
										min={ 0 }
										max={ 1000 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeName="iconSize"
										attributeValue={ iconSize }
										setAttributes={ setAttributes }
										attributeObjectKey="iconSize"
									/>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
										isInline={ false }
									/>

									<ABlockLinkControl
										label={ __( 'Link', 'ablocks' ) }
										attributeName="link"
										attributeValue={ link }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksToggleControl
										label={ __( 'Show Icon', 'ablocks' ) }
										attributeValue={ isShowIcon }
										isResponsive={ false }
										attributeName="isShowIcon"
										setAttributes={ setAttributes }
									/>
									{ isShowIcon && (
										<>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="strokeColor"
												attributeValue={ strokeColor }
												setAttributes={ setAttributes }
											/>
											<ABlocksRangeControl
												label={ __(
													'Thikness',
													'ablocks'
												) }
												min={ 1 }
												max={ 100 }
												hasUnit={ false }
												isInline={ false }
												isResponsive={ false }
												attributeName="strokeWidth"
												attributeValue={ strokeWidth }
												setAttributes={ setAttributes }
												attributeObjectKey="strokeWidth"
											/>
										</>
									) }
									<ABlocksRangeControl
										label={ __(
											'Staring Points',
											'ablocks'
										) }
										min={ 0 }
										max={ 500 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeName="offsetControl"
										attributeValue={ offsetControl }
										setAttributes={ setAttributes }
										attributeObjectKey="offsetControl"
									/>
									<ABlocksRangeControl
										label={ __( 'Rotate', 'ablocks' ) }
										min={ 0 }
										max={ 360 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeName="rotate"
										attributeValue={ rotate }
										setAttributes={ setAttributes }
										attributeObjectKey="rotate"
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="typography"
										attributeValue={ typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
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
													attributeName="textColor"
													attributeValue={
														textColor || '#000000'
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
														'Color',
														'ablocks'
													) }
													attributeValue={
														textColorH
													}
													attributeName="textColorH"
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
														attributes?.transition ||
														0
													}
													attributeName={
														'transition'
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="textShadow"
										attributeValue={ textShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeValue={ textStrokeShow }
										isResponsive={ false }
										attributeName="textStrokeShow"
										setAttributes={ setAttributes }
									/>
									{ textStrokeShow && (
										<>
											<ABlocksRangeControl
												label={ __(
													'Text Stroke',
													'ablocks'
												) }
												min={ 0 }
												max={ 10 }
												hasUnit={ false }
												isInline={ false }
												isResponsive={ false }
												attributeName="textStroke"
												attributeValue={ textStroke }
												setAttributes={ setAttributes }
												attributeObjectKey="textStroke"
											/>

											<ABlocksColorControl
												label={ __(
													'Stroke Color',
													'ablocks'
												) }
												attributeName="strokeTextColor"
												attributeValue={
													strokeTextColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }
								</>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
};

export default Settings;
