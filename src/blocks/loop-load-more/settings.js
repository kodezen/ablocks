import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksColorControl from '@Controls/color';
import ABlocksTextControl from '@Controls/text';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksBorderControl from '@Controls/border';
import ABlocksTypography from '@Controls/typography';
import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksNumberControl from '@Controls/number';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import SelectParentBlockButton from '@Components/select-parent-block';
import {
	itemGap as itemGapDefaultAttributeValue,
	animationDuration as animationDurationDefaultValueAttribute,
	loadMoreButtonGap as loadMoreButtonGapDefaultValueAttribute,
} from './attributes';

const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		loadMoreButton,
		loadMoreButtonText,
		loadMoreButtonBackground,
		loadMoreButtonTextColor,
		loadMoreButtonTextColorH,
		loadMoreButtonBackgroundH,
		moreButtonAlignment,
		noMoreItemsText,
		loadMoreButtonGap,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Access Loop Builder Settings',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'This is a child block. Click below to manage the full loop builder.',
									'ablocks'
								) }
							</span>
						</div>
						<SelectParentBlockButton clientId={ props?.clientId } />
					</div>
				</ABlocksPanelBody>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Load More Button', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="moreButtonAlignment"
										attributeValue={ moreButtonAlignment }
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
									<ABlocksTextControl
										label={ __( 'Text', 'ablocks' ) }
										attributeName="loadMoreButtonText"
										attributeValue={ loadMoreButtonText }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									<ABlocksTextControl
										label={ __(
											'No More Items Label',
											'ablocks'
										) }
										attributeName="noMoreItemsText"
										attributeValue={ noMoreItemsText }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									<ABlocksRangeControl
										label={ __( 'Gap', 'ablocks' ) }
										min={ 0 }
										max={ 200 }
										unitValue={ loadMoreButtonGap }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ true }
										attributeName="loadMoreButtonGap"
										attributeValue={ loadMoreButtonGap }
										attributeDefaultValue={
											loadMoreButtonGapDefaultValueAttribute
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="moreButtonTypography"
										attributeValue={
											attributes?.moreButtonTypography
										}
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
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeName="loadMoreButtonTextColor"
													attributeValue={
														loadMoreButtonTextColor ||
														'#000000'
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
													attributeName="loadMoreButtonBackground"
													attributeValue={
														loadMoreButtonBackground ||
														'#ddd'
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
													attributeName="loadMoreButtonTextColorH"
													attributeValue={
														loadMoreButtonTextColorH
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
													attributeName="loadMoreButtonBackgroundH"
													attributeValue={
														loadMoreButtonBackgroundH
													}
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
														attributes?.loadMoreButtonTransition ||
														0
													}
													attributeName={
														'loadMoreButtonTransition'
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
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="moreButtonBorder"
										attributeValue={
											attributes?.moreButtonBorder
										}
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="moreButtonPadding"
										attributeValue={
											attributes?.moreButtonPadding
										}
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ControlLabel
										label="Box shadow"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeName="moreButtonboxShadow"
										attributeValue={
											attributes?.moreButtonboxShadow
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
