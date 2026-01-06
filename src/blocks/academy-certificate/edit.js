import React, { useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';

import {
	getCertificateBGImage,
	getInnerBlockCss,
	getWrapperSzie,
} from './styling';

import './editor.scss';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { pageOrientation, imageOptions, backgroundImage, block_id } =
		attributes;

	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
	}, [ block_id, clientId ] );

	useEffect( () => {
		if ( window.ABlocksGlobal && window.ABlocksGlobal.certificate_image ) {
			const certImages = window.ABlocksGlobal.certificate_image;

			let options = [];
			if ( pageOrientation === 'L' ) {
				options = Object.keys( certImages.landscape ).map(
					( key ) => ( {
						label: key,
						value: certImages.landscape[ key ],
					} )
				);
			} else {
				options = Object.keys( certImages.protrait ).map( ( key ) => ( {
					label: key,
					value: certImages.protrait[ key ],
				} ) );
			}

			setAttributes( { imageOptions: options } );
		}
	}, [ backgroundImage, pageOrientation ] );

	useEffect( () => {
		if ( ! backgroundImage && imageOptions.length > 0 ) {
			setAttributes( { backgroundImage: imageOptions[ 0 ].value } );
		}
	}, [ imageOptions, backgroundImage ] );
	// Generate CSS
	const cssGenerator = new CSSGenerator( attributes, clientId );

	cssGenerator.addClassStyles(
		`{{WRAPPER}}`,
		getWrapperSzie( attributes ),
		getWrapperSzie( attributes, 'Tablet' ),
		getWrapperSzie( attributes, 'Mobile' )
	);
	cssGenerator.addClassStyles(
		`{{WRAPPER}} .ablocks-block--certificate__background-image`,
		getCertificateBGImage( attributes ),
		getCertificateBGImage( attributes, 'Tablet' ),
		getCertificateBGImage( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-block--certificate__background-image-inner-block',
		getInnerBlockCss( attributes ),
		getInnerBlockCss( attributes, 'Tablet' ),
		getInnerBlockCss( attributes, 'Mobile' )
	);

	const generatedCSS = cssGenerator.generateCSS();
	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
