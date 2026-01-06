import React from 'react';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import SaveContainer from '@Components/block-container/save2';
import classNames from 'classnames';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, contentPosition, arrowAlignment } = attributes;

	const blockClass = 'ablocks-block-content-timeline';

	const containerClassNames = classNames(
		blockClass,
		`${ blockClass }--outer-wrap`,
		`${ blockClass }--preview-mode-desktop`, // Assuming "preview-mode-desktop" should be used on the front-end as well
		`${ blockClass }--${ contentPosition }`
	);

	const lineClassNames = classNames( `${ blockClass }__line` );

	return (
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<div
				className={ containerClassNames }
				data-arrow-alignment={ arrowAlignment }
				data-animation-color={ attributes?.connectorAnimationColor }
				data-show-animation={ attributes?.showAnimation }
			>
				<InnerBlocks.Content />
				<div className={ lineClassNames }>
					<div className={ `${ blockClass }__line__inner` }></div>
				</div>
			</div>
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
