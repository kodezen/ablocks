import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksRangeControl from '@Controls/range';
import ABlocksPanelBody from '@Components/panel-body';
import GetDeviceType from '@Utils/get-device-type';
import SelectParentBlockButton from '@Components/select-parent-block';
const propTypes = {};
const defaultProps = {};
import {
	width as widthDefaultValueAttribute,
	positionX as positionXDefaultValueAttribute,
} from './attributes';
import {
	getMaxValueForUnit,
	getMinValueForUnit,
	PositionGetMaxValueForUnit,
	getPositionMinValueForUnit,
} from './helper';

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { positionX, width, height } = attributes;

	const deviceType = GetDeviceType();
	const widthUnit = width[ 'valueUnit' + deviceType ] || '%';
	const positionXUnit = positionX[ 'valueUnit' + deviceType ] || '%';
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
				<ABlocksPanelBody
					title={ __( 'Mega Menu', 'ablocks' ) }
					initialOpen={ true }
				>
					<ABlocksRangeControl
						label={ __( 'Width', 'ablocks' ) }
						min={ getMinValueForUnit( widthUnit ) }
						max={ getMaxValueForUnit( widthUnit ) }
						unitValue={ width }
						hasUnit={ true }
						isInline={ false }
						isResponsive={ true }
						attributeName="width"
						attributeValue={ width }
						setAttributes={ setAttributes }
						attributeDefaultValue={ widthDefaultValueAttribute }
					/>
					<ABlocksRangeControl
						label={ __( 'height', 'ablocks' ) }
						min={ 0 }
						max={ 1000 }
						unitValue={ width }
						unitOptions={ [
							{
								value: 'px',
								label: 'px',
							},
							{
								value: 'em',
								label: 'em',
							},
							{
								value: 'rem',
								label: 'rem',
							},
							{
								value: 'vw',
								label: 'vw',
							},
						] }
						hasUnit={ true }
						isInline={ false }
						isResponsive={ true }
						attributeName="height"
						attributeValue={ height }
						setAttributes={ setAttributes }
					/>
					<ABlocksRangeControl
						label={ __( 'PositionX', 'ablocks' ) }
						min={ getPositionMinValueForUnit( positionXUnit ) }
						max={ PositionGetMaxValueForUnit( positionXUnit ) }
						unitValue={ positionX }
						hasUnit={ true }
						isInline={ false }
						isResponsive={ true }
						attributeName="positionX"
						attributeValue={ positionX }
						setAttributes={ setAttributes }
						attributeDefaultValue={ positionXDefaultValueAttribute }
					/>
				</ABlocksPanelBody>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
