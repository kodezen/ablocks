import React, { useEffect } from 'react';
import RenderContainer from '@Components/block-container/render'; // No Dom optimization needed
import metadata from './block.json';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { getRenderDomElement } from '@Utils/helper';
import classNames from 'classnames';
import { toggleClasses } from './helper';
import './styles.scss';

const propTypes = {};

export default function Render( props ) {
	const { attributes, clientId } = props;
	const { block_id, showSide, flipDirection } = attributes;

	const blockProps = useBlockProps( {
		className: 'ablocks-flipbox__wrapper',
	} );

	const Template = [
		[ 'ablocks/flip-box-child', { childId: 1 } ],
		[ 'ablocks/flip-box-child', { childId: 2 } ],
	];

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: Template,
		allowedBlocks: Template,
		templateLock: 'all',
	} );

	const innerBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);

	useEffect( () => {
		const element = getRenderDomElement( `.ablocks-block-${ block_id }` );
		if ( innerBlocks.length === 2 && element ) {
			const childElements = element.querySelectorAll(
				'.ablocks-block--flip-box-child'
			);
			if ( showSide === 'front' ) {
				toggleClasses( childElements, 0, 1 );
			} else {
				toggleClasses( childElements, 1, 0 );
			}
		}
	}, [ innerBlocks, showSide, block_id ] );

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				className={ classNames(
					`ablocks-flipbox--transform-${ flipDirection }`
				) }
			>
				<div { ...innerBlocksProps }></div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
