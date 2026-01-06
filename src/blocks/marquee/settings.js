import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksToggleControl from '@Controls/toggleButton';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksSelectControl from '@Controls/select';
import ABlocksRangeControl from '@Controls/range';

import { marqueeDirectionOptions } from './helper';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		pauseOnHover,
		marqueeDirection,
		marqueeSpeed,
		loop,
		loopCount,
		gap,
		enableShadow,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-marquee-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Marquee', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksSelectControl
							label={ __( 'Marquee Direction', 'ablocks' ) }
							options={ marqueeDirectionOptions }
							isSearch={ false }
							attributeName="marqueeDirection"
							attributeValue={ marqueeDirection }
							setAttributes={ setAttributes }
							isInline={ false }
						/>
						<ABlocksRangeControl
							label={ __( 'Gap', 'ablocks' ) }
							attributeName="gap"
							attributeValue={ gap }
							setAttributes={ setAttributes }
							isResponsive={ true }
							min={ 0 }
							max={ 100 }
							step={ 1 }
							isInline={ false }
							autoSyncRange={ true }
						/>
						<ABlocksToggleControl
							label={ __( 'Pause On Hover', 'ablocks' ) }
							attributeName="pauseOnHover"
							attributeValue={ pauseOnHover }
							setAttributes={ setAttributes }
							isResponsive={ false }
							allowDeselect={ false }
						/>
						<ABlocksToggleControl
							label={ __( 'Enable Shadow', 'ablocks' ) }
							attributeName="enableShadow"
							attributeValue={ enableShadow }
							setAttributes={ setAttributes }
							isResponsive={ false }
							allowDeselect={ false }
						/>
						<u
							style={ {
								paddingBottom: '20px',
								display: 'block',
							} }
						>
							<i>These feature will only works in frontend</i>
						</u>
						<ABlocksToggleControl
							label={ __( 'Loop', 'ablocks' ) }
							attributeName="loop"
							attributeValue={ loop }
							setAttributes={ setAttributes }
							isResponsive={ false }
							allowDeselect={ false }
						/>
						{ loop && (
							<ABlocksRangeControl
								label={ __( 'Loop Count', 'ablocks' ) }
								attributeName="loopCount"
								attributeValue={ loopCount }
								setAttributes={ setAttributes }
								min={ 1 }
								max={ 200 }
								step={ 1 }
								isInline={ false }
								isResponsive={ false }
							/>
						) }
						<ABlocksRangeControl
							label={ __(
								'Speed (Fast To Slow)(ms)',
								'ablocks'
							) }
							attributeName="marqueeSpeed"
							attributeValue={ marqueeSpeed }
							setAttributes={ setAttributes }
							min={ 0 }
							max={ 50 }
							step={ 1 }
							isInline={ false }
							isResponsive={ false }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
