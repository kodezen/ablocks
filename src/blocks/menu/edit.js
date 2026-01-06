import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getMenuCSS,
	getMenuItemHoverCSS,
	getMenuitemCSS,
	getMenuItemLinkCSS,
	getMenuItemLinkHoverCSS,
	getMenuItemDropdownIconCSS,
	getMenuItemDropdownIconHoverCSS,
	getHamburgerWrapperCSS,
	getHamburgerCSS,
	getHamburgerItemCSS,
	getHamburgerHoverCSS,
	getSubMenuCSS,
	subMenuCSS,
	getMegaMenuCSS,
	getSubMenuHoverCSS,
	getSubMenuResponsiveCSS,
	getSubMenuResponsiveHoverCSS,
	getSubMenuResponsiveTextCSS,
	getSubMenuStyleTextHoverCSS,
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
		if ( ! attributes?.blockVersion ) {
			setAttributes( { blockVersion: 2 } );
		}
	}, [ block_id, clientId ] );

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

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-menu',
			getMenuCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-main-menu > .ablocks-menu-item',
			getMenuitemCSS( attributes ),
			getMenuitemCSS( attributes, 'Tablet' ),
			getMenuitemCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-main-menu > .ablocks-menu-item .ablocks-menu-item__link',
			getMenuitemCSS( attributes ),
			getMenuitemCSS( attributes, 'Tablet' ),
			getMenuitemCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-main-menu > .ablocks-menu-item:hover',
			getMenuItemHoverCSS( attributes ),
			getMenuItemHoverCSS( attributes, 'Tablet' ),
			getMenuItemHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-main-menu > .ablocks-menu-item .ablocks-menu-item__link:hover',
			getMenuItemHoverCSS( attributes ),
			getMenuItemHoverCSS( attributes, 'Tablet' ),
			getMenuItemHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--menu-child-sub',
			getSubMenuCSS( attributes ),
			getSubMenuCSS( attributes, 'Tablet' ),
			getSubMenuCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--menu-child-sub:hover',
			getSubMenuHoverCSS( attributes ),
			getSubMenuHoverCSS( attributes, 'Tablet' ),
			getSubMenuHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--menu-child-sub .ablocks-block--menu-item',
			getSubMenuResponsiveCSS( attributes ),
			getSubMenuResponsiveCSS( attributes, 'Tablet' ),
			getSubMenuResponsiveCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--menu-child-sub .ablocks-block--menu-item:hover',
			getSubMenuResponsiveHoverCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--menu-child-sub .ablocks-block--menu-item .ablocks-menu-item__link',
			getSubMenuResponsiveTextCSS( attributes ),
			getSubMenuResponsiveTextCSS( attributes, 'Tablet' ),
			getSubMenuResponsiveTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--menu-child-sub .ablocks-menu-item:hover .ablocks-menu-item__link',
			getSubMenuStyleTextHoverCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-main-menu  > .ablocks-menu-item > .ablocks-menu-item__link',
			getMenuItemLinkCSS( attributes ),
			getMenuItemLinkCSS( attributes, 'Tablet' ),
			getMenuItemLinkCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-main-menu  > .ablocks-menu-item:hover > .ablocks-menu-item__link',
			getMenuItemLinkHoverCSS( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-main-menu  > .ablocks-menu-item > .ablocks-menu-item__dropdown-icon svg',
			getMenuItemDropdownIconCSS( attributes ),
			getMenuItemDropdownIconCSS( attributes, 'Tablet' ),
			getMenuItemDropdownIconCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-main-menu  > .ablocks-menu-item:hover > .ablocks-menu-item__dropdown-icon svg',
			getMenuItemDropdownIconHoverCSS( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-menu-item > .ablocks-menu-child-sub',
			subMenuCSS()
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-menu-child-mega',
			getMegaMenuCSS( attributes ),
			getMegaMenuCSS( attributes, 'Tablet' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-menu__trigger-wrapper',
			getHamburgerWrapperCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-menu__trigger-wrapper .ablocks-menu__trigger ',
			getHamburgerCSS( attributes ),
			getHamburgerCSS( attributes, 'Tablet' ),
			getHamburgerCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-menu__trigger-wrapper .ablocks-menu__trigger:hover ',
			getHamburgerHoverCSS( attributes ),
			getHamburgerHoverCSS( attributes, 'Tablet' ),
			getHamburgerHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-menu__trigger-wrapper .ablocks-menu__trigger .ablocks-menu__trigger-item ',
			getHamburgerItemCSS( attributes )
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
