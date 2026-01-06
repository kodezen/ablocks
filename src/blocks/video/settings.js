import React from 'react';
import { __ } from '@wordpress/i18n';
import Separator from '@Components/separator';
import ABlocksTextControl from '@Controls/text';
import getDeviceType from '@Utils/get-device-type';
import ABlocksSelectControl from '@Controls/select';
import AblocksCSSFilter from '@Controls/css-filter';
import ControlLabel from '@Components/control-label';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import MediaUploadField from '@Components/media-upload';
import VideoUploadField from '@Components/upload-video';
import ABlocksToggleControl from '@Controls/toggleButton';
import { InspectorControls } from '@wordpress/block-editor';
import ABlocksNumberControl from '@Controls/number';
import ContentStyleTabs from '@Components/content-style-tabs';
const propTypes = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		videoSource,
		videoStartTime,
		videoEndTime,
		youtubeURL = '',
		vimeoURL = '',
		externalLink = '',
		selfHostedURL = '',
		autoplay,
		mute,
		loop,
		playerControl,
		downloadButton,
		privacyMode,
		introTitle,
		introPortrait,
		introByline,
		preload,
		aspectRatio,
		cssFilter,
	} = attributes;
	const deviceType = getDeviceType();

	// Added background image attributes
	const onSelectVideoHandler = ( media ) => {
		setAttributes( {
			videoUrl: media?.url,
		} );
	};

	// Removing background image attributes
	const onRemoveVideoHandler = () => {
		setAttributes( {
			videoUrl: undefined,
		} );
	};

	// Added fallback image for video control
	const onSelectPosterHandler = ( mediaValue ) => {
		setAttributes( {
			poster: mediaValue?.url,
		} );
	};

	// Removing fallback image for video control
	const onRemovePosterHandler = () => {
		setAttributes( {
			poster: undefined,
		} );
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-advanced-video-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Video', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksSelectControl
										label={ __( 'Source', 'ablocks' ) }
										options={ [
											{ label: 'None', value: 'none' },
											{ label: 'Vimeo', value: 'vimeo' },
											{
												label: 'Youtube',
												value: 'youtube',
											},
											{
												label: 'Self hosted',
												value: 'selfHosted',
											},
										] }
										isResponsive={ false }
										attributeValue={ videoSource }
										attributeName="videoSource"
										setAttributes={ setAttributes }
										disableDynamicContent={ true }
									/>

									{ videoSource === 'youtube' && (
										<ABlocksTextControl
											label={ __( 'Link', 'ablocks' ) }
											placeholder=""
											attributeValue={ youtubeURL }
											attributeName="youtubeURL"
											setAttributes={ setAttributes }
											disableDynamicContent={ true }
										/>
									) }

									{ videoSource === 'vimeo' && (
										<ABlocksTextControl
											label={ __( 'Link', 'ablocks' ) }
											placeholder=""
											attributeValue={ vimeoURL }
											attributeName="vimeoURL"
											setAttributes={ setAttributes }
										/>
									) }

									{ videoSource === 'selfHosted' && (
										<>
											<ABlocksToggleControl
												label={ __(
													'External link',
													'ablocks'
												) }
												attributeValue={ externalLink }
												isResponsive={ false }
												attributeName="externalLink"
												setAttributes={ setAttributes }
												disableDynamicContent={ true }
											/>
											{ externalLink ? (
												<>
													<ABlocksTextControl
														label={ __(
															'Link',
															'ablocks'
														) }
														placeholder=""
														attributeValue={
															selfHostedURL
														}
														attributeName="selfHostedURL"
														setAttributes={
															setAttributes
														}
														disableDynamicContent={
															true
														}
													/>
												</>
											) : (
												<>
													<span>
														{ __(
															'Video',
															'ablocks'
														) }
													</span>
													<VideoUploadField
														allowedTypes={ [
															'video',
														] }
														attributeValue={
															attributes
														}
														deviceType={
															deviceType
														}
														onSelectImageHandler={
															onSelectVideoHandler
														}
														onRemoveImageHandler={
															onRemoveVideoHandler
														}
														attributeName={
															'videoUrl'
														}
														disableDynamicContent={
															true
														}
													/>
												</>
											) }
										</>
									) }

									<Separator />

									<div className="ablocks-video--times-wrapper">
										<ABlocksNumberControl
											label={ __( 'Start', 'ablocks' ) }
											attributeName="videoStartTime"
											attributeValue={
												parseInt( videoStartTime ) || 0
											}
											setAttributes={ setAttributes }
										/>
										<span className="ablocks-control-field-description">
											{ __(
												'Specify a start time (in seconds)',
												'ablocks'
											) }
										</span>
										{ videoSource !== 'vimeo' && (
											<>
												<ABlocksNumberControl
													label={ __(
														'End',
														'ablocks'
													) }
													attributeName="videoEndTime"
													attributeValue={
														parseInt(
															videoEndTime
														) || 0
													}
													setAttributes={
														setAttributes
													}
												/>
												<span className="ablocks-control-field-description">
													{ __(
														'Specify a end time (in seconds)',
														'ablocks'
													) }
												</span>
											</>
										) }
									</div>

									<Separator />

									<ControlLabel
										label="Video options"
										isResponsive={ false }
										isHeader={ true }
									/>
									{
										<>
											{ /* Autoplay */ }
											<ABlocksToggleControl
												label={ __(
													'Autoplay',
													'ablocks'
												) }
												attributeValue={ autoplay }
												isResponsive={ false }
												attributeName="autoplay"
												setAttributes={ setAttributes }
											/>

											{ /* Mute */ }
											<ABlocksToggleControl
												label={ __(
													'Mute',
													'ablocks'
												) }
												attributeValue={ mute }
												isResponsive={ false }
												attributeName="mute"
												setAttributes={ setAttributes }
											/>

											{ /* Loop */ }
											<ABlocksToggleControl
												label={ __(
													'Loop',
													'ablocks'
												) }
												attributeValue={ loop }
												isResponsive={ false }
												attributeName="loop"
												setAttributes={ setAttributes }
											/>

											{ /* Player controls */ }
											{ ( videoSource === 'selfHosted' ||
												videoSource === 'youtube' ) && (
												<ABlocksToggleControl
													label={ __(
														'Player controls',
														'ablocks'
													) }
													attributeValue={
														playerControl
													}
													isResponsive={ false }
													attributeName="playerControl"
													setAttributes={
														setAttributes
													}
												/>
											) }

											{ /* Download button  */ }
											{ videoSource === 'selfHosted' && (
												<>
													<ABlocksToggleControl
														label={ __(
															'Download button',
															'ablocks'
														) }
														attributeValue={
															downloadButton
														}
														isResponsive={ false }
														attributeName="downloadButton"
														setAttributes={
															setAttributes
														}
													/>

													<ABlocksSelectControl
														label={ __(
															'Preload',
															'ablocks'
														) }
														options={ [
															{
																label: 'Metadata',
																value: 'metadata',
															},
															{
																label: 'Auto',
																value: 'auto',
															},
															{
																label: 'None',
																value: 'none',
															},
														] }
														isResponsive={ false }
														attributeValue={
															preload
														}
														attributeName="preload"
														setAttributes={
															setAttributes
														}
													/>

													<div className="ablocks-control-field-description">
														Preload attribute lets
														you specify how the
														video should be loaded
														when the page loads.{ ' ' }
														<a
															target="_blank"
															href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload"
															rel="noreferrer"
														>
															Learn more
														</a>
													</div>
												</>
											) }
											{ ( videoSource === 'youtube' ||
												videoSource === 'vimeo' ) && (
												<div className="ablocks-control">
													<ABlocksToggleControl
														label={ __(
															'Privacy mode',
															'ablocks'
														) }
														attributeValue={
															privacyMode
														}
														isResponsive={ false }
														attributeName="privacyMode"
														setAttributes={
															setAttributes
														}
													/>

													<span className="ablocks-control-field-description">
														{ __(
															'When you turn on privacy mode YouTube Vimeo won"t store information about visitors on your website unless they play the video.',
															'ablocks'
														) }
													</span>
												</div>
											) }
											{ /* Vimeo title, portrait and byline  */ }
											{ videoSource === 'vimeo' && (
												<>
													<ABlocksToggleControl
														label={ __(
															'Intro title',
															'ablocks'
														) }
														attributeValue={
															introTitle
														}
														isResponsive={ false }
														attributeName="introTitle"
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksToggleControl
														label={ __(
															'Intro portrait',
															'ablocks'
														) }
														attributeValue={
															introPortrait
														}
														isResponsive={ false }
														attributeName="introPortrait"
														setAttributes={
															setAttributes
														}
													/>
													<ABlocksToggleControl
														label={ __(
															'Intro byline',
															'ablocks'
														) }
														attributeValue={
															introByline
														}
														isResponsive={ false }
														attributeName="introByline"
														setAttributes={
															setAttributes
														}
													/>
												</>
											) }
										</>
									}
									{ /* Poster  */ }
									{ videoSource === 'selfHosted' && (
										<>
											<Separator />
											<p>{ __( 'Poster', 'ablocks' ) }</p>
											<MediaUploadField
												setAttributes={ setAttributes }
												allowedTypes={ [ 'image' ] }
												attributeValue={ attributes }
												deviceType={ deviceType }
												attributeName="poster"
												onSelectImageHandler={
													onSelectPosterHandler
												}
												onRemoveImageHandler={
													onRemovePosterHandler
												}
											/>
										</>
									) }
								</>
							}
							style={
								<div className="ablocks-control">
									<ABlocksSelectControl
										label={ __(
											'Aspect ratio',
											'ablocks'
										) }
										options={ [
											{
												label: '1:1',
												value: '1',
											},
											{
												label: '3:2',
												value: '1.5',
											},
											{
												label: '4:3',
												value: '1.33333',
											},
											{
												label: '16:9',
												value: '1.77777',
											},
											{
												label: '21:9',
												value: '2.33333',
											},
											{
												label: '9:16',
												value: '0.5625',
											},
										] }
										isResponsive={ false }
										attributeValue={ aspectRatio }
										attributeName="aspectRatio"
										setAttributes={ setAttributes }
									/>
									<AblocksCSSFilter
										label={ __( 'CSS Filters', 'ablocks' ) }
										isResponsive={ true }
										attributeValue={ cssFilter }
										attributeName="cssFilter"
										setAttributes={ setAttributes }
									/>
								</div>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
