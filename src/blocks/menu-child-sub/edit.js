import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	getMenuitemCSS,
	getMenuItemHoverCSS,
	getMenuItemLinkCSS,
	getWrapperCSS,
	getMenuItemLinkHoverCSS,
	getMenuItemDropdownIconCSS,
	getMenuItemDropdownIconHoverCSS,
	getWrapperHoverCSS,
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
	}, [ block_id, clientId ] );
	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--menu-child-sub',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--menu-child-sub:hover',
			getWrapperHoverCSS( attributes ),
			getWrapperHoverCSS( attributes, 'Tablet' ),
			getWrapperHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--menu-child-sub .ablocks-block--menu-item',
			getMenuitemCSS( attributes ),
			getMenuitemCSS( attributes, 'Tablet' ),
			getMenuitemCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--menu-child-sub .ablocks-block--menu-item:hover',
			getMenuItemHoverCSS( attributes ),
			getMenuItemHoverCSS( attributes, 'Tablet' ),
			getMenuItemHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} > .ablocks-menu-item > .ablocks-menu-item__link',
			getMenuItemLinkCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} > .ablocks-menu-item:hover  > .ablocks-menu-item__link',
			getMenuItemLinkHoverCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  > .ablocks-menu-item .ablocks-menu-item__dropdown-icon svg',
			getMenuItemDropdownIconCSS( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} > .ablocks-menu-item:hover .ablocks-menu-item__dropdown-icon svg',
			getMenuItemDropdownIconHoverCSS( attributes )
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
