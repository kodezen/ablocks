function ABlocksCountDown( element ) {
	if ( ! element ) {
		return;
	}
	const ablocksCountDownDay = element?.querySelector(
		'.ablocks-countdown__item--day .ablocks-countdown-value'
	);
	const ablocksCountDownHour = element?.querySelector(
		'.ablocks-countdown__item--hour .ablocks-countdown-value'
	);
	const ablocksCountDownMinute = element?.querySelector(
		'.ablocks-countdown__item--minute .ablocks-countdown-value'
	);
	const ablocksCountDownSecond = element?.querySelector(
		'.ablocks-countdown__item--second .ablocks-countdown-value'
	);
	const clearTimer = setInterval( () => {
		updateUI();
	}, 1000 );

	const updateUI = () => {
		try {
			const targetTime = new Date(
				element.getAttribute( 'data-target-time' )
			).getTime();
			const currentTime = Date.now();
			const timeDifference = targetTime - currentTime;

			if ( timeDifference <= 0 ) {
				clearInterval( clearTimer );
				if ( ablocksCountDownDay ) {
					ablocksCountDownDay.innerHTML = '00';
				}
				if ( ablocksCountDownHour ) {
					ablocksCountDownHour.innerHTML = '00';
				}
				if ( ablocksCountDownMinute ) {
					ablocksCountDownMinute.innerHTML = '00';
				}
				if ( ablocksCountDownSecond ) {
					ablocksCountDownSecond.innerHTML = '00';
				}

				return;
			}

			const second = Math.floor( ( timeDifference / 1000 ) % 60 )
				.toString()
				.padStart( 2, '0' );
			const minute = Math.floor( ( timeDifference / ( 1000 * 60 ) ) % 60 )
				.toString()
				.padStart( 2, '0' );
			const hour = Math.floor(
				( timeDifference / ( 1000 * 60 * 60 ) ) % 24
			)
				.toString()
				.padStart( 2, '0' );
			const day = Math.floor( timeDifference / ( 1000 * 60 * 60 * 24 ) )
				.toString()
				.padStart( 2, '0' );
			if ( ablocksCountDownDay ) {
				ablocksCountDownDay.innerHTML = day;
			}
			if ( ablocksCountDownHour ) {
				ablocksCountDownHour.innerHTML = hour;
			}
			if ( ablocksCountDownMinute ) {
				ablocksCountDownMinute.innerHTML = minute;
			}
			if ( ablocksCountDownSecond ) {
				ablocksCountDownSecond.innerHTML = second;
			}
		} catch ( error ) {
			// eslint-disable-next-line
			console.error(error);
		}
	};
	updateUI();
}

export default ABlocksCountDown;
