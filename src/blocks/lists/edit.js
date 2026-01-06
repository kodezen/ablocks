import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getWrapperCSS,
	getIconCSS,
	getIconHoverCSS,
	getListWrapperCSS,
	getListCSS,
	getMarkerCSS,
	getListTextCSS,
	getDividerWrapperCSS,
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
			'{{WRAPPER}}',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-list',
			getListCSS( attributes ),
			getListCSS( attributes, 'Tablet' ),
			getListCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-list__item-content',
			getListWrapperCSS( attributes ),
			getListWrapperCSS( attributes, 'Tablet' ),
			getListWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-list_item-content-divider',
			getDividerWrapperCSS( attributes ),
			getDividerWrapperCSS( attributes, 'Tablet' ),
			getDividerWrapperCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-list__item-content .ablocks-list__item-marker',
			getMarkerCSS( attributes, '' ),
			getMarkerCSS( attributes, 'Tablet' ),
			getMarkerCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-list__item-content .ablocks-svg-icon',
			getIconCSS( attributes ),
			getIconCSS( attributes, 'Tablet' ),
			getIconCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-list__item-content .ablocks-svg-icon:hover',
			getIconHoverCSS( attributes ),
			getIconHoverCSS( attributes, 'Tablet' ),
			getIconHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-list__item-content .ablocks-list__item-text',
			getListTextCSS( attributes ),
			getListTextCSS( attributes, 'Tablet' ),
			getListTextCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.lists.editorInlineCSS`,
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
