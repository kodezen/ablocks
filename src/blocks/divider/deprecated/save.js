import React from 'react';
import classNames from 'classnames';
import SaveContainer from '@Components/block-container/save';
import RenderIcon from '@Controls/icon-upload/render-icon';
const propTypes = {};

import metadata from './block.json';
import '../style.css';

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		dividerPatternUrl,
		dividerType,
		element,
		elementText,
		size,
		color,
		weight,
		elementIconPosition,
		elementTextPosition,
	} = attributes;

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ dividerType === 'mask-style' ? (
					<>
						{ element === 'none' && (
							<div
								className=" ablocks-divider ablocks-divider__pattern-mask "
								style={ {
									'--ablocks-divider-pattern-url': `url(${ dividerPatternUrl })`,
									'--ablocks-divider-pattern-height': `${ size }px`,
									'--ablocks-divider-pattern-color': color,
								} }
							></div>
						) }
						{ element === 'text' && (
							<div
								className={ classNames(
									'ablocks-divider',
									`ablocks-divider__pattern-mask-element-text--${ elementTextPosition }`
								) }
								style={ {
									'--ablocks-divider-pattern-url': `url(${ dividerPatternUrl })`,
									'--ablocks-divider-pattern-height': `${ size }px`,
									'--ablocks-divider-pattern-color': color,
								} }
							>
								<span className="ablocks-divider__element-text">
									{ elementText }
								</span>
							</div>
						) }
						{ element === 'icon' && (
							<div
								className={ classNames(
									'ablocks-divider',
									`ablocks-divider__pattern-mask-element-icon--${ elementIconPosition }`
								) }
								style={ {
									'--ablocks-divider-pattern-url': `url(${ dividerPatternUrl })`,
									'--ablocks-divider-pattern-height': `${ size }px`,
									'--ablocks-divider-pattern-color': color,
								} }
							>
								<div className="ablocks-divider__element-icon">
									<RenderIcon attributes={ attributes } />
								</div>
							</div>
						) }
					</>
				) : (
					<>
						{ element === 'none' && (
							<div
								className=" ablocks-divider ablocks-divider__pattern-css "
								style={ {
									'--ablocks-divider-pattern-style':
										dividerPatternUrl,
									'--ablocks-divider-pattern-weight': `${ weight }px`,
									'--ablocks-divider-pattern-color': color,
								} }
							></div>
						) }
						{ element === 'text' && (
							<div
								className={ classNames(
									'ablocks-divider',
									`ablocks-divider__pattern-css-element-text--${ elementTextPosition }`
								) }
								style={ {
									'--ablocks-divider-pattern-style':
										dividerPatternUrl,
									'--ablocks-divider-pattern-weight': `${ weight }px`,
									'--ablocks-divider-pattern-color': color,
								} }
							>
								<span className="ablocks-divider__element-text">
									{ elementText }
								</span>
							</div>
						) }
						{ element === 'icon' && (
							<div
								className={ classNames(
									'ablocks-divider',
									`ablocks-divider__pattern-css-element-icon--${ elementIconPosition }`
								) }
								style={ {
									'--ablocks-divider-pattern-style':
										dividerPatternUrl,
									'--ablocks-divider-pattern-weight': `${ weight }px`,
									'--ablocks-divider-pattern-color': color,
								} }
							>
								<div className="ablocks-divider__element-icon">
									<RenderIcon attributes={ attributes } />
								</div>
							</div>
						) }
					</>
				) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
