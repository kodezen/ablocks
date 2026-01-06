import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getCarouselCSS = ( attributes, device = '' ) => {
	const { carouselHeight, verticalAlign } = attributes;
	const carouselCSS = {
		...getRangeCSS( {
			attributeValue: carouselHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 300,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'min-height',
			device,
		} ),
	};
	if ( verticalAlign[ 'value' + device ] ) {
		carouselCSS[ 'align-items' ] = verticalAlign[ 'value' + device ];
	}
	return carouselCSS;
};

export const getNavigationButtonCSS = ( attributes, device = '' ) => {
	const { navigationIconPositionY } = attributes;
	const navigationButtonCSS = {
		...getRangeCSS( {
			attributeValue: navigationIconPositionY,
			attributeObjectKey: 'value',
			defaultValue: 50,
			isResponsive: true,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'top',
			device,
		} ),
	};
	return navigationButtonCSS;
};

export const getNavigationNextButtonCSS = ( attributes, device = '' ) => {
	const { navigationIconPositionNextX } = attributes;
	const navigationNextButtonCSS = {
		...getRangeCSS( {
			attributeValue: navigationIconPositionNextX,
			attributeObjectKey: 'value',
			defaultValue: -3,
			hasUnit: true,
			isResponsive: true,
			unitDefaultValue: '%',
			property: 'right',
			device,
		} ),
	};
	return navigationNextButtonCSS;
};

export const getNavigationPrevButtonCSS = ( attributes, device = '' ) => {
	const { navigationIconPositionPrevX } = attributes;
	const navigationPrevButtonCSS = {
		...getRangeCSS( {
			attributeValue: navigationIconPositionPrevX,
			attributeObjectKey: 'value',
			defaultValue: -3,
			hasUnit: true,
			isResponsive: true,
			unitDefaultValue: '%',
			property: 'left',
			device,
		} ),
	};
	return navigationPrevButtonCSS;
};

export const getNavigationIconCSS = ( attributes, device = '' ) => {
	const { navigationIconSize } = attributes;
	const navigationIconCSS = {
		...getRangeCSS( {
			attributeValue: navigationIconSize,
			attributeObjectKey: 'value',
			defaultValue: 35,
			isResponsive: true,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'font-size',
			device,
		} ),
	};
	return navigationIconCSS;
};

export const getNavigationIconSvgCSS = ( attributes, device = '' ) => {
	const { navigationIconColor, navigationIconBgColor } = attributes;

	const navigationIconCSS = {};

	if ( navigationIconColor ) {
		navigationIconCSS.fill = getTextColorCSS( navigationIconColor );
	}
	if ( navigationIconBgColor ) {
		navigationIconCSS[ 'background-color' ] = getTextColorCSS(
			navigationIconBgColor
		);
	}

	const paddingUnit = parseArgs( attributes?.navigationIconPadding, {
		unit: 'px',
	} );
	const borderUnit = parseArgs( attributes.navigationIconBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...navigationIconCSS,
		...getPaddingCSS( paddingUnit, 'navigationIconPadding', device ),
		...getPaddingCSS(
			attributes?.navigationIconPadding,
			'padding',
			device
		),
		...getBorderCSS( borderUnit, device ),
		...getBoxShadowCSS( attributes.navigationIconBoxShadow, device ),
	};
};

