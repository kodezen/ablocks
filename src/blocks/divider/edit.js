import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getWrapperCSS as getIconWrapperCSS,
	getWrapperHoverCSS as getIconWrapperHoverCSS,
	getElementCSS as getIconElementCSS,
	getElementImageCSS as getIconElementImageCSS,
	getElementImageHoverCSS,
} from '@Controls/icon-upload/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getWrapperCSS,
	getDividerElementTextCSS,
	getDividerContainerCSS,
	getDividerCSS,
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
			'{{WRAPPER}}',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container',
			getDividerContainerCSS( attributes ),
			getDividerContainerCSS( attributes, 'Tablet' ),
			getDividerContainerCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-divider',
			getDividerCSS( attributes ),
			getDividerCSS( attributes, 'Tablet' ),
			getDividerCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-divider__element-text',
			getDividerElementTextCSS( attributes ),
			getDividerElementTextCSS( attributes, 'Tablet' ),
			getDividerElementTextCSS( attributes, 'Mobile' )
		);

		// element icon css
		const marginLeft = {
			...getRangeCSS( {
				attributeValue: attributes?.elementIconSpacing,
				attributeObjectKey: 'value',
				isResponsive: true,
				property: 'margin-left',
				hasUnit: true,
				defaultValue: 0,
				unitDefaultValue: 'px',
			} ),
		};
		const marginRight = {
			...getRangeCSS( {
				attributeValue: attributes?.elementIconSpacing,
				attributeObjectKey: 'value',
				isResponsive: true,
				property: 'margin-right',
				hasUnit: true,
				defaultValue: 0,
				unitDefaultValue: 'px',
			} ),
		};
		const dividerElementIconWrapperStyles = {
			...getIconWrapperCSS( attributes ),
			...marginLeft,
			...marginRight,
		};
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-divider__element-icon .ablocks-icon-wrap',
			dividerElementIconWrapperStyles,
			getIconWrapperCSS( attributes, 'Tablet' ),
			getIconWrapperCSS( attributes, 'Mobile' )
		);
		const dividerElementIconWrapperHoverStyles = {
			...getIconWrapperHoverCSS( attributes ),
			...marginLeft,
			...marginRight,
		};
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-divider__element-icon .ablocks-icon-wrap:hover',
			dividerElementIconWrapperHoverStyles,
			getIconWrapperHoverCSS( attributes, 'Tablet' ),
			getIconWrapperHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-divider__element-icon .ablocks-icon-wrap img.ablocks-image-icon',
			getIconElementImageCSS( attributes ),
			getIconElementImageCSS( attributes, 'Tablet' ),
			getIconElementImageCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-divider__element-icon .ablocks-icon-wrap img.ablocks-image-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-divider__element-icon .ablocks-icon-wrap svg.ablocks-svg-icon',
			getIconElementCSS( attributes ),
			getIconElementCSS( attributes, 'Tablet' ),
			getIconElementCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-divider__element-icon .ablocks-icon-wrap svg.ablocks-svg-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.divider.editorInlineCSS`,
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
