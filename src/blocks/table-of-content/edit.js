import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';

import {
	getTocTitleCss,
	getTocItemGapCss,
	getTocHeaderCss,
	getHeaderIconCss,
	getHeaderIconHoverCss,
	getTocBodyCss,
	getTocHeaderHoverCss,
	getMarkerListStyleCSS,
	getActiveTocItemCss,
	getTocItemCss,
} from './styling';

import './editor.scss';

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

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-toc__header',
			getTocHeaderCss( attributes ),
			getTocHeaderCss( attributes, 'Tablet' ),
			getTocHeaderCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-toc__header:hover',
			getTocHeaderHoverCss( attributes ),
			getTocHeaderHoverCss( attributes, 'Tablet' ),
			getTocHeaderHoverCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-toc__header-title',
			getTocTitleCss( attributes ),
			getTocTitleCss( attributes, 'Tablet' ),
			getTocTitleCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-toc-body',
			getTocBodyCss( attributes ),
			getTocBodyCss( attributes, 'Tablet' ),
			getTocBodyCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-toc__header-toggle-icon .ablocks-icon-wrap',
			getHeaderIconCss( attributes ),
			getHeaderIconCss( attributes, 'Tablet' ),
			getHeaderIconCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-toc__header-toggle-icon .ablocks-icon-wrap:hover',
			getHeaderIconHoverCss( attributes ),
			getHeaderIconHoverCss( attributes, 'Tablet' ),
			getHeaderIconHoverCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-toc-body .ablocks-toc-list',
			getMarkerListStyleCSS( attributes ),
			getMarkerListStyleCSS( attributes, 'Tablet' ),
			getMarkerListStyleCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .ablocks-toc-list,
		{{WRAPPER}} .ablocks-toc-list li a`,
			getTocItemCss( attributes ),
			getTocItemCss( attributes, 'Tablet' ),
			getTocItemCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .ablocks-toc-body .ablocks-toc-list li a`,
			getTocItemGapCss( attributes ),
			getTocItemGapCss( attributes, 'Tablet' ),
			getTocItemGapCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} a.ablocks-toc-item-link.active`,
			getActiveTocItemCss( attributes ),
			getActiveTocItemCss( attributes, 'Tablet' ),
			getActiveTocItemCss( attributes, 'Mobile' )
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
