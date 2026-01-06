import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksTextControl from '@Controls/text';
import getDeviceType from '@Utils/get-device-type';
import ABlocksSelectControl from '@Controls/select';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksColorControl from '@Controls/color';
import ABlocksRangeControl from '@Controls/range';
import ABlocksToggleControl from '@Controls/toggleButton';
import MediaUploadField from '@Components/media-upload';
import InspectorTabs from '@Components/inspector-tabs';
import VideoUploadField from '@Components/upload-video';
import AudioUploadField from '@Components/upload-audio';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import { videoSourceOption } from './helper';
const propTypes = {};
const defaultProps = {};
import {
	youtubeIconSize as youtubeIconSizeDefaultAttributeValue,
	youtubePlayPauseIconSize as youtubePlayPauseIconSizeDefaultAttributeValue,
	selfHostedIconSize as selfHostedIconSizeDefaultAttributeValue,
	selfHostedPlayIconSize as selfHostedPlayIconSizeDefaultAttributeValue,
	vimeoIconSize as vimeoIconSizeDefaultAttributeValue,
	vimeoPlayIconSize as vimeoPlayIconSizeDefaultAttributeValue,
} from './attributes';
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		videoSource,
		youtubeIconSize,
		youtubePlayPauseIconSize,
		youtubeUrl,
		youtubeProgressColor,
		vimeoUrl,
		videoStartTime,
		videoEndTime,
		youtubeUiColor,
		selfVideoUiColor,
		selfVideobgColor,
		vimeoUiColor,
		vimeobgColor,
		vimeoIconSize,
		selfHostedIconSize,
		selfHostedPlayIconSize,
		selfVideoProgressUiColor,
		vimeoProgressUiColor,
		vimeoPlayIconSize,
		autoplay,
		mute,
		loop,
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
	const onSelectAudioHandler = ( media ) => {
		setAttributes( { audioUrl: media.url } );
	};

	const onRemoveAudioHandler = () => {
		setAttributes( { audioUrl: '' } );
	};
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
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
										options={ videoSourceOption }
										isResponsive={ false }
										attributeValue={ videoSource }
										attributeName="videoSource"
										setAttributes={ setAttributes }
									/>

									<ABlocksToggleControl
										label={ __( 'Autoplay', 'ablocks' ) }
										isResponsive={ false }
										attributeValue={ autoplay }
										attributeName="autoplay"
										setAttributes={ setAttributes }
									/>
									{ videoSource === 'youtube' && (
										<ABlocksToggleControl
											label={ __( 'Mute', 'ablocks' ) }
											isResponsive={ false }
											attributeValue={ mute }
											attributeName="mute"
											setAttributes={ setAttributes }
										/>
									) }

									<ABlocksToggleControl
										label={ __( 'Loop', 'ablocks' ) }
										isResponsive={ false }
										attributeValue={ loop }
										attributeName="loop"
										setAttributes={ setAttributes }
									/>

									{ videoSource === 'youtube' && (
										<>
											<ABlocksTextControl
												label={ __(
													'Link',
													'ablocks'
												) }
												placeholder=""
												attributeValue={ youtubeUrl }
												attributeName="youtubeUrl"
												setAttributes={ setAttributes }
											/>
										</>
									) }

									{ videoSource === 'vimeo' && (
										<ABlocksTextControl
											label={ __( 'Link', 'ablocks' ) }
											placeholder=""
											attributeValue={ vimeoUrl }
											attributeName="vimeoUrl"
											setAttributes={ setAttributes }
										/>
									) }
									{ videoSource === 'selfHosted' && (
										<VideoUploadField
											allowedTypes={ [ 'video' ] }
											attributeValue={ attributes }
											deviceType={ deviceType }
											onSelectImageHandler={
												onSelectVideoHandler
											}
											onRemoveImageHandler={
												onRemoveVideoHandler
											}
											attributeName={ 'videoUrl' }
										/>
									) }
									{ videoSource === 'audio' && (
										<AudioUploadField
											allowedTypes={ [ 'audio' ] }
											attributeValue={ attributes }
											attributeName="audioUrl"
											onSelectImageHandler={
												onSelectAudioHandler
											}
											onRemoveImageHandler={
												onRemoveAudioHandler
											}
											deviceType=""
										/>
									) }
									{ videoSource === 'youtube' && (
										<>
											<label>
												{ __(
													'Poster Image',
													'ablocks'
												) }
											</label>
											<MediaUploadField
												allowedTypes={ [ 'image' ] }
												attributeValue={ attributes }
												onSelectImageHandler={ (
													media
												) => {
													setAttributes( {
														// imageSizes: media.sizes,
														posterImage: media.url,
													} );
												} }
												onRemoveImageHandler={ () => {
													setAttributes( {
														posterImage: undefined,
													} );
												} }
												attributeName="posterImage"
											/>
										</>
									) }

									{ videoSource === 'youtube' && (
										<>
											<div className="ablocks-video--times-wrapper">
												<ABlocksTextControl
													label={ __(
														'Start',
														'ablocks'
													) }
													placeholder="55"
													attributeValue={
														videoStartTime
													}
													attributeName="videoStartTime"
													setAttributes={
														setAttributes
													}
												/>
												<span className="ablocks-control-field-description">
													{ __(
														'Specify a start time (in seconds)',
														'ablocks'
													) }
												</span>
												<ABlocksTextControl
													label={ __(
														'End',
														'ablocks'
													) }
													placeholder="65"
													attributeValue={
														videoEndTime
													}
													attributeName="videoEndTime"
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
											</div>
										</>
									) }
								</>
							}
							style={
								<>
									{ videoSource === 'youtube' && (
										<>
											<ABlocksRangeControl
												label={ __(
													'Playbutton Size',
													'ablocks'
												) }
												min={ 0 }
												max={ 100 }
												isInline={ false }
												isResponsive={ false }
												attributeName={
													'youtubePlayPauseIconSize'
												}
												attributeValue={
													youtubePlayPauseIconSize
												}
												setAttributes={ setAttributes }
												attributeDefaultValue={
													youtubePlayPauseIconSizeDefaultAttributeValue
												}
											/>
											<ABlocksColorControl
												label={ __(
													'Playbutton Color',
													'ablocks'
												) }
												attributeName="youtubeUiColor"
												attributeValue={
													youtubeUiColor
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksRangeControl
												label={ __(
													'Progressbar Size',
													'ablocks'
												) }
												min={ 0 }
												max={ 100 }
												isInline={ false }
												isResponsive={ false }
												attributeName={
													'youtubeIconSize'
												}
												attributeValue={
													youtubeIconSize
												}
												setAttributes={ setAttributes }
												attributeDefaultValue={
													youtubeIconSizeDefaultAttributeValue
												}
											/>
											<ABlocksColorControl
												label={ __(
													'Progressbar Background',
													'ablocks'
												) }
												attributeName="playerbgColor"
												attributeValue={
													attributes?.playerbgColor
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Progressbar Color',
													'ablocks'
												) }
												attributeName="youtubeProgressColor"
												attributeValue={
													youtubeProgressColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }
									{ videoSource === 'selfHosted' && (
										<>
											<ABlocksRangeControl
												label={ __(
													'Playbutton Size',
													'ablocks'
												) }
												min={ 0 }
												max={ 100 }
												isInline={ false }
												isResponsive={ false }
												attributeName={
													'selfHostedIconSize'
												}
												attributeValue={
													selfHostedIconSize
												}
												setAttributes={ setAttributes }
												attributeDefaultValue={
													selfHostedIconSizeDefaultAttributeValue
												}
											/>
											<ABlocksColorControl
												label={ __(
													'Playbutton Color',
													'ablocks'
												) }
												attributeName="selfVideoUiColor"
												attributeValue={
													selfVideoUiColor
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksRangeControl
												label={ __(
													'Progressbar Size',
													'ablocks'
												) }
												min={ 0 }
												max={ 100 }
												isInline={ false }
												isResponsive={ false }
												attributeName={
													'selfHostedPlayIconSize'
												}
												attributeValue={
													selfHostedPlayIconSize
												}
												setAttributes={ setAttributes }
												attributeDefaultValue={
													selfHostedPlayIconSizeDefaultAttributeValue
												}
											/>
											<ABlocksColorControl
												label={ __(
													'Progressbar Background',
													'ablocks'
												) }
												attributeName="selfVideobgColor"
												attributeValue={
													selfVideobgColor
												}
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'Progressbar Color',
													'ablocks'
												) }
												attributeName="selfVideoProgressUiColor"
												attributeValue={
													selfVideoProgressUiColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }
									{ videoSource === 'vimeo' && (
										<>
											<ABlocksRangeControl
												label={ __(
													'Playbutton Size',
													'ablocks'
												) }
												min={ 0 }
												max={ 100 }
												isInline={ false }
												isResponsive={ false }
												attributeName={
													'vimeoIconSize'
												}
												attributeValue={ vimeoIconSize }
												setAttributes={ setAttributes }
												attributeDefaultValue={
													vimeoIconSizeDefaultAttributeValue
												}
											/>
											<ABlocksColorControl
												label={ __(
													'Playbutton Color',
													'ablocks'
												) }
												attributeName="vimeoUiColor"
												attributeValue={ vimeoUiColor }
												setAttributes={ setAttributes }
											/>
											<ABlocksRangeControl
												label={ __(
													'Progressbar Size',
													'ablocks'
												) }
												min={ 0 }
												max={ 100 }
												isInline={ false }
												isResponsive={ false }
												attributeName={
													'vimeoPlayIconSize'
												}
												attributeValue={
													vimeoPlayIconSize
												}
												setAttributes={ setAttributes }
												attributeDefaultValue={
													vimeoPlayIconSizeDefaultAttributeValue
												}
											/>
											<ABlocksColorControl
												label={ __(
													'ProgressBar Background',
													'ablocks'
												) }
												attributeName="vimeobgColor"
												attributeValue={ vimeobgColor }
												setAttributes={ setAttributes }
											/>
											<ABlocksColorControl
												label={ __(
													'ProgressBar Color',
													'ablocks'
												) }
												attributeName="vimeoProgressUiColor"
												attributeValue={
													vimeoProgressUiColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }
								</>
							}
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
