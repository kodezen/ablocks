import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksBorderControl from '@Controls/border';
import ABlocksTextControl from '@Controls/text';
import ContentStyleTabs from '@Components/content-style-tabs';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksRangeControl from '@Controls/range';
import ABlocksSelectControl from '@Controls/select';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBoxShadowControl from '@Controls/box-shadow';

import {
	iconSize as iconSizeDefaultAttributeValue,
	listItemGap as listItemGapDefaultAttributeValue,
} from './attributes';
import { markerViewOptions } from './helper';

const propTypes = {};

const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes, context } = props;
	const {
		tocTableTitle,
		H1,
		H2,
		H3,
		H4,
		H5,
		H6,
		markerView,
		titleColor,
		titleTypography,
		hideTitle,
		collapSible,
		contentTypography,
		itemColor,
		headerBG,
		iconColor,
		bodyBG,
		header_padding,
		list_padding,
		activeColor,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-table-of-content-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Table of Content Options', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksToggleControl
										label={ __( 'Show Title', 'ablocks' ) }
										attributeValue={ hideTitle }
										setAttributes={ setAttributes }
										attributeName="hideTitle"
										isResponsive={ false }
									/>
									{ hideTitle && (
										<ABlocksTextControl
											label={ __( 'Title', 'ablocks' ) }
											attributeName="tocTableTitle"
											attributeValue={ tocTableTitle }
											setAttributes={ setAttributes }
											context={ context }
										/>
									) }
									<Separator />
									<ControlLabel
										label="Choose heading tags to generate table"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'H1', 'ablocks' ) }
										attributeValue={ H1 }
										setAttributes={ setAttributes }
										attributeName="H1"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'H2', 'ablocks' ) }
										attributeValue={ H2 }
										setAttributes={ setAttributes }
										attributeName="H2"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'H3', 'ablocks' ) }
										attributeValue={ H3 }
										setAttributes={ setAttributes }
										attributeName="H3"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'H4', 'ablocks' ) }
										attributeValue={ H4 }
										setAttributes={ setAttributes }
										attributeName="H4"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'H5', 'ablocks' ) }
										attributeValue={ H5 }
										setAttributes={ setAttributes }
										attributeName="H5"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'H6', 'ablocks' ) }
										attributeValue={ H6 }
										setAttributes={ setAttributes }
										attributeName="H6"
										isResponsive={ false }
									/>
								</>
							}
							style={
								<>
									<h2 className="ablocks-settings-section-title">
										{ __( 'Header Style', 'ablocks' ) }
									</h2>

									<ABlocksColorControl
										label={ __( 'Title Color', 'ablocks' ) }
										attributeName="titleColor"
										attributeValue={ titleColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __(
											'Title Typography',
											'ablocks'
										) }
										attributeName="titleTypography"
										attributeValue={ titleTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>

									<ABlocksColorControl
										label={ __(
											'Header Background',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="headerBG"
										attributeValue={ headerBG }
										setAttributes={ setAttributes }
									/>

									<Separator />
									<ControlLabel
										label="Border"
										isResponsive={ false }
									/>
									<ABlocksBorderControl
										attributeName="headerBorder"
										attributeValue={
											attributes?.headerBorder
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ false }
										attributeName="header_padding"
										attributeValue={ header_padding }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Lists Settings', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'Marker View', 'ablocks' ) }
										options={ markerViewOptions }
										isResponsive={ false }
										attributeValue={ markerView }
										attributeName="markerView"
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksRangeControl
										label={ __( 'List Gap', 'ablocks' ) }
										min={ 1 }
										max={ 100 }
										hasUnit={ true }
										isInline={ false }
										unitOptions={ [
											{
												value: 'px',
												label: 'px',
											},
										] }
										isResponsive={ false }
										attributeName="listItemGap"
										attributeValue={
											attributes?.listItemGap
										}
										setAttributes={ setAttributes }
										attributeDefaultValue={
											listItemGapDefaultAttributeValue
										}
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="contentTypography"
										attributeValue={ contentTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="itemColor"
										attributeValue={ itemColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Active Item Color',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="activeColor"
										attributeValue={
											attributes?.activeColor
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										isGradient={ false }
										attributeName="bodyBG"
										attributeValue={ bodyBG }
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ false }
										attributeName="list_padding"
										attributeValue={ list_padding }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Collapsible Settings', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksToggleControl
										label={ __(
											'Make Content Collapsible',
											'ablocks'
										) }
										attributeValue={ collapSible }
										setAttributes={ setAttributes }
										attributeName="collapSible"
										isResponsive={ false }
									/>

									{ collapSible && (
										<ABlocksRangeControl
											label={ __(
												'Icon Size',
												'ablocks'
											) }
											min={ 0 }
											max={ 100 }
											hasUnit={ false }
											isInline={ false }
											isResponsive={ false }
											attributeName={ 'iconSize' }
											attributeValue={
												attributes?.iconSize
											}
											setAttributes={ setAttributes }
											attributeDefaultValue={
												iconSizeDefaultAttributeValue
											}
										/>
									) }

									{ collapSible && (
										<ABlocksIconUploader
											label={ __(
												'Open Icon',
												'ablocks'
											) }
											attributes={ attributes }
											setAttributes={ setAttributes }
											attributePrefix="openIcon"
											legacySupport={ true }
										/>
									) }

									{ collapSible && (
										<ABlocksIconUploader
											label={ __(
												'Close Icon',
												'ablocks'
											) }
											attributes={ attributes }
											setAttributes={ setAttributes }
											attributePrefix="closeIcon"
											legacySupport={ true }
										/>
									) }
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Icon Color', 'ablocks' ) }
										attributeName="iconColor"
										attributeValue={ iconColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __(
											'Icon Padding',
											'ablocks'
										) }
										isResponsive={ false }
										attributeName="icon_padding"
										attributeValue={
											attributes?.icon_padding || {}
										}
										setAttributes={ setAttributes }
									/>
									<ControlLabel
										label="Border"
										isResponsive={ false }
									/>
									<ABlocksBorderControl
										attributeName="iconBorder"
										attributeValue={
											attributes?.iconBorder || {}
										}
										setAttributes={ setAttributes }
									/>
									<ControlLabel
										label="Box shadow"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeName="iconBoxShadow"
										attributeValue={
											attributes?.iconBoxShadow || {}
										}
										setAttributes={ setAttributes }
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
Settings.defaultProps = defaultProps;
