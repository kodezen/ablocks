import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useSelect } from '@wordpress/data';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';
import Settings from './settings';
import Render from './render';
import { VariationPicker } from './variationPicker';
import { getWrapperCSS } from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id, variationSelected } = attributes;

	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( { block_id: clientId } );
		}
	}, [ block_id, clientId, setAttributes ] );

	const { hasChildBlocks } = useSelect(
		( select ) => {
			const coreBlockEditor = select( 'core/block-editor' );
			return {
				hasChildBlocks:
					coreBlockEditor?.getBlockOrder( clientId ).length > 0,
			};
		},
		[ clientId ]
	);

	const generatedCSS = useMemo( () => {
		if ( ! variationSelected && ! hasChildBlocks ) {
			return '';
		}

		const css = new CSSGenerator( attributes, clientId );
		css.addClassStyles(
			'{{WRAPPER}} .academy-inner-container > div > div > .block-editor-block-list__block',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);

		return applyFilters(
			'ablocks.academy-container.inlineCSS',
			css.generateCSS(),
			attributes
		);
	}, [ attributes, clientId, variationSelected, hasChildBlocks ] );

	if ( ! variationSelected && ! hasChildBlocks ) {
		return <VariationPicker { ...props } />;
	}

	const className = classNames( 'ablocks-block--academy-container' );

	return (
		<>
			{ isSelected && <Settings { ...props } /> }
			{ generatedCSS && <style>{ generatedCSS }</style> }
			<Render { ...props } className={ className } />
		</>
	);
}
