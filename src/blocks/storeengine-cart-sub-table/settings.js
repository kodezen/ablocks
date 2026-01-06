import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksAlignmentControl from '@Controls/alignment';
import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		tableWidth,
		tableAlignment,
		tableBackground,
		tableBackgroundH,
		tableColor,
		tableColorH,
		firstTableTypography,
		lastTableTypography,
		tableLastColor,
		tableLastColorH,
		tableLastBackground,
		tableLastBackgroundH,
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
						title={ __( 'Table Layout', 'ablocks' ) }
					>
						<ABlocksRangeControl
							label={ __( 'Table Width', 'ablocks' ) }
							attributeName="tableWidth"
							attributeValue={ tableWidth }
							setAttributes={ setAttributes }
							isInline={ false }
							min={ 1 }
							max={ 100 }
							step={ 1 }
							isResponsive={ false }
						/>

						<ABlocksAlignmentControl
							label={ __( 'Alignment', 'ablocks' ) }
							attributeName="tableAlignment"
							attributeValue={ tableAlignment }
							setAttributes={ setAttributes }
							isInline={ false }
						/>
					</ABlocksPanelBody>

					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Table First Row Style', 'ablocks' ) }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="firstTableTypography"
							attributeValue={ firstTableTypography }
							setAttributes={ setAttributes }
							isResponsive={ false }
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
										label={ __( 'Background', 'ablocks' ) }
										attributeValue={ tableBackground }
										attributeName="tableBackground"
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeValue={ tableColor }
										attributeName="tableColor"
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Hover',
											'ablocks'
										) }
										attributeValue={ tableBackgroundH }
										attributeName="tableBackgroundH"
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'color Hover', 'ablocks' ) }
										attributeValue={ tableColorH }
										attributeName="tableColorH"
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Table Second Row Style', 'ablocks' ) }
					>
						<ABlocksTypography
							label={ __( 'Row Typography', 'ablocks' ) }
							attributeName="lastTableTypography"
							attributeValue={ lastTableTypography }
							setAttributes={ setAttributes }
							isResponsive={ false }
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
										label={ __( 'Background', 'ablocks' ) }
										attributeValue={ tableLastBackground }
										attributeName="tableLastBackground"
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeValue={ tableLastColor }
										attributeName="tableLastColor"
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Hover',
											'ablocks'
										) }
										attributeValue={ tableLastBackgroundH }
										attributeName="tableLastBackgroundH"
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										attributeValue={ tableLastColorH }
										attributeName="tableLastColorH"
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
