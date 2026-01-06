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
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import { useSelect } from '@wordpress/data';
import ABlocksToggleControl from '@Controls/toggleButton';
import { infoBoxWidthAttribute } from './attributes';
import GetDeviceType from '@Utils/get-device-type';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		product_id,
		infoBoxWidth,
		boxColor,
		boxColorH,
		boxBackground,
		boxBackgroundH,
		infoBoxoxShadow,
		infoBoxBorder,
		infoBoxPadding,
		infoTypography,
		linkTypography,
		linkColor,
		linkColorH,
		infoboxAlignment,
		isCustom,
	} = attributes;

	const product = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords(
			'postType',
			'storeengine_product',
			{
				per_page: -1,
			}
		);
	}, [] );

	const prductOption = product
		? product.map( ( p ) => ( {
				label: p.title?.rendered,
				value: p.id,
		  } ) )
		: [];
	prductOption.unshift( {
		label: 'Select a Product',
		value: 0,
	} );
	const deviceType = GetDeviceType();

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					{ /* General Settings Tab */ }
					<ABlocksPanelBody
						initialOpen={ true }
						title={ __( 'General', 'ablocks' ) }
					>
						<ContentStyleTabs
							content={
								<>
									<ControlLabel
										label={ __(
											'Product Selection',
											'ablocks'
										) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksToggleControl
										label={ __(
											'Use Custom Product',
											'ablocks'
										) }
										attributeValue={ isCustom }
										isResponsive={ false }
										attributeName="isCustom"
										setAttributes={ setAttributes }
									/>
									<i>
										Enabled, the same selected product shows
										in editor and frontend.
									</i>
									<Separator />

									<ABlocksSelectControl
										options={ prductOption }
										label={ __(
											'Select Product',
											'ablocks'
										) }
										attributeValue={ product_id }
										attributeName={ 'product_id' }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __( 'Width', 'ablocks' ) }
										attributeName="infoBoxWidth"
										attributeObjectKey="value"
										attributeValue={ infoBoxWidth }
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
												infoBoxWidth[
													'valueUnit' + deviceType
												] ?? '%'
											)
												? 100
												: 1600
										}
										attributeDefaultValue={
											infoBoxWidthAttribute
										}
										autoSyncRange={ true }
									/>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="infoboxAlignment"
										attributeValue={ infoboxAlignment }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
								</>
							}
							style={
								<>
									<ControlLabel
										label={ __(
											'Notice Typography',
											'ablocks'
										) }
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="infoTypography"
										attributeValue={ infoTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />
									<ControlLabel
										label={ __(
											'Notice Color',
											'ablocks'
										) }
										isHeader={ true }
										isResponsive={ false }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeValue={ boxColor }
													attributeName="boxColor"
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													attributeValue={
														boxBackground
													}
													attributeName="boxBackground"
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeValue={ boxColorH }
													attributeName="boxColorH"
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Background',
														'ablocks'
													) }
													attributeValue={
														boxBackgroundH
													}
													attributeName="boxBackgroundH"
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator />
									<ControlLabel
										label={ __(
											'Link Typography',
											'ablocks'
										) }
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="linkTypography"
										attributeValue={ linkTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />
									<ControlLabel
										label={ __( 'Link Color', 'ablocks' ) }
										isHeader={ true }
										isResponsive={ false }
									/>

									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeValue={ linkColor }
													attributeName="linkColor"
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
										hover={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													attributeValue={
														linkColorH
													}
													attributeName="linkColorH"
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator />
									<ControlLabel
										label={ __( 'Padding', 'ablocks' ) }
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="infoBoxPadding"
										attributeValue={ infoBoxPadding }
										setAttributes={ setAttributes }
									/>

									{ /* Border */ }
									<Separator />
									<ControlLabel
										label={ __( 'Border', 'ablocks' ) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="infoBoxBorder"
										attributeValue={ infoBoxBorder }
										setAttributes={ setAttributes }
									/>

									{ /* Box Shadow */ }
									<Separator />
									<ControlLabel
										label="Box Shadow"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box Shadow', 'ablocks' ) }
										attributeName="infoBoxoxShadow"
										attributeValue={ infoBoxoxShadow }
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
