import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';
import {
	imageWidth as imageWidthAttribute,
	imageHeight as imageHeightAttribute,
} from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		titleColor,
		titleColorH,
		titleTypography,
		imageWidth,
		ProductTitleTypography,
		productTitleColorH,
		productTitleColor,
		discountPriceTypography,
		discountPriceColor,
		discountPriceColorH,
		imageHeight,
		tableTextTypography,
		tableTextColorH,
		tableTextColor,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						initialOpen={ true }
						title={ __( 'Layout Style', 'ablocks' ) }
					>
						<ABlocksRangeControl
							label={ __( 'Width', 'ablocks' ) }
							attributeName="imageWidth"
							attributeValue={ imageWidth }
							setAttributes={ setAttributes }
							isInline={ false }
							min={ 1 }
							max={ 600 }
							step={ 1 }
							isResponsive={ true }
							attributeDefaultValue={ imageWidthAttribute }
							autoSyncRange={ true }
						/>
						<ABlocksRangeControl
							label={ __( 'Height', 'ablocks' ) }
							attributeName="imageHeight"
							attributeValue={ imageHeight }
							setAttributes={ setAttributes }
							isInline={ false }
							min={ 1 }
							max={ 600 }
							step={ 1 }
							isResponsive={ true }
							attributeDefaultValue={ imageHeightAttribute }
							autoSyncRange={ true }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						initialOpen={ true }
						title={ __( 'Style', 'ablocks' ) }
					>
						<ControlLabel
							label="Product Title"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="ProductTitleTypography"
							attributeValue={ ProductTitleTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="productTitleColor"
										attributeValue={ productTitleColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="productTitleColorH"
										attributeValue={ productTitleColorH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Quality Style"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="titleTypography"
							attributeValue={ titleTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="titleColor"
										attributeValue={ titleColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="titleColorH"
										attributeValue={ titleColorH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Price Style"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="discountPriceTypography"
							attributeValue={ discountPriceTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="discountPriceColor"
										attributeValue={ discountPriceColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="discountPriceColorH"
										attributeValue={ discountPriceColorH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Table Style"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="tableTextTypography"
							attributeValue={ tableTextTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="tableTextColor"
										attributeValue={ tableTextColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="tableTextColorH"
										attributeValue={ tableTextColorH }
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
