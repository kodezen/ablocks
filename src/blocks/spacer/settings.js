import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksRangeControl from '@Controls/range';
import InspectorTabs from '@Components/inspector-tabs';
import { spacerHeight as spacerHeightDefaultAttributeValue } from './attributes';
import GetDeviceType from '@Utils/get-device-type';
import { getResponsiveValue } from '@Utils/helper';

const getMaxValueSpaceForUnit = ( unit ) => {
	switch ( unit ) {
		case 'px':
			return 500;
		case 'em':
			return 30;
		case 'rem':
			return 20;
		default:
			return 500;
	}
};
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { spacerHeight } = attributes;
	const deviceType = GetDeviceType();
	const heightUnit = getResponsiveValue(
		spacerHeight,
		'valueUnit',
		deviceType
	);

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-spacer-blocks/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Spacer', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksRangeControl
							label={ __( 'Height', 'ablocks' ) }
							attributeName="spacerHeight"
							attributeObjectKey="value"
							attributeValue={ spacerHeight }
							setAttributes={ setAttributes }
							hasUnit={ true }
							min={ 0 }
							max={ getMaxValueSpaceForUnit( heightUnit ) }
							// unitValue={spacerHeight}
							unitOptions={ [ { value: 'px', label: 'px' } ] }
							isInline={ false }
							attributeDefaultValue={
								spacerHeightDefaultAttributeValue
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
