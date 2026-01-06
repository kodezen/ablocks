import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getContainerCSS = ( attributes, device = '' ) => {
	const css = [];

	if ( attributes.listsDirection[ 'value' + device ] ) {
		css[ 'flex-direction' ] = attributes.listsDirection[ 'value' + device ];
	}

	return {
		...css,
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
		...getAlignmentCSS(
			attributes?.alignment,
			attributes.listsDirection[ 'value' + device ] === 'row'
				? 'justify-content'
				: 'align-items',
			device
		),
		...getRangeCSS( {
			attributeValue: attributes?.columnGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'gap',
			defaultValue: null,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};

export const getParagraphTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.listTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.listTypographyGlobal
		? attributes.listTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.textColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.listTextStroke, device ),
		...getTextShadowCSS( attributes?.listTextShadow ),
	};
};
export const getParagraphDropTextCSS = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.dropCapsTextColor ) };
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
				defaultValue: null,
				hasUnit: false,
				unitDefaultValue: 'px',
			} );
		} else if ( attributes.weight ) {
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
			attributeValue: attributes?.width,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			defaultValue: 100,
			hasUnit: false,
			unitDefaultValue: '%',
			device,
		} ),
		...moreRangeCSS(),
	};
};
