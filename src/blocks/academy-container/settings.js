import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksRangeControl from '@Controls/range';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksDimensions from '@Controls/dimensions';
import { containerWidth as containerWidthDefaultVal } from '../academy-container/attributes';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;

	const { floatAlignment, floatMargin } = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody
					title={ __( 'Academy Container Setting', 'ablocks' ) }
					initialOpen={ true }
				>
					<ABlocksRangeControl
						label={ __( 'Container Width', 'ablocks' ) }
						attributeValue={ attributes?.containerWidth }
						hasUnit={ true }
						isResponsive={ true }
						unitOptions={ [
							{
								value: 'px',
								label: 'px',
							},
							{
								value: '%',
								label: '%',
							},
						] }
						attributeName="containerWidth"
						setAttributes={ setAttributes }
						isInline={ false }
						min={ 0 }
						max={ 1000 }
						attributeDefaultValue={ containerWidthDefaultVal }
						autoSyncRange={ true }
					/>
					<ABlocksAlignmentControl
						label={ __( 'Alignment', 'ablocks' ) }
						attributeName="floatAlignment"
						attributeValue={ floatAlignment }
						setAttributes={ setAttributes }
						options={ [
							{
								label: 'left',
								value: 'left',
								icon: 'arrow-left',
							},
							{
								label: 'none',
								value: 'none',
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
					<ABlocksDimensions
						label={ __( 'Margin', 'ablocks' ) }
						isResponsive={ true }
						attributeName="floatMargin"
						attributeValue={ floatMargin }
						setAttributes={ setAttributes }
					/>
				</ABlocksPanelBody>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
