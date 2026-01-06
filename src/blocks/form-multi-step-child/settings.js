import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import InspectorTabs from '@Components/inspector-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
export default function Settings( props ) {
	const { attributes, setAttributes } = props;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/form-builder/' }
				>
					<ABlocksPanelBody>
						<div className="ablocks-modal-triger">
							<div className="ablocks-modal-triger-area">
								<p className="ablocks-modal-triger-area__title">
									{ __(
										'Explore Form Builder Options',
										'ablocks'
									) }
								</p>
								<span className="ablocks-modal-triger-area__title--des">
									{ __(
										'Design and customize forms easily for login, registration, and more.',
										'ablocks'
									) }
								</span>
							</div>
							<SelectParentBlockButton
								clientId={ props?.clientId }
							/>
						</div>
					</ABlocksPanelBody>
					<Separator />
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}
