import React, { useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';

import {
	getWrapperCSS,
	getBreadcrunbTitleCSS,
	getWrapperPositionCSS,
	getBreadcrunbHoverTitleCSS,
	getBreadcrunbNormalTitleCSS,
	getBreadcrunbSeparatorCSS,
	getBeforeTextImageCSS,
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
			'{{WRAPPER}} .ablocks-breadcrumbs',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);

		css.addClassStyles(
			'{{WRAPPER}} div.ablocks-breadcrumbs span',
			getWrapperPositionCSS( attributes ),
			getWrapperPositionCSS( attributes, 'Tablet' ),
			getBreadcrunbTitleCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} div.ablocks-breadcrumbs span a',
			getBreadcrunbNormalTitleCSS( attributes ),
			getBreadcrunbNormalTitleCSS( attributes, 'Tablet' ),
			getBreadcrunbNormalTitleCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} div.ablocks-breadcrumbs span a:hover',
			getBreadcrunbHoverTitleCSS( attributes ),
			getBreadcrunbHoverTitleCSS( attributes, 'Tablet' ),
			getBreadcrunbHoverTitleCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-breadcrumbs__item',
			getBreadcrunbTitleCSS( attributes ),
			getBreadcrunbTitleCSS( attributes, 'Tablet' ),
			getBreadcrunbTitleCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-breadcrumbs__separator',
			getBreadcrunbSeparatorCSS( attributes ),
			getBreadcrunbSeparatorCSS( attributes, 'Tablet' ),
			getBreadcrunbSeparatorCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-breadcrumbs___before-image',
			getBeforeTextImageCSS( attributes ),
			getBeforeTextImageCSS( attributes, 'Tablet' ),
			getBeforeTextImageCSS( attributes, 'Mobile' )
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
