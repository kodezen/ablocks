import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getLogOutLabelColorCSS,
	getLogOutCSS,
	getAvatarCSS,
	getNameCSS,
	getAvatarBorderCSS,
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
			'{{WRAPPER}} .ablocks-block-log-out__label',
			getLogOutLabelColorCSS( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-logout',
			getLogOutCSS( attributes ),
			getLogOutCSS( attributes, 'Tablet' ),
			getLogOutCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-log-out__name',
			getNameCSS( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-log-out__avatar',
			getAvatarCSS( attributes ),
			getAvatarCSS( attributes, 'Tablet' ),
			getAvatarCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-log-out__avatar:hover',
			getAvatarBorderCSS( attributes ),
			getAvatarBorderCSS( attributes, 'Tablet' ),
			getAvatarBorderCSS( attributes, 'Mobile' )
		);

		return cssGenerator.generateCSS();
	}, [ attributes, clientId ] );

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
