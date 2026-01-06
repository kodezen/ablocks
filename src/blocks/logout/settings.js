import React from 'react';
import { __ } from '@wordpress/i18n';
import ABlocksPanelBody from '@Components/panel-body';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksTextControl from '@Controls/text';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksToggleControl from '@Controls/toggleButton';
import ABlocksColorControl from '@Controls/color';
import ABlocksAlignmentControl from '@Controls/alignment';
import ABlocksRangeControl from '@Controls/range';
import ABlocksButtonGroupControl from '@Components/button-group';
import ControlLabel from '@Components/control-label';
import ABlocksTypography from '@Controls/typography';
import ABlocksTextShadow from '@Controls/textShadow';
import ABlocksTextStroke from '@Controls/textStroke';
import ABlocksBorderControl from '@Controls/border';
import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';

import {
	avatarWidth as avatarWidthDefaultAttributeValue,
	avatarHeight as avatarHeightDefaultAttribute,
} from './attributes';
import {
	alignmentOptions,
	directionOptions,
	loginRedirectOptions,
	logoutRedirectOptions,
} from './helper';

const propTypes = {};
const defaultProps = {};

export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		logOutLabel,
		logInLabel,
		isShowAvatar,
		logOutLabelColor,
		logOutLabelBgColor,
		labelAlignment,
		avatarHeight,
		direction,
		avatarWidth,
		isShowName,
		nameColor,
		logoutRedirect,
		logoutCustomUrl,
		loginRedirect,
		loginCustomUrl,
		nameTypography,
		nameTextShadow,
		nameTextStroke,
		labelTypography,
		labelTextShadow,
		labelTextStroke,
	} = attributes;

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={
						'https://ablocks.pro/docs/ablocks-logout-block/'
					}
				>
					<ABlocksPanelBody
						title={ __( 'Logout', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									{ ( isShowAvatar || isShowName ) && (
										<ABlocksButtonGroupControl
											isInline
											label={ __(
												'Direction',
												'ablocks'
											) }
											options={ directionOptions }
											attributeName="direction"
											attributeValue={ direction }
											setAttributes={ setAttributes }
										/>
									) }

									<ABlocksAlignmentControl
										allowDeselect={ true }
										label={ __( 'Alignment', 'ablocks' ) }
										options={ alignmentOptions }
										isInline={ false }
										attributeName="labelAlignment"
										attributeValue={ labelAlignment }
										setAttributes={ setAttributes }
									/>
									<ABlocksTextControl
										label={ __(
											'Logout Label',
											'ablocks'
										) }
										attributeName="logOutLabel"
										attributeValue={ logOutLabel }
										setAttributes={ setAttributes }
										isInline={ false }
										disableDynamicContent={ true }
									/>
									<ABlocksTextControl
										label={ __( 'Login Label', 'ablocks' ) }
										attributeName="logInLabel"
										attributeValue={ logInLabel }
										setAttributes={ setAttributes }
										isInline={ false }
										disableDynamicContent={ true }
									/>
									<ABlocksToggleControl
										label={ __( 'Show Avatar', 'ablocks' ) }
										attributeName="isShowAvatar"
										attributeValue={ isShowAvatar }
										setAttributes={ setAttributes }
										isResponsive={ false }
										allowDeselect={ false }
									/>
									<ABlocksToggleControl
										label={ __(
											'Show Display Name',
											'ablocks'
										) }
										attributeName="isShowName"
										attributeValue={ isShowName }
										setAttributes={ setAttributes }
										isResponsive={ false }
										allowDeselect={ false }
									/>
									<ABlocksSelectControl
										label={ __(
											'Redirect After Logout',
											'ablocks'
										) }
										options={ logoutRedirectOptions }
										isSearch={ false }
										attributeName="logoutRedirect"
										attributeValue={ logoutRedirect }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									{ logoutRedirect === 'custom-url' && (
										<ABlocksTextControl
											label={ __(
												'Custom UR',
												'ablocks'
											) }
											attributeName="logoutCustomUrl"
											attributeValue={ logoutCustomUrl }
											setAttributes={ setAttributes }
											isInline={ false }
											disableDynamicContent={ true }
										/>
									) }
									<ABlocksSelectControl
										label={ __(
											'Redirect After Login',
											'ablocks'
										) }
										options={ loginRedirectOptions }
										isSearch={ false }
										attributeName="loginRedirect"
										attributeValue={ loginRedirect }
										setAttributes={ setAttributes }
										isInline={ false }
									/>
									{ loginRedirect === 'custom-url' && (
										<ABlocksTextControl
											label={ __(
												'Custom UR',
												'ablocks'
											) }
											attributeName="loginCustomUrl"
											attributeValue={ loginCustomUrl }
											setAttributes={ setAttributes }
											isInline={ false }
											disableDynamicContent={ true }
										/>
									) }
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="logOutLabelBgColor"
										attributeValue={ logOutLabelBgColor }
										setAttributes={ setAttributes }
									/>
									<ControlLabel
										label="Label"
										isResponsive={ false }
										isHeader={ true }
									/>
									<Separator />
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="logOutLabelColor"
										attributeValue={ logOutLabelColor }
										setAttributes={ setAttributes }
									/>
									<ABlocksTypography
										label={ __( 'Typography', 'ablocks' ) }
										attributeName="labelTypography"
										attributeValue={ labelTypography }
										setAttributes={ setAttributes }
										isResponsive={ true }
										attributes={ attributes }
									/>
									<ABlocksTextShadow
										label={ __( 'Text Shadow', 'ablocks' ) }
										attributeName="labelTextShadow"
										attributeValue={ labelTextShadow }
										setAttributes={ setAttributes }
										isResponsive={ false }
									/>
									<ABlocksTextStroke
										label={ __( 'Text Stroke', 'ablocks' ) }
										attributeName="labelTextStroke"
										attributeValue={ labelTextStroke }
										setAttributes={ setAttributes }
										isResponsive={ true }
									/>
									{ isShowName && (
										<>
											<ControlLabel
												label="Display Name"
												isResponsive={ false }
												isHeader={ true }
											/>
											<Separator />
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="nameColor"
												attributeValue={ nameColor }
												setAttributes={ setAttributes }
											/>
											<ABlocksTypography
												label={ __(
													'Typography',
													'ablocks'
												) }
												attributeName="nameTypography"
												attributeValue={
													nameTypography
												}
												setAttributes={ setAttributes }
												isResponsive={ true }
												attributes={ attributes }
											/>
											<ABlocksTextShadow
												label={ __(
													'Text Shadow',
													'ablocks'
												) }
												attributeName="nameTextShadow"
												attributeValue={
													nameTextShadow
												}
												setAttributes={ setAttributes }
												isResponsive={ false }
											/>
											<ABlocksTextStroke
												label={ __(
													'Text Stroke',
													'ablocks'
												) }
												attributeName="nameTextStroke"
												attributeValue={
													nameTextStroke
												}
												setAttributes={ setAttributes }
												isResponsive={ true }
											/>
										</>
									) }
								</>
							}
						/>
					</ABlocksPanelBody>
					{ isShowAvatar && (
						<ABlocksPanelBody
							title={ __( 'Avatar', 'ablocks' ) }
							initialOpen={ true }
						>
							<ContentStyleTabs
								content={
									<>
										<>
											<ABlocksRangeControl
												label={ __(
													'Height',
													'ablocks'
												) }
												attributeValue={ avatarHeight }
												hasUnit={ true }
												isResponsive={ true }
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
												] }
												attributeName="avatarHeight"
												setAttributes={ setAttributes }
												isInline={ false }
												min={ 0 }
												max={ 200 }
												attributeDefaultValue={
													avatarHeightDefaultAttribute
												}
												autoSyncRange={ true }
											/>
											<ABlocksRangeControl
												label={ __(
													'Width',
													'ablocks'
												) }
												attributeValue={ avatarWidth }
												hasUnit={ true }
												isResponsive={ true }
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
												] }
												attributeName="avatarWidth"
												setAttributes={ setAttributes }
												isInline={ false }
												min={ 0 }
												max={ 200 }
												attributeDefaultValue={
													avatarWidthDefaultAttributeValue
												}
												autoSyncRange={ true }
											/>
										</>
									</>
								}
								style={
									<>
										<>
											<ControlLabel
												label="Border"
												isResponsive={ false }
												isHeader={ true }
											/>
											<ABlocksBorderControl
												attributeName="avatarBorder"
												attributeValue={
													attributes?.avatarBorder
												}
												setAttributes={ setAttributes }
											/>
										</>
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
