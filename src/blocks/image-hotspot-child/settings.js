import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import ABlocksRangeControl from '@Controls/range';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksColorControl from '@Controls/color';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import SelectParentBlockButton from '@Components/select-parent-block';

import Separator from '@Components/separator';
import ControlLabel from '@Components/control-label';

import { contentWidth as contentWidthDefaultAttributeValue } from './attributes';

const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { contentWidth, backgroundColor, contentPadding } = attributes;

	const getMaxValueForUnit = ( unit ) => {
		if ( unit === 'px' ) {
			return 1600;
		} else if ( unit === '%' ) {
			return 100;
		} else if ( unit === 'vw' ) {
			return 100;
		} else if ( unit === 'rem' ) {
			return 160;
		} else if ( unit === 'em' ) {
			return 160;
		}
		return 1600;
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<ABlocksPanelBody>
					<div className="ablocks-modal-triger">
						<div className="ablocks-modal-triger-area">
							<p className="ablocks-modal-triger-area__title">
								{ __(
									'Explore Filterable Blocks Options',
									'ablocks'
								) }
							</p>
							<span className="ablocks-modal-triger-area__title--des">
								{ __(
									'Access the Filterable block setting to customize menus for easy navigation.',
									'ablocks'
								) }
							</span>
						</div>
						<SelectParentBlockButton clientId={ clientId } />
					</div>
				</ABlocksPanelBody>
				<ABlocksPanelBody
					title={ __( 'Hotspot Child', 'ablocks' ) }
					initialOpen={ true }
				>
					<ABlocksRangeControl
						label={ __( 'Width', 'ablocks' ) }
						attributeName="contentWidth"
						attributeValue={ contentWidth }
						setAttributes={ setAttributes }
						isResponsive={ true }
						hasUnit={ true }
						isInline={ false }
						attributeObjectKey="value"
						unitOptions={ [
							{
								value: 'px',
								label: 'px',
							},
							{
								value: '%',
								label: '%',
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
						min={ 0 }
						max={ getMaxValueForUnit(
							contentWidth?.valueUnit || 'px'
						) }
						step={ 1 }
						attributeDefaultValue={
							contentWidthDefaultAttributeValue
						}
						autoSyncRange={ false }
					/>

					<ABlocksColorControl
						label={ __( 'Background Color', 'ablocks' ) }
						attributeName={ 'backgroundColor' }
						attributeValue={ backgroundColor }
						setAttributes={ setAttributes }
						resetHandler={ () => {
							setAttributes( {
								backgroundColor: '',
							} );
						} }
						onChangeHandler={ ( attributeName, value ) => {
							setAttributes( {
								backgroundColor: value,
							} );
						} }
					/>

					<ABlocksDimensions
						label={ __( 'Padding', 'ablocks' ) }
						isResponsive={ true }
						attributeName="contentPadding"
						attributeValue={ contentPadding }
						setAttributes={ setAttributes }
					/>

					<Separator Margin="30px" />
					<ControlLabel
						label="Border"
						isResponsive={ false }
						isHeader={ true }
					/>
					<ABlocksBorderControl
						attributeName="contentBorder"
						attributeValue={ attributes?.contentBorder }
						setAttributes={ setAttributes }
					/>
				</ABlocksPanelBody>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
