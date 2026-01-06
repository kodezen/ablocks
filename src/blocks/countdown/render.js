import React, { useEffect } from 'react';
import RenderContainer from '@Components/block-container/render2';
import ABlocksCountDown from './countDown';
import metadata from './block.json';
import { BlockControls } from '@wordpress/block-editor';
import ABlocksToolbarAlignment from '@Toolbar/alignment';
import { getRenderDomElement } from '@Utils/helper';
import { CountDownItem, CountDownSeparator } from './countdown-components';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';

import './styles.scss';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const {
		alignment,
		targetTime,
		dayLabel,
		hourLabel,
		minuteLabel,
		secondLabel,
		block_id,
		action,
		actionMessage,
		actionRedirectURL,

		showSeparator,
		separator,

		showDay,
		showHour,
		showMinute,
		showSecond,
		showLabels,
	} = attributes;
	// dynamic content issue solve here
	const {
		isDynamicEnabled: isDynamicDayLabelEnabled,
		data: dynamicDayLabel,
	} = useDynamicData( {
		attributeValue: dayLabel,
	} );
	const {
		isDynamicEnabled: isDynamicHourLabelEnabled,
		data: dynamicHourLabel,
	} = useDynamicData( {
		attributeValue: hourLabel,
	} );
	const {
		isDynamicEnabled: isDynamicMinuteLabelEnabled,
		data: dynamicMinuteLabel,
	} = useDynamicData( {
		attributeValue: minuteLabel,
	} );
	const {
		isDynamicEnabled: isDynamicSecondLabelEnabled,
		data: dynamicSecondLabel,
	} = useDynamicData( {
		attributeValue: secondLabel,
	} );
	// dynamic content issue solve here

	useEffect( () => {
		const element = getRenderDomElement( `.ablocks-block-${ block_id } ` );
		ABlocksCountDown( element );
	}, [
		block_id,
		targetTime,
		action,
		showDay,
		showHour,
		showMinute,
		showSecond,
	] );

	const targetTimeDate = new Date( targetTime ).getTime();
	const currentTime = Date.now();
	const timeDifference = targetTimeDate - currentTime;

	const second = Math.floor( ( timeDifference / 1000 ) % 60 );
	const minute = Math.floor( ( timeDifference / ( 1000 * 60 ) ) % 60 );
	const hour = Math.floor( ( timeDifference / ( 1000 * 60 * 60 ) ) % 24 );
	const day = Math.floor( timeDifference / ( 1000 * 60 * 60 * 24 ) );
	const hasNextVisibleUnit = ( currentUnit ) => {
		switch ( currentUnit ) {
			case 'day':
				return showHour || showMinute || showSecond;
			case 'hour':
				return showMinute || showSecond;
			case 'minute':
				return showSecond;
			default:
				return false;
		}
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
				blockProps={ {
					'data-target-time': targetTime,
					'data-action': action,
					'data-action-message': actionMessage,
					'data-action-redirect-url': actionRedirectURL,
				} }
			>
				{ showDay && (
					<>
						<CountDownItem
							label="day"
							value={ day }
							showLabel={ showLabels }
						>
							{ isDynamicDayLabelEnabled
								? dynamicDayLabel
								: dayLabel }
						</CountDownItem>
						{ showSeparator && hasNextVisibleUnit( 'day' ) && (
							<CountDownSeparator>
								{ separator }
							</CountDownSeparator>
						) }
					</>
				) }
				{ showHour && (
					<>
						<CountDownItem
							label="hour"
							value={ hour }
							showLabel={ showLabels }
						>
							{ isDynamicHourLabelEnabled
								? dynamicHourLabel
								: hourLabel }
						</CountDownItem>
						{ showSeparator && hasNextVisibleUnit( 'hour' ) && (
							<CountDownSeparator>
								{ separator }
							</CountDownSeparator>
						) }
					</>
				) }
				{ showMinute && (
					<>
						<CountDownItem
							label="minute"
							value={ minute }
							showLabel={ showLabels }
						>
							{ isDynamicMinuteLabelEnabled
								? dynamicMinuteLabel
								: minuteLabel }
						</CountDownItem>
						{ showSeparator && hasNextVisibleUnit( 'minute' ) && (
							<CountDownSeparator>
								{ separator }
							</CountDownSeparator>
						) }
					</>
				) }
				{ showSecond && (
					<CountDownItem
						label="second"
						value={ second }
						showLabel={ showLabels }
					>
						{ isDynamicSecondLabelEnabled
							? dynamicSecondLabel
							: secondLabel }
					</CountDownItem>
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
