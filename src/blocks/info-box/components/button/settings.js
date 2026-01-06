import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksRangeControl from '@Controls/range';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTypography from '@Controls/typography';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ABlockLinkControl from '@Controls/link-control';
import ABlocksTextControl from '@Controls/text';
import ControlLabel from '@Components/control-label';

// colors
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';

const ButtonSettings = ( props ) => {
	const { attributes, setAttributes, context } = props;
	const {
		btnText,
		btnSize,
		btnTextShadow,
		btnTypography,
		btnTextColor,
		btnTextColorH,
		btnBackground,
		btnBackgroundH,
		btnPadding,
		btnMargin,
		btnIconPosition,
		btnLink,
		btnShowIcon,
	} = attributes;
	return (
		<>
			<ABlocksPanelBody
				title={ __( 'Button', 'ablocks' ) }
				initialOpen={ false }
			>
				<ContentStyleTabs
					content={
						<>
							<ABlocksTextControl
								label={ __( 'Text', 'ablocks' ) }
								attributeName="btnText"
								attributeValue={ btnText }
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
									{
										label: 'Extra large',
										value: 'xl',
									},
								] }
								isResponsive={ false }
								attributeValue={ btnSize || 'sm' }
								attributeName="btnSize"
								setAttributes={ setAttributes }
							/>

							<ABlockLinkControl
								label={ __( 'Link', 'ablocks' ) }
								attributeName="btnLink"
								attributeValue={ btnLink }
								setAttributes={ setAttributes }
							/>
							<ABlocksToggleControl
								label={ __( 'Show Icon', 'ablocks' ) }
								attributeValue={ btnShowIcon }
								setAttributes={ setAttributes }
								attributeName="btnShowIcon"
								isResponsive={ false }
							/>
						</>
					}
					style={
						<>
							<ABlocksTypography
								label={ __( 'Typography', 'ablocks' ) }
								attributeName="btnTypography"
								attributeValue={ btnTypography }
								setAttributes={ setAttributes }
								isResponsive={ true }
								attributes={ attributes }
							/>
							<ABlocksTextShadow
								label={ __( 'Text Shadow', 'ablocks' ) }
								attributeName="btnTextShadow"
								attributeValue={ btnTextShadow }
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
											attributeName="btnTextColor"
											attributeValue={
												btnTextColor || '#000000'
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="btnBackground"
											attributeValue={
												btnBackground || '#ddd'
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
								hover={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="btnTextColorH"
											attributeValue={ btnTextColorH }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="btnBackgroundH"
											attributeValue={ btnBackgroundH }
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
												attributes?.btnTransition || 0
											}
											attributeName={ 'btnTransition' }
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
								attributeName="btnBorder"
								attributeValue={ attributes?.btnBorder }
								setAttributes={ setAttributes }
							/>
							<Separator />
							<ABlocksDimensions
								label={ __( 'Padding', 'ablocks' ) }
								isResponsive={ true }
								attributeName="btnPadding"
								attributeValue={ btnPadding }
								setAttributes={ setAttributes }
							/>
							<ABlocksDimensions
								label={ __( 'Margin', 'ablocks' ) }
								isResponsive={ true }
								attributeName="btnMargin"
								attributeValue={ btnMargin }
								setAttributes={ setAttributes }
							/>
						</>
					}
				/>
			</ABlocksPanelBody>
			{ btnShowIcon && (
				<ABlocksPanelBody
					title={ __( 'Button Icon', 'ablocks' ) }
					initialOpen={ false }
				>
					<ContentStyleTabs
						content={
							<>
								<ABlocksIconUploader
									label={ __( 'Icon', 'ablocks' ) }
									attributePrefix={ 'btnIcon' }
									attributes={ attributes }
									setAttributes={ setAttributes }
									legacySupport={ true }
									legacyIconSizeSupport={ true }
								/>
								<ABlocksSelectControl
									label={ __( 'Icon position', 'ablocks' ) }
									options={ [
										{
											label: 'Before',
											value: 'left',
										},
										{
											label: 'After',
											value: 'right',
										},
									] }
									isResponsive={ false }
									attributeValue={ btnIconPosition || 'left' }
									attributeName="btnIconPosition"
									setAttributes={ setAttributes }
								/>
							</>
						}
						style={
							<>
								<ABlocksIconStyleSettings
									label={ __( 'Icon', 'ablocks' ) }
									attributes={ attributes }
									attributePrefix={ 'btnIcon' }
									setAttributes={ setAttributes }
								/>

								<ABlocksRangeControl
									label={ __( 'Icon spacing', 'ablocks' ) }
									min={ 0 }
									max={ 100 }
									hasUnit={ false }
									isInline={ false }
									isResponsive={ false }
									attributeName={ 'btnIconSpace' }
									attributeValue={ attributes?.btnIconSpace }
									setAttributes={ setAttributes }
									attributeObjectKey="iconSpace"
								/>
							</>
						}
					/>
				</ABlocksPanelBody>
			) }
		</>
	);
};

export default ButtonSettings;
