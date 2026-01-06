import React from 'react';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
import { InspectorControls } from '@wordpress/block-editor';
import ABlockLinkControl from '@Controls/link-control';
import ABlocksTextControl from '@Controls/text';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksToggleControl from '@Controls/toggleButton';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;

	const { link, label, hasLink } = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Explore Menu Blocks Options',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Access the Menu block setting to customize menus for easy navigation.',
									'ablocks'
								) }
							</span>
						</div>
						<SelectParentBlockButton clientId={ props?.clientId } />
					</div>
				</ABlocksPanelBody>
				<Separator />
				<ABlocksPanelBody initialOpen={ true } title="Menu Item">
					<React.Fragment>
						<ABlocksTextControl
							label={ __( 'Label', 'ablocks' ) }
							attributeName="label"
							attributeValue={ label }
							setAttributes={ setAttributes }
							isInline={ false }
						/>
						<ABlocksToggleControl
							label={ __( 'Enable Link', 'ablocks' ) }
							attributeValue={ hasLink }
							setAttributes={ setAttributes }
							attributeName="hasLink"
							isResponsive={ false }
						/>
						{ hasLink && (
							<ABlockLinkControl
								label={ __( 'Link', 'ablocks' ) }
								attributeName="link"
								attributeValue={ link }
								setAttributes={ setAttributes }
							/>
						) }
					</React.Fragment>
				</ABlocksPanelBody>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
