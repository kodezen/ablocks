import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTypography from '@Controls/typography';
import ABlocksColorControl from '@Controls/color';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ABlocksDimensions from '@Controls/dimensions';
import Separator from '@Components/separator';
const propTypes = {};
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		selectTextcolor,
		selectTextcolorH,
		selectTypography,
		selectBackground,
		selectBackgroundH,
		selectPadding,
		selectBorder,
		selectWidth,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						initialOpen={ true }
						title={ __( 'Layout', 'ablocks' ) }
					>
						<ABlocksRangeControl
							label={ __( 'Select Width', 'ablocks' ) }
							min={ 1 }
							max={ 500 }
							step={ 1 }
							hasUnit={ false }
							isInline={ false }
							isResponsive={ false }
							attributeValue={ selectWidth }
							setAttributes={ setAttributes }
							attributeName={ 'selectWidth' }
						/>
					</ABlocksPanelBody>
					<ABlocksPanelBody
						initialOpen={ false }
						title={ __( 'Select Style', 'ablocks' ) }
					>
						<>
							<ABlocksTypography
								label={ __( 'Typography', 'ablocks' ) }
								attributeName="selectTypography"
								attributeValue={ selectTypography }
								setAttributes={ setAttributes }
								isResponsive={ true }
								attributes={ attributes }
							/>
							<Separator />
							<ControlLabel
								label="Color"
								isHeader={ true }
								isResponsive={ false }
							/>
							<NormalHoverTabs
								normal={
									<>
										<ABlocksColorControl
											label={ __(
												'Text color',
												'ablocks'
											) }
											attributeName="selectTextcolor"
											attributeValue={ selectTextcolor }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background color',
												'ablocks'
											) }
											attributeName="selectBackground"
											attributeValue={ selectBackground }
											setAttributes={ setAttributes }
										/>
									</>
								}
								hover={
									<>
										<ABlocksColorControl
											label={ __(
												'Text color',
												'ablocks'
											) }
											attributeName="selectTextcolorH"
											attributeValue={ selectTextcolorH }
											setAttributes={ setAttributes }
										/>
										<ABlocksColorControl
											label={ __(
												'Background color',
												'ablocks'
											) }
											attributeName="selectBackgroundH"
											attributeValue={ selectBackgroundH }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</>
						<Separator />
						<ControlLabel
							label="Padding"
							isHeader={ true }
							isResponsive={ false }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="selectPadding"
							attributeValue={ selectPadding }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="selectBorder"
							attributeValue={ selectBorder }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
