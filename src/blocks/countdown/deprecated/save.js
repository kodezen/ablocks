import React from 'react';
import SaveContainer from '@Components/block-container/save';
import metadata from './block.json';
import { CountDownItem, CountDownSeparator } from '../countdown-components';
const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
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
			<SaveContainer
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
							value="00"
							showLabel={ showLabels }
						>
							{ dayLabel }
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
							value="00"
							showLabel={ showLabels }
						>
							{ hourLabel }
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
							value="00"
							showLabel={ showLabels }
						>
							{ minuteLabel }
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
						value="00"
						showLabel={ showLabels }
					>
						{ secondLabel }
					</CountDownItem>
				) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
