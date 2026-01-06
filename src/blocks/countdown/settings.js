import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksTextControl from '@Controls/text';
import ABlocksColorControl from '@Controls/color';
import ABlocksTypography from '@Controls/typography';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksRangeControl from '@Controls/range';
import Separator from '@Components/separator';
import ABlocksSelectControl from '@Controls/select';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import ABlocksBorderControl from '@Controls/border';
import ABlocksDimensions from '@Controls/dimensions';
import ControlLabel from '@Components/control-label';
import ABlocksDateTimerPicker from '@Components/date-time-picker';
import ABlocksButtonGroupControl from '@Components/button-group';
import {
	separatorOptions,
	labelPositionOptions,
	directionOptions,
	wrapOptions,
	justifyOptions,
	alignOptions,
} from './helper';
import classNames from 'classnames';
import {
	numberAndLabelGapAttribute as numberAndLabelGapDefaultAttributeValue,
	boxRowGapAttribute as boxRowGapDefaultAttributeValue,
	boxColumGapAttribute as boxColumGapDefaultAttributeValue,
	boxSizeAttribute as boxSizeDefaultAttributeValue,
} from './attributes';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes, context } = props;
	const {
		targetTime,
		showDay,
		showHour,
		showMinute,
		showSecond,

		dayLabel,
		hourLabel,
		minuteLabel,
		secondLabel,

		orient,
		alignment,
		justificationAlign,
		wrapping,

		labelPosition,
		labelColor,
		labelBgColor,
		labelTypography,
		showLabels,

		separator,
		showSeparator,
		separatorColor,
		separatorTypography,

		numberColor,
		numberBgColor,
		numberTypography,

		boxSize,
		boxRowGap,
		boxColumnGap,
		numberAndLabelGap,
		boxBackgroundColor,
		padding,
	} = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-countdown-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Countdown', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksButtonGroupControl
										isInline
										label={ __( 'Direction', 'ablocks' ) }
										options={ directionOptions }
										attributeName="orient"
										attributeValue={ orient }
										setAttributes={ setAttributes }
									/>

									{ ( orient?.value === 'row' ||
										orient?.value === 'row-reverse' ) && (
										<ABlocksButtonGroupControl
											isInline
											label={ __( 'Justify', 'ablocks' ) }
											options={ justifyOptions }
											attributeName="justificationAlign"
											attributeValue={
												justificationAlign
											}
											setAttributes={ setAttributes }
										/>
									) }

									<ABlocksButtonGroupControl
										isInline
										label={ __( 'Align Items', 'ablocks' ) }
										options={ alignOptions }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
									/>

									<ABlocksButtonGroupControl
										isInline
										label={ __( 'Wrap', 'ablocks' ) }
										options={ wrapOptions }
										attributeName="wrapping"
										attributeValue={ wrapping }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __( 'Rows Gap', 'ablocks' ) }
										isResponsive={ true }
										hasUnit={ true }
										attributeName="boxRowGap"
										attributeValue={ boxRowGap }
										setAttributes={ setAttributes }
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'rem', label: 'rem' },
											{ value: 'em', label: 'em' },
										] }
										min={ 0 }
										max={ 50 }
										step={ 1 }
										isInline={ false }
										attributeDefaultValue={
											boxRowGapDefaultAttributeValue
										}
									/>
									<ABlocksRangeControl
										label={ __( 'Columns Gap', 'ablocks' ) }
										isResponsive={ true }
										hasUnit={ true }
										attributeName="boxColumnGap"
										attributeValue={ boxColumnGap }
										setAttributes={ setAttributes }
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'rem', label: 'rem' },
											{ value: 'em', label: 'em' },
										] }
										min={ 0 }
										max={ 50 }
										step={ 1 }
										isInline={ false }
										attributeDefaultValue={
											boxColumGapDefaultAttributeValue
										}
									/>
									<ABlocksDateTimerPicker
										label={ __( 'Select Date', 'ablocks' ) }
										setAttributes={ setAttributes }
										attributeValue={ targetTime }
										attributeName="targetTime"
									/>
									<Separator />

									<ABlocksToggleControl
										label={ __( 'Show Day', 'ablocks' ) }
										attributeValue={ showDay }
										setAttributes={ setAttributes }
										attributeName="showDay"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'Show Hour', 'ablocks' ) }
										attributeValue={ showHour }
										setAttributes={ setAttributes }
										attributeName="showHour"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'Show Minute', 'ablocks' ) }
										attributeValue={ showMinute }
										setAttributes={ setAttributes }
										attributeName="showMinute"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'Show Second', 'ablocks' ) }
										attributeValue={ showSecond }
										setAttributes={ setAttributes }
										attributeName="showSecond"
										isResponsive={ false }
									/>
									<Separator />
									<ABlocksToggleControl
										label={ __(
											'Show Separator',
											'ablocks'
										) }
										attributeValue={ showSeparator }
										setAttributes={ setAttributes }
										attributeName="showSeparator"
										isResponsive={ false }
									/>
									<ABlocksToggleControl
										label={ __( 'Show Labels', 'ablocks' ) }
										attributeValue={ showLabels }
										setAttributes={ setAttributes }
										attributeName="showLabels"
										isResponsive={ false }
									/>
								</>
							}
							style={
								<>
									<ABlocksRangeControl
										label={ __( 'Box Size', 'ablocks' ) }
										isResponsive={ true }
										hasUnit={ true }
										attributeName="boxSize"
										attributeValue={ boxSize }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'rem', label: 'rem' },
											{ value: 'em', label: 'em' },
										] }
										min={ 0 }
										max={ 1000 }
										isInline={ false }
										attributeDefaultValue={
											boxSizeDefaultAttributeValue
										}
										autoSyncRange={ true }
									/>

									<Separator />
									<ABlocksSelectControl
										label={ __(
											'Label Position',
											'ablocks'
										) }
										options={ labelPositionOptions }
										attributeName="labelPosition"
										attributeValue={ labelPosition }
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __(
											'Number and Label Gap',
											'ablocks'
										) }
										isResponsive={ true }
										hasUnit={ true }
										attributeName="numberAndLabelGap"
										attributeValue={ numberAndLabelGap }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'rem', label: 'rem' },
											{ value: 'em', label: 'em' },
										] }
										min={ 0 }
										max={ 50 }
										step={ 1 }
										isInline={ false }
										attributeDefaultValue={
											numberAndLabelGapDefaultAttributeValue
										}
									/>
									<Separator margin="30" />
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="boxBorder"
										attributeValue={ attributes?.boxBorder }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="padding"
										attributeValue={ padding }
										setAttributes={ setAttributes }
									/>
									<Separator />
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="boxBackgroundColor"
										attributeValue={ boxBackgroundColor }
										setAttributes={ setAttributes }
										isGradient={ true }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeValue={ attributes.boxShadow }
										setAttributes={ setAttributes }
										attributeName="boxShadow"
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Label', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextControl
										label={ __( 'Days', 'ablocks' ) }
										attributeValue={ dayLabel }
										setAttributes={ setAttributes }
										attributeName="dayLabel"
										isResponsive={ false }
										context={ context }
									/>
									<ABlocksTextControl
										label={ __( 'Hours', 'ablocks' ) }
										attributeValue={ hourLabel }
										setAttributes={ setAttributes }
										attributeName="hourLabel"
										isResponsive={ false }
										context={ context }
									/>
									<ABlocksTextControl
										label={ __( 'Minute', 'ablocks' ) }
										attributeValue={ minuteLabel }
										setAttributes={ setAttributes }
										attributeName="minuteLabel"
										isResponsive={ false }
										context={ context }
									/>
									<ABlocksTextControl
										label={ __( 'Second', 'ablocks' ) }
										attributeValue={ secondLabel }
										setAttributes={ setAttributes }
										attributeName="secondLabel"
										isResponsive={ false }
										context={ context }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="labelColor"
										attributeValue={ labelColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="labelBgColor"
										attributeValue={ labelBgColor }
										setAttributes={ setAttributes }
										isGradient={ true }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="labelTypography"
										attributeValue={ labelTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
								</>
							}
						></ContentStyleTabs>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Number', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							attributeName="numberColor"
							attributeValue={ numberColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Background Color', 'ablocks' ) }
							attributeName="numberBgColor"
							attributeValue={ numberBgColor }
							setAttributes={ setAttributes }
							isGradient={ true }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="numberTypography"
							attributeValue={ numberTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
					</ABlocksPanelBody>
					{ showSeparator && (
						<ABlocksPanelBody
							title={ __( 'Separator', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksButtonGroupControl
											isInline={ false }
											label={ __(
												'Separator',
												'ablocks'
											) }
											options={ separatorOptions }
											attributeName="separator"
											attributeValue={ separator }
											setAttributes={ setAttributes }
											isResponsive={ false }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __( 'Color', 'ablocks' ) }
											attributeName="separatorColor"
											attributeValue={ separatorColor }
											setAttributes={ setAttributes }
										/>
										<ABlocksTypography
											label={ __(
												'Typography',
												'ablocks'
											) }
											attributeName="separatorTypography"
											attributeValue={
												separatorTypography
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
