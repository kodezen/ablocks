import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksButtonGroupControl from '@Components/button-group';

import ABlocksRangeControl from '@Controls/range';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBackgroundControl from '@Controls/background';
import ABlocksBorderControl from '@Controls/border';
import ContentStyleTabs from '@Components/content-style-tabs';
import ControlLabel from '@Components/control-label';
import Separator from '@Components/separator';

import { showSideOptions, directionOptions } from './helper';

const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		flipDirection,
		transitionSpeed,
		showSide,
		cardBorder,
		frontCardBackground,
		backCardBackground,
		frontPadding,
		backPadding,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/flip-box-4/' }
				>
					<ABlocksPanelBody
						title={ __( 'Flip Box', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksButtonGroupControl
										label={ __( 'Show Side', 'ablocks' ) }
										options={ showSideOptions }
										attributeName="showSide"
										attributeValue={ showSide }
										setAttributes={ setAttributes }
										isResponsive={ false }
										allowDeselect={ false }
									/>
									<ABlocksRangeControl
										label={ __(
											'Transition Speed',
											'ablocks'
										) }
										min={ 0.1 }
										max={ 10 }
										step={ 0.1 }
										hasUnit={ false }
										isInline={ false }
										isResponsive={ false }
										attributeName="transitionSpeed"
										attributeValue={ transitionSpeed }
										setAttributes={ setAttributes }
									/>

									<ABlocksButtonGroupControl
										isInline
										label={ __(
											'Flip Direction',
											'ablocks'
										) }
										options={ directionOptions }
										attributeName="flipDirection"
										attributeValue={ flipDirection }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
								</>
							}
							style={
								<>
									<ABlocksButtonGroupControl
										label={ __( 'Show Side', 'ablocks' ) }
										options={ showSideOptions }
										attributeName="showSide"
										attributeValue={ showSide }
										setAttributes={ setAttributes }
										isResponsive={ false }
										allowDeselect={ false }
									/>

									{ showSide === 'front' ? (
										<>
											<ABlocksDimensions
												label={ __(
													'Padding',
													'ablocks'
												) }
												isResponsive={ true }
												attributeName="frontPadding"
												attributeValue={ frontPadding }
												setAttributes={ setAttributes }
											/>

											<Separator Margin="30px" />
											<ControlLabel
												label="Background"
												isResponsive={ false }
												isHeader={ true }
											/>

											<ABlocksBackgroundControl
												isResponsive={ true }
												attributeName="frontCardBackground"
												attributeValue={
													frontCardBackground
												}
												setAttributes={ setAttributes }
											/>
										</>
									) : (
										<>
											<ABlocksDimensions
												label={ __(
													'Padding',
													'ablocks'
												) }
												isResponsive={ true }
												attributeName="backPadding"
												attributeValue={ backPadding }
												setAttributes={ setAttributes }
											/>

											<Separator Margin="30px" />

											<ControlLabel
												label="Background"
												isResponsive={ false }
												isHeader={ true }
											/>

											<ABlocksBackgroundControl
												isResponsive={ true }
												attributeName="backCardBackground"
												attributeValue={
													backCardBackground
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }

									<Separator Margin="30px" />

									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>

									<ABlocksBorderControl
										attributeName="cardBorder"
										attributeValue={ cardBorder }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>

						{ /* <Separator /> */ }
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
