import React from 'react';
import { __ } from '@wordpress/i18n';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksRangeControl from '@Controls/range';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTypography from '@Controls/typography';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import { getResponsiveValue } from '@Utils/helper';
import ABlocksNumberControl from '@Controls/number';
import GetDeviceType from '@Utils/get-device-type';
import {
	spacingAttribute as spacingDefaultAttributeValue,
	ratingNumberGapAttribute as ratingNumberGapDefaultAttributeValue,
	ratingAttribute as ratingAttributeDefaultValue,
} from './attributes';

// colors
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';

const getMaxValueSpaceForUnit = ( unit ) => {
	switch ( unit ) {
		case 'px':
			return 100;
		case 'em':
		case 'rem':
			return 10;
		default:
			return 100;
	}
};

const StarRatingSettings = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		ratingScale,
		ratingColor,
		ratingColorHover,
		ratingUnmarkedColor,
		ratingNumberPosition,
		ratingUnmarkedColorHover,
		showRatingNumber,
		showCount,
		spacing,
		ratingNumberColor,
		ratingNumberTypography,
		rating,
		ratingNumberGap,
		ratingMargin,
	} = attributes;
	const ratingScaleOptions = [
		{ label: '0 to 1', value: 1 },
		{ label: '0 to 5', value: 5 },
		{ label: '0 to 10', value: 10 },
	];
	const deviceType = GetDeviceType();
	const gapUnit = getResponsiveValue(
		ratingNumberGap,
		'valueUnit',
		deviceType
	);

	return (
		<>
			<ABlocksPanelBody
				title={ __( 'Start Rating', 'ablocks' ) }
				initialOpen={ false }
			>
				<ContentStyleTabs
					content={
						<>
							<ABlocksSelectControl
								label={ __( 'Scale', 'ablocks' ) }
								options={ ratingScaleOptions }
								attributeName="ratingScale"
								attributeValue={ ratingScale }
								onChangeHandler={ ( controlValue ) => {
									setAttributes( {
										ratingScale: controlValue,
										rating:
											attributes?.rating > controlValue
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
								disableDynamicContent={ false }
							/>
							<ABlocksIconUploader
								label={ __( 'Icon', 'ablocks' ) }
								attributePrefix={ 'starIcon' }
								attributes={ attributes }
								setAttributes={ setAttributes }
								legacySupport={ true }
								legacyIconSizeSupport={ true }
							/>
							<ABlocksToggleControl
								label={ __( 'Show Rating number', 'ablocks' ) }
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
							<ABlocksDimensions
								label={ __( 'Margin', 'ablocks' ) }
								isResponsive={ true }
								attributeName="ratingMargin"
								attributeValue={ ratingMargin }
								setAttributes={ setAttributes }
							/>
							<NormalHoverTabs
								normal={
									<>
										<ABlocksColorControl
											label={ __(
												'Marked Color',
												'ablocks'
											) }
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
											attributeValue={
												ratingUnmarkedColor
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
								hover={
									<>
										<ABlocksColorControl
											label={ __(
												'Marked Color',
												'ablocks'
											) }
											attributeName="ratingColorHover"
											attributeValue={ ratingColorHover }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Unmarked Color',
												'ablocks'
											) }
											attributeName="ratingUnmarkedColorHover"
											attributeValue={
												ratingUnmarkedColorHover
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksRangeControl
											label={ __(
												'Transition Duration',
												'ablocks'
											) }
											min={ 0 }
											max={ 5 }
											step={ 0.01 }
											hasUnit={ false }
											isInline={ false }
											isResponsive={ false }
											attributeValue={
												attributes?.ratingTransition ||
												0
											}
											attributeName={ 'ratingTransition' }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</>
					}
				/>
			</ABlocksPanelBody>
			{ showRatingNumber && (
				<ABlocksPanelBody
					title={ __( 'Rating Number', 'ablocks' ) }
					initialOpen={ false }
				>
					<ContentStyleTabs
						content={
							<>
								<ABlocksAlignmentControl
									label={ __( 'Position', 'ablocks' ) }
									isResponsive={ false }
									attributeName="ratingNumberPosition"
									attributeObjectKey="ratingNumberPosition"
									attributeValue={ ratingNumberPosition }
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
									unitOptions={ [
										{ value: 'px', label: 'px' },
										{ value: 'rem', label: 'rem' },
										{ value: 'em', label: 'em' },
									] }
									min={ 1 }
									max={ getMaxValueSpaceForUnit( gapUnit ) }
									isInline={ false }
									hasUnit={ true }
									attributeDefaultValue={
										ratingNumberGapDefaultAttributeValue
									}
									autoSyncRange={ true }
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
									label={ __( 'Typography', 'ablocks' ) }
									attributeName="ratingNumberTypography"
									attributeValue={ ratingNumberTypography }
									setAttributes={ setAttributes }
									isResponsive={ true }
									attributes={ attributes }
								/>
							</>
						}
					/>
				</ABlocksPanelBody>
			) }
		</>
	);
};

export default StarRatingSettings;
