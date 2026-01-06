import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import RenderContainer from '@Components/block-container/render2';
import { BlockControls } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import metadata from './block.json';
import { getRenderDomElement } from '@Utils/helper';
import Chart from './chart';

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		block_id,
		data,
		options,
		chartType,
		chartHeight,
		chartWidth,
		chartBG,
	} = attributes;

	const [ isLoading, setIsLoading ] = useState( false );

	// Reference for the canvas
	const chartRef = useRef( null );

	const chartInstanceRef = useRef( null );

	useEffect( () => {
		setIsLoading( true );

		// Clean up
		if ( chartInstanceRef.current ) {
			chartInstanceRef.current.destroy();
		}

		const ctx = chartRef.current.getContext( '2d' );
		const element = getRenderDomElement(
			`.ablocks-block-${ block_id }.ablocks-block--chart canvas`
		);
		if ( element !== null ) {
			chartInstanceRef.current = new Chart( element, attributes, ctx );
		}

		setIsLoading( false );

		return () => {
			if ( chartInstanceRef.current ) {
				chartInstanceRef.current.destroy();
			}
		};
	}, [ data, options, chartType ] );
	useEffect( () => {
		const updatedHeight = {
			...chartHeight,
			value: ( chartWidth.value * 620 ) / 100,
			valueTablet: ( chartWidth.valueTablet * 620 ) / 100,
			valueMobile: ( chartWidth.valueMobile * 620 ) / 100,
			valueUnit: 'px',
			valueUnitTablet: 'px',
			valueUnitMobile: 'px',
		};

		setAttributes( { chartHeight: updatedHeight } );
	}, [ chartType, chartWidth ] );

	return (
		<React.Fragment>
			<BlockControls></BlockControls>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ isLoading ? (
					<Spinner />
				) : (
					<canvas
						className="ablocks-chart-canvas"
						ref={ chartRef }
						style={ {
							display: 'block',
							boxSizing: 'border-box',
							background: chartBG,
						} }
					></canvas>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}
