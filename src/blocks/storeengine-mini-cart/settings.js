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
		iconColor,
		iconColorH,
		countColor,
		countColorH,
		countBg,
		countBgH,
		countTypography,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Mini Cart Style' ) }
						isOpen={ true }
					>
						<ControlLabel
							label="Icon Color"
							isHeader={ true }
							isResponsive={ false }
						/>

						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="iconColor"
										attributeValue={ iconColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isGradient={ false }
										attributeName="iconColorH"
										attributeValue={ iconColorH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>

						<Separator />
						<ControlLabel
							label="Count Typography"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="countTypography"
							attributeValue={ countTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />

						<ControlLabel
							label="Count Color"
							isHeader={ true }
							isResponsive={ false }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isGradient={ false }
										attributeName="countBg"
										attributeValue={ countBg }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="countColor"
										attributeValue={ countColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isGradient={ false }
										attributeName="countBgH"
										attributeValue={ countBgH }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isGradient={ false }
										attributeName="countColorH"
										attributeValue={ countColorH }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
