import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getItemTextCSS,
	getShareCSS,
	getShareIconCSS,
	getSharesBarCSS,
	getSocialHoverCSS,
	getShareItemIconCSS,
	getItemBorderCSS,
	getItemBorderHoverCSS,
	shareItemIconSVG,
	getShareIconHoverCSS,
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
			'{{WRAPPER}}.ablocks-block--social-shares .ablocks-block-container',
			getShareCSS( attributes ),
			getShareCSS( attributes, 'Tablet' ),
			getShareCSS( attributes, 'Mobile' )
		);
		// social button hover color
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-social-share',
			getSharesBarCSS( attributes ),
			getSharesBarCSS( attributes, 'Table' ),
			getSharesBarCSS( attributes, 'Mobile' )
		);
		// Generate button hover CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-social-share:hover',

			getSocialHoverCSS( attributes ),
			getSocialHoverCSS( attributes, 'Table' ),
			getSocialHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-social-share > .ablocks-svg-icon',
			getShareIconCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-social-share > .ablocks-svg-icon:hover',
			getShareIconHoverCSS( attributes )
		);
		// share item
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-social-share-item',
			getItemBorderCSS( attributes ),
			getItemBorderCSS( attributes, 'Tablet' ),
			getItemBorderCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-social-share-item:hover',
			getItemBorderHoverCSS( attributes ),
			getItemBorderHoverCSS( attributes, 'Tablet' ),
			getItemBorderHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-social-share-item--icon',
			getShareItemIconCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-social-share-item--icon>.ablocks-svg-icon',
			shareItemIconSVG( attributes ),
			shareItemIconSVG( attributes, 'Tablet' ),
			shareItemIconSVG( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-social-share-item--text',
			getItemTextCSS( attributes ),
			getItemTextCSS( attributes, 'Tablet' ),
			getItemTextCSS( attributes, 'Mobile' )
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
