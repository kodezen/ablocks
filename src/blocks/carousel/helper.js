export const getMaxValueForIconSize = ( unit ) => {
	switch ( unit ) {
		case 'px':
			return 100;
		case 'em':
			return 10;
		case 'rem':
			return 10;
		default:
			return 100;
	}
};

export const getMaxValueForIconPosition = ( unit ) => {
	if ( unit === 'px' ) {
		return 900;
	} else if ( unit === '%' ) {
		return 150;
	}
	return 700;
};
