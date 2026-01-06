import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getOrderDetalisCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.titleTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes?.titleTypographyGlobal
		? attributes?.titleTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.titleColor ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
	};
};
export const getOrderDetalisHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.titleColorH ),
	};
};

export const getOrderDetalisImageCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.imageWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 100,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.imageHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 100,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
};
export const getOrderDetalisPoductTitleCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.ProductTitleTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes?.ProductTitleTypographyGlobal
		? attributes?.ProductTitleTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.productTitleColor ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
	};
};

export const getOrderDetalisPoductTitleHoverCSS = (
	attributes,
	device = ''
) => {
	return {
		color: getTextColorCSS( attributes?.productTitleColorH ),
	};
};

export const getOrderDetalisPriceCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.discountPriceTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes?.discountPriceTypographyGlobal
		? attributes?.discountPriceTypographyGlobal
		: '';
	const typographyCSS = attributes?.discountPriceTypography
		? getTypographyCSS( typographyValue, device, typographyGlobal )
		: [];
	return {
		color: getTextColorCSS( attributes?.discountPriceColor ),
		...typographyCSS,
	};
};
export const getOrderDetalisRegularPriceCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.regularPriceTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes?.regularPriceTypographyGlobal
		? attributes?.regularPriceTypographyGlobal
		: '';
	const typographyCSS = attributes?.regularPriceTypography
		? getTypographyCSS( typographyValue, device, typographyGlobal )
		: [];
	return {
		color: getTextColorCSS( attributes?.regularPriceColor ),
		...typographyCSS,
	};
};
export const getOrderDetalisQualityCSS = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.regularPriceColor ) {
		css.color = getTextColorCSS( attributes?.qualityColor );
	}
	const typographyValue = parseArgs( attributes?.qualityTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes?.qualityTypographyGlobal
		? attributes?.qualityTypographyGlobal
		: '';
	const typographyCSS = attributes?.qualityTypography
		? getTypographyCSS( typographyValue, device, typographyGlobal )
		: [];
	return {
		...css,
		...typographyCSS,
	};
};

export const getTableTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.tableTextTypography, '', {
		weight: '400',
	} );
	const typographyGlobal = attributes?.tableTextTypographyGlobal
		? attributes?.tableTextTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.tableTextColor ) || '#000',
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
	};
};
