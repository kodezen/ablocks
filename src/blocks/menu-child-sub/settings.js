import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksRangeControl from '@Controls/range';
import ABlocksButtonGroupControl from '@Components/button-group';
import GetDeviceType from '@Utils/get-device-type';
import ABlocksColorControl from '@Controls/color';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksTypography from '@Controls/typography';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import SelectParentBlockButton from '@Components/select-parent-block';
import { width as widthDefaultValueAttribute } from './attributes';

export default function Settings( props ) {
	const deviceType = GetDeviceType();
	const { attributes, setAttributes } = props;
	const {
		width,
		boxShadow,
		background,
		border,
		padding,
		menuItemTypography,
		menuItemTextColor,
		menuItemTextColorH,
		menuItemBackgroundH,
		menuItemBackground,
		menuItemPadding,
		menuItemMargin,
		menuItemBorder,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Explore Menu Blocks Options',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Access the Menu block setting to customize menus for easy navigation.',
									'ablocks'
								) }
							</span>
						</div>
						<SelectParentBlockButton clientId={ props?.clientId } />
					</div>
				</ABlocksPanelBody>
				<ABlocksPanelBody
					title={ __( 'Sub Menu', 'ablocks' ) }
					initialOpen={ true }
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
									attributeName="width"
									attributeValue={ width }
									setAttributes={ setAttributes }
									attributeDefaultValue={
										widthDefaultValueAttribute
									}
									autoSyncRange={ true }
								/>
							</React.Fragment>
						}
						style={
							<React.Fragment>
								<Separator />
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
												attributeName="menuItemTextColor"
												attributeValue={
													menuItemTextColor
												}
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
												label={ __(
													'Color',
													'ablocks'
												) }
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
								<ABlocksBoxShadowControl
									label={ __( 'Box shadow', 'ablocks' ) }
									attributeValue={ boxShadow }
									setAttributes={ setAttributes }
									attributeName="boxShadow"
								/>
								<ControlLabel
									label="Border"
									isResponsive={ false }
								/>
								<ABlocksBorderControl
									attributeName="border"
									attributeValue={ border }
									setAttributes={ setAttributes }
								/>
								<ABlocksColorControl
									label={ __( 'Background', 'ablocks' ) }
									isGradient={ true }
									attributeName="background"
									attributeValue={ background }
									setAttributes={ setAttributes }
								/>
								<Separator />
								<ABlocksDimensions
									label={ __( 'Padding', 'ablocks' ) }
									isResponsive={ true }
									attributeName="padding"
									attributeValue={ padding }
									setAttributes={ setAttributes }
								/>
							</React.Fragment>
						}
					/>
				</ABlocksPanelBody>
				<ABlocksPanelBody
					title={ __( 'Menu Item', 'ablocks' ) }
					initialOpen={ false }
				>
					<React.Fragment>
						<ABlocksButtonGroupControl
							isInline={ false }
							label={ __( 'Alignment', 'ablocks' ) }
							options={ [
								{
									label: __( 'Flex Start', 'ablocks' ),
									value: 'flex-start',
									icon: (
										<span className="ablocks-icon ablocks-icon--justify-start" />
									),
								},
								{
									label: __( 'Center', 'ablocks' ),
									value: 'center',
									icon: (
										<span className="ablocks-icon ablocks-icon--justify-Center" />
									),
								},
								{
									label: __( 'Flex End', 'ablocks' ),
									value: 'flex-end',
									icon: (
										<span className="ablocks-icon ablocks-icon--justify-end" />
									),
								},
								{
									label: __( 'Space Between', 'ablocks' ),
									value: 'space-between',
									icon: (
										<span className="ablocks-icon ablocks-icon--justify-spacebetween" />
									),
								},
								{
									label: __( 'Space Around', 'ablocks' ),
									value: 'space-around',
									icon: (
										<span className="ablocks-icon ablocks-icon--justify-spacearound" />
									),
								},
								{
									label: __( 'Space Evenly', 'ablocks' ),
									value: 'space-evenly',
									icon: (
										<span className="ablocks-icon ablocks-icon--justify-spaceevenly" />
									),
									tooltipPosition: 'top-left',
								},
							] }
							attributeName={ 'menuItemJustification' } // Now using menuItemJustify
							attributeValue={ attributes?.menuItemJustification } // Dynamic value for device type
							setAttributes={ setAttributes }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="menuItemTypography"
							attributeValue={ menuItemTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel label="Border" isResponsive={ false } />
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
					</React.Fragment>
				</ABlocksPanelBody>
			</InspectorControls>
		</React.Fragment>
	);
}
