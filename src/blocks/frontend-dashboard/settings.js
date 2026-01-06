import React from 'react';
import { useSelect } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import InspectorTabs from '@Components/inspector-tabs';
import ABlocksSelectControl from '@Controls/select';
import { settings as coreSettings } from '@Utils/Helper';
import { PanelBody } from '@wordpress/components';
import ABlocksBorderControl from '@Controls/border';
import ControlLabel from '@Components/control-label';
import ABlocksColorControl from '@Controls/color';
import ABlocksTypography from '@Controls/typography';
import Separator from '@Components/separator';
import NormalHoverTabs from '@Components/normal-hover-tabs';
import ABlocksDimensions from '@Controls/dimensions';
import ABlocksRangeControl from '@Controls/range';
import { bothGap as bothGapDefaultVal } from './attributes';

const propTypes = {};
export default function Settings( props ) {
	const { attributes, setAttributes } = props;
	const {
		dashboard_page,
		sidebarBorder,
		sidebarBackground,
		userSidebarBorder,
		userTypography,
		userTextColor,
		sidebarUserBackground,
		menuListActiveBackground,
		menuListActiveTextColor,
		menuListHoverBackground,
		menuListHoverTextColor,
		menuListBackground,
		menuListTextColor,
		menuListTypography,
		menuListBorder,
		menuListPadding,
		contentBackground,
		breadcrumbColor,
		contentPadding,
		breadcrumbtTypography,
		contentBorder,
	} = attributes;
	const { frontend_dashboard_page } = coreSettings;

	const ChildPagesOptions = () => {
		const options = useSelect(
			( select ) => {
				const pages = select( 'core' ).getEntityRecords(
					'postType',
					'page',
					{
						parent: frontend_dashboard_page,
						per_page: -1,
						order: 'asc',
						orderby: 'title',
					}
				);

				if ( ! pages ) {
					return null;
				} // Still loading

				return pages.map( ( page ) => ( {
					label: page.title.rendered,
					value: page.slug,
				} ) );
			},
			[ frontend_dashboard_page ]
		);

		return options || [];
	};

	return (
		<React.Fragment>
			<InspectorControls>
				<InspectorTabs
					attributes={ attributes }
					setAttributes={ setAttributes }
				>
					<PanelBody
						title={ __( 'General Setting', 'ablocks' ) }
						initialOpen={ false }
					>
						<u
							style={ {
								paddingBottom: '20px',
								display: 'block',
							} }
						>
							<i>These feature will only works in editor</i>
						</u>
						<ABlocksSelectControl
							options={ ChildPagesOptions() }
							label={ __( 'Active Dashboard Pages', 'ablocks' ) }
							attributeValue={ dashboard_page }
							attributeName={ 'dashboard_page' }
							setAttributes={ setAttributes }
						/>
						<ABlocksRangeControl
							label={ __( 'Gap', 'ablocks' ) }
							min={ 1 }
							max={ 100 }
							hasUit={ false }
							isInlnine={ false }
							isResponsive={ false }
							attributeName={ 'bothGap' }
							attributeValue={ attributes?.bothGap }
							setAttributes={ setAttributes }
							attributeDefaultValue={ bothGapDefaultVal }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Sidebar Design', 'ablocks' ) }
						initialOpen={ false }
					>
						<Separator />
						<ABlocksColorControl
							label={ __( 'Background', 'ablocks' ) }
							isGradient={ true }
							attributeName="sidebarBackground"
							attributeValue={ sidebarBackground || '#ddd' }
							setAttributes={ setAttributes }
						/>
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="sidebarBorder"
							attributeValue={ attributes?.sidebarBorder }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Sidebar Header', 'ablocks' ) }
						initialOpen={ false }
					>
						<Separator />
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							attributeName="userTextColor"
							attributeValue={ userTextColor || '#000000' }
							setAttributes={ setAttributes }
						/>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="userTypography"
							attributeValue={ userTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Background', 'ablocks' ) }
							isGradient={ true }
							attributeName="sidebarUserBackground"
							attributeValue={ sidebarUserBackground }
							setAttributes={ setAttributes }
						/>
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="userSidebarBorder"
							attributeValue={ attributes?.userSidebarBorder }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Menu Items', 'ablocks' ) }
						initialOpen={ false }
					>
						<Separator />
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="menuListTypography"
							attributeValue={ menuListTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>

						<NormalHoverTabs
							normal={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="menuListTextColor"
										attributeValue={
											menuListTextColor || '#000000'
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isGradient={ true }
										attributeName="menuListBackground"
										attributeValue={ menuListBackground }
										setAttributes={ setAttributes }
									/>
								</>
							}
							hover={
								<>
									<ABlocksColorControl
										label={ __( 'Color', 'ablocks' ) }
										attributeName="menuListHoverTextColor"
										attributeValue={
											menuListHoverTextColor
										}
										setAttributes={ setAttributes }
									/>
									<ABlocksColorControl
										label={ __( 'Background', 'ablocks' ) }
										isGradient={ true }
										attributeName="menuListHoverBackground"
										attributeValue={
											menuListHoverBackground
										}
										setAttributes={ setAttributes }
									/>
								</>
							}
						/>
						<Separator />
						<ControlLabel
							label={ __(
								'Menu Setting Active Style',
								'ablocks'
							) }
							isResponsive={ false }
							isHeader={ true }
						/>
						<Separator />
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							attributeName="menuListActiveTextColor"
							attributeValue={ menuListActiveTextColor }
							setAttributes={ setAttributes }
						/>
						<ABlocksColorControl
							label={ __( 'Background', 'ablocks' ) }
							isGradient={ true }
							attributeName="menuListActiveBackground"
							attributeValue={ menuListActiveBackground }
							setAttributes={ setAttributes }
						/>
						<Separator />
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ false }
							attributeName="menuListPadding"
							attributeValue={ menuListPadding }
							setAttributes={ setAttributes }
						/>
						<ControlLabel
							label="Border"
							isResponsive={ false }
							isHeader={ true }
						/>
						<ABlocksBorderControl
							attributeName="menuListBorder"
							attributeValue={ attributes?.menuListBorder }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Content Area', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksColorControl
							label={ __( 'Background', 'ablocks' ) }
							isGradient={ true }
							attributeName="contentBackground"
							attributeValue={ contentBackground || '#ddd' }
							setAttributes={ setAttributes }
						/>
						<ABlocksDimensions
							label={ __( 'Padding', 'ablocks' ) }
							isResponsive={ false }
							attributeName="contentPadding"
							attributeValue={ contentPadding }
							setAttributes={ setAttributes }
						/>
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
					</PanelBody>
					<PanelBody
						title={ __( 'Breadcrumbs', 'ablocks' ) }
						initialOpen={ false }
					>
						<ABlocksTypography
							label={ __( 'Typography', 'ablocks' ) }
							attributeName="breadcrumbtTypography"
							attributeValue={ breadcrumbtTypography }
							setAttributes={ setAttributes }
							isResponsive={ true }
							attributes={ attributes }
						/>
						<ABlocksColorControl
							label={ __( 'Color', 'ablocks' ) }
							attributeName="breadcrumbColor"
							attributeValue={ breadcrumbColor }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
				</InspectorTabs>
			</InspectorControls>
		</React.Fragment>
	);
}

Settings.propTypes = propTypes;
