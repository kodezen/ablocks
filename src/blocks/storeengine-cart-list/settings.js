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
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		tableBackground,
		tableBackgroundH,
		tableTransition,
		productTilteTypography,
		productTitleColor,
		productTitleColorH,
		productsubTitleTypography,
		productSubTiteColor,
		productSubTiteColorH,
		productPriceTypography,
		productPriceColor,
		productPriceColorH,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Table Background', 'ablocks' ) }
						initialOpen={ true }
					>
						{ ' ' }
						<ControlLabel
							label={ __( 'Background', 'ablocks' ) }
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										attributeName="tableBackground"
										attributeValue={ tableBackground }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										attributeValue={ tableBackgroundH }
										attributeName="tableBackgroundH"
										setAttributes={ setAttributes }
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
										attributeValue={ tableTransition }
										attributeName={ 'tableTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						title={ __( 'Table Child Control', 'ablocks' ) }
						initialOpen={ false }
					>
						<ControlLabel
							label={ __( 'Product Title', 'ablocks' ) }
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="productTilteTypography"
							attributeValue={ productTilteTypography }
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
										attributeValue={ productTitleColor }
										attributeName="productTitleColor"
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Hover Color', 'ablocks' ) }
										attributeValue={ productTitleColorH }
										attributeName="productTitleColorH"
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Product SubTitle"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="productsubTitleTypography"
							attributeValue={ productsubTitleTypography }
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
										attributeValue={ productSubTiteColor }
										attributeName="productSubTiteColor"
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Hover Color', 'ablocks' ) }
										attributeValue={ productSubTiteColorH }
										attributeName="productSubTiteColorH"
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Product Price"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="productPriceTypography"
							attributeValue={ productPriceTypography }
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
										attributeValue={ productPriceColor }
										attributeName="productPriceColor"
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeValue={ productPriceColorH }
										attributeName="productPriceColorH"
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
