import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		heading_typograhy,
		heading_color,
		heading_hover_color,
		address_typograhy,
		address_hover_color,
		address_color,
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
						title={ __( 'Billing Info Style', 'ablocks' ) }
					>
						<ControlLabel
							label="Heading Style"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="heading_typograhy"
							attributeValue={ heading_typograhy }
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
										attributeName="heading_color"
										attributeValue={ heading_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isGradient={ false }
										attributeName="heading_hover_color"
										attributeValue={ heading_hover_color }
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
							attributeName="address_typograhy"
							attributeValue={ address_typograhy }
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
										attributeName="address_color"
										attributeValue={ address_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isGradient={ false }
										attributeName="address_hover_color"
										attributeValue={ address_hover_color }
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
