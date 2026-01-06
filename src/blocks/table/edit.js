import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getRowOddCSS,
	getRowOddHoverCSS,
	getRowEvenCSS,
	getRowEvenHoverCSS,
	getTableBorder,
	getTableBorderHover,
	getBodyCSS,
	getBodyHoverCSS,
	getHeaderCSS,
	getHeaderHoverCSS,
	getFooterCSS,
	getFooterHoverCSS,
	getTableCSS,
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
			'{{WRAPPER}}.ablocks-block--table table',
			getTableCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--table table, {{WRAPPER}}.ablocks-block--table-header .ablocks-block--table-cell , {{WRAPPER}}.ablocks-block--table .ablocks-block--table-cell',
			getTableBorder( attributes ),
			getTableBorder( attributes, 'Tablet' ),
			getTableBorder( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--table table:hover, {{WRAPPER}}.ablocks-block--table-header .ablocks-block--table-cell:hover, {{WRAPPER}}.ablocks-block--table .ablocks-block--table-cell:hover',
			getTableBorderHover( attributes ),
			getTableBorderHover( attributes, 'Tablet' ),
			getTableBorderHover( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--table-body .ablocks-table-row--odd',
			getRowOddCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--table-body .ablocks-table-row--odd:hover',
			getRowOddHoverCSS( attributes )
		);

		// Even row color
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--table-body .ablocks-table-row--even',
			getRowEvenCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--table-body .ablocks-table-row--even:hover',
			getRowEvenHoverCSS( attributes )
		);
		// table header
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--table .ablocks-block--table-header',
			getHeaderCSS( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--table .ablocks-block--table-header:hover',

			getHeaderHoverCSS( attributes )
		);

		// table body
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container .ablocks-block--table-body',
			getBodyCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container .ablocks-block--table-body:hover',
			getBodyHoverCSS( attributes )
		);
		// table footer
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--table .ablocks-block--table-footer',
			getFooterCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--table .ablocks-block--table-footer:hover',
			getFooterHoverCSS( attributes )
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
