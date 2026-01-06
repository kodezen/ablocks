export const getMaxValueForUnit = ( unit ) => {
	if ( unit === 'px' ) {
		return 2000;
	} else if ( unit === '%' ) {
		return 1000;
	} else if ( unit === 'em' || unit === 'rem' ) {
		return 200;
	}
	return 1000;
};
export const getMinValueForUnit = ( unit ) => {
	if ( unit === 'px' ) {
		return 50;
	} else if ( unit === '%' ) {
		return 50;
	} else if ( unit === 'em' || unit === 'rem' ) {
		return 3;
	}
	return 50;
};
export const PositionGetMaxValueForUnit = ( unit ) => {
	if ( unit === 'px' ) {
		return 2000;
	} else if ( unit === '%' ) {
		return 200;
	} else if ( unit === 'em' || unit === 'rem' ) {
		return 200;
	}
	return 1000;
};
export const getPositionMinValueForUnit = ( unit ) => {
	if ( unit === 'px' ) {
		return -2000;
	} else if ( unit === '%' ) {
		return -200;
	} else if ( unit === 'em' || unit === 'rem' ) {
		return -200;
	}
	return -2000;
};
