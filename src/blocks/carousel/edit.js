import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getCarouselCSS,
	getNavigationButtonCSS,
	getNavigationIconCSS,
	getNavigationIconSvgCSS,
	getNavigationIconSvgHoverCSS,
	getNavigationPrevButtonCSS,
	getNavigationNextButtonCSS,
	getPaginationParentCSS,
	getPaginationCSS,
	getPaginationHoverCSS,
	getPaginationActiveCSS,
	getPaginationActiveHoverCSS,
} from './styling';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, isSelected } = props;
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

	// Temporary approch instead of attribute migration. Might remove it in future
	useEffect( () => {
		if (
			! attributes?.verticalAlign ||
			( attributes?.verticalAlignment !== '' &&
				attributes?.verticalAlign?.value !==
					attributes?.verticalAlignment )
		) {
			const tempVerticalAlign = {
				value: attributes?.verticalAlignment || '',
				valueTablet: '',
				valueMobile: '',
			};
			setAttributes( {
				verticalAlign: tempVerticalAlign,
				verticalAlignment: '',
			} );
		}
	}, [] );
	// Temporary approch instead of attribute migration. Might remove it in future

	// Generate CSS
	const generatedCSS = useMemo( () => {
		if ( ! attributes?.verticalAlign ) {
			return '';
		}
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
			'{{WRAPPER}} .ablocks-carousel-swiper .swiper-wrapper  ',
			getCarouselCSS( attributes ),
			getCarouselCSS( attributes, 'Tablet' ),
			getCarouselCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-carousel-navigation__button',
			getNavigationButtonCSS( attributes ),
			getNavigationButtonCSS( attributes, 'Tablet' ),
			getNavigationButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-carousel-navigation__button--next',
			getNavigationNextButtonCSS( attributes ),
			getNavigationNextButtonCSS( attributes, 'Tablet' ),
			getNavigationNextButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-carousel-navigation__button--prev',
			getNavigationPrevButtonCSS( attributes ),
			getNavigationPrevButtonCSS( attributes, 'Tablet' ),
			getNavigationPrevButtonCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-carousel-navigation__button .ablocks-icon-wrap',
			getNavigationIconCSS( attributes ),
			getNavigationIconCSS( attributes, 'Tablet' ),
			getNavigationIconCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-carousel-pagination',
			getPaginationParentCSS( attributes ),
			getPaginationParentCSS( attributes, 'Tablet' ),
			getPaginationParentCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .swiper-pagination-bullet.swiper-pagination-bullet-active',
			getPaginationActiveCSS( attributes ),
			getPaginationActiveCSS( attributes, 'Tablet' ),
			getPaginationActiveCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .swiper-pagination-bullet.swiper-pagination-bullet-active:hover',
			getPaginationActiveHoverCSS( attributes ),
			getPaginationActiveHoverCSS( attributes, 'Tablet' ),
			getPaginationActiveHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .swiper-pagination-bullet',
			getPaginationCSS( attributes ),
			getPaginationCSS( attributes, 'Tablet' ),
			getPaginationCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .swiper-pagination-bullet:hover',
			getPaginationHoverCSS( attributes ),
			getPaginationHoverCSS( attributes, 'Tablet' ),
			getPaginationHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-carousel-navigation__button .ablocks-svg-icon',
			getNavigationIconSvgCSS( attributes ),
			getNavigationIconSvgCSS( attributes, 'Tablet' ),
			getNavigationIconSvgCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-carousel-navigation__button .ablocks-svg-icon:hover',
			getNavigationIconSvgHoverCSS( attributes ),
			getNavigationIconSvgHoverCSS( attributes, 'Tablet' ),
			getNavigationIconSvgHoverCSS( attributes, 'Mobile' )
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