export const getNavigationIconSvgHoverCSS = ( attributes, device = '' ) => {
	const { navigationIconColorH, navigationIconBgColorH } = attributes;

	const transitionCSS = {
		...getRangeCSS( {
			attributeValue: attributes?.transition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
		} ),
	};

	const navigationIconHoverCSS = {};

	if ( navigationIconColorH ) {
		navigationIconHoverCSS.fill = getTextColorCSS( navigationIconBgColorH );
	}
	if ( navigationIconBgColorH ) {
		navigationIconHoverCSS[ 'background-color' ] = getTextColorCSS(
			navigationIconBgColorH
		);
	}

	const borderHoverUnit = parseArgs( attributes.navigationIconBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	return {
		...transitionCSS,
		...navigationIconHoverCSS,
		...getBorderHoverCSS( borderHoverUnit, device ),
		...getBoxShadowHoverCSS( attributes.navigationIconBoxShadow, device ),
	};
};

export const getPaginationParentCSS = ( attributes, device = '' ) => {
	const { paginationPositionY, paginationPositionX } = attributes;
	const paginationPositionYValue = parseArgs( paginationPositionY, {
		value: 100,
	} );
	const paginationPositionXValue = parseArgs( paginationPositionX, {
		value: 47,
	} );
	return {
		...getRangeCSS( {
			attributeValue: paginationPositionYValue,
			attributeObjectKey: 'value',
			defaultValue: 100,
			isResponsive: true,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'top',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: paginationPositionXValue,
			attributeObjectKey: 'value',
			defaultValue: 47,
			isResponsive: true,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'left',
			device,
		} ),
	};
};

export const getPaginationCSS = ( attributes, device = '' ) => {
	const { paginationColor, paginationType } = attributes;

	const paginationCSS = {};

	if ( paginationColor ) {
		if ( paginationType === 'default' ) {
			paginationCSS[ 'background-color' ] =
				getTextColorCSS( paginationColor );
		} else if (
			paginationType === 'border1' ||
			paginationType === 'border3'
		) {
			paginationCSS[ 'border-color' ] =
				getTextColorCSS( paginationColor );
			paginationCSS[ 'background-color' ] = 'transparent';
		} else if ( paginationType === 'border2' ) {
			paginationCSS[ 'background-color' ] =
				getTextColorCSS( paginationColor );
			paginationCSS[ 'border-color' ] =
				getTextColorCSS( paginationColor );
		}
	}
	if ( paginationType === 'border3' ) {
		const { width, height } = getEllipseDims(
			attributes.paginationSize,
			device
		);
		paginationCSS.width = width;
		paginationCSS.height = height;
		paginationCSS[ 'border-radius' ] = '9999px';
	}
	const borderUnit = parseArgs( attributes.paginationBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...paginationCSS,
		...( paginationType === 'border3'
			? {}
			: getRangeCSS( {
					attributeValue: attributes.paginationSize,
					attributeObjectKey: 'value',
					defaultValue: 8,
					isResponsive: true,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'width',
					device,
			  } ) ),
		...( paginationType === 'border3'
			? {}
			: getRangeCSS( {
					attributeValue: attributes.paginationSize,
					attributeObjectKey: 'value',
					defaultValue: 8,
					isResponsive: true,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'height',
					device,
			  } ) ),
		...getBorderCSS( borderUnit, device ),
	};
};
export const getPaginationHoverCSS = ( attributes, device = '' ) => {
	const { paginationHoverColor, paginationType } = attributes;

	const paginationHoverCSS = {};

	if ( paginationHoverColor ) {
		if ( paginationType === 'default' ) {
			paginationHoverCSS[ 'background-color' ] =
				getTextColorCSS( paginationHoverColor );
		} else if (
			paginationType === 'border1' ||
			paginationType === 'border3'
		) {
			paginationHoverCSS[ 'border-color' ] =
				getTextColorCSS( paginationHoverColor );
			paginationHoverCSS[ 'background-color' ] =
				getTextColorCSS( paginationHoverColor );
		} else if ( paginationType === 'border2' ) {
			paginationHoverCSS[ 'background-color' ] = 'transparent';
			paginationHoverCSS[ 'border-color' ] =
				getTextColorCSS( paginationHoverColor );
		}
	}

	if ( paginationType === 'border3' ) {
		const { width, height } = getEllipseDims(
			attributes.paginationHoverSize,
			device
		);
		paginationHoverCSS.width = width;
		paginationHoverCSS.height = height;
		paginationHoverCSS[ 'border-radius' ] = '9999px';
	}

	const borderHoverUnit = parseArgs( attributes.paginationHoverBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...paginationHoverCSS,
		...( paginationType === 'border3'
			? {}
			: getRangeCSS( {
					attributeValue: attributes.paginationHoverSize,
					attributeObjectKey: 'value',
					defaultValue: 8,
					isResponsive: true,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'width',
					device,
			  } ) ),
		...( paginationType === 'border3'
			? {}
			: getRangeCSS( {
					attributeValue: attributes.paginationHoverSize,
					attributeObjectKey: 'value',
					defaultValue: 8,
					isResponsive: true,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'height',
					device,
			  } ) ),
		...getBorderHoverCSS( borderHoverUnit, device ),
	};
};

export const getPaginationActiveCSS = ( attributes, device = '' ) => {
	const { paginationActiveColor, paginationType } = attributes;

	const paginationActiveCSS = {};

	if ( paginationActiveColor ) {
		if ( paginationType === 'default' ) {
			paginationActiveCSS[ 'background-color' ] = getTextColorCSS(
				paginationActiveColor
			);
		} else if (
			paginationType === 'border1' ||
			paginationType === 'border3'
		) {
			paginationActiveCSS[ 'background-color' ] = getTextColorCSS(
				paginationActiveColor
			);
			paginationActiveCSS[ 'border-color' ] = getTextColorCSS(
				paginationActiveColor
			);
		} else if ( paginationType === 'border2' ) {
			paginationActiveCSS[ 'border-color' ] = getTextColorCSS(
				paginationActiveColor
			);
			paginationActiveCSS[ 'background-color' ] = 'transparent';
		}
	}
	if ( paginationType === 'border3' ) {
		const { width, height } = getEllipseDims(
			attributes.paginationActiveSize,
			device
		);
		paginationActiveCSS.width = width;
		paginationActiveCSS.height = height;
		paginationActiveCSS[ 'border-radius' ] = '9999px';
	}
	const borderUnit = parseArgs( attributes.activePaginationBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...paginationActiveCSS,
		...( paginationType === 'border3'
			? {}
			: getRangeCSS( {
					attributeValue: attributes.paginationActiveSize,
					attributeObjectKey: 'value',
					defaultValue: 8,
					isResponsive: true,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'width',
					device,
			  } ) ),
		...( paginationType === 'border3'
			? {}
			: getRangeCSS( {
					attributeValue: attributes.paginationActiveSize,
					attributeObjectKey: 'value',
					defaultValue: 8,
					isResponsive: true,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'height',
					device,
			  } ) ),
		...getBorderCSS( borderUnit, device ),
	};
};
export const getPaginationActiveHoverCSS = ( attributes, device = '' ) => {
	const { paginationActiveHoverColor, paginationType } = attributes;

	const paginationActiveHoverCSS = {};

	if ( paginationActiveHoverColor ) {
		if ( paginationType === 'default' ) {
			paginationActiveHoverCSS[ 'background-color' ] = getTextColorCSS(
				paginationActiveHoverColor
			);
		} else if (
			paginationType === 'border1' ||
			paginationType === 'border3'
		) {
			paginationActiveHoverCSS[ 'border-color' ] = getTextColorCSS(
				paginationActiveHoverColor
			);
			paginationActiveHoverCSS[ 'background-color' ] = 'transparent';
		} else if ( paginationType === 'border2' ) {
			paginationActiveHoverCSS[ 'background-color' ] = getTextColorCSS(
				paginationActiveHoverColor
			);
			paginationActiveHoverCSS[ 'border-color' ] = getTextColorCSS(
				paginationActiveHoverColor
			);
		}
	}
	if ( paginationType === 'border3' ) {
		const { width, height } = getEllipseDims(
			attributes.paginationActiveHoverSize,
			device
		);
		paginationActiveHoverCSS.width = width;
		paginationActiveHoverCSS.height = height;
		paginationActiveHoverCSS[ 'border-radius' ] = '9999px';
	}
	const borderHoverUnit = parseArgs( attributes.activePaginationBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...paginationActiveHoverCSS,
		...( paginationType === 'border3'
			? {}
			: getRangeCSS( {
					attributeValue: attributes.paginationActiveHoverSize,
					attributeObjectKey: 'value',
					defaultValue: 8,
					isResponsive: true,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'width',
					device,
			  } ) ),
		...( paginationType === 'border3'
			? {}
			: getRangeCSS( {
					attributeValue: attributes.paginationActiveHoverSize,
					attributeObjectKey: 'value',
					defaultValue: 8,
					isResponsive: true,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'height',
					device,
			  } ) ),
		...getBorderHoverCSS( borderHoverUnit, device ),
	};
};

function getEllipseDims( sizeAttr, device = '' ) {
	const parsed = parseArgs( sizeAttr, { value: 8, valueUnit: 'px' } );
	const vKey = 'value' + device;
	const uKey = 'valueUnit' + device;
	const v = Number( parsed[ vKey ] ?? parsed.value ?? 8 );
	const u = ( parsed[ uKey ] ?? parsed.valueUnit ?? 'px' ) || 'px';
	const ratio = 1.8; // tweak if you want more/less elongated
	return { height: `${ v }${ u }`, width: `${ v * ratio }${ u }` };
}
