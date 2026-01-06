import { useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { getVerificationIDCss } from './styling';
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
	const cssGenerator = new CSSGenerator( attributes, clientId );
	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-block--certificate__verification-id',
		getVerificationIDCss( attributes ),
		getVerificationIDCss( attributes, 'Tablet' ),
		getVerificationIDCss( attributes, 'Mobile' )
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
