import React from 'react';
import ABlocksTextControl from '@Controls/text';
import { __ } from '@wordpress/i18n';
import SelectParentBlockButton from '@Components/select-parent-block';
import Separator from '@Components/separator';
import { InspectorControls } from '@wordpress/block-editor';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksToggleControl from '@Controls/toggleButton';
import GetDeviceType from '@Utils/get-device-type';
const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { text_date, changeChildIcon } = attributes;
	const deviceType = GetDeviceType();

	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Explore Content Timeline Options',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Access content timeline settings to display events in order.',
									'ablocks'
								) }
							</span>
						</div>
						<SelectParentBlockButton clientId={ props?.clientId } />
					</div>
				</ABlocksPanelBody>
				<Separator />
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-content-timeline-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Content Timeline Child', 'ablocks' ) }
						initialOpen={ true }
					>
						{ attributes[ `showDate${ deviceType }` ] === true && (
							<ABlocksTextControl
								label={ __( 'Date (mm/dd/yyyy)', 'ablocks' ) }
								attributeName="text_date"
								attributeValue={ text_date }
								setAttributes={ setAttributes }
								isInline={ false }
							/>
						) }
						<ABlocksToggleControl
							isResponsive={ false }
							label={ __( 'Change Icon', 'ablocks' ) }
							attributeValue={ changeChildIcon }
							setAttributes={ setAttributes }
							attributeName="changeChildIcon"
						/>
						{ changeChildIcon && (
							<ABlocksIconUploader
								label={ __( 'Icon', 'ablocks' ) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								legacySupport={ true }
							/>
						) }
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
