import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBackgroundCSS,
	getHoverCSS as getBackgroundHoverCSS,
} from '@Controls/background/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getPanelMainWrapperCss = ( attributes, device = '' ) => {
	if ( device ) {
		return {};
	}
	const { backdropColor } = attributes || {};
	const panelMainWrapperCss = {};
	if ( backdropColor ) {
		panelMainWrapperCss[ 'background-color' ] = getTextColorCSS(
			attributes?.backdropColor
		);
	}
	return panelMainWrapperCss;
};

export const getPanelContentWrapCss = ( attributes, device = '' ) => {
	const { panelWidth, panelHeight, panelContentPosition } = attributes || {};
	const panelContentWrapCss = {
		...getRangeCSS( {
			attributeValue: panelWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 50,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: panelHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 50,
			unitDefaultValue: '%',
			property: 'min-height',
			device,
		} ),
	};

	if ( ! device && panelContentPosition ) {
		panelContentWrapCss[ 'align-items' ] = panelContentPosition;
	}

	const backgroundCss = getBackgroundCSS(
		attributes?.panelBackground,
		'background',
		device
	);
	const borderCss = getBorderCSS( attributes?.panelBorder, device );
	const shadowCss = getBoxShadowCSS(
		attributes?.panelShadow,
		'box-shadow',
		device
	);

	const transitionCss = {};
	if ( ! device ) {
		let transitionValue = 'all 1s';
		if ( borderCss?.transition ) {
			transitionValue = `${ transitionValue },${ borderCss?.transition }`;
		}
		if ( backgroundCss?.transition ) {
			transitionValue = `${ transitionValue },${ backgroundCss?.transition }`;
		}
		if ( shadowCss?.transition ) {
			transitionValue = `${ transitionValue },${ shadowCss?.transition }`;
		}
		transitionCss.transition = transitionValue;
	}

	return {
		...panelContentWrapCss,
		...getDimensionCSS( attributes?.panelPadding, 'padding', device ),
		...backgroundCss,
		...borderCss,
		...shadowCss,
		...transitionCss,
	};
};

export const getPanelContentWrapHoverCss = ( attributes, device = '' ) => {
	const panelContentWrapHoverCss = {};

	return {
		...panelContentWrapHoverCss,
		...getBackgroundHoverCSS(
			attributes?.panelBackground,
			'background',
			device
		),
		...getBorderHoverCSS( attributes?.panelBorder, device ),
		...getBoxShadowHoverCSS( attributes?.panelShadow, device ),
	};
};

export const getPanelCloseButtonCss = ( attributes, device = '' ) => {
	const panelCLoseButtonCss = {};
	if ( ! device ) {
		const {
			closeBtnBackgroundColor,
			closeBtnTop,
			closeBtnSide,
			closePosition,
		} = attributes || {};
		if ( closeBtnBackgroundColor ) {
			panelCLoseButtonCss[ 'background-color' ] = getTextColorCSS(
				attributes?.closeBtnBackgroundColor
			);
		}
		if ( closeBtnTop || 0 === closeBtnTop ) {
			panelCLoseButtonCss.top = `${ closeBtnTop }px`;
		}
		if ( closeBtnSide || 0 === closeBtnSide ) {
			if ( 'left' === closePosition ) {
				panelCLoseButtonCss.left = `${ closeBtnSide }px`;
				panelCLoseButtonCss.right = 'unset';
			} else {
				panelCLoseButtonCss.right = `${ closeBtnSide }px`;
				panelCLoseButtonCss.left = 'unset';
			}
		}
	}
	return {
		...panelCLoseButtonCss,
	};
};
