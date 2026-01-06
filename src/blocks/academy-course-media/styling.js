import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';

export const getFeaturedImageCSS = ( attributes, device = '' ) => {
	const css = {};
	css.opacity = attributes?.imageOpacity ?? 1;
	const imageBorderUnit = parseArgs( attributes?.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...css,
		...getBorderCSS( imageBorderUnit, device ),
		...getBoxShadowCSS( attributes?.boxShadow, device ),
		...getRangeCSS( {
			attributeValue: attributes?.imageWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 100,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.imageHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 100,
			unitDefaultValue: '%',
			property: 'height',
			device,
		} ),
	};
};

export const getFeaturedImageContainerCSS = ( attributes, device = '' ) => {
	const { alignment } = attributes;
	const css = {};
	if (
		alignment[ 'value' + device ] !== '' &&
		alignment[ 'value' + device ] !== undefined
	) {
		css.display = 'flex';
		css.width = '100%';
		css[ 'justify-content' ] = alignment[ 'value' + device ];
	}

	return {
		...css,
	};
};
