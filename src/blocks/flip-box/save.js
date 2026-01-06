import React from 'react';
import SaveContainer from '@Components/block-container/save';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import './style.css';
import classNames from 'classnames';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, flipDirection } = attributes;
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				className={ classNames(
					`ablocks-flipbox--transform-${ flipDirection }`
				) }
			>
				<InnerBlocks.Content />
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
