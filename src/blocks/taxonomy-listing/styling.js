import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';

import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { parseArgs } from '@Utils/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	return {
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
	};
};

export const getTaxonomyTitleCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.taxonomyTitleTypography, {
		weight: '500',
	} );
	const typographyValueGlobal = attributes.taxonomyTitleTypographyGlobal
		? attributes.taxonomyTitleTypographyGlobal
		: '';
	const taxonomyTitlePaddingUnit = parseArgs(
		attributes?.taxonomyTitleDirection,
		{
			unit: 'px',
		}
	);
	const taxonomyBorderUnit = parseArgs( attributes.taxonomyTitleBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const buttonBorderUnit = parseArgs( attributes.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getAlignmentCSS(
			attributes?.taxonomyTitlePosition,
			'justify-content',
			device
		),
		...getAlignmentCSS(
			attributes?.taxonomyTitleDirection,
			'flex-direction',
			device
		),
		...getPaddingCSS( taxonomyTitlePaddingUnit, 'padding', device ),
		...getPaddingCSS( attributes?.taxonomyTitlePadding, 'padding', device ),
		...getBorderCSS( taxonomyBorderUnit, device ),
		color: attributes.taxonomyTitlecolor || '',
		background: attributes.taxonomyTitletBgColor || '',
	};
};
export const getTaxonomyHoverTitleCSS = ( attributes, device = '' ) => {
	const taxonomyHoverBorderUnit = parseArgs( attributes.taxonomyTitleBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...getBorderHoverCSS( taxonomyHoverBorderUnit, device ),
	};
};
export const getPostTitleCountCSS = ( attributes, device = '' ) => {
	const css = {};
	const postcounttypographyValue = parseArgs(
		attributes.postCountTypography,
		{
			weight: '500',
		}
	);
	const postcounttypographyValueGlobal = attributes.postCountTypographyGlobal
		? attributes.postCountTypographyGlobal
		: '';

	const countBorderUnit = parseArgs( attributes.postCountBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	if ( attributes?.postCountWidth ) {
		css.width = `${ attributes?.postCountWidth }px`;
	}
	if ( attributes?.postCountWidth ) {
		css.height = `${ attributes?.postCountWidth }px`;
	}
	return {
		...css,
		...getBorderCSS( countBorderUnit, device ),
		...getTypographyCSS(
			postcounttypographyValue,
			device,
			postcounttypographyValueGlobal
		),
		color: attributes.postCountColor || '',
		background: attributes.postCountBgColor || '',
	};
};
export const getPostTitleHoverCountCSS = ( attributes, device = '' ) => {
	const countHoverBorderUnit = parseArgs( attributes.postCountBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...getBorderHoverCSS( countHoverBorderUnit, device ),
	};
};

export const getCardCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.cardBgColor ) {
		css.background = attributes?.cardBgColor;
	}
	const cardBorderUnit = parseArgs( attributes.cardBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...css,
		...getBorderCSS( cardBorderUnit, device ),
		...getBoxShadowCSS( attributes?.cardBoxShadow, device ),
	};
};
export const getCardHoverCSS = ( attributes, device = '' ) => {
	const css = {};
	const cardBorderHoverUnit = parseArgs( attributes.cardBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	if ( attributes?.cardBgHoverColor ) {
		css.background = attributes?.cardBgHoverColor;
	}
	return {
		...css,
		...getBorderHoverCSS( cardBorderHoverUnit, device ),
		...getBoxShadowHoverCSS(
			attributes?.cardBoxShadow,
			'box-shadow',
			device
		),
	};
};
export const getCardPaddingCSS = ( attributes, device = '' ) => {
	const cardPaddingUnit = parseArgs( attributes?.cardPadding, {
		unit: 'px',
	} );
	return {
		...getPaddingCSS( cardPaddingUnit, 'padding', device ),
	};
};

// Icon Style

export const getIconCSS = ( attributes, device = '' ) => {
	const css = {};
	const iconPaddingUnit = parseArgs( attributes?.iconPadding, {
		unit: 'px',
	} );
	const iconRadiusUnit = parseArgs( attributes?.iconBorderRadius, {
		unit: 'px',
	} );
	if ( attributes?.iconBgColor ) {
		css.background = attributes?.iconBgColor;
	}

	return {
		...getPaddingCSS( iconPaddingUnit, 'padding', device ),
		...getPaddingCSS( iconRadiusUnit, 'border-radius', device ),
		...css,
	};
};
export const getIconSvgCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.iconsSize ) {
		css.width = `${ attributes?.iconsSize }px`;
	}
	if ( attributes?.iconsSize ) {
		css.height = `${ attributes?.iconsSize }px`;
	}

	return {
		...css,
	};
};
export const getIconSvgPathCSS = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.iconColor ) {
		css.fill = attributes?.iconColor;
	}

	return {
		...css,
	};
};
//post Title

