import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import Separator from '@Components/separator';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksRangeControl from '@Controls/range';
import ABlocksTextControl from '@Controls/text';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
import { barHeightSize as barHeightDefaultAttributeValue } from './attributes';

import {
	layoutOptions,
	directionOptions,
	progressRelativeOptions,
	alignmentOptions,
} from './helper';

const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		layout,
		isShowPercentage,
		direction,
		progressRelative,
		progressRelativeSelector,

		barProgressColor,
		barBackgroundColor,
		barHeightSize,
		circleProgressColor,
		circleBackgroundColor,
		circleSize,
		circleStrokeSize,
		alignment,

		contentTypography,
		contentColor,
		contentTextShadow,
		contentTextStroke,
	} = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-progress-tracker-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Progress Tracker', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									{ layout === 'circle' && (
										<ABlocksAlignmentControl
											label={ __(
												'Alignment',
												'ablocks'
											) }
											attributeName="alignment"
											attributeValue={ alignment }
											setAttributes={ setAttributes }
											options={ alignmentOptions }
											isInline={ false }
										/>
									) }
									<Separator />

									<ABlocksButtonGroupControl
										label={ __( 'Layout', 'ablocks' ) }
										setAttributes={ setAttributes }
										attributeName="layout"
										attributeValue={ layout }
										options={ layoutOptions }
										onChangeHandler={ ( value ) => {
											if ( value === 'circle' ) {
												setAttributes( {
													mediaPosition: 'top',
												} );
											}
											setAttributes( { layout: value } );
										} }
										isResponsive={ false }
										allowDeselect={ false }
									/>
									{ layout === 'circle' && (
										<em>
											Note : Change content color to see
											the Circle percentage
										</em>
									) }
									<ABlocksSelectControl
										label={ __( 'Direction', 'ablocks' ) }
										options={ directionOptions }
										isSearch={ true }
										attributeName="direction"
										attributeValue={ direction }
										setAttributes={ setAttributes }
									/>
									<ABlocksSelectControl
										label={ __(
											'Progress relative to',
											'ablocks'
										) }
										options={ progressRelativeOptions }
										isSearch={ false }
										attributeName="progressRelative"
										attributeValue={ progressRelative }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									{ layout === 'circle' &&
										progressRelative === 'selector' && (
											<em>
												Note : This setting only work in
												frontend
											</em>
										) }
									{ progressRelative === 'selector' && (
										<ABlocksTextControl
											label={ __(
												'Selector',
												'ablocks'
											) }
											isInline={ false }
											placeholder={ __(
												'#id',
												'ablocks'
											) }
											attributeName="progressRelativeSelector"
											attributeValue={
												progressRelativeSelector
											}
											setAttributes={ setAttributes }
										/>
									) }

									<ABlocksToggleControl
										label={ __(
											'Show Percentage',
											'ablocks'
										) }
										attributeName="isShowPercentage"
										attributeValue={ isShowPercentage }
										setAttributes={ setAttributes }
										isResponsive={ false }
										allowDeselect={ false }
									/>
								</>
							}
							style={
								<React.Fragment>
									{ layout === 'bar' && (
										<>
											<ABlocksColorControl
												label={ __(
													'Progress Color',
													'ablocks'
												) }
												attributeName="barProgressColor"
												attributeValue={
													barProgressColor
												}
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
											<ABlocksRangeControl
												label={ __(
													'Height',
													'ablocks'
												) }
												attributeName="barHeightSize"
												attributeValue={ barHeightSize }
												setAttributes={ setAttributes }
												hasUnit={ true }
												min={ 10 }
												max={ 100 }
												step={ 1 }
												isInline={ false }
												unitOptions={ [
													{
														value: 'px',
														label: 'px',
													},
												] }
												attributeDefaultValue={
													barHeightDefaultAttributeValue
												}
											/>
											<ControlLabel
												label="Border"
												isResponsive={ false }
												isHeader={ true }
											/>
											<ABlocksBorderControl
												attributeName="barBorder"
												attributeValue={
													attributes?.barBorder
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }

									{ layout === 'circle' && (
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
											/>
											<ABlocksRangeControl
												label={ __(
													'Stroke size',
													'ablocks'
												) }
												attributeName="circleStrokeSize"
												attributeValue={
													circleStrokeSize
												}
												setAttributes={ setAttributes }
												min={ 5 }
												max={ 150 }
												step={ 1 }
												isInline={ false }
												isResponsive={ false }
											/>
										</>
									) }
								</React.Fragment>
							}
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						title={ __( 'Content', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							attributeName="contentColor"
							attributeValue={ contentColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="contentTypography"
							attributeValue={ contentTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksTextShadow
							label={ __( 'Text Shadow', 'ablocks' ) }
							attributeName="contentTextShadow"
							attributeValue={ contentTextShadow }
							setAttributes={ setAttributes }
							isResponsive={ false }
						/>
						<ABlocksTextStroke
							label={ __( 'Text Stroke', 'ablocks' ) }
							attributeName="contentTextStroke"
							attributeValue={ contentTextStroke }
							setAttributes={ setAttributes }
							isResponsive={ true }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
