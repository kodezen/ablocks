import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
export const getContentCSS = ( attributes, device = '' ) => {
	return {
		background: getTextColorCSS( attributes?.contentBg ) || '#fff',
	};
};

export const getContentIconCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.iconColor ) || '#595959',
		...getRangeCSS( {
			attributeValue: attributes?.iconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 14,
			unitDefaultValue: 'px',
			property: 'font-size',
			device,
		} ),
	};
};

export const getContentListCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.listTypography ?? [], {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.listTypographyGlobal
		? attributes.listTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.listColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getShareButtonListCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.shareTypography ?? [], {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.shareTypographyGlobal
		? attributes.shareTypographyGlobal
		: '';
	const buttonPaddingUnit = parseArgs( attributes?.sharePadding, {
		unit: 'px',
	} );
	const buttonBorderUnit = parseArgs( attributes.shareBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		color: getTextColorCSS( attributes?.shareColor ) || '#fff',
		background: getTextColorCSS( attributes?.shareBg ) || '#7b68ee',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
	};
};

export const getWishlistButtonCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.wishlistColor ) || '#fff',
		background: getTextColorCSS( attributes?.wishlistBg ) || '#7b68ee',
	};
};

export const getButtonIconCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.buttonIconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 14,
			unitDefaultValue: 'px',
			property: 'font-size',
			device,
		} ),
	};
};
