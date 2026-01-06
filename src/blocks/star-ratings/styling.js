import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getContainerCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.ratingNumberGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 0,
			hasUnit: true,
			property: 'gap',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	css.display = 'flex';
	css[ 'align-items' ] = 'center';
	css[ 'flex-wrap' ] = 'wrap';
	return {
		...css,
		...getAlignmentCSS( attributes?.alignment, 'justify-content', device ),
	};
};

export const getRatingNumberCSS = ( attributes, device = '' ) => {
	const { ratingNumberPosition } = attributes;
	const typographyValue = parseArgs( attributes.ratingNumberTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.ratingNumberTypographyGlobal
		? attributes.ratingNumberTypographyGlobal
		: '';
	const css = {};
	if ( ratingNumberPosition !== '' ) {
		if ( ratingNumberPosition === 'left' ) {
			css.order = '-5';
		} else {
			css.order = '10';
		}
	}
	return {
		...css,
		color: getTextColorCSS( attributes?.ratingNumberColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getRatingsCSS = ( attributes, device = '' ) => {
	const ratingsCSS = {
		...getRangeCSS( {
			attributeValue: attributes?.spacing,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 0,
			hasUnit: true,
			property: 'gap',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	return ratingsCSS;
};
