import React, { useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';

import {
	getLabelCSS,
	getTickerColorCSS,
	getTickerColorHoverCSS,
	getLabelHoverCSS,
	getTickerContentCSS,
	getTickerNavigatorShowCSS,
	getTickerListStylesCSS,
	getTickerNavigatorColorCSS,
	getShowTimeCSS,
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

	// Generate CSS
	const generatedCSS = useMemo( () => {
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
		} else if ( attributes?.blockVersion === 2 ) {
			cssGenerator = new CSSGenerator2( attributes, clientId );
		} else {
			cssGenerator = new CSSGenerator( attributes, clientId );
		}

		if ( cssGenerator === null ) {
			return '';
		}

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker__label',
			getLabelCSS( attributes ),
			getLabelCSS( attributes, 'Tablet' ),
			getLabelCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker__label:hover',
			getLabelHoverCSS( attributes ),
			getLabelHoverCSS( attributes, 'Tablet' ),
			getLabelHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker__marquee',
			getTickerColorCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker__marquee:hover',
			getTickerColorHoverCSS( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker',
			getTickerContentCSS( attributes ),
			getTickerContentCSS( attributes, 'Tablet' ),
			getTickerContentCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker--icons',
			getTickerNavigatorShowCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker--icons__prev',
			getTickerNavigatorColorCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker--icons__next',
			getTickerNavigatorColorCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker--icons__pause',
			getTickerNavigatorColorCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker__list',
			getTickerListStylesCSS( attributes ),
			getTickerListStylesCSS( attributes, 'Tablet' ),
			getTickerListStylesCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-news-ticker--date',
			getShowTimeCSS( attributes )
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
