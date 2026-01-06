import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { settings } from '@Utils/helper';
export const getMainWrapperCss = ( attributes, device = '' ) => {
	const { isRootContainer, containerWidth, containerWidthType, overflow } =
		attributes;
	const preparedContainerWidth = {
		...getRangeCSS( {
			attributeValue: containerWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 100,
			hasUnit: true,
			property: 'value',
			unitDefaultValue: '%',
			device,
		} ),
	};
	const css = {};
	if (
		( ! isRootContainer || 'custom' === containerWidthType ) &&
		preparedContainerWidth?.value
	) {
		css[
			'max-width'
		] = `min(100%, ${ preparedContainerWidth?.value }${ preparedContainerWidth?.valueUnit })!important`;
	}
	if (
		'custom' === containerWidthType &&
		preparedContainerWidth?.value &&
		isRootContainer
	) {
		css[ 'margin-left' ] = 'auto !important';
		css[ 'margin-right' ] = 'auto !important';
	}

	if ( isRootContainer && 'custom' !== containerWidthType ) {
		delete css[ 'max-width' ];
		delete css[ 'margin-left' ];
		delete css[ 'margin-right' ];
	}

	if ( overflow ) {
		css.overflow = overflow;
	}
	return css;
};

export const getBlockContainerCSS = ( attributes, device = '' ) => {
	const { isRootContainer, containerContentWidth, containerWidthType } =
		attributes;
	const css = {};
	const preparedContentWidth = {
		...getRangeCSS( {
			attributeValue: containerContentWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'value',
			defaultValue: settings?.default_container_width,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
	if ( isRootContainer && 'boxed' === containerWidthType ) {
		css[ 'max-width' ] = `min(100%, ${
			preparedContentWidth.value ?? settings?.default_container_width
		}${ preparedContentWidth?.valueUnit })`;
		css[ 'margin-left' ] = 'auto !important';
		css[ 'margin-right' ] = 'auto !important';
	}
	return css;
};

export const getMinHeightCss = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.minimumHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			property: 'min-height',
			defaultValue: 0,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};

export const getInnerBlocksClosestParentCss = ( attributes, device = '' ) => {
	const css = getMinHeightCss( attributes, device );
	const gridColumn = {
		...getRangeCSS( {
			attributeValue: attributes.gridColumn,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 0,
			defaultValueTablet: 2,
			defaultValueMobile: 1,
			hasUnit: false,
			property: 'value',
			unitDefaultValue: '',
			device,
		} ),
	};
	const gridRow = {
		...getRangeCSS( {
			attributeValue: attributes.gridRow,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: '',
			hasUnit: false,
			property: 'value',
			unitDefaultValue: '',
			device,
		} ),
	};
	if ( attributes?.layout === 'grid' ) {
		css.display = 'grid';
		css[ 'grid-template-columns' ] = `repeat(${ gridColumn?.value }, 1fr)`;
		css[ 'grid-template-rows' ] = `repeat(${ gridRow.value }, auto)`;
	} else {
		css.display = 'flex';
		if ( attributes[ 'direction' + device ] ) {
			css[ 'flex-direction' ] = attributes[ 'direction' + device ];
		}
		if ( attributes[ 'wrap' + device ] ) {
			css[ 'flex-wrap' ] = attributes[ 'wrap' + device ];
		}
	}

	if ( attributes.dir?.[ 'value' + device ] ) {
		css[ 'flex-direction' ] = attributes.dir[ 'value' + device ];
	}
	if ( attributes.justification?.[ 'value' + device ] ) {
		css[ 'justify-content' ] = attributes.justification[ 'value' + device ];
	}
	if ( attributes.justification?.[ 'value' + device ] ) {
		css[ 'justify-items' ] = attributes.justification[ 'value' + device ];
	}
	if ( attributes.alignment?.[ 'value' + device ] ) {
		css[ 'align-items' ] = attributes.alignment[ 'value' + device ];
	}
	if ( attributes.wrapping?.[ 'value' + device ] ) {
		css[ 'flex-wrap' ] = attributes.wrapping[ 'value' + device ];
	}
	return {
		...css,
		...getRangeCSS( {
			attributeValue: attributes.gap,
			attributeObjectKey: 'rowGap',
			isResponsive: true,
			hasUnit: true,
			property: 'row-gap',
			defaultValue: 0,
			unitDefaultValue: 'px',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.gap,
			attributeObjectKey: 'columnGap',
			isResponsive: true,
			hasUnit: true,
			property: 'column-gap',
			defaultValue: 0,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};

export const getRowColumnDisplayCss = ( attributes, device = '' ) => {
	const css = {};
	if (
		'row' === attributes[ 'dir' + device ] ||
		'row-reverse' === attributes[ 'dir' + device ]
	) {
		css.display = 'inline-block';
		css.width = 'auto';
	}
	// align items
	if (
		attributes.alignment?.[ 'value' + device ] &&
		attributes.alignment[ 'value' + device ] !== 'stretch'
	) {
		css[ 'max-width' ] = 'unset';
		//css.width = 'unset'; container align item issue fix
	}

	return css;
};

export const getContainerShapeTopCSS = ( attributes, device = '' ) => {
	const { topShapeBringToFront, shapeTop } = attributes;
	const css = {};

	if ( topShapeBringToFront && shapeTop !== '' ) {
		css[ 'z-index' ] = 1;
	}
	return css;
};
export const getContainerShapeBottomCSS = ( attributes, device = '' ) => {
	const { bottomShapeBringToFront, shapeBottom } = attributes;

	const css = {};
	if ( bottomShapeBringToFront && shapeBottom !== '' ) {
		css[ 'z-index' ] = 1;
	}
	return css;
};

export const getContainerShapeTopSvgCSS = ( attributes, device = '' ) => {
	const {
		topShapeFlip,
		shapeTop,
		shapeTopHeight,
		shapeTopWidth,
		shapeTopColor,
	} = attributes;

	if ( shapeTop === '' ) {
		return {};
	}
	const css = {
		...getRangeCSS( {
			attributeValue: shapeTopHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			property: 'height',
			defaultValue: 100,
			unitDefaultValue: 'px',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: shapeTopWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			property: 'width',
			defaultValue: 100,
			unitDefaultValue: '%',
			device,
		} ),
	};
	if ( shapeTopColor ) {
		css.fill = shapeTopColor;
	}
	if ( topShapeFlip && shapeTop !== '' ) {
		css.transform = 'translateX(0%) rotateY(180deg)';
	}
	return css;
};

export const getContainerShapeBottomSvgCSS = ( attributes, device = '' ) => {
	const {
		bottomShapeFlip,
		shapeBottom,
		shapeBottomHeight,
		shapeBottomWidth,
		shapeBottomColor,
	} = attributes;

	if ( shapeBottom === '' ) {
		return {};
	}
	const css = {
		...getRangeCSS( {
			attributeValue: shapeBottomHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			property: 'height',
			defaultValue: 100,
			unitDefaultValue: 'px',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: shapeBottomWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			property: 'width',
			defaultValue: 100,
			unitDefaultValue: '%',
			device,
		} ),
	};
	if ( shapeBottomColor ) {
		css.fill = shapeBottomColor;
	}
	if ( bottomShapeFlip && shapeBottom !== '' ) {
		css.transform = 'translateX(0%) rotateY(180deg)';
	}
	return css;
};
