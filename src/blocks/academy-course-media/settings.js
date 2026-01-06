import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import ABlocksNormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ABlocksAlignmentControl from '@Controls/alignment';
import getDeviceType from '@Utils/get-device-type';
import { imageWidthAttribute, imageHeightAttribute } from './attributes';
import ABlocksRangeControl from '@Controls/range';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const deviceType = getDeviceType();
	const {
		imageWidth,
		imageHeight,
		alignment,
		imageOpacityH,
		imageOpacity,
		boxShadow,
		border,
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
						title={ __( 'General', 'ablocks' ) }
					>
						<ContentStyleTabs
							content={
								<>
									<ControlLabel
										label={ __(
											'Image Dimensions',
											'ablocks'
										) }
										isHeader={ true }
									/>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeName="imageWidth"
										attributeObjectKey="value"
										attributeValue={ imageWidth }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ true }
										attributeDataType="object"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: '%', label: '%' },
											{ value: 'em', label: 'em' },
											{ value: 'rem', label: 'rem' },
											{ value: 'vw', label: 'vw' },
										] }
										min={ 0 }
										max={
											[ 'vw', '%' ].includes(
												imageWidth[
													'valueUnit' + deviceType
												] ?? '%'
											)
												? 100
												: 1600
										}
										attributeDefaultValue={
											imageWidthAttribute
										}
										autoSyncRange={ true }
									/>
									<ABlocksRangeControl
										label={ __( 'Height', 'ablocks' ) }
										attributeName="imageHeight"
										attributeObjectKey="value"
										attributeValue={ imageHeight }
										setAttributes={ setAttributes }
										isInline={ false }
										hasUnit={ true }
										attributeDataType="object"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: '%', label: '%' },
											{ value: 'em', label: 'em' },
											{ value: 'rem', label: 'rem' },
											{ value: 'vh', label: 'vh' },
										] }
										min={ 0 }
										max={
											[ 'vh', '%' ].includes(
												imageHeight[
													'valueUnit' + deviceType
												] ?? '%'
											)
												? 100
												: 1600
										}
										attributeDefaultValue={
											imageHeightAttribute
										}
										autoSyncRange={ true }
									/>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
								</>
							}
							style={
								<>
									<ABlocksNormalHoverTabs
										normal={
											<>
												<ABlocksRangeControl
													label={ __(
														'Opacity',
														'ablocks'
													) }
													min={ 0 }
													max={ 1 }
													step={ 0.1 }
													isInline={ false }
													isResponsive={ false }
													attributeName="imageOpacity"
													attributeValue={
														imageOpacity
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksRangeControl
													label={ __(
														'Opacity Hover',
														'ablocks'
													) }
													min={ 0 }
													max={ 1 }
													step={ 0.1 }
													isInline={ false }
													isResponsive={ false }
													attributeName="imageOpacityH"
													attributeValue={
														imageOpacityH
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>

									<ControlLabel
										label="Box shadow"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeName="boxShadow"
										attributeValue={ boxShadow }
										setAttributes={ setAttributes }
									/>
									<ControlLabel
										label="Border"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBorderControl
										attributeName="border"
										attributeValue={ border }
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
