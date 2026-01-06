import React from 'react';
import classNames from 'classnames';
import RenderContainer from '@Components/block-container/render2';
import RenderIcon from '@Controls/icon-upload/render-icon';
import metadata from './block.json';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

import './style.css';
const propTypes = {};
import { BlockControls } from '@wordpress/block-editor';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		dividerPatternUrl,
		dividerType,
		element,
		elementText,
		size,
		weight,
		elementIconPosition,
		elementTextPosition,
		alignment,
	} = attributes;
	const { isDynamicEnabled, data: dynamicElementText } = useDynamicData( {
		attributeValue: elementText,
	} );
	return (
		<React.Fragment>
			<BlockControls>
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
				/>
			</BlockControls>
			<RenderContainer
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
									'--ablocks-divider-pattern-color':
										getTextColorCSS( attributes?.color ),
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
									'--ablocks-divider-pattern-color':
										getTextColorCSS( attributes?.color ),
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
									'--ablocks-divider-pattern-color':
										getTextColorCSS( attributes?.color ),
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
									'--ablocks-divider-pattern-color':
										getTextColorCSS( attributes?.color ),
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
									'--ablocks-divider-pattern-color':
										getTextColorCSS( attributes?.color ),
								} }
							>
								<span className="ablocks-divider__element-text">
									{ isDynamicEnabled
										? dynamicElementText
										: elementText }
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
									'--ablocks-divider-pattern-color':
										getTextColorCSS( attributes?.color ),
								} }
							>
								<div className="ablocks-divider__element-icon">
									<RenderIcon attributes={ attributes } />
								</div>
							</div>
						) }
					</>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
