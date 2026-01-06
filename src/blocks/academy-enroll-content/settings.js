import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ContentStyleTabs from '@Components/content-style-tabs';
import Separator from '@Components/separator';
import { iconSizeAttribute, buttonIconAttribute } from './attributes';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		contentTransition,
		contentBgH,
		contentBg,
		iconSize,
		iconColor,
		iconColorH,
		listTypography,
		listColor,
		listColorH,
		shareBg,
		shareBgH,
		shareColor,
		shareColorH,
		shareTypography,
		sharePadding,
		shareBorder,
		wishlistBg,
		wishlistBgH,
		wishlistColor,
		wishlistColorH,
		buttonIconSize,
	} = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Content Style', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __( 'Icon Size', 'ablocks' ) }
										min={ 0 }
										max={ 100 }
										step={ 1 }
										hasUnit={ true }
										isInline={ false }
										isResponsive={ true }
										attributeValue={ iconSize }
										attributeName={ 'iconSize' }
										setAttributes={ setAttributes }
										// attributeObjectKey={iconSizeAttribute}
									/>

									<ABlocksRangeControl
										label={ __(
											'Button Icon Size',
											'ablocks'
										) }
										min={ 0 }
										max={ 100 }
										step={ 1 }
										hasUnit={ true }
										isInline={ false }
										isResponsive={ true }
										attributeValue={ buttonIconSize }
										attributeName={ 'buttonIconSize' }
										setAttributes={ setAttributes }
										// attributeObjectKey={buttonIconAttribute}
									/>
								</>
							}
							style={
								<>
									<ControlLabel
										label="Content Color"
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
													attributeName="contentBg"
													attributeValue={ contentBg }
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
													attributeName="contentBgH"
													attributeValue={
														contentBgH
													}
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
														contentTransition
													}
													attributeName={
														'contentTransition'
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
										label={ __( 'Icon Color', 'ablocks' ) }
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
					<ABlocksPanelBody
						title={ __( 'List Style', 'ablocks' ) }
						initialOpen={ false }
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
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Share Button', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="shareTypography"
							attributeValue={ shareTypography }
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
										attributeName="shareColor"
										attributeValue={ shareColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isResponsive={ false }
										attributeName="shareBg"
										attributeValue={ shareBg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="shareColorH"
										attributeValue={ shareColorH }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Hover',
											'ablocks'
										) }
										isResponsive={ false }
										attributeName="shareBgH"
										attributeValue={ shareBgH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="shareBorder"
							attributeValue={ shareBorder }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Padding"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="sharePadding"
							attributeValue={ sharePadding }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'WishList Button', 'ablocks' ) }
						initialOpen={ false }
					>
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
										attributeName="wishlistColor"
										attributeValue={ wishlistColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isResponsive={ false }
										attributeName="wishlistBg"
										attributeValue={ wishlistBg }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="wishlistColorH"
										attributeValue={ wishlistColorH }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Hover',
											'ablocks'
										) }
										isResponsive={ false }
										attributeName="wishlistBgH"
										attributeValue={ wishlistBgH }
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
