import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksTypography from '@Controls/typography';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksNumberControl from '@Controls/number';
import ABlocksTextControl from '@Controls/text';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ABlocksSelectControl from '@Controls/select';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksColorControl from '@Controls/color';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksToggleControl from '@Controls/toggleButton';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import {
	duration as durationDefaultValueAttribute,
	circleSize as circleSizeDefaultValueAttribute,
	circleStrokeSize as circleStrokeSizeDefaultValueAttribute,
	barSize as barSizeDefaultValueAttribute,
} from './attributes';
import {
	separatorOptions,
	layoutOptions,
	mediaPositionOptions,
	alignmentOptions,
	barHeadingPositionOptions,
} from './helper';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		counterTitle,
		startNumber,
		endNumber,
		totalNumber,
		separator,
		counterPrefix,
		counterSuffix,
		isShowIcon,
		layout,
		alignment,
		mediaPosition,
		decimalPlaces,
		duration,
		animationRepeat,

		numberColor,
		numberTypography,

		headingColor,
		headingTypography,
		barHeadingPosition,

		circleProgressColor,
		circleBackgroundColor,
		circleSize,
		circleStrokeSize,

		barProgressColor,
		barBackgroundColor,
		barSize,
	} = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-advanced-counter-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Counter', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksAlignmentControl
							label={ __( 'Alignment', 'ablocks' ) }
							attributeName="alignment"
							attributeValue={ alignment }
							setAttributes={ setAttributes }
							isInline={ false }
							options={ alignmentOptions }
						/>
						<ABlocksButtonGroupControl
							label={ __( 'Layout', 'ablocks' ) }
							setAttributes={ setAttributes }
							attributeName="layout"
							attributeValue={ layout }
							options={ layoutOptions }
							onChangeHandler={ ( value ) => {
								if ( value === 'circle' ) {
									setAttributes( { mediaPosition: 'top' } );
								}
								setAttributes( { layout: value } );
							} }
							isResponsive={ false }
							allowDeselect={ false }
						/>
						{ layout !== 'bar' && (
							<ABlocksToggleControl
								label={ __( 'Show Icon', 'ablocks' ) }
								attributeName="isShowIcon"
								attributeValue={ isShowIcon }
								setAttributes={ setAttributes }
								isResponsive={ false }
								allowDeselect={ false }
							/>
						) }

						<>
							<ABlocksNumberControl
								label={ __( 'Starting Number', 'ablocks' ) }
								attributeName="startNumber"
								attributeValue={ parseInt( startNumber ) || 0 }
								setAttributes={ setAttributes }
							/>
							<ABlocksNumberControl
								label={ __( 'Ending Number', 'ablocks' ) }
								attributeName="endNumber"
								attributeValue={ parseInt( endNumber ) || 0 }
								setAttributes={ setAttributes }
							/>
						</>

						{ layout !== 'number' && (
							<ABlocksNumberControl
								label={ __( 'Total Number', 'ablocks' ) }
								attributeName="totalNumber"
								attributeValue={ parseInt( totalNumber ) || 0 }
								setAttributes={ setAttributes }
							/>
						) }

						<ABlocksRangeControl
							label={ __( 'Animation Duration(ms)', 'ablocks' ) }
							attributeName="duration"
							attributeValue={ duration }
							setAttributes={ setAttributes }
							min={ 0 }
							max={ 10000 }
							step={ 100 }
							isInline={ false }
							isResponsive={ false }
							attributeDefaultValue={
								durationDefaultValueAttribute
							}
						/>
						<ABlocksToggleControl
							label={ __( 'Animation Repeat', 'ablocks' ) }
							attributeName="animationRepeat"
							attributeValue={ animationRepeat }
							setAttributes={ setAttributes }
							isResponsive={ false }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Number', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksRangeControl
										label={ __(
											'Decimal places',
											'ablocks'
										) }
										attributeName="decimalPlaces"
										attributeValue={ decimalPlaces }
										setAttributes={ setAttributes }
										min={ 0 }
										max={ 10 }
										step={ 1 }
										isInline={ false }
										isResponsive={ false }
									/>
									<ABlocksTextControl
										label={ __(
											'Number Prefix',
											'ablocks'
										) }
										attributeName="counterPrefix"
										attributeValue={ counterPrefix }
										setAttributes={ setAttributes }
									/>
									<ABlocksTextControl
										label={ __(
											'Number Suffix',
											'ablocks'
										) }
										attributeName="counterSuffix"
										attributeValue={ counterSuffix }
										setAttributes={ setAttributes }
									/>
									<ABlocksSelectControl
										label={ __(
											'Thousand Separator',
											'ablocks'
										) }
										options={ separatorOptions }
										attributeName="separator"
										attributeValue={ separator }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="numberColor"
										attributeValue={ numberColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="numberTypography"
										attributeValue={ numberTypography }
										setAttributes={ setAttributes }
										attributes={ attributes }
									/>
									<ABlocksDimensions
										label={ __( 'Margin', 'ablocks' ) }
										attributeName="numberMargin"
										attributeValue={
											attributes?.numberMargin
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Heading', 'ablocks' ) }
						initialOpen={ false }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextareaControl
										label={ __( 'Title', 'ablocks' ) }
										attributeName="counterTitle"
										attributeValue={ counterTitle }
										setAttributes={ setAttributes }
										placeholder={ __( 'Enter your title' ) }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="headingColor"
										attributeValue={ headingColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="headingTypography"
										attributeValue={ headingTypography }
										setAttributes={ setAttributes }
										attributes={ attributes }
									/>
									<ABlocksDimensions
										label={ __( 'Margin', 'ablocks' ) }
										attributeName="headingMargin"
										attributeValue={
											attributes.headingMargin
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					{ layout === 'circle' && (
						<ABlocksPanelBody
							title={ __( 'Circle', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksRangeControl
											label={ __(
												'Circle size',
												'ablocks'
											) }
											attributeName="circleSize"
											attributeValue={ circleSize }
											setAttributes={ setAttributes }
											min={ 50 }
											max={ 500 }
											step={ 1 }
											isInline={ false }
											isResponsive={ false }
											attributeDefaultValue={
												circleSizeDefaultValueAttribute
											}
										/>
										<ABlocksRangeControl
											label={ __(
												'Stroke size',
												'ablocks'
											) }
											attributeName="circleStrokeSize"
											attributeValue={ circleStrokeSize }
											setAttributes={ setAttributes }
											min={ 10 }
											max={ 150 }
											step={ 1 }
											isInline={ false }
											isResponsive={ false }
											attributeDefaultValue={
												circleStrokeSizeDefaultValueAttribute
											}
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __(
												'Progress Color',
												'ablocks'
											) }
											attributeName="circleProgressColor"
											attributeValue={
												circleProgressColor
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background Color',
												'ablocks'
											) }
											attributeName="circleBackgroundColor"
											attributeValue={
												circleBackgroundColor
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }
					{ layout === 'bar' && (
						<ABlocksPanelBody
							title={ __( 'Bar', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksRangeControl
											label={ __( 'Size', 'ablocks' ) }
											attributeName="barSize"
											attributeValue={ barSize }
											setAttributes={ setAttributes }
											min={ 10 }
											max={ 100 }
											step={ 1 }
											isInline={ false }
											isResponsive={ false }
											hasUnit={ true }
											unitOptions={ [
												{ value: 'px', label: 'px' },
											] }
											attributeDefaultValue={
												barSizeDefaultValueAttribute
											}
										/>
										<ABlocksSelectControl
											label={ __(
												'Heading position',
												'ablocks'
											) }
											attributeName="barHeadingPosition"
											attributeValue={
												barHeadingPosition
											}
											options={
												barHeadingPositionOptions
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
								style={
									<>
										<ABlocksColorControl
											label={ __(
												'Progress Color',
												'ablocks'
											) }
											attributeName="barProgressColor"
											attributeValue={ barProgressColor }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background Color',
												'ablocks'
											) }
											attributeName="barBackgroundColor"
											attributeValue={
												barBackgroundColor
											}
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }
					{ isShowIcon && layout !== 'bar' && (
						<ABlocksPanelBody
							title={ __( `Icon`, 'ablocks' ) }
							initialOpen={ true }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksSelectControl
											label={ __(
												'Position',
												'ablocks'
											) }
											options={ mediaPositionOptions(
												layout === 'number'
													? 'preset-1'
													: 'preset-2'
											) }
											attributeName="mediaPosition"
											attributeValue={ mediaPosition }
											setAttributes={ setAttributes }
										/>

										<ABlocksIconUploader
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
									</>
								}
								style={
									<>
										<ABlocksIconStyleSettings
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
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
