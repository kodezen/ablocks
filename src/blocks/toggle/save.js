import React from 'react';
import classNames from 'classnames';
import SaveContainer from '@Components/block-container/save2';
import metadata from './block.json';

const propTypes = {};

import { InnerBlocks } from '@wordpress/block-editor';
export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		isSwitch,
		leftLabel,
		rightLabel,
		toggleWidth,
		toggleHeight,
	} = attributes;
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div
					className="ablocks-toggle__topbar"
					style={ {
						'--ablocks-toggle-switch-width': `${ toggleWidth }px`,
						'--ablocks-toggle-switch-height': `${ toggleHeight }px`,
					} }
				>
					<div className="ablocks-toggle__topbar-wrapper">
						<div
							className={ classNames(
								'ablocks-toggle__label',
								'ablocks-toggle__label--left'
							) }
						>
							<span> { leftLabel } </span>
						</div>
						<label // eslint-disable-line
							className="ablocks-toggle__switch"
							htmlFor={ `switch-toggle-${ block_id }` }
						>
							<input
								id={ `switch-toggle-${ block_id }` }
								checked={ isSwitch }
								type="checkbox"
								className="ablocks-toggle__checkbox"
								aria-label={ `Toggle switch between ${ leftLabel } and ${ rightLabel }` }
							/>
							<span className="ablocks-toggle__slider ablocks-toggle__slider--round"></span>
						</label>
						<div className="ablocks-toggle__label ablocks-toggle__label--right">
							<span>{ rightLabel }</span>
						</div>
					</div>
				</div>
				<InnerBlocks.Content />
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
