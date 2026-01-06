import { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import Render from './render';
import {
	getFeedbackSectionCSS,
	getHeaddingCSS,
	getAvarageCSS,
	getRatingCSS,
	getReviewTextCSS,
	getRatingFillCSS,
	getRatingTextCSS,
	getFeedbackStarCSS,
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
			`{{WRAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings`,
			getFeedbackSectionCSS( attributes ),
			getFeedbackSectionCSS( attributes, 'Tablet' ),
			getFeedbackSectionCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product__content-item h2`,
			getHeaddingCSS( attributes ),
			getHeaddingCSS( attributes, 'Tablet' ),
			getHeaddingCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings .storeengine-avg-rating`,
			getAvarageCSS( attributes ),
			getAvarageCSS( attributes, 'Tablet' ),
			getAvarageCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings .storeengine-avg-rating-html .storeengine-icon`,
			getRatingCSS( attributes ),
			getRatingCSS( attributes, 'Tablet' ),
			getRatingCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings .storeengine-avg-review`,
			getReviewTextCSS( attributes ),
			getReviewTextCSS( attributes, 'Tablet' ),
			getReviewTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings .storeengine-ratings-list-item .storeengine-ratings-list-item-fill`,
			getRatingFillCSS( attributes ),
			getRatingFillCSS( attributes, 'Tablet' ),
			getRatingFillCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings .storeengine-ratings-list-item .storeengine-ratings-list-item-fill,
			{{WEAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings .storeengine-ratings-list-item .storeengine-ratings-list-item-label span,
			{{WRAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings .storeengine-ratings-list-item .storeengine-ratings-list-item-label,
			{{WRAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings .storeengine-ratings-list-item .storeengine-ratings-list-item-col`,
			getRatingTextCSS( attributes ),
			getRatingTextCSS( attributes, 'Tablet' ),
			getRatingTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product__content-item--feedback .storeengine-product-feedback-ratings .storeengine-ratings-list-item .storeengine-icon`,
			getFeedbackStarCSS( attributes ),
			getFeedbackStarCSS( attributes, 'Tablet' ),
			getFeedbackStarCSS( attributes, 'Mobile' )
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
