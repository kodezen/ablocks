import React, { useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';

import {
	getWrapperCSS,
	getDynamicTextCSS,
	getDynamicImageCSS,
} from './styling';
export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;

	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( { block_id: clientId } );
		}
	}, [ block_id, clientId ] );

	const generatedCSS = useMemo( () => {
		const css = new CSSGenerator( attributes, clientId );

		// Wrapper

		css.addClassStyles(
			'{{WRAPPER}} .dynami-text-output',
			getDynamicTextCSS( attributes ),
			getDynamicTextCSS( attributes, 'Tablet' ),
			getDynamicTextCSS( attributes, 'Mobile' )
		);

		css.addClassStyles(
			'{{WRAPPER}} .dynami-text-output a',
			getDynamicTextCSS( attributes ),
			getDynamicTextCSS( attributes, 'Tablet' ),
			getDynamicTextCSS( attributes, 'Mobile' )
		);

		return applyFilters(
			'ablocks.breadcrumb.inlineCSS',
			css.generateCSS(),
			attributes
		);
	}, [ attributes ] );

	return (
		<>
			{ isSelected && <Settings { ...props } /> }
			<style>{ generatedCSS }</style>
			<Render { ...props } />
		</>
	);
}
