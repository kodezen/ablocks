import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';
import { useSelect } from '@wordpress/data';
import GetDeviceType from '@Utils/get-device-type';
import ABlocksToggleControl from '@Controls/toggleButton';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		product_id,
		titleTypography,
		titleColor,
		titleColorH,
		border,
		descriptionColor,
		descriptionColorH,
		descriptionTypography,
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
								</>
							}
							style={
								<>
									<ControlLabel
										label={ __( 'Title Style', 'ablocks' ) }
										isResponsive={ false }
										isHeader={ true }
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

									{ /* Colors */ }
									<ControlLabel
										label="Color"
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
													attributeValue={
														titleColor
													}
													attributeName="titleColor"
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
														'Text Hover',
														'ablocks'
													) }
													attributeValue={
														titleColorH
													}
													attributeName="titleColorH"
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
											'Description Style',
											'ablocks'
										) }
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="descriptionTypography"
										attributeValue={ descriptionTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />

									{ /* Colors */ }
									<ControlLabel
										label="Color"
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
													attributeValue={
														descriptionColor
													}
													attributeName="descriptionColor"
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
														'Text Hover',
														'ablocks'
													) }
													attributeValue={
														descriptionColorH
													}
													attributeName="descriptionColorH"
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator />
									<ControlLabel
										label={ __( 'Border', 'ablocks' ) }
										isResponsive={ false }
										isHeader={ true }
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
