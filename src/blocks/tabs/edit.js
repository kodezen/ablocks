import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import {
	getWrapperCSS as getIconWrapperCSS,
	getWrapperHoverCSS as getIconWrapperHoverCSS,
	getElementCSS as getIconElementCSS,
	getElementImageCSS as getIconElementImageCSS,
	getElementImageHoverCSS,
} from '@Controls/icon-upload/helper';
import {
	getTabsCSS,
	getTabsPanelCSS,
	getTabsPanelHoverCSS,
	getTabsTitleCSS,
	getTabsActiveTitleCSS,
	getTabsContentCSS,
	getTabsMenuContentActiveCSS,
	getTabsContentHoverCSS,
	getTabsSubtitleCSS,
	getTabsActiveSubtitleTextCSS,
	getTabsMenuContentCSS,
	getTabsMenuContentHoverCSS,
	getIconPositionCSS,
	progressBarStyleCSS,
	contentGapCSS,
	getTabsWidthCSS,
	getContentWidthCSS,
	getIconSpacingCSS,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
		// Save Version
		if ( ! attributes?.blockVersion ) {
			setAttributes( { blockVersion: 2 } );
		}
	}, [ block_id, clientId ] );

	// Temporary approch instead of attribute migration. Might remove it in future
	useEffect( () => {
		if ( ! attributes.tabsMenuDirection ) {
			const tempTabsMenuDirection = {
				value: 'row',
				valueTablet: '',
				valueMobile: '',
			};
			setAttributes( { tabsMenuDirection: tempTabsMenuDirection } );
		}
		if ( ! attributes.tabsWidthType ) {
			const tempTabsWidthType = {
				value: 'auto',
				valueTablet: '',
				valueMobile: '',
			};
			setAttributes( { tabsWidthType: tempTabsWidthType } );
		}
		if ( ! attributes.tabMenusPadding || ! attributes.tabMenusMargin ) {
			const tempObj = attributes._padding;
			Object.keys( tempObj ).forEach( ( key ) => {
				tempObj[ key ] = '';
			} );
			if ( ! attributes.tabMenusPadding ) {
				setAttributes( { tabMenusPadding: tempObj } );
			}
			if ( ! attributes.tabMenusMargin ) {
				setAttributes( { tabMenusMargin: tempObj } );
			}
		}
		if ( ! attributes.tabMenusBorder ) {
			const tempObj = attributes._border;
			Object.keys( tempObj ).forEach( ( key ) => {
				tempObj[ key ] = '';
			} );
			setAttributes( { tabMenusBorder: tempObj } );
		}
	}, [] );
	const attributeMissing =
		! attributes.tabsMenuDirection ||
		! attributes.tabsWidthType ||
		! attributes.tabMenusPadding ||
		! attributes.tabMenusMargin ||
		! attributes.tabMenusBorder;
	// Temporary approch instead of attribute migration. Might remove it in future

	// Generate CSS
	const generatedCSS = useMemo( () => {
		// Temporary approch instead of attribute migration. Might remove it in future
		if ( attributeMissing ) {
			return '';
		}
		// Temporary approch instead of attribute migration. Might remove it in future
		let cssGenerator = null;

		if ( cssGenerator ) {
			if (
				attributes?.blockVersion === 2 &&
				! ( cssGenerator instanceof CSSGenerator2 )
			) {
				cssGenerator = new CSSGenerator2( attributes, clientId );
			} else if (
				attributes?.blockVersion !== 2 &&
				! ( cssGenerator instanceof CSSGenerator )
			) {
				cssGenerator = new CSSGenerator( attributes, clientId );
			}
		} else {
			// No instance, so create the correct one based on version
			if ( attributes?.blockVersion === 2 ) {
				cssGenerator = new CSSGenerator2( attributes, clientId );
			} else {
				cssGenerator = new CSSGenerator( attributes, clientId );
			}
		}

		if ( cssGenerator === null ) {
			return '';
		}

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs',
			getTabsCSS( attributes ),
			getTabsCSS( attributes, 'Tablet' ),
			getTabsCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__tab-panel',
			getTabsPanelCSS( attributes ),
			getTabsPanelCSS( attributes, 'Tablet' ),
			getTabsPanelCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__tab-panel:hover',
			getTabsPanelHoverCSS( attributes ),
			getTabsPanelHoverCSS( attributes, 'Tablet' ),
			getTabsPanelHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__tab',
			getTabsMenuContentCSS( attributes ),
			getTabsMenuContentCSS( attributes, 'Tablet' ),
			getTabsMenuContentCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__tab--active',
			getTabsMenuContentActiveCSS( attributes ),
			getTabsMenuContentActiveCSS( attributes, 'Tablet' ),
			getTabsMenuContentActiveCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-block-tabs__tab:hover',
			getTabsMenuContentHoverCSS( attributes ),
			getTabsMenuContentHoverCSS( attributes, 'Tablet' ),
			getTabsMenuContentHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__tab-menu-title',
			getTabsTitleCSS( attributes ),
			getTabsTitleCSS( attributes, 'Tablet' ),
			getTabsTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__tab--active .ablocks-block-tabs__tab-menu-title',
			getTabsActiveTitleCSS( attributes ),
			getTabsActiveTitleCSS( attributes, 'Tablet' ),
			getTabsActiveTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__tab-menu-subtitle',
			getTabsSubtitleCSS( attributes ),
			getTabsSubtitleCSS( attributes, 'Tablet' ),
			getTabsSubtitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-block-tabs__tab--active .ablocks-block-tabs__tab-menu-subtitle',
			getTabsActiveSubtitleTextCSS( attributes ),
			getTabsActiveSubtitleTextCSS( attributes, 'Tablet' ),
			getTabsActiveSubtitleTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__tab-panel',
			getTabsWidthCSS( attributes ),
			getTabsWidthCSS( attributes, 'Tablet' ),
			getTabsWidthCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__body',
			getContentWidthCSS( attributes ),
			getContentWidthCSS( attributes, 'Tablet' ),
			getContentWidthCSS( attributes, 'Mobile' )
		);

		if ( attributes?.showActiveSubTitle === false ) {
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-block-tabs__icon',
				getIconPositionCSS( attributes ),
				getIconPositionCSS( attributes, 'Tablet' ),
				getIconPositionCSS( attributes, 'Mobile' )
			);
		} else {
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-block-tabs__tab--active .ablocks-block-tabs__icon',
				getIconPositionCSS( attributes ),
				getIconPositionCSS( attributes, 'Tablet' ),
				getIconPositionCSS( attributes, 'Mobile' )
			);
		}
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__tab--active .ablocks-block-tabs__progressbar',
			progressBarStyleCSS( attributes ),
			progressBarStyleCSS( attributes, 'Tablet' ),
			progressBarStyleCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__icon .ablocks-icon-wrap',
			getIconWrapperCSS( attributes ),
			getIconWrapperCSS( attributes, 'Tablet' ),
			getIconWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__icon .ablocks-icon-wrap:hover',
			getIconWrapperHoverCSS( attributes ),
			getIconWrapperHoverCSS( attributes, 'Tablet' ),
			getIconWrapperHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__icon .ablocks-icon-wrap',
			getIconSpacingCSS( attributes ),
			getIconSpacingCSS( attributes, 'Tablet' ),
			getIconSpacingCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__icon .ablocks-icon-wrap img.ablocks-image-icon',
			getIconElementImageCSS( attributes ),
			getIconElementImageCSS( attributes, 'Tablet' ),
			getIconElementImageCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__icon .ablocks-icon-wrap img.ablocks-image-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__icon .ablocks-icon-wrap svg.ablocks-svg-icon',
			getIconElementCSS( attributes ),
			getIconElementCSS( attributes, 'Tablet' ),
			getIconElementCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-tabs__icon .ablocks-icon-wrap svg.ablocks-svg-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-block-tabs__body',
			getTabsContentCSS( attributes ),
			getTabsContentCSS( attributes, 'Tablet' ),
			getTabsContentCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-block-tabs__body:hover',
			getTabsContentHoverCSS( attributes ),
			getTabsContentHoverCSS( attributes, 'Tablet' ),
			getTabsContentHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-block-tabs__tab-menu-content',
			contentGapCSS( attributes ),
			contentGapCSS( attributes, 'Tablet' ),
			contentGapCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.tabs.editorInlineCSS`,
			null,
			attributes,
			cssGenerator
		);
		if ( editorInlineCSSExtend ) {
			return editorInlineCSSExtend;
		}
		return cssGenerator.generateCSS();
	}, [ attributes ] );

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
