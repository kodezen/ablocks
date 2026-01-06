import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getInputCSS,
	getButtonCSS,
	getButtonHoverCSS,
	getIconCSS,
	getSearchBarCSS,
	getSearchBarCSSHover,
	getSearchResultList,
	getSearchResultImage,
	getsearchResultHoverCSS,
	getSearchResultTitle,
	getLoadingSpinnerCss,
	getSearchResultItem,
	getsearchResultItemHoverCSS,
	getButtonBgCSS,
	getButtonBgHoverCSS,
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

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-form',
			getSearchBarCSS( attributes ),
			getSearchBarCSS( attributes, 'Tablet' ),
			getSearchBarCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-form:hover',
			getSearchBarCSSHover( attributes ),
			getSearchBarCSSHover( attributes, 'Tablet' ),
			getSearchBarCSSHover( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-input',
			getInputCSS( attributes ),
			getInputCSS( attributes, 'Tablet' ),
			getInputCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-input::placeholder',
			getInputCSS( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-button',
			getButtonBgCSS( attributes ),
			getButtonBgCSS( attributes, 'Tablet' ),
			getButtonBgCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-button:hover',
			getButtonBgHoverCSS( attributes ),
			getButtonBgHoverCSS( attributes, 'Tablet' ),
			getButtonBgHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-button > span',
			getButtonCSS( attributes ),
			getButtonCSS( attributes, 'Tablet' ),
			getButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-button:hover > span',
			getButtonHoverCSS( attributes ),
			getButtonHoverCSS( attributes, 'Tablet' ),
			getButtonHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-button > span > svg',
			getIconCSS( attributes ),
			getIconCSS( attributes, 'Tablet' ),
			getIconCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-result',
			getSearchResultList( attributes ),
			getSearchResultList( attributes, 'Tablet' ),
			getSearchResultList( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-result:hover',
			getsearchResultHoverCSS( attributes ),
			getsearchResultHoverCSS( attributes, 'Tablet' ),
			getsearchResultHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-result__list',
			getSearchResultItem( attributes ),
			getSearchResultItem( attributes, 'Tablet' ),
			getSearchResultItem( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-result__list:hover',
			getsearchResultItemHoverCSS( attributes ),
			getsearchResultItemHoverCSS( attributes, 'Tablet' ),
			getsearchResultItemHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--search-result__list-thumbnail',
			getSearchResultImage( attributes ),
			getSearchResultImage( attributes, 'Tablet' ),
			getSearchResultImage( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} a.ablocks-block--search-result__list-title',
			getSearchResultTitle( attributes ),
			getSearchResultTitle( attributes, 'Tablet' ),
			getSearchResultTitle( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-search-block__spin',
			getLoadingSpinnerCss( attributes ),
			getLoadingSpinnerCss( attributes, 'Tablet' ),
			getLoadingSpinnerCss( attributes, 'Mobile' )
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
