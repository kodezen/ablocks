import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getActiveContentCSS,
	getActiveContentHoverCSS,
	getPinCSS,
	getPinEffectCSS,
	getPinHoverCSS,
	getPinHoverEffectCSS,
	getTooltipContentCSS,
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
			'{{WRAPPER}} .ablocks-image-hotspot__pin:after',
			{
				animation: attributes.animationType,
			}
		);

		attributes.lists.forEach( ( list ) => {
			cssGenerator.addClassStyles(
				`{{WRAPPER}} .ablocks-image-hotspot-list-${ list.id }`,
				getPinCSS( list, attributes )
			);

			cssGenerator.addClassStyles(
				`{{WRAPPER}} .ablocks-image-hotspot-list-${ list.id }:after`,
				getPinEffectCSS( list, attributes )
			);

			cssGenerator.addClassStyles(
				`{{WRAPPER}} .ablocks-image-hotspot-list-${ list.id }:hover`,
				getPinHoverCSS( list, attributes )
			);

			cssGenerator.addClassStyles(
				`{{WRAPPER}} .ablocks-image-hotspot-list-${ list.id }:hover:after`,
				getPinHoverEffectCSS( list, attributes )
			);
		} );

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-image-hotspot__tooltip-content',
			getTooltipContentCSS( attributes ),
			getTooltipContentCSS( attributes, 'Tablet' ),
			getTooltipContentCSS( attributes, 'Mobile' )
		);

		// child
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-image-hotspot__tooltip--active',
			getActiveContentCSS( attributes ),
			getActiveContentCSS( attributes, 'Tablet' ),
			getActiveContentCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-image-hotspot__tooltip--active:hover',
			getActiveContentHoverCSS( attributes ),
			getActiveContentHoverCSS( attributes, 'Tablet' ),
			getActiveContentHoverCSS( attributes, 'Mobile' )
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
