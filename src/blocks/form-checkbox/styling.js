import { getCSS as getRangeCSS } from '@Controls/range/helper';

export const getInputBlockMainWrapper = ( attributes, device = '' ) => {
	const css = {};
	css[ 'box-sizing' ] = 'border-box';

	const widthCSSObj = getRangeCSS( {
		attributeValue: attributes?.inputWidth,
		attributeObjectKey: 'value',
		isResponsive: true,
		property: 'width',
		hasUnit: true,
		defaultValue: 100,
		unitDefaultValue: '%',
		device,
	} );

	if ( widthCSSObj?.width && typeof widthCSSObj.width === 'string' ) {
		const matched = widthCSSObj.width.match( /^([\d.]+)(%|px|em|rem)?$/ );
		if ( matched ) {
			const value = parseFloat( matched[ 1 ] ) - 1;
			const unit = matched[ 2 ] || '%';
			css.width = `${ value }${ unit }`;
		} else {
			css.width = widthCSSObj.width;
		}
	} else {
		css.width = widthCSSObj.width;
	}

	return css;
};

export const getInputBlockMainSelected = () => {
	const css = {};
	css.border = '2px solid #007cba';
	css.padding = '0px 6px 0px';
	return {
		...css,
	};
};
