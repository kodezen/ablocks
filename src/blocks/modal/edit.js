import React, { useEffect, useMemo, useRef } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getPanelContentWrapCss,
	getPanelContentWrapHoverCss,
	getPanelMainWrapperCss,
	getPanelCloseButtonCss,
} from './styling';

export default function Edit( props ) {
	const modalStyleRef = useRef( null );
	const modalStyleEL = modalStyleRef?.current;

	const { isSelected, attributes, clientId, setAttributes } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
		if ( ! attributes?.blockVersion ) {
			setAttributes( { blockVersion: 2 } );
		}
	}, [ block_id, clientId ] );

	const {
		popupPosition,

		popupTopOffset,
		disableCloseButton,
		openPanel,

		closeBtnColor,
	} = attributes;

	useEffect( () => {
		document.body.classList.remove( 'ablocks-editor-modal-block-is-open' );
		document.body.classList.remove(
			'ablocks-editor-modal-block-is-currently-selected'
		);

		if ( 'open' === openPanel ) {
			document.body.classList.add( 'ablocks-editor-modal-block-is-open' );
		}
		if ( isSelected ) {
			document.body.classList.add(
				'ablocks-editor-modal-block-is-currently-selected'
			);
		}
		return () => {
			document?.body?.classList?.remove?.(
				'ablocks-editor-modal-block-is-open'
			);
			document?.body?.classList?.remove?.(
				'ablocks-editor-modal-block-is-currently-selected'
			);
		};
	}, [ openPanel, isSelected ] ); // eslint-disable-line react-hooks/exhaustive-deps

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
		if ( 'popup' === popupPosition && popupTopOffset ) {
			cssGenerator.addClassStyles(
				'{{WRAPPER}}.ablocks-block-modal-position--popup .ablocks-block-modal---panel-wrap .ablocks-modal-popup-content-wrap',
				{ 'margin-top': `${ popupTopOffset }px` }
			);
		}
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-modal---panel-wrap.ablocks-block-modal---panel-wrap',
			getPanelMainWrapperCss( attributes ),
			getPanelMainWrapperCss( attributes, 'Tablet' ),
			getPanelMainWrapperCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-modal---panel-wrap.ablocks-block-modal---panel-wrap .ablocks-modal-popup-content-wrap',
			getPanelContentWrapCss( attributes ),
			getPanelContentWrapCss( attributes, 'Tablet' ),
			getPanelContentWrapCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-modal---panel-wrap.ablocks-block-modal---panel-wrap .ablocks-modal-popup-content-wrap:hover',
			getPanelContentWrapHoverCss( attributes ),
			getPanelContentWrapHoverCss( attributes, 'Tablet' ),
			getPanelContentWrapHoverCss( attributes, 'Mobile' )
		);
		if ( ! disableCloseButton ) {
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-block-modal---panel-wrap.ablocks-block-modal---panel-wrap.ablocks-block-modal---panel-wrap.ablocks-block-modal---panel-wrap.ablocks-block-modal---panel-wrap .ablocks-modal-popup-close',
				getPanelCloseButtonCss( attributes ),
				getPanelCloseButtonCss( attributes, 'Tablet' ),
				getPanelCloseButtonCss( attributes, 'Mobile' )
			);

			if ( closeBtnColor ) {
				cssGenerator.addClassStyles(
					'{{WRAPPER}} .ablocks-block-modal---panel-wrap.ablocks-block-modal---panel-wrap .ablocks-modal-popup-close svg',
					{
						fill: closeBtnColor,
					}
				);
			}
		}
		return cssGenerator.generateCSS();
	}, [ attributes ] ); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<style ref={ modalStyleRef }>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
