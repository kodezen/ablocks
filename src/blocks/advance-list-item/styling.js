import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { parseArgs, getResponsiveValue } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getContainerCSS = ( attributes, device = '' ) => {
	const css = [];
	return {
		...css,
		...getAlignmentCSS( attributes?.alignment, 'justify-items', device ),
		...getRangeCSS( {
			attributeValue: attributes?.innerGap,
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

export const getIconOrder = ( attributes, device = '' ) => {
	const css = [];
	css.margin = 'auto';
	const iconAlignmentValue = getResponsiveValue(
		attributes?.iconAlignment,
		'value',
		device
	);
	if ( iconAlignmentValue === 'row' ) {
		css.order = 1;
	} else if ( iconAlignmentValue === 'row-reverse' ) {
		css.order = 2;
	}
	return css;
};

export const getMarkerCSS = ( attributes, device = '' ) => {
	const css = [];
	if ( attributes.shapeColor && attributes.markerType === 'Shapes' ) {
		css[ 'border-color' ] = `${ getTextColorCSS(
			attributes?.shapeColor
		) } !important`;
	}
	if ( attributes.shapeSize[ 'value' + device ] ) {
		if ( attributes.markerType === 'Emoji' ) {
			css[ 'font-size' ] =
				attributes.shapeSize[ 'value' + device ] + 'px';
		} else if (
			attributes.shapeType === 'inset' ||
			attributes.shapeType === 'outset' ||
			attributes.shapeType === 'ridge'
		) {
			css.border = `${ attributes.shapeSize[ 'value' + device ] }px ${
				attributes.shapeType
			}`;
		} else {
			css[ 'border-bottom' ] = `${
				attributes.shapeSize[ 'value' + device ]
			}px ${ attributes.shapeType }`;
			css.width = attributes.shapeSize[ 'value' + device ] + 'px';
		}
	}

	return css;
};

export const getParagraphTextCSS = ( attributes, device = '' ) => {
	const css = {};
	const iconAlignmentValue = getResponsiveValue(
		attributes?.iconAlignment,
		'value',
		device
	);
	if ( iconAlignmentValue === 'row' ) {
		css.order = 2;
	} else if ( iconAlignmentValue === 'row-reverse' ) {
		css.order = 1;
	}
	const typographyValue = parseArgs( attributes.listTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.listTypographyGlobal
		? attributes.listTypographyGlobal
		: '';
	return {
		...css,
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

	css.order = 3;

	if ( attributes.listsDirection[ 'value' + device ] === 'row' ) {
		css.display = 'none';
	} else {
		css.display = 'block';
	}
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
		...getAlignmentCSS( attributes?.alignment, 'justify-self', device ),
		...getRangeCSS( {
			attributeValue: attributes?.width,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			defaultValue: null,
			hasUnit: false,
			unitDefaultValue: '%',
			device,
		} ),
		...moreRangeCSS(),
	};
};
