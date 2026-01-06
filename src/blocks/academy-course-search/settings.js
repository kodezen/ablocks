import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import ABlocksBorderControl from '@Controls/border';
import ABlocksTextControl from '@Controls/text';
import ContentStyleTabs from '@Components/content-style-tabs';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		placeholder,
		search_background_color,
		search_box_color,
		search_typography,
		search_placeholder_color,
		search_icon_color,
		search_border,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Search Options', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextControl
										label={ __( 'Placeholder', 'ablocks' ) }
										attributeValue={ placeholder }
										attributeName={ 'placeholder' }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="search_typography"
										attributeValue={ search_typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										isResponsive={ true }
										attributeName="search_box_color"
										attributeValue={ search_box_color }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Placeholder Color',
											'ablocks'
										) }
										isResponsive={ true }
										attributeName="search_placeholder_color"
										attributeValue={
											search_placeholder_color
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Icon Color', 'ablocks' ) }
										isResponsive={ true }
										attributeName="search_icon_color"
										attributeValue={ search_icon_color }
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isResponsive={ true }
										attributeName="search_background_color"
										attributeValue={
											search_background_color
										}
										setAttributes={ setAttributes }
									/>

									<Separator />
									<ControlLabel
										label="Border option"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="search_border"
										attributeValue={ search_border }
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
