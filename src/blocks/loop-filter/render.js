import React, { useState, useEffect } from 'react';
import metadata from './block.json';
import RenderChildContainer from '@Components/block-container/childRender';
import { __ } from '@wordpress/i18n';

const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes } = props;
	const { block_id, taxonomy_term_items } = attributes;

	const [ selectedTerm, setSelectedTerm ] = useState( '*' );

	useEffect( () => {
		if ( taxonomy_term_items?.length ) {
			const hasAll = taxonomy_term_items.find(
				( term ) => term.value === '*'
			);
			if ( hasAll ) {
				setSelectedTerm( '*' );
			} else {
				setSelectedTerm( taxonomy_term_items[ 0 ]?.value );
			}
		}
	}, [ taxonomy_term_items ] );

	const handleTermClick = ( term ) => {
		setSelectedTerm( term.value );
	};

	return (
		<React.Fragment>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ taxonomy_term_items.length > 0 ? (
					taxonomy_term_items.map( ( term, index ) => {
						const isActive = selectedTerm === term.value;

						return (
							<span
								key={ `${ block_id }-term-${ index }` }
								className={ `ablocks-loop-term-filter${
									isActive
										? ' ablocks-loop-term-filter--active'
										: ''
								}` }
								data-term={ term.value }
								onClick={ () => handleTermClick( term ) }
							>
								{ term.label }
							</span>
						);
					} )
				) : (
					<p>{ __( 'No Filter Selected', 'ablocks' ) }</p>
				) }
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
