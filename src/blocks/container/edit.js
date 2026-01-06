import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useSelect } from '@wordpress/data';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import Settings from './settings';
import Render from './render';
import {
	getMainWrapperCss,
	getBlockContainerCSS,
	getInnerBlocksClosestParentCss,
	getRowColumnDisplayCss,
	getContainerShapeTopCSS,
	getContainerShapeBottomCSS,
	getContainerShapeTopSvgCSS,
	getContainerShapeBottomSvgCSS,
} from './styling';
import { VariationPicker } from './variationPicker';
export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { isRootContainer, containerWidthType, block_id } = attributes;

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

	const { hasChildBlocks, containerParents } = useSelect( ( select ) => {
		const coreBlockEditor = select( 'core/block-editor' );
		return {
			hasChildBlocks:
				coreBlockEditor?.getBlockOrder( clientId ).length > 0,
			containerParents: coreBlockEditor?.getBlockParentsByBlockName(
				clientId,
				'ablocks/container'
			),
			parentBlockId: coreBlockEditor?.getBlockParents( clientId )[ 0 ],
		};
	} );

	useEffect( () => {
		if ( containerParents?.length > 0 ) {
			setAttributes( {
				isRootContainer: false,
				containerWidthType: 'custom',
			} );
		} else {
			setAttributes( { isRootContainer: true } );
		}
	}, [ containerParents?.length ] ); // eslint-disable-line react-hooks/exhaustive-deps

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
			'{{WRAPPER}}.ablocks-block--container',
			getMainWrapperCss( attributes ),
			getMainWrapperCss( attributes, 'Tablet' ),
			getMainWrapperCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} > .ablocks-block-container',
			getBlockContainerCSS( attributes ),
			getBlockContainerCSS( attributes, 'Tablet' ),
			getBlockContainerCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} > .ablocks-block-container > .block-editor-inner-blocks > .block-editor-block-list__layout',
			getInnerBlocksClosestParentCss( attributes ),
			getInnerBlocksClosestParentCss( attributes, 'Tablet' ),
			getInnerBlocksClosestParentCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} > .ablocks-block-container > .block-editor-inner-blocks > .block-editor-block-list__layout > :not(.block-list-appender,.ablocks-block--container).wp-block',
			getRowColumnDisplayCss( attributes ),
			getRowColumnDisplayCss( attributes, 'Tablet' ),
			getRowColumnDisplayCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} > .ablocks-block-container >.ablocks-container-shape-top',
			getContainerShapeTopCSS( attributes ),
			getContainerShapeTopCSS( attributes, 'Tablet' ),
			getContainerShapeTopCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} > .ablocks-block-container >.ablocks-container-shape-bottom',
			getContainerShapeBottomCSS( attributes ),
			getContainerShapeBottomCSS( attributes, 'Tablet' ),
			getContainerShapeBottomCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} >  .ablocks-block-container > .ablocks-container-shape-top > svg',
			getContainerShapeTopSvgCSS( attributes ),
			getContainerShapeTopSvgCSS( attributes, 'Tablet' ),
			getContainerShapeTopSvgCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} >  .ablocks-block-container > .ablocks-container-shape-bottom > svg',
			getContainerShapeBottomSvgCSS( attributes ),
			getContainerShapeBottomSvgCSS( attributes, 'Tablet' ),
			getContainerShapeBottomSvgCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.container.editorInlineCSS`,
			null,
			attributes,
			cssGenerator
		);
		if ( editorInlineCSSExtend ) {
			return editorInlineCSSExtend;
		}
		return cssGenerator.generateCSS();
	}, [ attributes ] );

	if (
		! attributes.variationSelected &&
		containerParents?.length === 0 &&
		! hasChildBlocks
	) {
		return <VariationPicker { ...props } />;
	}

	const className = classNames( {
		'ablocks-block--container--is-root': isRootContainer,
		alignfull:
			isRootContainer &&
			( containerWidthType === 'full' || containerWidthType === 'boxed' ),
	} );

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render
				{ ...props }
				hasChildBlocks={ hasChildBlocks }
				className={ className }
			/>
		</>
	);
}
