import { useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	getBackCardCSS,
	getBackCardHoverCSS,
	getFlibBoxWrapperCSS,
	getFrontCardCSS,
	getFrontCardHoverCSS,
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
	const cssGenerator = new CSSGenerator( attributes, clientId );

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-flipbox__wrapper',
		getFlibBoxWrapperCSS( attributes ),
		getFlibBoxWrapperCSS( attributes, 'Tablet' ),
		getFlibBoxWrapperCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-flipbox__front > .ablocks-block-container',
		getFrontCardCSS( attributes ),
		getFrontCardCSS( attributes, 'Tablet' ),
		getFrontCardCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-flipbox__back >.ablocks-block-container',
		getBackCardCSS( attributes ),
		getBackCardCSS( attributes, 'Tablet' ),
		getBackCardCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-flipbox__front:hover > .ablocks-block-container',
		getFrontCardHoverCSS( attributes ),
		getFrontCardHoverCSS( attributes, 'Tablet' ),
		getFrontCardHoverCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-flipbox__back:hover > .ablocks-block-container',
		getBackCardHoverCSS( attributes ),
		getBackCardHoverCSS( attributes, 'Tablet' ),
		getBackCardHoverCSS( attributes, 'Mobile' )
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
