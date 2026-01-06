import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksRangeControl from '@Controls/range';
import ABlocksColorControl from '@Controls/color';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksTypography from '@Controls/typography';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksSelectControl from '@Controls/select';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import {
	hamburgerWidth as hamburgerWidthDefaultAttributeValue,
	hamburgerHeight as hamburgerHeightDefaultAttributeValue,
	subMenuWidth as subMenuWidthDefaultValueAttribute,
} from './attributes';
import GetDeviceType from '../../utils/get-device-type';
const propTypes = {};
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		alignment,
		menuItemTypography,
		menuItemTextColor,
		menuItemTextColorH,
		menuItemBackgroundH,
		menuItemBackground,
		menuItemPadding,
		menuItemMargin,
		menuItemBorder,
		sideBarMenuDevice,
		hamburgerAlignment,
		hamburgerColor,
		hamburgerBackground,
		hamburgerPadding,
		hamburgerWidth,
		hamburgerHeight,
		hamburgerBorder,
		menuResponsiveBackground,
		menuResponsiveTextColor,
		subMenuWidth,
		subMenuBoxShadow,
		subMenuBorder,
		subMenuPadding,
		subMenuResponsiveColor,
		subMenuResponsiveBg,
		subMenuItemTextColor,
		subMenuItemBackground,
		subMenuItemTextColorH,
		subMenuItemBackgroundH,
	} = attributes;

	const deviceType = GetDeviceType();

	const isHamburgerVisible =
		( deviceType === 'Tablet' && sideBarMenuDevice === 'tablet' ) ||
		deviceType === 'Mobile';

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/navigation-menu/' }
				>
					<ABlocksPanelBody
						title={ __( 'Nav', 'ablocks' ) }
						initialOpen={ true }
					>
						<React.Fragment>
							<ABlocksAlignmentControl
								label={ __( 'Alignment', 'ablocks' ) }
								attributeName="alignment"
								attributeValue={ alignment }
								isResponsive={ false }
								setAttributes={ setAttributes }
								isInline={ false }
								options={ [
									{
										label: 'left',
										value: 'left',
										icon: 'left',
									},
									{
										label: 'center',
										value: 'center',
										icon: 'center',
									},
									{
										label: 'right',
										value: 'right',
										icon: 'right',
									},
								] }
							/>

							<ABlocksSelectControl
								label={ __(
									'Hamburger Menu Device',
									'ablocks'
								) }
								options={ [
									{
										label: __( 'Tablet', 'ablocks' ),
										value: 'tablet',
									},
									{
										label: __( 'Mobile', 'ablocks' ),
										value: 'mobile',
									},
								] }
								attributeName="sideBarMenuDevice"
								attributeValue={ sideBarMenuDevice }
								setAttributes={ setAttributes }
							/>
						</React.Fragment>
					</ABlocksPanelBody>
					{ isHamburgerVisible && (
						<ABlocksPanelBody
							title={ __( 'Mobile Hamburger', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksAlignmentControl
											label={ __(
												'Alignment',
												'ablocks'
											) }
											attributeName="hamburgerAlignment"
											attributeValue={
												hamburgerAlignment
											}
											isResponsive={ false }
											setAttributes={ setAttributes }
											isInline={ false }
											options={ [
												{
													label: 'left',
													value: 'left',
													icon: 'left',
												},
												{
													label: 'center',
													value: 'center',
													icon: 'center',
												},
												{
													label: 'right',
													value: 'right',
													icon: 'right',
												},
											] }
										/>
										<ABlocksRangeControl
											label={ __(
												'Hamburger Width',
												'ablocks'
											) }
											isResponsive={ false }
											min={ 0 }
											max={ 100 }
											attributeName="hamburgerWidth"
											attributeValue={ hamburgerWidth }
											hasUnit={ true }
											setAttributes={ setAttributes }
											isInline={ false }
											attributeDefaultValue={
												hamburgerWidthDefaultAttributeValue
											}
										/>
										<ABlocksRangeControl
											label={ __(
												'Hamburger Height',
												'ablocks'
											) }
											isResponsive={ false }
											min={ 0 }
											max={ 100 }
											hasUnit={ true }
											attributeName="hamburgerHeight"
											attributeValue={ hamburgerHeight }
											setAttributes={ setAttributes }
											isInline={ false }
											attributeDefaultValue={
												hamburgerHeightDefaultAttributeValue
											}
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="hamburgerColor"
											attributeValue={ hamburgerColor }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="hamburgerBackground"
											attributeValue={
												hamburgerBackground
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksDimensions
											label={ __( 'Padding', 'ablocks' ) }
											isResponsive={ true }
											attributeName="hamburgerPadding"
											attributeValue={ hamburgerPadding }
											setAttributes={ setAttributes }
										/>
										<ControlLabel
											label="Border"
											isResponsive={ false }
										/>
										<ABlocksBorderControl
											attributeName="hamburgerBorder"
											attributeValue={ hamburgerBorder }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }

					<ABlocksPanelBody
						title={ __( 'Menu Item', 'ablocks' ) }
						initialOpen={ false }
					>
						<>
							<ABlocksTypography
								label={ __( 'Typography', 'ablocks' ) }
								attributeName="menuItemTypography"
								attributeValue={ menuItemTypography }
								setAttributes={ setAttributes }
								isResponsive={ true }
								attributes={ attributes }
							/>
							<Separator />
							<ControlLabel
								label="Color"
								isResponsive={ false }
							/>
							<NormalHoverTabs
								normal={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="menuItemTextColor"
											attributeValue={ menuItemTextColor }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="menuItemBackground"
											attributeValue={
												menuItemBackground
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
								hover={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="menuItemTextColorH"
											attributeValue={
												menuItemTextColorH
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="menuItemBackgroundH"
											attributeValue={
												menuItemBackgroundH
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
												attributes?.menuItemTransition ||
												0
											}
											attributeName={
												'menuItemTransition'
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>

							<Separator />
							<ControlLabel
								label="Border"
								isResponsive={ false }
							/>
							<ABlocksBorderControl
								attributeName="menuItemBorder"
								attributeValue={ menuItemBorder }
								setAttributes={ setAttributes }
							/>
							<Separator />
							<ABlocksDimensions
								label={ __( 'Padding', 'ablocks' ) }
								isResponsive={ true }
								attributeName="menuItemPadding"
								attributeValue={ menuItemPadding }
								setAttributes={ setAttributes }
							/>
							<ABlocksDimensions
								label={ __( 'Margin', 'ablocks' ) }
								isResponsive={ true }
								attributeName="menuItemMargin"
								attributeValue={ menuItemMargin }
								setAttributes={ setAttributes }
							/>
						</>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Menu Responsive', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ true }
							attributeName="menuResponsiveTextColor"
							attributeValue={ menuResponsiveTextColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Background', 'ablocks' ) }
							isGradient={ true }
							attributeName="menuResponsiveBackground"
							attributeValue={ menuResponsiveBackground }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Sub Menu Responsive', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							isGradient={ true }
							attributeName="subMenuResponsiveColor"
							attributeValue={ subMenuResponsiveColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Background', 'ablocks' ) }
							isGradient={ true }
							attributeName="subMenuResponsiveBg"
							attributeValue={ subMenuResponsiveBg }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Submenu Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<React.Fragment>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										min={ 50 }
										max={ 500 }
										hasUnit={ true }
										isInline={ false }
										isResponsive={ true }
										attributeName="subMenuWidth"
										attributeValue={ subMenuWidth }
										setAttributes={ setAttributes }
										attributeDefaultValue={
											subMenuWidthDefaultValueAttribute
										}
										autoSyncRange={ true }
									/>
								</React.Fragment>
							}
							style={
								<React.Fragment>
									<ControlLabel
										label="Color"
										isResponsive={ false }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeName="subMenuItemTextColor"
													attributeValue={
														subMenuItemTextColor
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
													attributeName="subMenuItemBackground"
													attributeValue={
														subMenuItemBackground
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
													attributeName="subMenuItemTextColorH"
													attributeValue={
														subMenuItemTextColorH
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
													attributeName="subMenuItemBackgroundH"
													attributeValue={
														subMenuItemBackgroundH
													}
													setAttributes={
														setAttributes
													}
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
														attributes?.subMenuItemTransition ||
														0
													}
													attributeName={
														'subMenuItemTransition'
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>

									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeValue={ subMenuBoxShadow }
										setAttributes={ setAttributes }
										attributeName="subMenuBoxShadow"
									/>
									<ControlLabel
										label="Border"
										isResponsive={ false }
									/>
									<ABlocksBorderControl
										attributeName="subMenuBorder"
										attributeValue={ subMenuBorder }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="subMenuPadding"
										attributeValue={ subMenuPadding }
										setAttributes={ setAttributes }
									/>
								</React.Fragment>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
