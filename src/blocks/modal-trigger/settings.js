import React from 'react';
import SelectParentBlockButton from '@Components/select-parent-block';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';

const propTypes = {};

export default function Settings( props ) {
	const { attributes } = props;
	const {} = attributes;

	return (
		<InspectorControls>
			<ABlocksPanelBody>
				<div className="ablocks-modal-triger">
					<div className="ablocks-modal-triger-area">
						<p className="ablocks-modal-triger-area__title">
							Explore Modal Options
						</p>
						<span className="ablocks-modal-triger-area__title--des">
							Access the modal popup setting to customize the
							modal as your needs
						</span>
					</div>
					<SelectParentBlockButton clientId={ props?.clientId } />
				</div>
			</ABlocksPanelBody>
		</InspectorControls>
	);
}

Settings.propTypes = propTypes;
