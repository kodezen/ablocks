import React from 'react';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { RichText, BlockControls } from '@wordpress/block-editor';
import RenderIcon from '@Controls/icon-upload/render-icon';
import RenderContainer from '@Components/block-container/render2';
import ABlocksCounter from './counter';
import { getRenderDomElement } from '@Utils/helper';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import metadata from './block.json';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';
import AblocksRichText from '@Components/rich-text';

const propTypes = {};

import './styles.scss';

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		alignment,
		barHeadingPosition,
		startNumber,
		endNumber,
		duration,
		animationRepeat,
		counterPrefix,
		counterSuffix,
		decimalPlaces,
		separator,
		isShowIcon,
		layout,
		counterTitle,
		block_id,
		mediaPosition,
		totalNumber,

		circleSize,
	} = attributes;

	const {
		isDynamicEnabled: isDynamicEnabledTitle,
		data: dynamicCounterTitle,
	} = useDynamicData( {
		attributeValue: counterTitle,
	} );
	const {
		isDynamicEnabled: isDynamicEnabledPrefix,
		data: dynamicCounterPrefix,
	} = useDynamicData( {
		attributeValue: counterPrefix,
	} );
	const {
		isDynamicEnabled: isDynamicEnabledSuffix,
		data: dynamicCounterSuffix,
	} = useDynamicData( {
		attributeValue: counterSuffix,
	} );

	useEffect( () => {
		new ABlocksCounter(
			getRenderDomElement( `.ablocks-block-${ block_id }` )
		);
	}, [
		endNumber,
		duration,
		startNumber,
		separator,
		counterPrefix,
		counterSuffix,
		decimalPlaces,
		layout,
		totalNumber,
		block_id,
		circleSize,
		animationRepeat,
	] );
	const title = (
		<AblocksRichText
			tagName="div"
			value={ counterTitle }
			className="ablocks-counter__text"
			onChange={ ( counterTitleVal ) =>
				setAttributes( { counterTitle: counterTitleVal } )
			}
			placeholder={ __( 'Enter your title…' ) }
		/>
	);
	const media = isShowIcon && (
		<div className="ablocks-counter__icon">
			<RenderIcon attributes={ attributes } />
		</div>
	);

	const content = (
		<div className="ablocks-counter__content">
			<span className="ablocks-counter__content-prefix">
				{ isDynamicEnabledPrefix
					? dynamicCounterPrefix
					: counterPrefix }
			</span>
			<span className="ablocks-counter__content-number">
				{ startNumber }
			</span>
			<span className="ablocks-counter__content-suffix">
				{ isDynamicEnabledSuffix
					? dynamicCounterSuffix
					: counterSuffix }
			</span>
		</div>
	);
	const number = (
		<React.Fragment>
			{ mediaPosition === 'top' && media }
			{ content }
			{ title }
			{ mediaPosition === 'bottom' && media }
		</React.Fragment>
	);

	const circleRadius = circleSize / 2;
	const circumference = 2 * Math.PI * circleRadius;
	const circle = (
		<div className="ablocks-circle-counter__outer">
			<div className="ablocks-circle-counter__inner">{ number }</div>
			<svg
				className="ablocks-circle-counter__svg"
				width={ circleSize }
				height={ circleSize }
				style={ { rotate: '-90deg' } }
			>
				<circle
					className="ablocks-circle-counter__background"
					cx={ circleSize / 2 }
					cy={ circleSize / 2 }
					r={ circleRadius }
					strokeWidth="10"
					fill="none"
					strokeDasharray={ circumference }
				/>
				<circle
					className="ablocks-circle-counter__progress"
					cx={ circleSize / 2 }
					cy={ circleSize / 2 }
					r={ circleRadius }
					strokeWidth="10"
					fill="none"
					strokeDasharray={ circumference }
					strokeDashoffset={ circumference }
				/>
			</svg>
		</div>
	);

	const startWidth = ( startNumber / totalNumber ) * 100;
	const bar = (
		<div className="ablocks-bar-counter__background">
			<div
				className="ablocks-bar-counter__progress"
				style={ { width: `${ startWidth }%` } }
			>
				{ barHeadingPosition === 'inner' && title }
				{ content }
			</div>
		</div>
	);
	const counterOptions = { number, circle, bar };
	const dataProps = {
		'data-start': startNumber,
		'data-end': endNumber,
		'data-total': totalNumber,
		'data-duration': duration,
		'data-separator': separator,
		'data-decimalPlaces': decimalPlaces,
		'data-circleSize': circleSize,
		'data-layout': layout,
		'data-animationRepeat': animationRepeat,
	};
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
				typography={ [
					{
						fontFamily: attributes.typography?.fontFamily,
						weight: attributes.typography?.weight,
					},
				] }
				blockProps={ {
					...dataProps,
				} }
				className={ `ablocks-block--counter--${ layout }` }
			>
				{ layout === 'number' && (
					<>
						{ mediaPosition === 'leftOfNumber' && media }
						<div className="ablocks-counter__content-text-wrapper">
							{ layout === 'bar' && title }
							{ counterOptions[ layout ] }
						</div>
						{ mediaPosition === 'rightOfNumber' && media }
					</>
				) }
				{ layout === 'circle' && (
					<>
						{ layout === 'bar' && title }
						{ counterOptions[ layout ] }
					</>
				) }
				{ layout === 'bar' && (
					<>
						{ layout === 'bar' &&
							barHeadingPosition === 'top' &&
							title }
						{ counterOptions[ layout ] }

						{ layout === 'bar' &&
							barHeadingPosition === 'bottom' &&
							title }
					</>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
