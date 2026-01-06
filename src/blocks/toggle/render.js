import React, { useEffect } from 'react';
import classNames from 'classnames';
import RenderContainer from '@Components/block-container/render2';
import metadata from './block.json';
import { getRenderDomElement } from '@Utils/helper';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';

const propTypes = {};
export default function Render( props ) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		block_id,
		isSwitch,
		leftLabel,
		rightLabel,
		toggleWidth,
		toggleHeight,
	} = attributes;
	// dynamic content issue solve here
	const {
		isDynamicEnabled: isDynamicLeftLabelEnabled,
		data: dynamicLeftLabel,
	} = useDynamicData( {
		attributeValue: leftLabel,
	} );
	const {
		isDynamicEnabled: isDynamicRightLabelEnabled,
		data: dynamicRightLabel,
	} = useDynamicData( {
		attributeValue: rightLabel,
	} );
	// dynamic content issue solve here

	const blockProps = useBlockProps();
	const Template = [ [ 'ablocks/toggle-child' ], [ 'ablocks/toggle-child' ] ];
	// innner block props
	const { innerBlocksProps, children } = useInnerBlocksProps( blockProps, {
		template: Template,
		allowedBlocks: Template,
		renderAppender: false,
	} );

	const innerBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);
	useEffect( () => {
		const element = getRenderDomElement( `.ablocks-block-${ block_id }` );
		if ( innerBlocks.length === 2 ) {
			if ( element !== null ) {
				const childElements = element.querySelectorAll(
					'.ablocks-toggle__child'
				);
				if ( ! isSwitch ) {
					childElements[ 0 ].style.display = 'block';
					childElements[ 1 ].style.display = 'none';
				} else {
					childElements[ 1 ].style.display = 'block';
					childElements[ 0 ].style.display = 'none';
				}
			}
		}
	}, [ innerBlocks, isSelected, isSwitch, block_id ] );
	const handleSwitchToggle = ( event ) =>
		setAttributes( { isSwitch: event.target.checked } );

	return (
		<React.Fragment>
			<RenderContainer
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
								'ablocks-toggle__label--left',
								{
									'ablocks-toggle__label--active': ! isSwitch,
								}
							) }
						>
							<span>
								{ ' ' }
								{ isDynamicLeftLabelEnabled
									? dynamicLeftLabel
									: leftLabel }{ ' ' }
							</span>
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
								onChange={ handleSwitchToggle }
								aria-label={ `Toggle switch between ${ leftLabel } and ${ rightLabel }` }
							/>
							<span className="ablocks-toggle__slider ablocks-toggle__slider--round"></span>
						</label>
						<div
							className={ classNames(
								'ablocks-toggle__label',
								'ablocks-toggle__label--right',
								{
									'ablocks-toggle__label--active': isSwitch,
								}
							) }
						>
							<span>
								{ isDynamicRightLabelEnabled
									? dynamicRightLabel
									: rightLabel }
							</span>
						</div>
					</div>
				</div>
				<div { ...innerBlocksProps }> { children } </div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
