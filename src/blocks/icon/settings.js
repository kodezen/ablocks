import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksAlignmentControl from '@Controls/alignment';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';
import ABlockLinkControl from '@Controls/link-control';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { alignment, link } = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/docs/ablocks-icon-block/' }
				>
					<ABlocksPanelBody
						title={ __( 'Icon', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksIconUploader
										label={ __( 'Icon', 'ablocks' ) }
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
										isInline={ false }
										options={ [
											{
												label: 'left',
												value: 'flex-start',
												icon: 'left',
											},
											{
												label: 'center',
												value: 'center',
												icon: 'center',
											},
											{
												label: 'right',
												value: 'flex-end',
												icon: 'right',
											},
										] }
									/>
									<ABlockLinkControl
										label={ __( 'Link', 'ablocks' ) }
										attributeName="link"
										attributeValue={ link }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<ABlocksIconStyleSettings
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
