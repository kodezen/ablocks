import React, { useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksTextControl from '@Controls/text';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import Separator from '@Components/separator';

import { Button } from '@wordpress/components';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksRangeControl from '@Controls/range';
import ABlocksSelectControl from '@Controls/select';
import {
	hoverAreaOptins,
	onHoverOutOptins,
	triggerOptins,
	showanimationOptions,
} from './helper';
import ABlocksButtonGroupControl from '@Components/button-group';
import lottie from 'lottie-web';
import './styles.scss';
const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const { animationSource, asset_url, custom_url, uploaded_json } =
		attributes;

	const containerRef = useRef( null );

	useEffect( () => {
		const animation = lottie.loadAnimation( {
			container: containerRef.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: uploaded_json?.url,
		} );

		return () => animation.destroy();
	}, [ uploaded_json, containerRef.current ] );

	const recheck = () => {
		if ( uploaded_json && containerRef.current === null ) {
			const temp = uploaded_json;
			setAttributes( { uploaded_json: null } );
			setAttributes( { uploaded_json: temp } );
		}
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<ABlocksPanelBody
						title={ __( 'Animation Settings', 'ablocks' ) }
						initialOpen={ true }
					>
						<ABlocksButtonGroupControl
							label={ __( 'Animation Source', 'ablocks' ) }
							setAttributes={ setAttributes }
							attributeName="animationSource"
							attributeValue={ animationSource }
							options={ showanimationOptions }
							isResponsive={ false }
							allowDeselect={ false }
						/>

						{ animationSource === 'custom' && (
							<ABlocksTextControl
								label={ __( 'Custom JSON URL', 'ablocks' ) }
								attributeName="custom_url"
								attributeValue={ custom_url }
								setAttributes={ setAttributes }
								placeholder={ 'Enter Lottie JSON URL' }
								isInline={ false }
							/>
						) }

						{ animationSource === 'upload' && (
							<div className="ablocks-media-upload-container">
								{ attributes.uploaded_json && (
									<div className="ablocks-media-upload-container__inner-file-wrapper">
										<ABlocksTextControl
											label={ __(
												'File Name',
												'ablocks'
											) }
											attributeName="uploaded_json_display"
											attributeValue={
												attributes.uploaded_json.title
											}
											setAttributes={ setAttributes }
											isInline={ false }
											readOnly={ true }
										/>
									</div>
								) }
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												uploaded_json: media,
											} )
										}
										allowedTypes={ [ 'application/json' ] }
										render={ ( { open } ) => (
											<div
												className={ `ablocks-media-upload-container__inner` }
											>
												<div
													ref={ containerRef }
													style={ {
														width: '100%',
														height: '100%',
													} }
												>
													{ recheck() }
												</div>
												{ attributes.uploaded_json ? (
													<>
														<Button
															onClick={ open }
															className="ablocks-media-upload-container__inner-replace"
														>
															{ __(
																'Replace',
																'ablocks'
															) }
														</Button>
														<span
															className="ablocks-icon ablocks-icon--delete ablocks-media-upload-container__inner-remove"
															onClick={ () =>
																setAttributes( {
																	uploaded_json:
																		null,
																} )
															}
														></span>
													</>
												) : (
													<Button
														onClick={ open }
														className="ablocks-media-upload-container__inner-upload"
													>
														{ __(
															'Upload JSON File',
															'ablocks'
														) }
													</Button>
												) }
											</div>
										) }
									/>
								</MediaUploadCheck>
							</div>
						) }

						<ABlocksRangeControl
							label={ __( 'Animation Speed', 'ablocks' ) }
							min={ 0 }
							max={ 3 }
							step={ 0.01 }
							hasUnit={ false }
							isInline={ false }
							isResponsive={ false }
							attributeValue={ attributes?.animationSpeed || 1 }
							attributeName={ 'animationSpeed' }
							setAttributes={ setAttributes }
						/>

						{ /* Rest of the controls remain the same */ }
						<ABlocksSelectControl
							label={ __( 'Trigger', 'ablocks' ) }
							options={ triggerOptins }
							isResponsive={ false }
							attributeValue={ attributes?.trigger || 'viewport' }
							attributeName="trigger"
							setAttributes={ setAttributes }
						/>
						{ attributes?.trigger === 'hover' && (
							<>
								<ABlocksSelectControl
									label={ __( 'Hover Area', 'ablocks' ) }
									options={ hoverAreaOptins }
									isResponsive={ false }
									attributeValue={
										attributes?.hoverArea || 'animation'
									}
									attributeName="hoverArea"
									setAttributes={ setAttributes }
								/>
								<ABlocksSelectControl
									label={ __( 'On Hover Out', 'ablocks' ) }
									options={ onHoverOutOptins }
									isResponsive={ false }
									attributeValue={
										attributes?.onHoverOut || 'nothing'
									}
									attributeName="onHoverOut"
									setAttributes={ setAttributes }
								/>
							</>
						) }

						<Separator />

						<ABlocksToggleControl
							label={ __( 'Reverse in Finish', 'ablocks' ) }
							attributeValue={ attributes?.reverse }
							setAttributes={ setAttributes }
							attributeName="reverse"
							isResponsive={ false }
						/>
						{ ! attributes?.loop && (
							<span className="ablocks-reverse-msg">
								<p>Reverse works when loop animation is true</p>
							</span>
						) }
						<ABlocksToggleControl
							label={ __( 'Loop Animation', 'ablocks' ) }
							attributeValue={ attributes?.loop }
							setAttributes={ setAttributes }
							attributeName="loop"
							isResponsive={ false }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
