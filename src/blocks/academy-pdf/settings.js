import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextControl from '@Controls/text';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { src, width, height } = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'PDF Options', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksTextControl
							label={ __( 'Source', 'ablocks' ) }
							attributeValue={ src }
							attributeName={ 'src' }
							setAttributes={ setAttributes }
						/>
						<ABlocksTextControl
							label={ __( 'Width', 'ablocks' ) }
							attributeValue={ width }
							attributeName={ 'width' }
							setAttributes={ setAttributes }
							disableDynamicContent={ true }
						/>
						<ABlocksTextControl
							label={ __( 'Height', 'ablocks' ) }
							attributeValue={ height }
							attributeName={ 'height' }
							setAttributes={ setAttributes }
							disableDynamicContent={ true }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