export const getPostTitleCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.postTitleTypography, {
		weight: '500',
	} );
	const typographyValueGlobal = attributes.postTitleTypographyGlobal
		? attributes.postTitleTypographyGlobal
		: '';
	const postListPaddingUnit = parseArgs( attributes?.postPadding, {
		unit: 'px',
	} );
	const postBorderUnit = parseArgs( attributes.postBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const css = {};
	if ( attributes?.postTitleColor ) {
		css.color = attributes?.postTitleColor;
	}
	if ( attributes?.postBackgroundColor ) {
		css.background = attributes?.postBackgroundColor;
	}
	return {
		...css,
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getPaddingCSS( postListPaddingUnit, 'padding', device ),
		...getBorderCSS( postBorderUnit, device ),
	};
};

export const getPostHoverTitleCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.postTitleHoverColor ) {
		css.color = attributes?.postTitleHoverColor;
	}
	if ( attributes?.hoverPostBackgroundColor ) {
		css.background = attributes?.hoverPostBackgroundColor;
	}
	return {
		...css,
	};
};
export const getPostActiveTitleCSS = ( attributes, device = '' ) => {
	const postActiveBorderUnit = parseArgs( attributes.activePostBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const css = {};
	if ( attributes?.postTitleActiveColor ) {
		css.color = attributes?.postTitleActiveColor;
	}
	if ( attributes?.activePostBackgroundColor ) {
		css.background = attributes?.activePostBackgroundColor;
	}
	return {
		...css,
		...getBorderCSS( postActiveBorderUnit, device ),
	};
};
//post Title End
export const getButtonCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.buttonTypography, {
		weight: '500',
	} );
	const typographyValueGlobal = attributes.buttonTypographyGlobal
		? attributes.buttonTypographyGlobal
		: '';
	const buttonPaddingUnit = parseArgs( attributes?.buttonPadding, {
		unit: 'px',
	} );
	const buttonBorderUnit = parseArgs( attributes.buttonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const css = {};
	if ( attributes?.buttonColor ) {
		css.color = attributes?.buttonColor;
	}
	if ( attributes?.buttonBgColor ) {
		css.background = attributes?.buttonBgColor;
	}
	return {
		...css,
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getPaddingCSS( attributes?.buttonPadding, 'padding', device ),
		...getAlignmentCSS( attributes?.buttonPosition, 'display', device ),
	};
};
export const getButtonHoverCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.buttonHoverColor ) {
		css.color = attributes?.buttonHoverColor;
	}
	if ( attributes?.buttonHoverBgColor ) {
		css.background = attributes?.buttonHoverBgColor;
	}
	const buttonBorderHoverUnit = parseArgs( attributes.buttonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...css,
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
	};
};

export const getGridStyles = ( attributes, device = '' ) => {
	const layout = attributes.taxonomyLayout || 'flex';
	const items = attributes.itemsPerRow || 3;
	const css = {};
	if ( device === 'Tablet' ) {
		css[ 'grid-template-columns' ] = `repeat(2, 1fr)`;
	} else if ( device === 'Mobile' ) {
		css[ 'grid-template-columns' ] = `repeat(1, 1fr)`;
	} else if ( attributes?.itemsPerRow ) {
		css[
			'grid-template-columns'
		] = `repeat(${ attributes.itemsPerRow }, 1fr)`;
	}
	if ( layout === 'flex' ) {
		return {
			display: 'grid',
			gap: '1.5rem',
			...css,
		};
	}

	return {
		display: 'grid',
		gridTemplateColumns: `repeat(${ items }, 1fr)`,
		gap: '1.5rem',
		marginTop: '2rem',
		...css,
	};
};
