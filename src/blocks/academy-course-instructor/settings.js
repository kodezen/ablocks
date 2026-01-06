import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ContentStyleTabs from '@Components/content-style-tabs';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';
import { avatarImageWidth, avatarImageHeight, starSize } from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		avatarH,
		avatarW,
		titleTransition,
		titleColor,
		titleTypography,
		titleColorH,
		textTypography,
		textColor,
		textColorH,
		textTransition,
		star_size,
		star_colorH,
		star_color,
		insTypography,
		insColor,
		insColorH,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Avatar Style', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksRangeControl
							label={ __( 'Avatar Height', 'ablocks' ) }
							min={ 0 }
							max={ 200 }
							step={ 1 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeValue={ avatarH }
							attributeName={ 'avatarH' }
							setAttributes={ setAttributes }
							attributeDefaultValue={ avatarImageHeight }
						/>
						<ABlocksRangeControl
							label={ __( 'Avatar Width', 'ablocks' ) }
							min={ 0 }
							max={ 200 }
							step={ 1 }
							hasUnit={ true }
							isInline={ false }
							isResponsive={ true }
							attributeValue={ avatarW }
							attributeName={ 'avatarW' }
							setAttributes={ setAttributes }
							attributeDefaultValue={ avatarImageWidth }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Title Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="titleTypography"
							attributeValue={ titleTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="titleColor"
										attributeValue={ titleColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="titleColorH"
										attributeValue={ titleColorH }
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
										attributeValue={ titleTransition }
										attributeName={ 'titleTransition' }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Review style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<ABlocksRangeControl
									label={ __( 'Icon size', 'ablocks' ) }
									min={ 0 }
									max={ 100 }
									step={ 1 }
									hasUnit={ true }
									isInline={ false }
									isResponsive={ true }
									attributeValue={ star_size }
									attributeName={ 'star_size' }
									setAttributes={ setAttributes }
									attributeDefaultValue={ starSize }
								/>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="textTypography"
										attributeValue={ textTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<Separator />
									<ControlLabel
										label="Review Color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="textColor"
													attributeValue={ textColor }
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
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="textColorH"
													attributeValue={
														textColorH
													}
													setAttributes={
														setAttributes
													}
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
														textTransition
													}
													attributeName={
														'textTransition'
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator />
									<ControlLabel
										label="Icon color"
										isResponsive={ false }
										isHeader={ true }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Color',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="star_color"
													attributeValue={
														star_color
													}
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
														'Color Hover',
														'ablocks'
													) }
													isResponsive={ false }
													attributeName="star_colorH"
													attributeValue={
														star_colorH
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Instructor Name Style', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="insTypography"
							attributeValue={ insTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<Separator />
						<ControlLabel
							label="Color"
							isResponsive={ false }
							isHeader={ true }
						/>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ false }
										attributeName="insColor"
										attributeValue={ insColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color Hover', 'ablocks' ) }
										isResponsive={ false }
										attributeName="insColorH"
										attributeValue={ insColorH }
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
