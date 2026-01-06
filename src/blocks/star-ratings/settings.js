import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';
import ABlocksColorControl from '@Controls/color';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksNumberControl from '@Controls/number';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksRangeControl from '@Controls/range';
import ABlocksIconUploader from '@Controls/icon-upload';
import { ratingScaleOptions } from './helper';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTypography from '@Controls/typography';
import {
	spacingAttribute as spacingDefaultAttributeValue,
	ratingNumberGapAttribute as ratingNumberGapDefaultAttributeValue,
	ratingAttribute as ratingAttributeDefaultValue,
} from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		scale,
		ratingUnmarkedColor,
		alignment,
		showRatingNumber,
		showCount,
		ratingColor,
		spacing,
		ratingNumberColor,
		ratingNumberTypography,
		rating,
		ratingNumberGap,
		ratingNumberPosition,
	} = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-advanced-star-rating-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Start Rating', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'Scale', 'ablocks' ) }
										options={ ratingScaleOptions }
										attributeName="scale"
										attributeValue={ scale }
										onChangeHandler={ ( controlValue ) => {
											setAttributes( {
												scale: controlValue,
												rating:
													attributes?.rating >
													controlValue
														? controlValue
														: attributes?.rating,
											} );
										} }
									/>
									<ABlocksNumberControl
										label={ __( 'Rating', 'ablocks' ) }
										attributeName="rating"
										attributeValue={ rating }
										step={ 0.1 }
										setAttributes={ setAttributes }
										disableDynamicContent={ true }
									/>
									<ABlocksIconUploader
										label={ __( 'Icon', 'ablocks' ) }
										attributes={ attributes }
										setAttributes={ setAttributes }
										legacySupport={ true }
										legacyIconSizeSupport={ true }
									/>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
										isInline={ false }
										options={ [
											{
												label: 'left',
												value: 'left',
												icon: 'left',
											},
											{
												label: 'center',
												value: 'center',
												icon: 'center',
											},
											{
												label: 'right',
												value: 'right',
												icon: 'right',
											},
										] }
									/>
									<ABlocksToggleControl
										label={ __(
											'Show Rating number',
											'ablocks'
										) }
										attributeName="showRatingNumber"
										attributeValue={ showRatingNumber }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									{ showRatingNumber && (
										<ABlocksToggleControl
											label={ __(
												'Show Total Rating number',
												'ablocks'
											) }
											attributeName="showCount"
											attributeValue={ showCount }
											setAttributes={ setAttributes }
											isResponsive={ false }
										/>
									) }
								</>
							}
							style={
								<>
									<ABlocksRangeControl
										label={ __( 'Spacing', 'ablocks' ) }
										isResponsive={ true }
										hasUnit={ true }
										attributeName="spacing"
										attributeValue={ spacing }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'rem', label: 'rem' },
											{ value: 'em', label: 'em' },
										] }
										step={ 1 }
										min={ 1 }
										max={ 30 }
										isInline={ false }
										attributeDefaultValue={
											spacingDefaultAttributeValue
										}
										autoSyncRange={ false }
									/>
									<Separator />
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="ratingColor"
										attributeValue={ ratingColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Unmarked Color',
											'ablocks'
										) }
										attributeName="ratingUnmarkedColor"
										attributeValue={ ratingUnmarkedColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					{ showRatingNumber && (
						<ABlocksPanelBody
							title={ __( 'Rating Number', 'ablocks' ) }
							initialOpen={ true }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksAlignmentControl
											label={ __(
												'Position',
												'ablocks'
											) }
											isResponsive={ false }
											attributeName="ratingNumberPosition"
											attributeObjectKey="ratingNumberPosition"
											attributeValue={
												ratingNumberPosition
											}
											setAttributes={ setAttributes }
											isInline={ false }
											options={ [
												{
													label: 'left',
													value: 'left',
													icon: 'left',
												},
												{
													label: 'right',
													value: 'right',
													icon: 'right',
												},
											] }
										/>
										<ABlocksRangeControl
											label={ __( 'Gap', 'ablocks' ) }
											attributeName="ratingNumberGap"
											attributeObjectKey="value"
											attributeValue={ ratingNumberGap }
											setAttributes={ setAttributes }
											isResponsive={ true }
											step={ 1 }
											min={ 1 }
											max={ 100 }
											isInline={ false }
											hasUnit={ true }
											attributeDefaultValue={
												ratingNumberGapDefaultAttributeValue
											}
											autoSyncRange={ false }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="ratingNumberColor"
											attributeValue={ ratingNumberColor }
											setAttributes={ setAttributes }
										/>
										<ABlocksTypography
											label={ __(
												'Typography',
												'ablocks'
											) }
											attributeName="ratingNumberTypography"
											attributeValue={
												ratingNumberTypography
											}
											setAttributes={ setAttributes }
											isResponsive={ true }
											attributes={ attributes }
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
