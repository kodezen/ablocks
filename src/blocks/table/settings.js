import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksColorControl from '@Controls/color';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksBorderControl from '@Controls/border';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksSelectControl from '@Controls/select';

const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		rowOddColor,
		rowEvenColor,
		rowOddColorH,
		rowEvenColorH,
		tableCreated,
		bodyBg,
		bodyBgH,
		headerColor,
		headerColorH,
		footerColor,
		footerColorH,
		isHeader,
		isFooter,
		borderCollapse,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				{ tableCreated ? (
					<InspectorTabs
						attributes={ attributes }
						setAttributes={ setAttributes }
						docs_url={
							'https://ablocks.pro/docs/ablocks-table-block/'
						}
					>
						<ABlocksPanelBody
							title={ __( 'Table setting', 'ablocks' ) }
							initialOpen={ true }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksSelectControl
											label={ __(
												'Cell Border Types',
												'ablocks'
											) }
											options={ [
												{
													label: 'Collapse',
													value: 'collapse',
												},
												{
													label: 'Separate',
													value: 'separate',
												},
											] }
											attributeName="borderCollapse"
											attributeValue={ borderCollapse }
											setAttributes={ setAttributes }
										/>
									</>
								}
								style={
									<>
										<ControlLabel
											label="Border"
											isResponsive={ false }
											isHeader={ true }
										/>
										<ABlocksBorderControl
											attributeName="border"
											attributeValue={
												attributes?.border
											}
											setAttributes={ setAttributes }
											hasBorderRadius={ false }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
						{ isHeader ? (
							<ABlocksPanelBody
								title={ __( 'Header Setting', 'ablocks' ) }
								initialOpen={ true }
							>
								<NormalHoverTabs
									normal={
										<>
											<ABlocksColorControl
												label={ __(
													'Background',
													'ablocks'
												) }
												isGradient={ true }
												attributeName="headerColor"
												attributeValue={ headerColor }
												setAttributes={ setAttributes }
											/>
										</>
									}
									hover={
										<>
											<ABlocksColorControl
												label={ __(
													'Background Hover',
													'ablocks'
												) }
												isGradient={ true }
												attributeName="headerColorH"
												attributeValue={ headerColorH }
												setAttributes={ setAttributes }
											/>
										</>
									}
								/>
							</ABlocksPanelBody>
						) : null }
						<ABlocksPanelBody
							title={ __( 'Body setting', 'ablocks' ) }
							initialOpen={ true }
						>
							<NormalHoverTabs
								normal={
									<>
										<ABlocksColorControl
											label={ __(
												'Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="bodyBg"
											attributeValue={ bodyBg }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Row odd Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="rowOddColor"
											attributeValue={ rowOddColor }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Row Even Background',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="rowEvenColor"
											attributeValue={ rowEvenColor }
											setAttributes={ setAttributes }
										/>
									</>
								}
								hover={
									<>
										<ABlocksColorControl
											label={ __(
												'Background Hover',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="bodyBgH"
											attributeValue={ bodyBgH }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Row Odd Background Hover',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="rowOddColorH"
											attributeValue={ rowOddColorH }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Row Even Background Hover',
												'ablocks'
											) }
											isGradient={ true }
											attributeName="rowEvenColorH"
											attributeValue={ rowEvenColorH }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
						{ isFooter ? (
							<ABlocksPanelBody
								title={ __( 'Footer Setting', 'ablocks' ) }
								initialOpen={ true }
							>
								<NormalHoverTabs
									normal={
										<>
											<ABlocksColorControl
												label={ __(
													'Background',
													'ablocks'
												) }
												isGradient={ true }
												attributeName="footerColor"
												attributeValue={ footerColor }
												setAttributes={ setAttributes }
											/>
										</>
									}
									hover={
										<>
											<ABlocksColorControl
												label={ __(
													'Background Color Hover',
													'ablocks'
												) }
												isGradient={ true }
												attributeName="footerColorH"
												attributeValue={ footerColorH }
												setAttributes={ setAttributes }
											/>
										</>
									}
								/>
							</ABlocksPanelBody>
						) : null }
					</InspectorTabs>
				) : null }
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
