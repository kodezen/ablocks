import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
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
			// css['--ablocks-divider-pattern-height'] = `${attributes.size}px`;
			return getRangeCSS( {
				attributeValue: attributes.size,
				attributeObjectKey: 'value',
				isResponsive: false,
				property: '--ablocks-divider-pattern-height',
				defaultValue: null,
				hasUnit: false,
				unitDefaultValue: 'px',
			} );
		} else if ( attributes.weight ) {
			// css['--ablocks-divider-pattern-weight'] = `${attributes.weight}px`;
			return getRangeCSS( {
				attributeValue: attributes.weight,
				attributeObjectKey: 'value',
				isResponsive: false,
				property: '--ablocks-divider-pattern-weight',
				defaultValue: null,
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
			defaultValue: null,
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
