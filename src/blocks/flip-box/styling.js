import {
	getCSS as getBackgroundCSS,
	getHoverCSS as getBackgroundHoverCSS,
} from '@Controls/background/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';

export const getFlibBoxWrapperCSS = ( attributes ) => {
	const { flipDirection, transitionSpeed, showSide } = attributes;

	const flipBoxWrapperCSS = {
		display: 'block',
		transition: `transform ${ transitionSpeed }s`,
		...getRangeCSS( {
			attributeValue: attributes.transitionSpeed,
			attributeObjectKey: 'value',
			defaultValue: 0.6,
			unitDefaultValue: 's',
			property: 'transform',
		} ),
		transform: ( () => {
			if ( showSide === 'front' ) {
				return 'rotateY(0deg)';
			}
			if ( flipDirection === 'top' ) {
				return 'rotateX(180deg)';
			}
			if ( flipDirection === 'bottom' ) {
				return 'rotateX(-180deg)';
			}
			if ( flipDirection === 'left' ) {
				return 'rotateY(-180deg)';
			}
			return 'rotateY(180deg)';
		} )(),
	};

	return flipBoxWrapperCSS;
};

export const getFrontCardCSS = ( attributes, device = '' ) => {
	const frontPaddingUnit = parseArgs( attributes.frontPadding, {
		unit: 'px',
	} );
	const cardBorderUnit = parseArgs( attributes.cardBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...getBackgroundCSS(
			attributes?.frontCardBackground,
			'background',
			device
		),
		...getDimensionCSS( frontPaddingUnit, 'padding', device ),
		...getBorderCSS( cardBorderUnit, device ),
	};
};

export const getBackCardCSS = ( attributes, device = '' ) => {
	const backPaddingUnit = parseArgs( attributes.backPadding, {
		unit: 'px',
	} );
	const cardBorderUnit = parseArgs( attributes.cardBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...getBackgroundCSS(
			attributes?.backCardBackground,
			'background',
			device
		),
		...getDimensionCSS( backPaddingUnit, 'padding', device ),
		...getBorderCSS( cardBorderUnit, device ),
	};
};

export const getFrontCardHoverCSS = ( attributes, device = '' ) => {
	const frontPaddingHoverUnit = parseArgs( attributes.frontPadding, {
		unit: 'px',
	} );
	const cardBorderHoverUnit = parseArgs( attributes.cardBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBackgroundHoverCSS(
			attributes?.frontCardBackground,
			'background',
			device
		),
		...getDimensionCSS( frontPaddingHoverUnit, 'padding', device ),
		...getBorderHoverCSS( cardBorderHoverUnit, device ),
	};
};

export const getBackCardHoverCSS = ( attributes, device = '' ) => {
	const backPaddingHoverUnit = parseArgs( attributes.backPadding, {
		unit: 'px',
	} );
	const cardBorderHoverUnit = parseArgs( attributes.cardBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBackgroundHoverCSS(
			attributes?.backCardBackground,
			'background',
			device
		),
		...getDimensionCSS( backPaddingHoverUnit, 'padding', device ),
		...getBorderHoverCSS( cardBorderHoverUnit, device ),
	};
};
