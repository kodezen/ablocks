import React from 'react';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
import { InspectorControls } from '@wordpress/block-editor';
import InspectorTabs from '@Components/inspector-tabs';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksColorControl from '@Controls/color';
const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { rowColorH, rowColor } = attributes;

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
						title={ __( 'Row setting', 'ablocks' ) }
						initialOpen={ true }
					>
						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										isGradient={ true }
										attributeName="rowColor"
										attributeValue={ rowColor }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Hover Color',
											'ablocks'
										) }
										isGradient={ true }
										attributeName="rowColorH"
										attributeValue={ rowColorH }
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
Settings.defaultProps = defaultProps;
