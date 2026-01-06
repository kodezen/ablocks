export const getRangeAttribute = (
	attributeName,
	defaultValue,
	isResponsive = false
) => {
	if ( isResponsive ) {
		return {
			[ attributeName ]: {
				type: 'object',
				default: defaultValue,
			},
		};
	}
	return {
		[ attributeName ]: {
			type: 'number',
			default: defaultValue,
		},
	};
};

export const getDimensionAttributes = (
	attributeName,
	isResponsive = false,
	defaultValue = {}
) => {
	if ( isResponsive ) {
		return {
			[ attributeName ]: {
				type: 'object',
				default: {
					isLinked: false,
					common: '',
					top: '',
					right: '',
					bottom: '',
					left: '',
					unit: '',
					commonTablet: '',
					topTablet: '',
					rightTablet: '',
					bottomTablet: '',
					leftTablet: '',
					unitTablet: '',
					commonMobile: '',
					topMobile: '',
					rightMobile: '',
					bottomMobile: '',
					leftMobile: '',
					unitMobile: '',
					...defaultValue,
				},
			},
		};
	}
	return {
		[ attributeName ]: {
			type: 'object',
			default: {
				isLinked: false,
				common: '',
				top: '',
				right: '',
				bottom: '',
				left: '',
				unit: '',
				...defaultValue,
			},
		},
	};
};
export const getTypographyAttributes = (
	attributeName,
	isResponsive = false
) => {
	if ( isResponsive ) {
		return {
			[ attributeName ]: {
				type: 'object',
				default: {
					fontSize: 10,
					fontSizeTablet: 10,
					fontSizeMobile: 10,
					lineHeight: 10,
					lineHeightTablet: 10,
					lineHeightMobile: 10,
					letterSpacing: 10,
					letterSpacingTablet: 10,
					letterSpacingMobile: 10,
					wordSpacing: 10,
					wordSpacingTablet: 10,
					wordSpacingMobile: 10,
				},
			},
		};
	}
	return {
		[ attributeName ]: {
			type: 'object',
			default: {
				fontSize: 10,
				fontSizeTablet: 10,
				fontSizeMobile: 10,
				lineHeight: 10,
				lineHeightTablet: 10,
				lineHeightMobile: 10,
				letterSpacing: 10,
				letterSpacingTablet: 10,
				letterSpacingMobile: 10,
				wordSpacing: 10,
				wordSpacingTablet: 10,
				wordSpacingMobile: 10,
			},
		},
	};
};
export const getTextStrokeAttributes = (
	attributeName,
	isResponsive = false
) => {
	if ( isResponsive ) {
		return {
			[ attributeName ]: {
				type: 'object',
				default: {
					textStroke: 10,
					textStrokeTablet: 10,
					textStrokeMobile: 10,
				},
			},
		};
	}
};
export const getTextShadowAttributes = ( attributeName ) => {
	return {
		[ attributeName ]: {
			type: 'object',
			default: {
				textStroke: 10,
				textStrokeTablet: 10,
				textStrokeMobile: 10,
			},
		},
	};
};
