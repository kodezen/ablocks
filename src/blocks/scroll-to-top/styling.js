import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	return {
		...getAlignmentCSS( attributes?.alignment, 'justify-content', device ),
	};
};
export const getContainerCSS = ( attributes, device = '' ) => {
	const { position, visibleControl } = attributes;
	let css = {};
	if ( position === 'left' || position === 'right' ) {
		css = {
			...css,
			...getRangeCSS( {
				attributeValue: attributes?.positionBottom,
				attributeObjectKey: 'value',
				isResponsive: true,
				hasUnit: true,
				defaultValue: 60,
				property: 'bottom',
				unitDefaultValue: 'px',
				device,
			} ),
			position: 'fixed',
			'z-index': '9999',
		};
		if ( position === 'left' ) {
			css = {
				...css,
				...getRangeCSS( {
					attributeValue: attributes?.positionLeft,
					attributeObjectKey: 'value',
					isResponsive: true,
					hasUnit: true,
					defaultValue: 20,
					property: 'left',
					unitDefaultValue: 'px',
					device,
				} ),
			};
		} else if ( position === 'right' ) {
			css = {
				...css,
				...getRangeCSS( {
					attributeValue: attributes?.positionRight,
					attributeObjectKey: 'value',
					isResponsive: true,
					hasUnit: true,
					defaultValue: 60,
					property: 'right',
					unitDefaultValue: 'px',
					device,
				} ),
			};
		}
	}
	if ( visibleControl === 'visible' ) {
		css.visibility = 'visible';
	} else {
		css.visibility = 'hidden';
	}
	return {
		...css,
		...getAlignmentCSS( attributes?.alignment, 'justify-content', device ),
	};
};

export const getButtonTextCSS = ( attributes, device = '' ) => {
	const paddingUnit = parseArgs( attributes.padding, {
		unit: 'px',
	} );
	const typographyValueGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';
	return {
		...getTypographyCSS(
			attributes?.typography,
			device,
			typographyValueGlobal
		),
		...getTextStrokeCSS( attributes?.textStroke, device ),
		...getTextShadowCSS( attributes?.textShadow ),
		...getPaddingCSS( paddingUnit, 'padding', device ),
		color: getTextColorCSS( attributes?.buttonTextColor ),
		background: getTextColorCSS( attributes?.buttonTextColorBg ),
		...getBorderCSS( attributes?.border, device ),
	};
};
export const getButtonTextHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.buttonTextColorH ),
		background: getTextColorCSS( attributes?.buttonTextColorBgH ),
		...getBorderHoverCSS( attributes?.border, device ),
	};
};
