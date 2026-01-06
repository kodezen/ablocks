import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextControl from '@Controls/text';
import ABlocksSelectControl from '@Controls/select';
import ABlocksToggleControl from '@Controls/toggleButton';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksBorderControl from '@Controls/border';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksAlignmentControl from '@Controls/alignment';
import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';

import ABlocksPanelBody from '@Components/panel-body';
import { CouponAlignmentOptions, couponStyleOptions } from './helper';
const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		couponStyle,
		couponCode,
		couponBtnText,
		couponBtnAfterCopyText,
		isShowIcon,
		couponTypography,
		couponTextShadow,
		buttonTypography,
		buttonTextShadow,
		couponCodeColor,
		couponCodeBgColor,
		couponBtnTextColor,
		couponBtnBgColor,
		couponPadding,
		buttonPadding,
		position,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-coupon-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Coupon Code', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									{ couponStyle === 'style3' && (
										<ABlocksToggleControl
											label={ __(
												'Show Icon',
												'ablocks'
											) }
											attributeName="isShowIcon"
											attributeValue={ isShowIcon }
											setAttributes={ setAttributes }
											isResponsive={ false }
											allowDeselect={ false }
										/>
									) }

									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="position"
										attributeValue={ position }
										setAttributes={ setAttributes }
										options={ CouponAlignmentOptions }
										isInline={ false }
									/>

									<ABlocksSelectControl
										label={ __( 'Style', 'ablocks' ) }
										attributeValue={ couponStyle }
										setAttributes={ setAttributes }
										attributeName="couponStyle"
										options={ couponStyleOptions }
									/>

									<ABlocksTextControl
										label={ __( 'Coupon', 'ablocks' ) }
										attributeValue={ couponCode }
										setAttributes={ setAttributes }
										attributeName="couponCode"
										isResponsive={ false }
									/>
								</>
							}
							style={
								<>
									{ couponStyle !== 'style3' && (
										<>
											<ABlocksTypography
												label={ __(
													'Typography',
													'ablocks'
												) }
												attributeName="couponTypography"
												attributeValue={
													couponTypography
												}
												setAttributes={ setAttributes }
												isResponsive={ true }
												attributes={ attributes }
											/>
											<ABlocksTextShadow
												label={ __(
													'Text Shadow',
													'ablocks'
												) }
												attributeName="couponTextShadow"
												attributeValue={
													couponTextShadow
												}
												setAttributes={ setAttributes }
												isResponsive={ false }
											/>
											<ABlocksColorControl
												label={ __(
													'Text Color',
													'ablocks'
												) }
												attributeName="couponCodeColor"
												attributeValue={
													couponCodeColor || '#000'
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Background',
													'ablocks'
												) }
												isGradient={ true }
												attributeName="couponCodeBgColor"
												attributeValue={
													couponCodeBgColor || '#fff'
												}
												setAttributes={ setAttributes }
											/>

											<ABlocksDimensions
												label={ __(
													'Padding',
													'ablocks'
												) }
												attributeName="couponPadding"
												attributeValue={ couponPadding }
												setAttributes={ setAttributes }
												isResponsive={ true }
											/>

											<Separator Margin="30px" />
											<ControlLabel
												label="Border"
												isResponsive={ false }
												isHeader={ true }
											/>
											<ABlocksBorderControl
												label={ __(
													'Borders',
													'ablocks'
												) }
												attributeName="couponBorder"
												attributeValue={
													attributes?.couponBorder
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }

									{ couponStyle === 'style3' && (
										<>
											<ABlocksTypography
												label={ __(
													'Typography',
													'ablocks'
												) }
												attributeName="couponTypography"
												attributeValue={
													couponTypography
												}
												setAttributes={ setAttributes }
												isResponsive={ true }
												attributes={ attributes }
											/>
											<ABlocksTextShadow
												label={ __(
													'Text Shadow',
													'ablocks'
												) }
												attributeName="couponTextShadow"
												attributeValue={
													couponTextShadow
												}
												setAttributes={ setAttributes }
												isResponsive={ false }
											/>
											<ABlocksColorControl
												label={ __(
													'Text Color',
													'ablocks'
												) }
												attributeName="couponCodeColor"
												attributeValue={
													couponCodeColor || '#000'
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Background',
													'ablocks'
												) }
												isGradient={ true }
												attributeName="couponCodeBgColor"
												attributeValue={
													couponCodeBgColor || '#fff'
												}
												setAttributes={ setAttributes }
											/>

											<ABlocksDimensions
												label={ __(
													'Padding',
													'ablocks'
												) }
												attributeName="couponPadding"
												attributeValue={ couponPadding }
												setAttributes={ setAttributes }
												isResponsive={ true }
											/>

											<Separator Margin="30px" />
											<ControlLabel
												label="Border"
												isResponsive={ false }
												isHeader={ true }
											/>

											<ABlocksBorderControl
												label={ __(
													'Border',
													'ablocks'
												) }
												attributeName="couponBorder"
												attributeValue={
													attributes?.couponBorder
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }
								</>
							}
						/>
					</ABlocksPanelBody>

					{ couponStyle !== 'style3' && (
						<ABlocksPanelBody
							title={ __( 'Coupon Button', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										{ couponStyle !== 'style3' && (
											<ABlocksToggleControl
												label={ __(
													'Show Icon',
													'ablocks'
												) }
												attributeName="isShowIcon"
												attributeValue={ isShowIcon }
												setAttributes={ setAttributes }
												isResponsive={ false }
												allowDeselect={ false }
											/>
										) }
										<ABlocksTextControl
											label={ __(
												'Button Text',
												'ablocks'
											) }
											attributeValue={ couponBtnText }
											setAttributes={ setAttributes }
											attributeName="couponBtnText"
											isResponsive={ false }
										/>

										<ABlocksTextControl
											label={ __(
												'After Copy Text',
												'ablocks'
											) }
											attributeValue={
												couponBtnAfterCopyText
											}
											setAttributes={ setAttributes }
											attributeName="couponBtnAfterCopyText"
											isResponsive={ false }
										/>
									</>
								}
								style={
									<>
										{ couponStyle !== 'style3' && (
											<>
												<ABlocksTypography
													label={ __(
														'Typography',
														'ablocks'
													) }
													attributeName="buttonTypography"
													attributeValue={
														buttonTypography
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ true }
													attributes={ attributes }
												/>
												<ABlocksTextShadow
													label={ __(
														'Text Shadow',
														'ablocks'
													) }
													attributeName="buttonTextShadow"
													attributeValue={
														buttonTextShadow
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ false }
												/>
												<ABlocksColorControl
													label={ __(
														'Text Color',
														'ablocks'
													) }
													attributeName="couponBtnTextColor"
													attributeValue={
														couponBtnTextColor ||
														'#fff'
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													isGradient={ true }
													attributeName="couponBtnBgColor"
													attributeValue={
														couponBtnBgColor ||
														'#000'
													}
													setAttributes={
														setAttributes
													}
												/>
												{ couponStyle === 'default' && (
													<>
														<ABlocksDimensions
															label={ __(
																'Padding',
																'ablocks'
															) }
															attributeName="buttonPadding"
															attributeValue={
																buttonPadding
															}
															setAttributes={
																setAttributes
															}
															isResponsive={
																true
															}
														/>

														<Separator Margin="30px" />
														<ControlLabel
															label="Border"
															isResponsive={
																false
															}
															isHeader={ true }
														/>
														<ABlocksBorderControl
															label={ __(
																'Border',
																'ablocks'
															) }
															attributeName="buttonBorder"
															attributeValue={
																attributes?.buttonBorder
															}
															setAttributes={
																setAttributes
															}
														/>
													</>
												) }
											</>
										) }

										{ couponStyle === 'style3' && (
											<>
												<ABlocksTypography
													label={ __(
														'Typography',
														'ablocks'
													) }
													attributeName="couponTypography"
													attributeValue={
														couponTypography
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ true }
													attributes={ attributes }
												/>
												<ABlocksTextShadow
													label={ __(
														'Text Shadow',
														'ablocks'
													) }
													attributeName="couponTextShadow"
													attributeValue={
														couponTextShadow
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ false }
												/>
												<ABlocksColorControl
													label={ __(
														'Text Color',
														'ablocks'
													) }
													attributeName="couponCodeColor"
													attributeValue={
														couponCodeColor ||
														'#000'
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													isGradient={ true }
													attributeName="couponCodeBgColor"
													attributeValue={
														couponCodeBgColor ||
														'#fff'
													}
													setAttributes={
														setAttributes
													}
												/>

												<ABlocksDimensions
													label={ __(
														'Padding',
														'ablocks'
													) }
													attributeName="couponPadding"
													attributeValue={
														couponPadding
													}
													setAttributes={
														setAttributes
													}
													isResponsive={ true }
												/>

												<Separator Margin="30px" />
												<ControlLabel
													label="Border"
													isResponsive={ false }
													isHeader={ true }
												/>
												<ABlocksBorderControl
													label={ __(
														'Border',
														'ablocks'
													) }
													attributeName="couponBorder"
													attributeValue={
														attributes?.couponBorder
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										) }
									</>
								}
							/>
						</ABlocksPanelBody>
					) }

					{ isShowIcon && (
						<ABlocksPanelBody
							title={ __( 'Icon', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksIconUploader
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
									</>
								}
								style={
									<>
										<ABlocksIconStyleSettings
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
