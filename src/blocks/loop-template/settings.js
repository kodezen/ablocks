import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import ControlLabel from '@Components/control-label';
import ABlocksBorderControl from '@Controls/border';
import ABlocksRangeControl from '@Controls/range';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksColorControl from '@Controls/color';
import { itemGap as itemGapDefaultAttributeValue } from './attributes';
import SelectParentBlockButton from '@Components/select-parent-block';

import { templateGridColumns as templateGridColumnsDefaultAttributeValue } from './attributes';

// Main Settings Component
export default function Settings( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { templateGridColumns, gridStyle, itemGap, padding } = attributes;

	return (
		<>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Access Loop Builder Settings',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'This is a child block. Click below to manage the full loop builder.',
									'ablocks'
								) }
							</span>
						</div>
						<SelectParentBlockButton clientId={ props?.clientId } />
					</div>
				</ABlocksPanelBody>
				<ABlocksPanelBody
					title={ __( 'Grid', 'ablocks' ) }
					initialOpen={ true }
				>
					<ABlocksRangeControl
						label={ __( 'Columns', 'ablocks' ) }
						min={ 1 }
						max={ 4 }
						hasUnit={ false }
						isInline={ false }
						isResponsive={ true }
						attributeName="templateGridColumns"
						attributeValue={ templateGridColumns }
						setAttributes={ setAttributes }
						attributeObjectKey="value"
						attributeDefaultValue={
							templateGridColumnsDefaultAttributeValue
						}
					/>

					<ABlocksRangeControl
						label={ __( 'Item Gap', 'ablocks' ) }
						min={ 0 }
						max={ 100 }
						hasUnit={ false }
						isInline={ false }
						isResponsive={ true }
						attributeName="itemGap"
						attributeValue={ itemGap }
						attributeDefaultValue={ itemGapDefaultAttributeValue }
						setAttributes={ setAttributes }
					/>
				</ABlocksPanelBody>
				<ABlocksPanelBody
					title={ __( 'Template Styles', 'ablocks' ) }
					initialOpen={ true }
				>
					<ABlocksColorControl
						label={ __( 'Background', 'ablocks' ) }
						isGradient={ true }
						attributeName="bgColor"
						attributeValue={ attributes?.bgColor }
						setAttributes={ setAttributes }
					/>
					<ABlocksDimensions
						label={ __( 'Padding', 'ablocks' ) }
						isResponsive={ true }
						attributeName="padding"
						attributeValue={ padding }
						setAttributes={ setAttributes }
					/>
					<ControlLabel
						label="Border"
						isResponsive={ false }
						isHeader={ true }
					/>
					<ABlocksBorderControl
						attributeName="border"
						attributeValue={ attributes?.border }
						setAttributes={ setAttributes }
					/>
				</ABlocksPanelBody>
			</InspectorControls>
		</>
	);
}
