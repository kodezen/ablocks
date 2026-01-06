import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksTypography from '@Controls/typography';
import { certificateFont } from './helper';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { alignment, typography } = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Verification ID Style', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksAlignmentControl
							label={ __( 'Alignment', 'ablocks' ) }
							attributeName="alignment"
							attributeValue={ alignment }
							setAttributes={ setAttributes }
							isInline={ false }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="typography"
							attributeValue={ typography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							showOnlyCustomFonts={ true }
							customFontsOption={ certificateFont }
							attributes={ attributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
