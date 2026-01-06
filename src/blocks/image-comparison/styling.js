import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getWrapperCSS = ( attributes ) => {
	return {
		...getAlignmentCSS( attributes?.alignment, 'text-align', '' ),
	};
};

export const getBeforeImageWidthCSS = ( attributes, device ) => {
	const sliderPositionRange = {
		...getRangeCSS( {
			attributeValue: attributes.sliderPosition,
			defaultValue: 50,
			property: 'width',
			unitDefaultValue: '%',
			device,
		} ),
	};
	return {
		...sliderPositionRange,
	};
};

export const getBeforeImageHeightCSS = ( attributes, device ) => {
	const sliderPositionRange = {
		...getRangeCSS( {
			attributeValue: attributes.sliderPosition,
			defaultValue: 50,
			property: 'height',
			unitDefaultValue: '%',
			device,
		} ),
	};
	return {
		...sliderPositionRange,
	};
};

export const getSliderLineHorizontalCSS = ( attributes, device = '' ) => {
	const sliderLineHorizontalCSS = {
		...getRangeCSS( {
			attributeValue: attributes.sliderPosition,
			defaultValue: 50,
			property: 'left',
			unitDefaultValue: '%',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.sliderBarSize,
			attributeObjectKey: 'value',
			defaultValue: 4,
			isResponsive: true,
			property: 'width',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	sliderLineHorizontalCSS.background = getTextColorCSS(
		attributes?.handleColor
	);
	return sliderLineHorizontalCSS;
};

export const getSliderLineVerticalCSS = ( attributes, device = '' ) => {
	const sliderLineVerticalCSS = {
		...getRangeCSS( {
			attributeValue: attributes.sliderPosition,
			defaultValue: 50,
			property: 'top',
			unitDefaultValue: '%',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.sliderBarSize,
			attributeObjectKey: 'value',
			defaultValue: 4,
			isResponsive: true,
			property: 'height',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	sliderLineVerticalCSS.background = getTextColorCSS(
		attributes?.handleColor
	);
	return sliderLineVerticalCSS;
};

export const getHorizontalSliderIconCSS = ( attributes, device = '' ) => {
	const sliderIconHorizontalCSS = {
		...getRangeCSS( {
			attributeValue: attributes.sliderPosition,
			defaultValue: 50,
			property: 'left',
			unitDefaultValue: '%',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.sliderIconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 50,
			property: 'height',
			unitDefaultValue: 'px',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.sliderIconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 50,
			property: 'width',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	sliderIconHorizontalCSS.border = `${
		attributes.sliderIconBorderSize[ 'value' + device ]
	}px solid ${ attributes.handleColor }`;
	sliderIconHorizontalCSS.color = getTextColorCSS( attributes?.handleColor );
	return sliderIconHorizontalCSS;
};

export const getVerticalSliderIconCSS = ( attributes, device = '' ) => {
	const sliderIconVerticalCSS = {
		...getRangeCSS( {
			attributeValue: attributes.sliderPosition,
			defaultValue: 50,
			property: 'top',
			unitDefaultValue: '%',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.sliderIconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 50,
			property: 'height',
			unitDefaultValue: 'px',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.sliderIconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 50,
			property: 'width',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	const borderRange = {
		...getRangeCSS( {
			attributeValue: attributes.sliderIconBorderSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 2,
			property: 'border',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	sliderIconVerticalCSS.border = `${ borderRange.border } solid ${ attributes.handleColor }`;
	sliderIconVerticalCSS.color = getTextColorCSS( attributes?.handleColor );

	return sliderIconVerticalCSS;
};

export const getOverlayCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.labelOverlayColor ) };
};

export const getImageOverlayCSS = ( attributes, device = '' ) => {
	const labelBorderUnit = parseArgs( attributes?.labelBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		color: getTextColorCSS( attributes?.labelTextColor ),
		background: getTextColorCSS( attributes?.labelBgColor ),
		...getBorderCSS( labelBorderUnit, device ),
		'max-width': '30%',
		transform: ( () => {
			if (
				attributes.labelPosition === 45 &&
				attributes.sliderOrientation === 'vertical'
			) {
				return 'translateX(-50%)';
			} else if (
				attributes.labelPosition === 95 &&
				attributes.sliderOrientation === 'vertical'
			) {
				return 'translateX(-100%)';
			} else if (
				attributes.labelPosition === 90 &&
				attributes.sliderOrientation === 'horizontal'
			) {
				return 'translateY(-100%)';
			}
			return 'none';
		} )(),
	};
};

export const getImageOverlayHoverCSS = ( attributes, device = '' ) => {
	const labelBorderHoverUnit = parseArgs( attributes?.labelBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( labelBorderHoverUnit, device ),
	};
};

export const getBeforeImageOverlayHorizontalCSS = ( attributes ) => {
	return {
		top: `${ attributes.labelPosition }%`,
		left: '10px',
	};
};

export const getBeforeImageOverlayVerticalCSS = ( attributes ) => {
	return {
		top: '10px',
		left: `${ attributes.labelPosition }%`,
	};
};

export const getAfterImageOverlayHorizontalCSS = ( attributes ) => {
	return {
		top: `${ attributes.labelPosition }%`,
		right: '10px',
	};
};

export const getAfterImageOverlayVerticalCSS = ( attributes ) => {
	return {
		bottom: '10px',
		left: `${ attributes.labelPosition }%`,
	};
};
