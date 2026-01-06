import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import ABlocksTypography from '@Controls/typography';
import InspectorTabs from '@Components/inspector-tabs';
import { InspectorControls } from '@wordpress/block-editor';
import ContentStyleTabs from '@Components/content-style-tabs';
import ABlocksColorControl from '@Controls/color';
import NormalActiveTabs from '@Components/normal-active-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksBorderControl from '@Controls/border';
import ABlocksRangeControl from '@Controls/range';
import ABlocksIconUploader from '@Controls/icon-upload';
import ControlLabel from '@Components/control-label';
import ABlocksIconStyleSettings from '@Controls/icon-upload/settings';

import ABlocksNumberControl from '@Controls/number';
import GetDeviceType from '@Utils/get-device-type';
import ABlocksToggleControl from '@Controls/toggleButton';
import './style.css';
import ABlocksButtonGroupControl from '@Components/button-group';
import ABlocksPanelBody from '@Components/panel-body';
import ABlocksBoxShadowControl from '@Controls/box-shadow';
import {
	spacingAttribute as spacingDefaultAttributeValue,
	tabsGapAttribute as tabsGapAttributeValue,
	contentGapAttribute as contentGapAttributeValue,
	tabsWidthAttribute as tabsWidthAttributeValue,
	contentWidthAttribute as contentWidthAttributeValue,
} from './attributes';
import {
	regularIcons,
	brandsIcons,
	solidIcons,
} from '@Controls/icon-upload/icons-svg-data';
import { getResponsiveValue } from '@Utils/helper';

import ABlocksSelectControl from '@Controls/select';
import Separator from '@Components/separator';

