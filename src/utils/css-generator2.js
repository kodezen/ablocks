import { applyFilters } from '@wordpress/hooks';
import {
	getWrapperCSS,
	getContainerCSS,
	getContainerBeforeCSS,
	getContainerBeforeHoverCSS,
	getWrapperHoverCSS,
	getContainerHoverCSS,
	getWrapperDeviceResponsiveCSS,
	getWrapperDeviceResponsiveInnerCSS,
} from '@Global/AdvancedSettings/styling';

class CSSGenerator {
	customCSS = '';
	constructor( attributes = {}, clientId ) {
		attributes.block_id = clientId; // don't touch it. it's for fallback
		this.parentClass = `.editor-styles-wrapper .ablocks-block-${ clientId }`;
		this.classStyles = [];
		this.attributes = attributes;
		if ( attributes?._custom_css ) {
			this.customCSS = attributes?._custom_css;
		}
		// Alert - don't touch here
		if ( attributes?._margin ) {
			// check has advanced tab or not
			this.addClassStyles(
				'{{WRAPPER}}',
				getWrapperCSS( attributes ),
				getWrapperCSS( attributes, 'Tablet' ),
				getWrapperCSS( attributes, 'Mobile' )
			);
			this.addClassStyles(
				'{{WRAPPER}}:hover',
				getWrapperHoverCSS( attributes ),
				getWrapperHoverCSS( attributes, 'Tablet' ),
				getWrapperHoverCSS( attributes, 'Mobile' )
			);

			this.addClassStyles(
				'{{WRAPPER}}:hover',
				{
					...getWrapperHoverCSS( attributes ),
					...getContainerHoverCSS( attributes ),
				},
				{
					...getWrapperHoverCSS( attributes, 'Tablet' ),
					...getContainerHoverCSS( attributes, 'Tablet' ),
				},
				{
					...getWrapperHoverCSS( attributes, 'Mobile' ),
					...getContainerHoverCSS( attributes, 'Mobile' ),
				}
			);
			this.addClassStyles(
				'{{WRAPPER}}.ablocks-hide-on-desktop,{{WRAPPER}}.ablocks-hide-on-tablet,{{WRAPPER}}.ablocks-hide-on-mobile',
				getWrapperDeviceResponsiveCSS( attributes ),
				getWrapperDeviceResponsiveCSS( attributes, 'Tablet' ),
				getWrapperDeviceResponsiveCSS( attributes, 'Mobile' )
			);

			this.addClassStyles(
				'{{WRAPPER}}::before',
				getContainerBeforeCSS( attributes ),
				getContainerBeforeCSS( attributes, 'Tablet' ),
				getContainerBeforeCSS( attributes, 'Mobile' )
			);

			this.addClassStyles(
				'{{WRAPPER}}:hover::before',
				getContainerBeforeHoverCSS( attributes ),
				getContainerBeforeHoverCSS( attributes, 'Tablet' ),
				getContainerBeforeHoverCSS( attributes, 'Mobile' )
			);
			this.addClassStyles(
				'{{WRAPPER}}:hover > .ablocks-block-container',
				getContainerHoverCSS( attributes ),
				getContainerHoverCSS( attributes, 'Tablet' ),
				getContainerHoverCSS( attributes, 'Mobile' )
			);
			this.addClassStyles(
				'{{WRAPPER}} > .ablocks-block-container',
				getContainerCSS( attributes ),
				getContainerCSS( attributes, 'Tablet' ),
				getContainerCSS( attributes, 'Mobile' )
			);
			this.addClassStyles(
				'{{WRAPPER}}.ablocks-hide-on-desktop,{{WRAPPER}}.ablocks-hide-on-tablet,{{WRAPPER}}.ablocks-hide-on-mobile',
				getWrapperDeviceResponsiveInnerCSS( attributes ),
				getWrapperDeviceResponsiveInnerCSS( attributes, 'Tablet' ),
				getWrapperDeviceResponsiveInnerCSS( attributes, 'Mobile' )
			);
		}

		// eslint-disable-next-line
        let editorInlineGlobalCSSExtend = applyFilters(
			`ablocks.global.editorInlineCSS`,
			null,
			attributes,
			this
		);
		if (
			editorInlineGlobalCSSExtend &&
			editorInlineGlobalCSSExtend.length
		) {
			// eslint-disable-next-line
            editorInlineGlobalCSSExtend.map((item) => {
				this.addClassStyles(
					item?.className,
					item?.desktopStyles,
					item?.tabletStyles ?? {},
					item?.mobileStyles ?? {}
				);
			} );
		}
	}

