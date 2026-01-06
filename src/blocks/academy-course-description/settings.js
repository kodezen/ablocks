import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		heading_typography,
		heading_color,
		heading_transition,
		heading_colorH,
		description_color,
		description_colorH,
		description_typography,
		description_transition,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Overview Heading', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="heading_typography"
							attributeValue={ heading_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
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
										isResponsive={ false }
										attributeName="heading_colorH"
										attributeValue={ heading_colorH }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Duration(ms)',
											'ablocks'
										) }
										min={ 0 }
										max={ 5 }
										step={ 0.1 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={ heading_transition }
										attributeName={ 'heading_transition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Description Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="description_typography"
							attributeValue={ description_typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="description_color"
										attributeValue={ description_color }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="description_colorH"
										attributeValue={ description_colorH }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Duration(ms)',
											'ablocks'
										) }
										min={ 0 }
										max={ 5 }
										step={ 0.1 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeValue={
											description_transition
										}
										attributeName={
											'description_transition'
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
