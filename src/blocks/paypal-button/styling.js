import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { parseArgs } from '@Utils/helper';
export const getWrapperCSS = ( attributes, device = '' ) => {
	const { position } = attributes;
	const css = {};

	if ( position[ 'value' + device ] !== 'stretch' ) {
		css[ 'text-align' ] = position[ 'value' + device ];
	}

	return {
		...css,
	};
};

export const getButtonCSS = ( attributes, device = '' ) => {
	const { position, alignment, iconSpace } = attributes;
	const css = {};
	if ( position[ 'value' + device ] === 'stretch' ) {
		css.width = '100%';
	}

	if ( alignment[ 'value' + device ] ) {
		css[ 'justify-content' ] = alignment[ 'value' + device ];
	}
	if ( attributes?.background ) {
		css.background = getTextColorCSS( attributes?.background );
	} else {
		css.background = attributes?.buttonType;
	}
	const defaultUnit = 'px';

	const unit = iconSpace[ 'valueUnit' + device ] || defaultUnit;

	if (
		iconSpace[ 'value' + device ] !== '' &&
		iconSpace[ 'value' + device ] !== undefined
	) {
		css[ 'column-gap' ] = `${ iconSpace[ 'value' + device ] }${ unit }`;
	}
	const buttonPaddingUnit = parseArgs( attributes?.padding, {
		unit: 'px',
	} );
	const buttonBorderUnit = parseArgs( attributes.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const typographyValue = parseArgs( attributes.typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';
	return {
		...css,
		color: getTextColorCSS( attributes?.textColor ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getBoxShadowCSS( attributes?.boxShadow, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getPaddingCSS( attributes?.padding, 'padding', device ),
	};
};

export const getButtonHoverCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes.transition ) {
		css[ 'transition-duration' ] = `${ attributes.transition }s`;
	}
	const buttonBorderHoverUnit = parseArgs( attributes.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	return {
		...css,
		color: getTextColorCSS( attributes?.textColorH ),
		background: getTextColorCSS( attributes?.backgroundH ),
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
		...getBoxShadowHoverCSS( attributes?.boxShadow, device ),
	};
};

export const getIconHoverCSS = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.dropCapsTextColor ) };
};

export const getButtonTextCSS = ( attributes ) => {
	return {
		...getTextShadowCSS( attributes?.textShadow ),
	};
};

export const getIconCSS = ( attributes ) => {
	return {
		transform: `rotate(${ attributes?.rotation }deg)`,
	};
};