	addClassStyles(
		className,
		desktopStyles,
		tabletStyles = {},
		mobileStyles = {}
	) {
		this.classStyles.push( {
			className,
			desktopStyles,
			tabletStyles,
			mobileStyles,
		} );
	}
	generateCSS() {
		let cssString = this.classStyles
			.map(
				( {
					className,
					desktopStyles,
					tabletStyles,
					mobileStyles,
				} ) => {
					const filteredDesktopStyles =
						this.removeEmptyCss( desktopStyles );

					const filteredTablet = this.filterResponsiveStyles(
						filteredDesktopStyles,
						tabletStyles
					);
					const filteredMobile = this.filterResponsiveStyles(
						{ ...filteredDesktopStyles, ...filteredTablet },
						mobileStyles
					);

					const desktopRaw = this.generateCSSForMediaQuery(
						'desktop',
						filteredDesktopStyles
					);
					const tabletRaw = this.generateCSSForMediaQuery(
						'tablet',
						filteredTablet
					);
					const mobileRaw = this.generateCSSForMediaQuery(
						'mobile',
						filteredMobile
					);

					const desktopCSS = this.minifyCSS( desktopRaw );
					const tabletCSS = this.minifyCSS( tabletRaw );
					const mobileCSS = this.minifyCSS( mobileRaw );

					const selectorWithParent =
						this.getParentSelector( className );
					const cssBlocks = [];

					if ( desktopCSS ) {
						cssBlocks.push(
							`${ selectorWithParent } { ${ desktopCSS } }`
						);
					}

					if ( tabletRaw !== desktopRaw && tabletCSS ) {
						cssBlocks.push(
							`@media screen and (max-width: ${ this.getBreakpoint(
								'tablet'
							) }) { ${ selectorWithParent } { ${ tabletCSS } } }`
						);
					}

					if ( mobileRaw !== tabletRaw && mobileCSS ) {
						cssBlocks.push(
							`@media screen and (max-width: ${ this.getBreakpoint(
								'mobile'
							) }) { ${ selectorWithParent } { ${ mobileCSS } } }`
						);
					}

					return cssBlocks.join( '\n\n' );
				}
			)
			.join( '\n\n' );

		cssString += this.getCustomCSS();

		return cssString.replace( /\s+/g, ' ' );
	}

	getCustomCSS() {
		return this.customCSS.replace( /\bselector\b/g, this.parentClass );
	}
	generateCSSForMediaQuery( mediaQuery, styles ) {
		if ( Object.keys( styles ).length === 0 ) {
			return '';
		}

		const cssString = Object.keys( styles )
			.map( ( property ) => `${ property }: ${ styles[ property ] };` )
			.join( '\n' );

		return cssString;
	}

	getBreakpoint( mediaQuery ) {
		switch ( mediaQuery ) {
			case 'tablet':
				return '800px';
			case 'mobile':
				return '480px';
			default:
				return '1200px';
		}
	}

	minifyCSS( cssString ) {
		// Remove comments (/* ... */)
		cssString = cssString.replace( /\/\*[\s\S]*?\*\//g, '' );
		// Remove newlines and multiple spaces
		cssString = cssString.replace( /\s+/g, ' ' );
		// Remove spaces around colons, semicolons, curly braces, and commas
		cssString = cssString.replace( /\s?([:,;{}])\s?/g, '$1' );
		return cssString;
	}

	getParentSelector( className ) {
		return this.parentClass
			? className.replaceAll( '{{WRAPPER}}', this.parentClass )
			: className;
	}

	removeEmptyCss( baseStyles ) {
		if ( ! baseStyles || typeof baseStyles !== 'object' ) {
			return {};
		}

		const styles = {};

		for ( const prop in baseStyles ) {
			const value = baseStyles[ prop ];

			if ( typeof value !== 'string' ) {
				continue;
			}

			const trimmed = value.trim();

			// Skip if empty or only a unit (like 'px', 'em', '%', etc.)
			if (
				trimmed === '' ||
				/^(px|em|rem|vh|vw|vmin|vmax|cm|mm|in|pt|pc|%)$/i.test(
					trimmed
				)
			) {
				continue;
			}

			styles[ prop ] = trimmed;
		}

		return styles;
	}

	filterResponsiveStyles( base, responsive ) {
		const filtered = {};
		for ( const key in responsive ) {
			let value = responsive[ key ];

			if ( typeof value !== 'string' ) {
				continue;
			}

			value = value.trim();

			// Skip if empty or only a unit (like 'px', 'em', '%', etc.)
			if (
				value === '' ||
				/^(px|em|rem|vh|vw|vmin|vmax|cm|mm|in|pt|pc|%)$/i.test( value )
			) {
				continue;
			}

			if ( ! ( key in base ) || base[ key ] !== value ) {
				filtered[ key ] = value;
			}
		}
		return filtered;
	}
}

export default CSSGenerator;
