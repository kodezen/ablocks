import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import {
	getWrapperCSS as getIconWrapperCSS,
	getElementCSS as getIconElementCSS,
	getElementImageCSS as getIconElementImageCSS,
	getElementImageHoverCSS,
} from '@Controls/icon-upload/helper';
import {
	getWrapperCSS,
	getSettingStyle,
	getUserSettingStyle,
	getMenuListStyle,
	getMenuHoverListStyle,
	getMenuActiveListStyle,
	getContentStyle,
	getBreadcrumbStyle,
	getContentHoverStyle,
	getGapCss,
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
	// Generate CSS
	const generatedCSS = useMemo( () => {
		let cssGenerator = null;
		if ( cssGenerator ) {
			if (
				attributes?.blockVersion === 2 &&
				! ( cssGenerator instanceof CSSGenerator2 )
			) {
				cssGenerator = new CSSGenerator2( attributes, clientId ); // Create new instance of v2 if needed
			} else if (
				attributes?.blockVersion !== 2 &&
				! ( cssGenerator instanceof CSSGenerator )
			) {
				cssGenerator = new CSSGenerator( attributes, clientId ); // Create new instance of v1 if needed
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
		// Generate wrapper CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-frontend-dashboard-sidebar',
			getSettingStyle( attributes, '' ),
			getSettingStyle( attributes, 'Tablet' ),
			getSettingStyle( attributes, 'Mobile' )
		);
		// Generate wrapper CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-frontend-dashboard-user',
			getUserSettingStyle( attributes, '' ),
			getUserSettingStyle( attributes, 'Tablet' ),
			getUserSettingStyle( attributes, 'Mobile' )
		);
		// Generate wrapper CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-frontend-dashboard-menu__item a',
			getMenuListStyle( attributes, '' ),
			getMenuListStyle( attributes, 'Tablet' ),
			getMenuListStyle( attributes, 'Mobile' )
		);
		// Generate wrapper CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-frontend-dashboard-menu__item a:hover',
			getMenuHoverListStyle( attributes, '' ),
			getMenuHoverListStyle( attributes, 'Tablet' ),
			getMenuHoverListStyle( attributes, 'Mobile' )
		);
		// Generate wrapper CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-frontend-dashboard-menu__item--current a',
			getMenuActiveListStyle( attributes, '' ),
			getMenuActiveListStyle( attributes, 'Tablet' ),
			getMenuActiveListStyle( attributes, 'Mobile' )
		);
		// Content Setting
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-frontend-dashboard-content',
			getContentStyle( attributes, '' ),
			getContentStyle( attributes, 'Tablet' ),
			getContentStyle( attributes, 'Mobile' )
		);
		// Content Setting
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-frontend-dashboard-content:hover',
			getContentHoverStyle( attributes, '' ),
			getContentHoverStyle( attributes, 'Tablet' ),
			getContentHoverStyle( attributes, 'Mobile' )
		);
		// Content Setting
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-frontend-dashboard-breadcrumb li',
			getBreadcrumbStyle( attributes, '' ),
			getBreadcrumbStyle( attributes, 'Tablet' ),
			getBreadcrumbStyle( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-frontend-dashboard-breadcrumb li + li::before',
			getBreadcrumbStyle( attributes, '' ),
			getBreadcrumbStyle( attributes, 'Tablet' ),
			getBreadcrumbStyle( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--frontend-dashboard',
			getGapCss( attributes, '' ),
			getGapCss( attributes, 'Tablet' ),
			getGapCss( attributes, 'Mobile' )
		);

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
