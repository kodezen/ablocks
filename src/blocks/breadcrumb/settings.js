import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import { PanelBody } from '@wordpress/components';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import MediaUploadField from '@Components/media-upload';
import { breadcrumbSpaceBetween as breadcrumbSpaceBetweenDefaultVale } from '../breadcrumb/attributes';
import { breadcrumbseparsize as breadcrumbseparDefaultVale } from '../breadcrumb/attributes';
import ABlocksSelectControl from '@Controls/select';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksDimensions from '@Controls/dimensions';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		homeBreadcrumbs,
		positionBreadcrumb,
		breadcrumbTitlecolor,
		breadcrumbLinkcolor,
		breadcrumbHoverLinkcolor,
		breadcrumbseparatorcolor,
		SeparatorChange,
		breadcrumbseparsize,
		breadcrumbSpaceBetween,
		beforeBreadcrumbImage,
		beforeBreadcrumbTextImage,
		beforeBreadcrumbText,
		beforeTextImage,
		beforeBreadcrumbBackgroundcolor,
		beforeBreadcrumbPaddingcolor,
		beforeBreadcrumbBorderRadius,
		BreadcrumbBorderRadius,
		breadcrumbItemPadding,
		breadcrumbItemBackground,
		beforeSeparator,
		breadcrumbTitleTypography = true,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Breadcrumbs Settings', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextControl
										label={ __(
											'Home Text Change',
											'ablocks'
										) }
										attributeName="homeBreadcrumbs"
										attributeValue={ homeBreadcrumbs }
										setAttributes={ setAttributes }
										isInline={ false }
										placeholder={ __( 'Home' ) }
										disableDynamicContent={ false }
									/>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="positionBreadcrumb"
										attributeValue={ positionBreadcrumb }
										setAttributes={ setAttributes }
										options={ [
											{
												label: 'Start',
												value: 'start',
												icon: 'arrow-left',
											},
											{
												label: 'Center',
												value: 'center',
												icon: 'wrap',
											},
											{
												label: 'End',
												value: 'end',
												icon: 'arrow-right',
											},
										] }
										isInline={ false }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label={ __(
											'Before Text/Image',
											'ablocks'
										) }
										attributeValue={ beforeTextImage }
										setAttributes={ setAttributes }
										attributeName="beforeTextImage"
									/>
								</>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="breadcrumbTitleTypography"
										attributeValue={
											breadcrumbTitleTypography
										}
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ true }
										attributeName="breadcrumbTitlecolor"
										attributeValue={ breadcrumbTitlecolor }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Space Between',
											'ablocks'
										) }
										min={ 1 }
										max={ 100 }
										hasUit={ false }
										isInlnine={ false }
										isResponsive={ false }
										attributeName={
											'breadcrumbSpaceBetween'
										}
										attributeValue={
											attributes?.breadcrumbSpaceBetween
										}
										setAttributes={ setAttributes }
										attributeDefaultValue={
											breadcrumbSpaceBetweenDefaultVale
										}
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										isGradient={ true }
										attributeName="breadcrumbItemBackground"
										attributeValue={
											beforeBreadcrumbBackgroundcolor
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="breadcrumbItemPadding"
										attributeValue={ breadcrumbItemPadding }
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __(
											'Border Radius',
											'ablocks'
										) }
										isResponsive={ true }
										attributeName="BreadcrumbBorderRadius"
										attributeValue={
											BreadcrumbBorderRadius
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					<PanelBody
						title={ __( 'Link Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<NormalHoverTabs
							normal={
								<ABlocksColorControl
									label={ __( 'Link Color', 'ablocks' ) }
									isGradient={ true }
									attributeName="breadcrumbLinkcolor"
									attributeValue={ breadcrumbLinkcolor }
									setAttributes={ setAttributes }
								/>
							}
							hover={
								<ABlocksColorControl
									label={ __(
										'Hover Link Color',
										'ablocks'
									) }
									isGradient={ true }
									attributeName="breadcrumbHoverLinkcolor"
									attributeValue={ breadcrumbHoverLinkcolor }
									setAttributes={ setAttributes }
								/>
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Separator Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTextControl
							label={ __( 'Separator Change', 'ablocks' ) }
							attributeName="SeparatorChange"
							attributeValue={ SeparatorChange }
							setAttributes={ setAttributes }
							isInline={ false }
							placeholder={ __( '>' ) }
							disableDynamicContent={ true }
						/>
						<ABlocksColorControl
							label={ __( 'Separator Color', 'ablocks' ) }
							isGradient={ true }
							attributeName="breadcrumbseparatorcolor"
							attributeValue={ breadcrumbseparatorcolor }
							setAttributes={ setAttributes }
						/>
						<ABlocksRangeControl
							label={ __( 'Separator Size', 'ablocks' ) }
							min={ 1 }
							max={ 100 }
							hasUit={ false }
							isInlnine={ false }
							isResponsive={ false }
							attributeName={ 'breadcrumbseparsize' }
							attributeValue={ attributes?.breadcrumbseparsize }
							setAttributes={ setAttributes }
							attributeDefaultValue={ breadcrumbseparDefaultVale }
						/>
					</PanelBody>
					{ beforeTextImage && (
						<PanelBody
							title={ __( 'Before Text/Image', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksSelectControl
											label={ __(
												'Select Text/Image',
												'ablocks'
											) }
											attributeName="beforeBreadcrumbTextImage"
											attributeValue={
												beforeBreadcrumbTextImage
											}
											setAttributes={ setAttributes }
											options={ [
												{
													label: 'Select option',
													value: '',
												},
												{
													label: 'Text',
													value: 'text',
												},
												{
													label: 'Image',
													value: 'image',
												},
											] }
										/>
										{ attributes.beforeBreadcrumbTextImage ===
											'image' && (
											<MediaUploadField
												allowedTypes={ [ 'image' ] }
												attributeValue={ attributes }
												onSelectImageHandler={ (
													media
												) => {
													setAttributes( {
														imageSizes: media.sizes,
														beforeBreadcrumbImage:
															media.url,
													} );
												} }
												onRemoveImageHandler={ () => {
													setAttributes( {
														beforeBreadcrumbImage:
															undefined,
													} );
												} }
												attributeName="beforeBreadcrumbImage"
												setAttributes={ setAttributes }
											/>
										) }
										{ attributes.beforeBreadcrumbTextImage ===
											'text' && (
											<ABlocksTextControl
												label={ __(
													'Text',
													'ablocks'
												) }
												attributeName="beforeBreadcrumbText"
												attributeValue={
													beforeBreadcrumbText
												}
												setAttributes={ setAttributes }
												isInline={ false }
												placeholder={ __( 'Home' ) }
												disableDynamicContent={ false }
											/>
										) }
										{ attributes.beforeBreadcrumbTextImage && (
											<ABlocksToggleControl
												isResponsive={ false }
												label={ __(
													'Before Separator',
													'ablocks'
												) }
												attributeValue={
													beforeSeparator
												}
												setAttributes={ setAttributes }
												attributeName="beforeSeparator"
											/>
										) }
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __(
												'Background Color',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="beforeBreadcrumbBackgroundcolor"
											attributeValue={
												beforeBreadcrumbBackgroundcolor
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksDimensions
											label={ __( 'Padding', 'ablocks' ) }
											isResponsive={ true }
											attributeName="beforeBreadcrumbPaddingcolor"
											attributeValue={
												beforeBreadcrumbPaddingcolor
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksDimensions
											label={ __(
												'Border Radius',
												'ablocks'
											) }
											isResponsive={ true }
											attributeName="beforeBreadcrumbBorderRadius"
											attributeValue={
												beforeBreadcrumbBorderRadius
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</PanelBody>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
