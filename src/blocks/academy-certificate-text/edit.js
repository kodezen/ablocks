import { useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { getWrapperCSS, getHeadingTextCSS } from './styling';

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
		'{{WRAPPER}}',
		getWrapperCSS( attributes ),
		getWrapperCSS( attributes, 'Tablet' ),
		getWrapperCSS( attributes, 'Mobile' )
	);

	const desktopHeadingTextStyles = getHeadingTextCSS( attributes );
	if ( attributes?.textColor ) {
		desktopHeadingTextStyles.color = attributes.textColor;
	}
	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-block--certificate__heading-text',
		desktopHeadingTextStyles,
		getHeadingTextCSS( attributes, 'Tablet' ),
		getHeadingTextCSS( attributes, 'Mobile' )
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
