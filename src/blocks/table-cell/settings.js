import React from 'react';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import ControlLabel from '@Components/control-label';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksColorControl from '@Controls/color';
import ABlocksNumberControl from '@Controls/number';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksAlignmentControl from '@Controls/alignment';
const propTypes = {};
const defaultProps = {};
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { cellColor, cellColorH, colSpan, rowSpan, textAlignment } =
		attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __( 'Explore Table Options', 'ablocks' ) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Access the table settings to customize tabular data effortlessly.',
									'ablocks'
								) }
							</span>
						</div>
						<SelectParentBlockButton clientId={ props?.clientId } />
					</div>
				</ABlocksPanelBody>
				<Separator />
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/docs/ablocks-table-block/' }
					hasAdvance={ false }
				>
					<ABlocksPanelBody
						title={ __( 'Cell setting', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="textAlignment"
										attributeValue={ textAlignment }
										setAttributes={ setAttributes }
										isResponsive={ false }
										options={ [
											{
												label: 'left',
												value: 'left',
												icon: 'arrow-left',
											},
											{
												label: 'center',
												value: 'center',
												icon: 'wrap',
											},
											{
												label: 'right',
												value: 'right',
												icon: 'arrow-right',
											},
										] }
										isInline={ false }
									/>
									<ABlocksNumberControl
										min={ 1 }
										label={ __( 'Row Span', 'ablocks' ) }
										attributeName="rowSpan"
										attributeValue={ rowSpan }
										setAttributes={ setAttributes }
									/>
									<ABlocksNumberControl
										min={ 1 }
										label={ __( 'Cols Span', 'ablocks' ) }
										attributeName="colSpan"
										attributeValue={ colSpan }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ControlLabel
										label="Cell color"
										isResponsive={ false }
									/>
									<NormalHoverTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Background Color',
														'ablocks'
													) }
													isGradient={ true }
													attributeName="cellColor"
													attributeValue={ cellColor }
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
														'Background Color',
														'ablocks'
													) }
													isGradient={ true }
													attributeName="cellColorH"
													attributeValue={
														cellColorH
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
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
