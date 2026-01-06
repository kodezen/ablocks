import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	return {
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
	};
};

export const getCountDownItemsCSS = ( attributes, device = '' ) => {
	const { boxSize, boxRowGap, boxColumnGap } = attributes;

	const boxSizeDefaultValue = parseArgs( attributes.mapHeight, {
		value: 130,
		valueUnit: 'px',
	} );

	const countDownItemsCSS = {
		...getRangeCSS( {
			attributeValue: boxSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: boxSizeDefaultValue.value,
			unitDefaultValue: boxSizeDefaultValue.valueUnit,
			property: 'min-height',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: boxRowGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 0,
			unitDefaultValue: 'px',
			property: 'row-gap',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: boxColumnGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 0,
			unitDefaultValue: 'px',
			property: 'column-gap',
			device,
		} ),
	};
	if ( attributes?.orient?.[ 'value' + device ] ) {
		countDownItemsCSS[ 'flex-direction' ] =
			attributes.orient[ 'value' + device ];
	}
	if ( attributes?.justificationAlign?.[ 'value' + device ] ) {
		countDownItemsCSS[ 'justify-content' ] =
			attributes.justificationAlign[ 'value' + device ];
	}
	if ( attributes?.alignment?.[ 'value' + device ] ) {
		countDownItemsCSS[ 'align-items' ] =
			attributes.alignment[ 'value' + device ];
	}
	if ( attributes?.wrapping?.[ 'value' + device ] ) {
		countDownItemsCSS[ 'flex-wrap' ] =
			attributes?.wrapping?.[ 'value' + device ];
	}
	return countDownItemsCSS;
};

export const getCountDownItemCSS = ( attributes, device = '' ) => {
	const {
		orient,
		boxSize,
		numberAndLabelGap,
		boxBackgroundColor,
		labelPosition,
	} = attributes;

	const boxBackgroundColorValue = getTextColorCSS( boxBackgroundColor );
	const labelPositionValue = labelPosition || '';
	const boxBorderUnit = parseArgs( attributes?.boxBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const boxPaddingUnit = parseArgs( attributes?.padding, {
		unit: 'px',
	} );
	const deviceKey =
		device === 'Tablet'
			? 'valueTablet'
			: device === 'Mobile'
			? 'valueMobile'
			: 'value';

	const direction = orient?.[ deviceKey ] ?? orient?.value;

	let widthCSS = {};

	if ( direction === 'column' || direction === 'column-reverse' ) {
		widthCSS = getRangeCSS( {
			attributeValue: boxSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 130,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} );
	} else {
		widthCSS = {
			width: '130px',
		};
	}

	const countDownItemCSS = {
		...widthCSS,
		...getRangeCSS( {
			attributeValue: numberAndLabelGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 5,
			unitDefaultValue: 'px',
			property: 'gap',
			device,
		} ),
		...getBoxShadowCSS( attributes?.boxShadow, 'box-shadow', device ),
		...getBorderCSS( boxBorderUnit, device ),
		...getPaddingCSS( boxPaddingUnit, 'padding', device ),
	};

	if ( boxBackgroundColorValue ) {
		countDownItemCSS.background = boxBackgroundColorValue;
	}
	if ( labelPositionValue ) {
		countDownItemCSS[ 'flex-direction' ] = labelPositionValue;
	}

	return countDownItemCSS;
};

export const getCountDownItemHoverCSS = ( attributes, device = '' ) => {
	const boxBorderHoverUnit = parseArgs( attributes?.boxBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBoxShadowHoverCSS( attributes?.boxShadow, device ),
		...getBorderHoverCSS( boxBorderHoverUnit, device ),
	};
};

export const getLabelCSS = ( attributes, device = '' ) => {
	const labelCSS = {};
	if (
		attributes?.labelPosition === 'column' ||
		attributes?.labelPosition === 'column-reverse'
	) {
		labelCSS.width = '100%';
		labelCSS.flex = '1 1 30%';
		labelCSS.display = 'flex';
		labelCSS[ 'justify-content' ] = 'center';
		labelCSS[ 'align-items' ] = 'center';
	}
	const typographyValue = parseArgs( attributes.labelTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.labelTypographyGlobal
		? attributes.labelTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.labelColor ),
		background: getTextColorCSS( attributes?.labelBgColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...labelCSS,
	};
};
export const getNumberCSS = ( attributes, device = '' ) => {
	const numberCSS = {};
	if (
		attributes?.labelPosition === 'column' ||
		attributes?.labelPosition === 'column-reverse'
	) {
		numberCSS.width = '100%';
		numberCSS.flex = '1 1 70%';
		numberCSS.display = 'flex';
		numberCSS[ 'justify-content' ] = 'center';
		numberCSS[ 'align-items' ] = 'center';
	}
	const typographyValue = parseArgs( attributes.numberTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.numberTypographyGlobal
		? attributes.numberTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.numberColor ),
		background: getTextColorCSS( attributes?.numberBgColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...numberCSS,
	};
};

export const getSeparatorCSS = ( attributes, device ) => {
	const { separatorColor: separatorColor, separatorTypography } = attributes;
	const typographyValue = parseArgs( separatorTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.separatorTypographyGlobal
		? attributes.separatorTypographyGlobal
		: '';
	const separatorCSS = {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
	if ( separatorColor ) {
		separatorCSS.color = getTextColorCSS( separatorColor );
	}
	return separatorCSS;
};
