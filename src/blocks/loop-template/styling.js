import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { parseArgs } from '@Utils/helper';
export const loopTemplateWrapper = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.itemGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: false,
			defaultValue: 10,
			property: 'gap',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	let columnCSS = {};
	if ( attributes.gridStyle === 'grid' ) {
		css.display = 'grid';
		columnCSS = {
			...getRangeCSS( {
				attributeValue: attributes.templateGridColumns,
				attributeObjectKey: 'value',
				isResponsive: true,
				property: 'grid-template-columns',
				defaultValue: 2,
				defaultValueTablet: 2,
				defaultValueMobile: 1,
				hasUnit: true,
				unitDefaultValue: '',
				device,
			} ),
		};
		css[
			'grid-template-columns'
		] = `repeat(${ columnCSS[ 'grid-template-columns' ] }, 1fr)`;
	}

	return css;
};

export const templateCardStyleCSS = ( attributes, device = '' ) => {
	const cardPaddingUnit = parseArgs( attributes?.padding, {
		unit: 'px',
	} );
	const cardBorderUnit = parseArgs( attributes?.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		background: getTextColorCSS( attributes?.bgColor ),
		...getBorderCSS( cardBorderUnit, device ),
		...getDimensionCSS( cardPaddingUnit, 'padding', device ),
	};
};

export const templateCardStyleHoverCSS = ( attributes, device = '' ) => {
	const css = {};

	const cardBorderHoverUnit = parseArgs( attributes?.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...css,
		...getBorderHoverCSS( cardBorderHoverUnit, device ),
	};
};
