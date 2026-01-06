import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksAlignmentControl from '@Controls/alignment';
import './style.css';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';
import ABlocksToggleControl from '@Controls/toggleButton';
import MediaUploadField from '@Components/media-upload';
import ABlocksTextControl from '@Controls/text';

const propTypes = {};
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		alignment,
		qrValue,
		bgColor,
		qrLevel,
		fgColor,
		imageSrc,
		logoWidth,
		logoOpacity,
		logoHeight,
		qrSize,
		isImage,
		positionX,
		positionY,
		excavateValue,
	} = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'QR Code Content', 'academy-blocks' ) }
						initialOpen={ true }
					>
						<ABlocksTextControl
							label={ __( 'QR Code Value', 'ablocks' ) }
							attributeName="qrValue"
							attributeValue={ qrValue }
							setAttributes={ setAttributes }
						/>
						<ABlocksSelectControl
							label={ __( 'Error Level', 'ablocks' ) }
							options={ [
								{ label: 'Low (7%)', value: 'L' },
								{ label: 'Medium (15%)', value: 'M' },
								{ label: 'Qurtile (25%)', value: 'Q' },
								{ label: 'High (30%)', value: 'H' },
							] }
							isSearch={ true }
							attributeName="qrLevel"
							attributeValue={ qrLevel }
							setAttributes={ setAttributes }
						/>
						<ABlocksRangeControl
							label={ __( 'QR Code Size', 'ablocks' ) }
							min={ isImage ? 150 : 0 }
							max={ 500 }
							hasUnit={ false }
							isInline={ false }
							isResponsive={ false }
							attributeName="qrSize"
							attributeValue={ qrSize }
							setAttributes={ setAttributes }
							attributeObjectKey="qrSize"
						/>
						<ABlocksAlignmentControl
							label={ __( 'Alignment', 'ablocks' ) }
							attributeName="alignment"
							attributeValue={ alignment }
							setAttributes={ setAttributes }
							isInline={ false }
						/>
						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Logo Setting', 'ablocks' ) }
							attributeValue={ isImage }
							setAttributes={ setAttributes }
							attributeName="isImage"
						/>
						<ABlocksColorControl
							label={ __( 'ForeGround Color', 'ablocks' ) }
							attributeName="fgColor"
							attributeValue={ fgColor }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
					{ isImage && (
						<ABlocksPanelBody
							title={ __( 'Image Setting', 'ablocks' ) }
							initialOpen={ true }
						>
							<MediaUploadField
								allowedTypes={ [ 'image' ] }
								attributeValue={ attributes }
								attributeName="imageSrc"
								onSelectImageHandler={ ( mediaValue ) =>
									setAttributes( {
										imageSrc: mediaValue.url,
										imgId: mediaValue.id,
									} )
								}
								onRemoveImageHandler={ () => {
									setAttributes( {
										imageSrc: undefined,
									} );
								} }
							/>
							<ABlocksToggleControl
								isResponsive={ false }
								label={ __( 'Excavate', 'ablocks' ) }
								attributeValue={ excavateValue }
								setAttributes={ setAttributes }
								attributeName="excavateValue"
							/>
							<ContentStyleTabs
								content={
									<>
										<h2 className="ablocks-settings-section-title">
											{ __(
												'Logo Dimension',
												'ablocks'
											) }
										</h2>
										<Separator />
										<ABlocksRangeControl
											label={ __(
												'Logo Width',
												'ablocks'
											) }
											min={ 0 }
											max={ 100 }
											hasUnit={ false }
											isInline={ false }
											isResponsive={ false }
											attributeName="logoWidth"
											attributeValue={ logoWidth }
											setAttributes={ setAttributes }
											attributeObjectKey="logoWidth"
										/>
										<ABlocksRangeControl
											label={ __(
												'Logo Height',
												'ablocks'
											) }
											min={ 0 }
											max={ 100 }
											hasUnit={ false }
											isInline={ false }
											isResponsive={ false }
											attributeName="logoHeight"
											attributeValue={ logoHeight }
											setAttributes={ setAttributes }
											attributeObjectKey="logoHeight"
										/>
									</>
								}
								style={
									<>
										<ABlocksRangeControl
											label={ __(
												'Image Opacity',
												'ablocks'
											) }
											min={ 0 }
											max={ 1 }
											hasUnit={ false }
											isInline={ false }
											step={ 0.1 }
											isResponsive={ false }
											attributeName="logoOpacity"
											attributeValue={ logoOpacity }
											setAttributes={ setAttributes }
											attributeObjectKey="logoOpacity"
										/>
										<h2 className="ablocks-settings-section-title">
											{ __(
												'Logo Position',
												'academy-blocks'
											) }
										</h2>
										<Separator />
										<ABlocksRangeControl
											label={ __(
												'Position X',
												'ablocks'
											) }
											min={ -250 }
											max={ 500 }
											hasUnit={ false }
											isInline={ false }
											step={ 1 }
											isResponsive={ false }
											attributeName="positionX"
											attributeValue={ positionX }
											setAttributes={ setAttributes }
											attributeObjectKey="positionX"
										/>
										<ABlocksRangeControl
											label={ __(
												'Position Y',
												'ablocks'
											) }
											min={ -250 }
											max={ 500 }
											hasUnit={ false }
											isInline={ false }
											step={ 1 }
											isResponsive={ false }
											attributeName="positionY"
											attributeValue={ positionY }
											setAttributes={ setAttributes }
											attributeObjectKey="positionY"
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
