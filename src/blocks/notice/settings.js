import React from 'react';
import { __ } from '@wordpress/i18n';
import Separator from '@Components/separator';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksControlNote from '@Components/ABlocksControlNote';

import ABlocksToggleControl from '@Controls/toggleButton';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksPanelBody from '@Components/panel-body';
import { HTMLTagLists } from '@Controls/select/helper';

import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksTypography from '@Controls/typography';
import ABlocksTextareaControl from '@Controls/textarea';
import ABlocksIconUploader from '@Controls/icon-upload';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';

// colors
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksColorControl from '@Controls/color';
import ABlocksSelectControl from '@Controls/select';
import ABlocksDimensions from '@Controls/dimensions';

const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		heading,
		headingTag,
		alignment,
		typography,
		textShadow,
		textStroke,
		textColor,
		backgroundColor,
		noticeHeaderPadding,
		isDismissible,
		noticeClose,
	} = attributes;
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-notification-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Notification', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksTextareaControl
										label={ __( 'Title', 'ablocks' ) }
										attributeName="heading"
										attributeValue={ heading }
										setAttributes={ setAttributes }
										placeholder={ __( 'Enter your title' ) }
									/>
									<Separator />
									<ABlocksSelectControl
										label={ __( 'HTML Tag', 'ablocks' ) }
										options={ HTMLTagLists }
										isSearch={ true }
										attributeName="headingTag"
										attributeValue={ headingTag }
										setAttributes={ setAttributes }
									/>
									<ABlocksAlignmentControl
										label={ __( 'Alignment', 'ablocks' ) }
										attributeName="alignment"
										attributeValue={ alignment }
										setAttributes={ setAttributes }
										isInline={ false }
									/>

									<ABlocksSelectControl
										label={ __(
											'Notice Close',
											'ablocks'
										) }
										options={ [
											{
												label: 'One Time',
												value: 'oneTime',
											},
											{
												label: 'permanent',
												value: 'permanent',
											},
										] }
										isResponsive={ false }
										attributeValue={ noticeClose }
										attributeName="noticeClose"
										setAttributes={ setAttributes }
									/>
									<ABlocksControlNote note='Choose "Permanent" to hide the notice permanently after dismissing. Choose "One Time" to hide it only for the current session.' />

									<Separator />
									<ABlocksToggleControl
										isResponsive={ false }
										label="Is Dismissible"
										attributeValue={ isDismissible }
										setAttributes={ setAttributes }
										attributeName="isDismissible"
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="textColor"
										attributeValue={ textColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="typography"
										attributeValue={ typography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksColorControl
										label={ __(
											'Background color',
											'ablocks'
										) }
										attributeName="backgroundColor"
										attributeValue={ backgroundColor }
										setAttributes={ setAttributes }
									/>

									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="textShadow"
										attributeValue={ textShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksTextStroke
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeName="textStroke"
										attributeValue={ textStroke }
										setAttributes={ setAttributes }
										isResponsive={ true }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										attributeName="noticeHeaderPadding"
										attributeValue={ noticeHeaderPadding }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</ABlocksPanelBody>
					{ /* ---- */ }
					{ isDismissible && (
						<ABlocksPanelBody
							title={ __( `Icon`, 'ablocks' ) }
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
									</>
								}
								style={
									<>
										<ABlocksIconStyleSettings
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
									</>
								}
							/>
						</ABlocksPanelBody>
					) }
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
