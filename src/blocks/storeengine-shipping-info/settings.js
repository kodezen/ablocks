import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		shipping_heading_hover_color,
		shipping_heading_color,
		shipping_heading_typograhy,
		shipping_address_color,
		shipping_address_hover_color,
		shipping_address_typograhy,
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
						title={ __( 'Shipping Info Style', 'ablocks' ) }
					>
						<ControlLabel
							label="Heading Style"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="shipping_heading_typograhy"
							attributeValue={ shipping_heading_typograhy }
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
										attributeName="shipping_heading_color"
										attributeValue={
											shipping_heading_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isGradient={ false }
										attributeName="shipping_heading_hover_color"
										attributeValue={
											shipping_heading_hover_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label="Address Style"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="shipping_address_typograhy"
							attributeValue={ shipping_address_typograhy }
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
										attributeName="shipping_address_color"
										attributeValue={
											shipping_address_color
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isGradient={ false }
										attributeName="shipping_address_hover_color"
										attributeValue={
											shipping_address_hover_color
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
