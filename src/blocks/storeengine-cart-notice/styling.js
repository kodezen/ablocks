import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getBorderCSS } from '@Controls/border/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getBoxShadowCSS } from '@Controls/box-shadow/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getNoticeCSS = ( attributes, device = '' ) => {
	const buttonPaddingUnit = parseArgs( attributes?.infoBoxPadding, {
		unit: 'px',
	} );

	const buttonBorderUnit = parseArgs( attributes.infoBoxBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		color: getTextColorCSS( attributes?.boxColor ),
		background: getTextColorCSS( attributes?.boxBackground ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getBoxShadowCSS( attributes?.infoBoxoxShadow, device ),
		...getRangeCSS( {
			attributeValue: attributes?.infoBoxWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 100,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
	};
};

export const getNoticeMassageCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.infoTypography, {
		'font-weight': '400',
	} );

	const typographyValueGlobal = attributes.infoTypographyGlobal
		? attributes.infoTypographyGlobal
		: '';
	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getNoticeLinkCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.linkTypography, {
		'font-weight': '400',
	} );

	const typographyValueGlobal = attributes.linkTypographyGlobal
		? attributes.linkTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.linkColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getNoticeWrapperCSS = ( attributes, device = '' ) => {
	const { infoboxAlignment } = attributes;
	const css = {};
	if (
		infoboxAlignment[ 'value' + device ] !== '' &&
		infoboxAlignment[ 'value' + device ] !== undefined
	) {
		css.display = 'flex';
		css.width = '100%';
		css[ 'justify-content' ] = infoboxAlignment[ 'value' + device ];
	}

	return {
		...css,
	};
};
