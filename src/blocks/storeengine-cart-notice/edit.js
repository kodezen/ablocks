import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import Render from './render';
import {
	getNoticeCSS,
	getNoticeMassageCSS,
	getNoticeLinkCSS,
	getNoticeWrapperCSS,
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
			`{{WRAPPER}} .storeengine-notice--info`,
			getNoticeCSS( attributes ),
			getNoticeCSS( attributes, 'Tablet' ),
			getNoticeCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-notice .storeengine-notice--message p,
			{{WRAPPER}} .storeengine-notice .storeengine-notice--message i`,
			getNoticeMassageCSS( attributes ),
			getNoticeMassageCSS( attributes, 'Tablet' ),
			getNoticeMassageCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-notice a,
			{{WRAPPER}} .storeengine-notice button`,
			getNoticeLinkCSS( attributes ),
			getNoticeLinkCSS( attributes, 'Tablet' ),
			getNoticeLinkCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}}.ablocks-block--storeengine-cart-notice:not(.ablocks-block-container),
			{{WRAPPER}}.ablocks-block--storeengine-cart-notice .ablocks-block-container`,
			getNoticeWrapperCSS( attributes ),
			getNoticeWrapperCSS( attributes, 'Tablet' ),
			getNoticeWrapperCSS( attributes, 'Mobile' )
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
