import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import Render from './render';
import {
	getOrderDetalisCSS,
	getOrderDetalisHoverCSS,
	getOrderDetalisImageCSS,
	getOrderDetalisPoductTitleCSS,
	getOrderDetalisPoductTitleHoverCSS,
	getOrderDetalisPriceCSS,
	getOrderDetalisRegularPriceCSS,
	getTableTextCSS,
	getOrderDetalisQualityCSS,
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

		// Create appropriate CSS generator instance based on blockVersion
		if ( attributes?.blockVersion === 2 ) {
			cssGenerator = new CSSGenerator2( attributes, clientId );
		} else {
			cssGenerator = new CSSGenerator( attributes, clientId );
		}

		if ( ! cssGenerator ) {
			return '';
		}

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-order-details-shortcode .storeengine-order-item__content .storeengine-order-item__title p',
			getOrderDetalisCSS( attributes ),
			getOrderDetalisCSS( attributes, 'Tablet' ),
			getOrderDetalisCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-order-details-shortcode .storeengine-order-item__content .storeengine-order-item__title p:hover',
			getOrderDetalisHoverCSS( attributes ),
			getOrderDetalisHoverCSS( attributes, 'Tablet' ),
			getOrderDetalisHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-order-details-shortcode .storeengine-order-item__content img',
			getOrderDetalisImageCSS( attributes ),
			getOrderDetalisImageCSS( attributes, 'Tablet' ),
			getOrderDetalisImageCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-order-details-shortcode .storeengine-order-item__content .storeengine-order-item__title h6',
			getOrderDetalisPoductTitleCSS( attributes ),
			getOrderDetalisPoductTitleCSS( attributes, 'Tablet' ),
			getOrderDetalisPoductTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-order-details-shortcode .storeengine-order-item__content .storeengine-order-item__title h6:hover',
			getOrderDetalisPoductTitleHoverCSS( attributes ),
			getOrderDetalisPoductTitleHoverCSS( attributes, 'Tablet' ),
			getOrderDetalisPoductTitleHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-order-details-shortcode .storeengine-order-item__price',
			getOrderDetalisPriceCSS( attributes ),
			getOrderDetalisPriceCSS( attributes, 'Tablet' ),
			getOrderDetalisPriceCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-order-summary-shortcode .storeengine-order-summary__item .storeengine-order-item-entry-right .storeengine-order-item__price .storeengine-order-item__price-regular',
			getOrderDetalisRegularPriceCSS( attributes ),
			getOrderDetalisRegularPriceCSS( attributes, 'Tablet' ),
			getOrderDetalisRegularPriceCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-order-details-shortcode .storeengine-order-item__content .storeengine-order-item__title p,
			 {{WRAPPER}} .storeengine-order-details-shortcode .storeengine-order-item__content .storeengine-order-item__title p span`,
			getOrderDetalisQualityCSS( attributes ),
			getOrderDetalisQualityCSS( attributes, 'Tablet' ),
			getOrderDetalisQualityCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-order-details-shortcode .storeengine-thankyou-summery--item p,
			 {{WRAPPER}} .storeengine-order-details-shortcode .storeengine-thankyou-summery--item p span`,
			getTableTextCSS( attributes ),
			getTableTextCSS( attributes, 'Tablet' ),
			getTableTextCSS( attributes, 'Mobile' )
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
