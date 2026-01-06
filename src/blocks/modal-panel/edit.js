import React, { useMemo, useEffect } from 'react';
import { useSelect } from '@wordpress/data';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';

export default function Edit( props ) {
	const { isSelected, attributes, clientId, setAttributes } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
	}, [ block_id, clientId ] );
	const { noCloseButton } = attributes;

	const { disableCloseButton, parentModalId } = useSelect(
		( select ) => {
			const { getBlockParentsByBlockName, getBlock } =
				select( 'core/block-editor' );
			// eslint-disable-next-line no-shadow
			const parentModalId = getBlockParentsByBlockName(
				clientId,
				'ablocks/modal'
			)[ 0 ];

			// eslint-disable-next-line no-shadow
			const { disableCloseButton } = parentModalId
				? getBlock( parentModalId ).attributes
				: {};
			return {
				disableCloseButton,
				parentModalId,
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		if (
			disableCloseButton !== undefined &&
			disableCloseButton !== noCloseButton
		) {
			setAttributes( { noCloseButton: disableCloseButton } );
		}
	}, [ disableCloseButton ] ); // eslint-disable-line react-hooks/exhaustive-deps

	// Generate CSS
	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );
		return cssGenerator.generateCSS();
	}, [ attributes ] ); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render parentModalId={ parentModalId } { ...props } />
		</>
	);
}
