import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
export const get_item_css = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes.transition ) {
		css[ 'transition-duration' ] = `${ attributes.transition }s`;
	}
	const itemPaddingUnit = parseArgs( attributes.itemPadding, {
		unit: 'px',
	} );
	const itemBorderUnit = parseArgs( attributes.itemBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		background: getTextColorCSS( attributes?.itemBackground ),
		...css,
		...getAlignmentCSS( attributes?.alignment, 'justify-content', device ),
		...getPaddingCSS( itemPaddingUnit, 'padding', device ),
		...getBorderCSS( itemBorderUnit, device ),
	};
};

export const get_item_hover_css = ( attributes, device = '' ) => {
	const itemBorderHoverUnit = parseArgs( attributes.itemBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		background: getTextColorCSS( attributes?.itemBackgroundH ),
		...getBorderHoverCSS( itemBorderHoverUnit, device ),
	};
};

export const get_inner_item_css = ( attributes, device = '' ) => {
	const css = {};

	if (
		attributes.itemsDirection[ 'value' + device ] !== '' &&
		attributes.itemsDirection[ 'value' + device ] !== undefined
	) {
		css[ 'flex-direction' ] = attributes.itemsDirection[ 'value' + device ];
	}

	if (
		attributes.alignment[ 'value' + device ] !== '' &&
		attributes.alignment[ 'value' + device ] !== undefined
	) {
		css[ 'align-items' ] = attributes.alignment[ 'value' + device ];
	}

	return css;
};

export const get_gap_around_css = ( attributes, device = '' ) => {
	const css = {};
	if (
		attributes.alignment[ 'value' + device ] !== '' &&
		attributes.alignment[ 'value' + device ] !== undefined
	) {
		css[ 'align-items' ] = attributes.alignment[ 'value' + device ];
	}

	return {
		...css,
		...getRangeCSS( {
			attributeValue: attributes?.gap,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'gap',
			defaultValue: 10,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};

export const get_details_brief_css = ( attributes, device = '' ) => {
	const css = {};
	if (
		attributes.alignment[ 'value' + device ] !== '' &&
		attributes.alignment[ 'value' + device ] !== undefined
	) {
		if ( attributes.itemsDirection[ 'value' + device ] === 'row' ) {
			css[ 'justify-content' ] = 'space-between';
		} else {
			css[ 'justify-content' ] = attributes.alignment[ 'value' + device ];
		}
	}

	return {
		...css,
		...getRangeCSS( {
			attributeValue: attributes?.gap,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'gap',
			defaultValue: 10,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};

export const get_all_menu_css = ( attributes, device = '' ) => {
	const css = {};
	css.display = 'flex';
	css[ 'flex-wrap' ] = 'wrap';
	css[ 'flex-direction' ] = 'column';
	return {
		...css,
		...getRangeCSS( {
			attributeValue: attributes.columnGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'gap',
			defaultValue: 20,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};

export const get_title_text_css = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.titleTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.titleTypographyGlobal
		? attributes.titleTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.titleColor ),
		...getAlignmentCSS( attributes?.titleAlignment, 'text-align', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.titleTextStroke, device ),
		...getTextShadowCSS( attributes?.titleTextShadow ),
	};
};

export const get_description_text_css = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.descriptionTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.descriptionTypographyGlobal
		? attributes.descriptionTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.descriptionColor ),
		...getAlignmentCSS(
			attributes?.descriptionAlignment,
			'text-align',
			device
		),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.descriptionTextStroke, device ),
		...getTextShadowCSS( attributes?.descriptionTextShadow ),
	};
};

export const get_divider_css = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes.color ) {
		css[ '--ablocks-divider-pattern-color' ] = getTextColorCSS(
			attributes?.color
		);
	}

	const moreRangeCSS = () => {
		if ( attributes.dividerType === 'mask-style' && attributes.size ) {
			return getRangeCSS( {
				attributeValue: attributes.size,
				attributeObjectKey: 'value',
				isResponsive: false,
				property: '--ablocks-divider-pattern-height',
				defaultValue: 20,
				hasUnit: false,
				unitDefaultValue: 'px',
			} );
		} else if ( attributes.weight ) {
			return getRangeCSS( {
				attributeValue: attributes.weight,
				attributeObjectKey: 'value',
				isResponsive: false,
				property: '--ablocks-divider-pattern-weight',
				defaultValue: 2,
				hasUnit: false,
				unitDefaultValue: 'px',
			} );
		}
	};

	if ( attributes.dividerPatternUrl ) {
		if ( attributes.dividerType === 'mask-style' ) {
			css[
				'--ablocks-divider-pattern-url'
			] = `url(${ attributes.dividerPatternUrl })`;
		} else {
			css[ '--ablocks-divider-pattern-style' ] =
				attributes.dividerPatternUrl;
		}
	}

	return {
		...css,
		...getRangeCSS( {
			attributeValue: attributes.width,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			defaultValue: 100,
			hasUnit: false,
			unitDefaultValue: attributes.allowDescription ? '%' : 'px',
			device,
		} ),
		...moreRangeCSS(),
	};
};

export const get_price_text_css = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.priceTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.priceTypographyGlobal
		? attributes.priceTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.priceColor ),
		...getAlignmentCSS( attributes?.priceAlignment, 'text-align', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.priceTextStroke, device ),
		...getTextShadowCSS( attributes?.priceTextShadow ),
	};
};
