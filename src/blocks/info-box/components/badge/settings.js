import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksRangeControl from '@Controls/range';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTypography from '@Controls/typography';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ABlocksTextControl from '@Controls/text';
import ControlLabel from '@Components/control-label';

// colors
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';

const BadgeSettings = ( props ) => {
	const { attributes, setAttributes, context } = props;
	const {
		badgeText,
		badgePosition,
		badgeSize,
		badgeTextShadow,
		badgeTypography,
		badgeTextColor,
		badgeTextColorH,
		badgeBackground,
		badgeBackgroundH,
		badgePadding,
	} = attributes;
	return (
		<>
			<ABlocksPanelBody
				title={ __( 'Badge', 'ablocks' ) }
				initialOpen={ false }
			>
				<ContentStyleTabs
					content={
						<>
							<ABlocksAlignmentControl
								label={ __( 'Position', 'ablocks' ) }
								attributeName="badgePosition"
								attributeValue={ badgePosition }
								setAttributes={ setAttributes }
								options={ [
									{
										label: 'top-left',
										value: 'top-left',
										icon: 'arrow-left',
									},
									{
										label: 'bottom-left',
										value: 'bottom-left',
										icon: 'arrow-down',
									},
									{
										label: 'top-right',
										value: 'top-right',
										icon: 'arrow-right',
									},
									{
										label: 'bottom-right',
										value: 'bottom-right',
										icon: 'arrow-down',
									},
								] }
								isInline={ false }
							/>

							<ABlocksTextControl
								label={ __( 'Text', 'ablocks' ) }
								attributeName="badgeText"
								attributeValue={ badgeText }
								setAttributes={ setAttributes }
								isInline={ false }
								context={ context }
							/>

							<ABlocksSelectControl
								label={ __( 'Sizes', 'ablocks' ) }
								options={ [
									{
										label: 'Extra small',
										value: 'xs',
									},
									{ label: 'Small', value: 'sm' },
									{
										label: 'Medium',
										value: 'md',
									},
									{ label: 'Large', value: 'lg' },
								] }
								isResponsive={ false }
								attributeValue={ badgeSize || 'sm' }
								attributeName="badgeSize"
								setAttributes={ setAttributes }
							/>
						</>
					}
					style={
						<>
							<ABlocksTypography
								label={ __( 'Typography', 'ablocks' ) }
								attributeName="badgeTypography"
								attributeValue={ badgeTypography }
								setAttributes={ setAttributes }
								isResponsive={ true }
								attributes={ attributes }
							/>
							<ABlocksTextShadow
								label={ __( 'Text Shadow', 'ablocks' ) }
								attributeName="badgeTextShadow"
								attributeValue={ badgeTextShadow }
								setAttributes={ setAttributes }
								isResponsive={ false }
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
											attributeName="badgeTextColor"
											attributeValue={
												badgeTextColor || '#000000'
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="badgeBackground"
											attributeValue={
												badgeBackground || '#ddd'
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
								hover={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="badgeTextColorH"
											attributeValue={ badgeTextColorH }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="badgeBackgroundH"
											attributeValue={ badgeBackgroundH }
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
												attributes?.badgeTransition || 0
											}
											attributeName={ 'badgeTransition' }
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
								attributeName="badgeBorder"
								attributeValue={ attributes?.badgeBorder }
								setAttributes={ setAttributes }
							/>
							<Separator />
							<ABlocksDimensions
								label={ __( 'Padding', 'ablocks' ) }
								isResponsive={ true }
								attributeName="badgePadding"
								attributeValue={ badgePadding }
								setAttributes={ setAttributes }
							/>
						</>
					}
				/>
			</ABlocksPanelBody>
		</>
	);
};

export default BadgeSettings;