const propTypes = {};
import {
	menuPositionOptions,
	menuAlignmentOptions,
	menuContentAlignmentOptions,
	iconPositionOptions,
} from './helper';
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		subTitleTypography,
		subTitleTextColor,
		subTitleTextActiveColor,
		showTitle,
		showSubTitle,
		iconPosition,
		tabsMenuPositioning,
		tabsMenuDirection,
		showIcon,
		titleTypography,
		titleTextColor,
		tabBackgroundColor,
		contentBackgroundColor,
		titleTextActiveColor,
		tabActiveBackgroundColor,
		menuContentPadding,
		spacing,
		tabsGap,
		tabsWidth,
		tabsWidthType,
		tabWrap,
		tabsContentWidthType,
		contentGap,
		contentWidth,
		progressBarColor,
		tabsChangingEffect,
		activeColorOptions,
		tabIcons,
		tabIconsClasses,
		clickedTabIndex,
		enableHoverSwitch,
	} = attributes;
	const deviceType = GetDeviceType();

	const iconUploaderChangeHandler = ( className, index ) => {
		let iconsArray = [];
		const parsedIconType = className.substring( 2, 3 );

		switch ( parsedIconType ) {
			case 'r':
				iconsArray = regularIcons.icons;
				break;

			case 's':
				iconsArray = solidIcons.icons;
				break;

			case 'b':
				iconsArray = brandsIcons.icons;
				break;
		}

		const iconKey = className.substring( 7 );
		const iconData = iconsArray[ iconKey ];
		const iconSvgViewBox = `0 0 ${ iconData[ 0 ] } ${ iconData[ 1 ] }`;
		const iconSvgPath = iconData[ 4 ];

		const iconsList = tabIcons || [];
		const iconsClassNamesList = tabIconsClasses || [];

		const newIconsList = [
			...( iconsList.slice( 0, index ) || [] ),
			{
				path: iconSvgPath,
				viewBox: iconSvgViewBox,
			},
			...( iconsList.slice( index + 1 ) || [] ),
		];

		const newIconsClassNamesList = [
			...( iconsClassNamesList.slice( 0, index ) || [] ),
			className,
			...( iconsClassNamesList.slice( index + 1 ) || [] ),
		];

		setAttributes( {
			tabIcons: newIconsList,
			tabIconsClasses: newIconsClassNamesList,
		} );
	};

	const deleteHandler = ( index ) => {
		const iconsList = tabIcons || [];
		const iconsClassNamesList = tabIconsClasses || [];

		const newIconsList = [
			...( iconsList.slice( 0, index ) || [] ),
			{ path: '', viewBox: '' },
			...( iconsList.slice( index + 1 ) || [] ),
		];
		const newIconsClassNamesList = [
			...( iconsClassNamesList.slice( 0, index ) || [] ),
			'',
			...( iconsClassNamesList.slice( index + 1 ) || [] ),
		];
		setAttributes( {
			tabIcons: newIconsList,
			tabIconsClasses: newIconsClassNamesList,
		} );
	};
	const tabsMenuPositioningValue = getResponsiveValue(
		attributes?.tabsMenuPositioning,
		'value',
		deviceType
	);
	const tabsWidthTypeValue = getResponsiveValue(
		attributes?.tabsWidthType,
		'value',
		deviceType
	);
	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
					docs_url={ 'https://ablocks.pro/docs/ablocks-tabs-block/' }
				>
					<PanelBody
						title={ __( 'Tab Menu', 'ablocks' ) }
						initialOpen={ true }
					>
						<ContentStyleTabs
							content={
								<>
									<ABlocksButtonGroupControl
										allowDeselect={ false }
										label={ __(
											'Menu Position',
											'ablocks'
										) }
										options={ menuPositionOptions }
										attributeName="tabsMenuPositioning"
										attributeValue={ tabsMenuPositioning }
										setAttributes={ setAttributes }
									/>
									{ ( tabsMenuPositioningValue === 'top' ||
										tabsMenuPositioningValue ===
											'bottom' ) && (
										<>
											<ABlocksButtonGroupControl
												allowDeselect={ false }
												label={ __(
													'Menu Direction',
													'ablocks'
												) }
												options={ [
													{
														label: __(
															'Row',
															'ablocks'
														),
														value: 'row',
													},
													{
														label: __(
															'Column',
															'ablocks'
														),
														value: 'column',
													},
												] }
												attributeName="tabsMenuDirection"
												attributeValue={
													tabsMenuDirection
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }
									{ ( tabsMenuPositioningValue === 'top' ||
										tabsMenuPositioningValue ===
											'bottom' ) && (
										<ABlocksButtonGroupControl
											isInline
											label={ __(
												'Menu Alignment',
												'ablocks'
											) }
											options={ menuAlignmentOptions }
											attributeName="tabMenuAlignment"
											attributeValue={
												attributes.tabMenuAlignment
											}
											setAttributes={ setAttributes }
										/>
									) }

									<ABlocksButtonGroupControl
										isInline
										label={ __(
											'Menu Content Alignment',
											'ablocks'
										) }
										options={ menuContentAlignmentOptions }
										attributeName="menuContentAlignment"
										attributeValue={
											attributes.menuContentAlignment
										}
										setAttributes={ setAttributes }
									/>
									{ ( tabsMenuPositioningValue === 'top' ||
										tabsMenuPositioningValue ===
											'bottom' ) && (
										<ABlocksButtonGroupControl
											isInline
											label={ __( 'Wrap', 'ablocks' ) }
											options={ [
												{
													label: __(
														'Wrap',
														'ablocks'
													),
													value: 'wrap',
													icon: (
														<span className="ablocks-icon ablocks-icon--wrap" />
													),
												},
												{
													label: __(
														'No Wrap',
														'ablocks'
													),
													value: 'nowrap',
													icon: (
														<span className="ablocks-icon ablocks-icon--no-wrap" />
													),
												},
												{
													label: __(
														'Wrap Reverse',
														'ablocks'
													),
													value: 'wrap-reverse',
													icon: (
														<span className="ablocks-icon ablocks-icon--wrap ablocks-icon-rotate-180-deg" />
													),
													tooltipPosition: 'top-left',
												},
											] }
											attributeName="tabWrap"
											attributeValue={ tabWrap }
											setAttributes={ setAttributes }
										/>
									) }
									<ABlocksNumberControl
										label={ __(
											'Initial Open',
											'ablocks'
										) }
										attributeName={ 'initialOpen' }
										attributeValue={
											attributes?.initialOpen
										}
										setAttributes={ setAttributes }
										isInline={ true }
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Enable Hover Switch"
										attributeValue={ enableHoverSwitch }
										setAttributes={ setAttributes }
										attributeName="enableHoverSwitch"
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Show Title"
										attributeValue={ attributes?.showTitle }
										setAttributes={ setAttributes }
										attributeName="showTitle"
									/>
									<ABlocksToggleControl
										isResponsive={ false }
										label="Show Sub Title"
										attributeValue={
											attributes?.showSubTitle
										}
										setAttributes={ setAttributes }
										attributeName="showSubTitle"
									/>
									{ showSubTitle && (
										<ABlocksToggleControl
											isResponsive={ false }
											label="Show Only Active Sub Title"
											attributeValue={
												attributes?.showActiveSubTitle
											}
											setAttributes={ setAttributes }
											attributeName="showActiveSubTitle"
										/>
									) }
									<ABlocksToggleControl
										isResponsive={ false }
										label="Show Icon"
										attributeValue={ showIcon }
										setAttributes={ setAttributes }
										attributeName="showIcon"
									/>

									<ABlocksSelectControl
										label={ __(
											'Active Color Options',
											'ablocks'
										) }
										options={ [
											{
												label: __(
													'Background',
													'ablocks'
												),
												value: 'background',
											},
											{
												label: __(
													'Border',
													'ablocks'
												),
												value: 'border',
											},
										] }
										isSearch={ true }
										attributeName="activeColorOptions"
										attributeValue={ activeColorOptions }
										setAttributes={ setAttributes }
									/>
									<ABlocksSelectControl
										label={ __(
											'Tabs Change Effect',
											'ablocks'
										) }
										options={ [
											{
												label: __(
													'Default',
													'ablocks'
												),
												value: 'default',
											},
											{
												label: __(
													'Enable Auto Change',
													'ablocks'
												),
												value: 'enableAutoChange',
											},
											// { label: __('Enable Scroll Change', 'ablocks'), value: 'enableScrollChange' },
										] }
										isSearch={ true }
										attributeName="tabsChangingEffect"
										attributeValue={ tabsChangingEffect }
										setAttributes={ setAttributes }
									/>
								</>
							}
							style={
								<>
									<ABlocksColorControl
										label={ __(
											'Background Color',
											'ablocks'
										) }
										attributeName="tabMenusBackgroundColor"
										attributeValue={
											attributes?.tabMenusBackgroundColor
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __( 'Padding', 'ablocks' ) }
										isResponsive={ true }
										attributeName="tabMenusPadding"
										attributeValue={
											attributes?.tabMenusPadding
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksDimensions
										label={ __( 'Margin', 'ablocks' ) }
										attributeName="tabMenusMargin"
										attributeValue={
											attributes?.tabMenusMargin
										}
										setAttributes={ setAttributes }
									/>
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="tabMenusBorder"
										attributeValue={
											attributes?.tabMenusBorder
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksRangeControl
										label={ __( 'Gap', 'ablocks' ) }
										isResponsive={ true }
										hasUnit={ true }
										attributeName="tabsGap"
										attributeValue={ tabsGap }
										setAttributes={ setAttributes }
										attributeObjectKey="value"
										unitOptions={ [
											{ value: 'px', label: 'px' },
											{ value: 'rem', label: 'rem' },
											{ value: 'em', label: 'em' },
										] }
										step={ 1 }
										min={ 0 }
										max={ 100 }
										isInline={ false }
										attributeDefaultValue={
											tabsGapAttributeValue
										}
									/>
									{ showSubTitle && (
										<ABlocksRangeControl
											label={ __(
												'Content Gap',
												'ablocks'
											) }
											isResponsive={ true }
											hasUnit={ true }
											attributeName="contentGap"
											attributeValue={ contentGap }
											setAttributes={ setAttributes }
											attributeObjectKey="value"
											unitOptions={ [
												{ value: 'px', label: 'px' },
												{ value: 'rem', label: 'rem' },
												{ value: 'em', label: 'em' },
											] }
											step={ 1 }
											min={ 0 }
											max={ 100 }
											isInline={ false }
											attributeDefaultValue={
												contentGapAttributeValue
											}
										/>
									) }
									{ tabsMenuPositioningValue === 'left' ||
									tabsMenuPositioningValue === 'right' ? (
										<>
											<ABlocksRangeControl
												label={ __(
													'Tabs Menu Width',
													'ablocks'
												) }
												isResponsive={ true }
												hasUnit={ true }
												attributeName="tabsWidth"
												attributeValue={ tabsWidth }
												setAttributes={ setAttributes }
												attributeObjectKey="value"
												unitOptions={ [
													{ value: '%', label: '%' },
												] }
												step={ 1 }
												min={ 30 }
												max={ 70 }
												isInline={ false }
												attributeDefaultValue={
													tabsWidthAttributeValue
												}
											/>
											<ABlocksRangeControl
												label={ __(
													'Content Width',
													'ablocks'
												) }
												isResponsive={ true }
												hasUnit={ true }
												attributeName="contentWidth"
												attributeValue={ contentWidth }
												setAttributes={ setAttributes }
												attributeObjectKey="value"
												unitOptions={ [
													{ value: '%', label: '%' },
												] }
												step={ 1 }
												min={ 30 }
												max={ 70 }
												isInline={ false }
												attributeDefaultValue={
													contentWidthAttributeValue
												}
											/>
										</>
									) : (
										<>
											<ABlocksButtonGroupControl
												allowDeselect={ false }
												label={ __(
													'Tab Parent Width',
													'ablocks'
												) }
												options={ [
													{
														label: __(
															'Auto',
															'ablocks'
														),
														value: 'auto',
													},
													{
														label: __(
															'Full',
															'ablocks'
														),
														value: '100%',
													},
												] }
												attributeName="tabsWidthType"
												attributeValue={ tabsWidthType }
												setAttributes={ setAttributes }
											/>
											<ABlocksButtonGroupControl
												allowDeselect={ false }
												label={ __(
													'Tab Child Width',
													'ablocks'
												) }
												options={ [
													{
														label: __(
															'Auto',
															'ablocks'
														),
														value: 'auto',
													},
													{
														label: __(
															'Full',
															'ablocks'
														),
														value: '100%',
													},
												] }
												attributeName="tabsContentWidthType"
												attributeValue={
													tabsContentWidthType
												}
												setAttributes={ setAttributes }
											/>
										</>
									) }

									<ControlLabel
										label="Each Tab Menu"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksDimensions
										label={ __(
											'Menu Padding',
											'ablocks'
										) }
										isResponsive={ true }
										attributeName="menuContentPadding"
										attributeValue={ menuContentPadding }
										setAttributes={ setAttributes }
									/>

									<NormalActiveTabs
										normal={
											<>
												<ABlocksColorControl
													label={ __(
														'Background Color',
														'ablocks'
													) }
													attributeName="tabBackgroundColor"
													attributeValue={
														tabBackgroundColor
													}
													setAttributes={
														setAttributes
													}
												/>
												<ABlocksColorControl
													label={ __(
														'Content Background Color',
														'ablocks'
													) }
													attributeName="contentBackgroundColor"
													attributeValue={
														contentBackgroundColor
													}
													setAttributes={
														setAttributes
													}
												/>
											</>
										}
									/>
									<Separator Margin="30px" />
									<ControlLabel
										label="Border"
										isResponsive={ false }
										isHeader={ true }
									/>
									<ABlocksBorderControl
										attributeName="menuContentBorder"
										attributeValue={
											attributes?.menuContentBorder
										}
										setAttributes={ setAttributes }
									/>
									{ activeColorOptions === 'border' ? (
										<ABlocksColorControl
											label={ __(
												'Active Border Color',
												'ablocks'
											) }
											attributeName="activeBorderColor"
											attributeValue={
												attributes?.activeBorderColor
											}
											setAttributes={ setAttributes }
										/>
									) : (
										<ABlocksColorControl
											label={ __(
												'Active Background Color',
												'ablocks'
											) }
											attributeName="tabActiveBackgroundColor"
											attributeValue={
												tabActiveBackgroundColor
											}
											setAttributes={ setAttributes }
										/>
									) }

									<ControlLabel
										label="Box shadow"
										isHeader={ true }
										isResponsive={ false }
									/>
									<ABlocksBoxShadowControl
										label={ __( 'Box shadow', 'ablocks' ) }
										attributeName="boxShadow"
										attributeValue={ attributes?.boxShadow }
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
					</PanelBody>
					{ showTitle && (
						<ABlocksPanelBody
							title={ __( 'Title', 'ablocks' ) }
							initialOpen={ false }
						>
							<>
								<ABlocksTypography
									label={ __( 'Typography', 'ablocks' ) }
									attributeName="titleTypography"
									attributeValue={ titleTypography }
									setAttributes={ setAttributes }
									isResponsive={ true }
									attributes={ attributes }
								/>

								<ControlLabel
									label="Title Color"
									isResponsive={ false }
									isHeader={ true }
								/>
								<NormalActiveTabs
									normal={
										<>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="titleTextColor"
												attributeValue={
													titleTextColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
									active={
										<>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="titleTextActiveColor"
												attributeValue={
													titleTextActiveColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
								/>
							</>
						</ABlocksPanelBody>
					) }
					{ showSubTitle && (
						<ABlocksPanelBody
							title={ __( 'Subtitle', 'ablocks' ) }
							initialOpen={ false }
						>
							<>
								<ABlocksTypography
									label={ __( 'Typography', 'ablocks' ) }
									attributeName="subTitleTypography"
									attributeValue={ subTitleTypography }
									setAttributes={ setAttributes }
									isResponsive={ true }
									attributes={ attributes }
								/>

								<ControlLabel
									label="Subtitle Color"
									isResponsive={ false }
									isHeader={ true }
								/>
								<NormalActiveTabs
									normal={
										<>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="subTitleTextColor"
												attributeValue={
													subTitleTextColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
									active={
										<>
											<ABlocksColorControl
												label={ __(
													'Color',
													'ablocks'
												) }
												attributeName="subTitleTextActiveColor"
												attributeValue={
													subTitleTextActiveColor
												}
												setAttributes={ setAttributes }
											/>
										</>
									}
								/>
							</>
						</ABlocksPanelBody>
					) }
					{ showIcon && (
						<PanelBody
							title={ __( 'Icon', 'ablocks' ) }
							initialOpen={ false }
						>
							<ContentStyleTabs
								content={
									<>
										<ABlocksIconUploader
											label={ __( 'Icon', 'ablocks' ) }
											attributes={ attributes }
											setAttributes={ setAttributes }
											onChangeHandler={ ( className ) =>
												iconUploaderChangeHandler(
													className,
													clickedTabIndex
												)
											}
											deleteHandler={ () =>
												deleteHandler( clickedTabIndex )
											}
											getIconClass={ () =>
												tabIconsClasses?.[
													clickedTabIndex
												]
											}
											legacySupport={ true }
											legacyIconSizeSupport={ true }
											viewSupport={ true }
										/>
										<ABlocksButtonGroupControl
											allowDeselect={ false }
											label={ __(
												'Icon Position',
												'ablocks'
											) }
											options={ iconPositionOptions }
											attributeName="iconPosition"
											attributeValue={ iconPosition }
											setAttributes={ setAttributes }
										/>
									</>
								}
								style={
									<>
										<ABlocksIconStyleSettings
											attributes={ attributes }
											setAttributes={ setAttributes }
										/>
										<ABlocksDimensions
											label={ __( 'Margin', 'ablocks' ) }
											attributeName="iconPositionMargin"
											attributeValue={
												attributes?.iconPositionMargin
											}
											setAttributes={ setAttributes }
										/>
										<ABlocksRangeControl
											label={ __( 'Spacing', 'ablocks' ) }
											isResponsive={ false }
											hasUnit={ true }
											attributeName="spacing"
											attributeValue={ spacing }
											setAttributes={ setAttributes }
											attributeObjectKey="value"
											unitOptions={ [
												{ value: 'px', label: 'px' },
												{ value: 'rem', label: 'rem' },
												{ value: 'em', label: 'em' },
											] }
											step={ 1 }
											min={ 1 }
											max={ 30 }
											isInline={ false }
											attributeDefaultValue={
												spacingDefaultAttributeValue
											}
										/>
									</>
								}
							/>
						</PanelBody>
					) }
					{ tabsChangingEffect === 'enableAutoChange' && (
						<ABlocksPanelBody
							title={ __( 'Auto Change Style', 'ablocks' ) }
							initialOpen={ false }
						>
							<>
								<ABlocksNumberControl
									label={ __( 'Active Duration', 'ablocks' ) }
									attributeName={ 'activeDuration' }
									attributeValue={
										attributes?.activeDuration
									}
									setAttributes={ setAttributes }
									isInline={ true }
								/>
								<ABlocksColorControl
									label={ __( 'Color', 'ablocks' ) }
									attributeName="progressBarColor"
									attributeValue={ progressBarColor }
									setAttributes={ setAttributes }
								/>
							</>
						</ABlocksPanelBody>
					) }
					<ABlocksPanelBody
						title={ __( 'Tab Content', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ true }
							attributeName="contentPadding"
							attributeValue={ attributes?.contentPadding }
							setAttributes={ setAttributes }
						/>
						<ABlocksDimensions
							label={ __( 'Margin', 'ablocks' ) }
							attributeName="contentMargin"
							attributeValue={ attributes?.contentMargin }
							setAttributes={ setAttributes }
						/>
						<ABlocksBorderControl
							attributeName="contentBorder"
							attributeValue={ attributes?.contentBorder }
							setAttributes={ setAttributes }
						/>
					</ABlocksPanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
