import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';

export const getDualButtonCss = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.gap,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 10,
			unitDefaultValue: 'px',
			property: 'gap',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.transition,
			attributeObjectKey: 'value',
			unitDefaultValue: 's',
			defaultValue: 0,
			property: 'transition-duration',
		} ),
	};
	css[ 'flex-wrap' ] = 'wrap';
	if ( attributes.stack === 'vertical' ) {
		css[ 'flex-direction' ] = 'column';
	}
	if ( attributes.stack === 'horizontal' ) {
		css[ 'flex-direction' ] = 'row';
	}
	return {
		...css,
		...getAlignmentCSS(
			attributes?.alignment,
			attributes?.stack === 'horizontal'
				? 'justify-content'
				: 'align-items',
			device
		),
	};
};
export const getDualButtonCSS = ( attributes, device = '' ) => {
	const css = {};
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
		...getBorderCSS( buttonBorderUnit, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getDualButtonHoverCSS = ( attributes, device = '' ) => {
	const css = {};
	const buttonBorderHoverUnit = parseArgs( attributes.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	return {
		...css,
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
	};
};
