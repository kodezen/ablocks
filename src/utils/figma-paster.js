const replaceCSSVariablesWithFallback = ( cssText ) => {
	return cssText.replace( /var\(\s*--[\w-]+,\s*([^\)]+)\)/g, '$1' );
};

const parseShadow = ( cssText, type ) => {
	// Regular expression to match the 'text-shadow' or 'box-shadow' property in the CSS
	const shadowRegex =
		'box' === type
			? /box-shadow\s*:\s*([^;]+);/
			: /text-shadow\s*:\s*([^;]+);/;

	// Find the shadow value from the entire CSS string
	const match = cssText.match( shadowRegex );
	if ( ! match ) {
		return null; // Return null if no shadow found
	}

	// The actual shadow value is the captured group in the regex
	let shadow = match[ 1 ].trim();

	const result = {
		horizontal: 0,
		vertical: 0,
		blur: 0,
		color: '',
	};

	if ( 'box' === type ) {
		result.shadowType = 'outer_shadow';
		result.shadow = '';
		result.spread = 0;

		// Check if the box-shadow is 'inset'
		if ( shadow.includes( 'inset' ) ) {
			result.shadowType = 'inner_shadow';
			shadow = shadow.replace( 'inset', '' ).trim(); // Remove 'inset' for further parsing
		}
	}

	// Split the values of the shadow (horizontal, vertical, blur, color etc.)
	const values = shadow.match(
		/(-?\d+px)|rgba?\([^)]+\)|#[0-9A-Fa-f]{3,8}/g
	);

	if ( ! values ) {
		throw new Error( 'Invalid text-shadow format' );
	}

	// Extract color
	const color = values.pop(); // The last value is the color
	result.color = color;

	// Assign horizontal, vertical, blur, (and spread in case of box shadow) values
	const [ horizontal, vertical, blur = 0, spread = 0 ] = values;

	result.horizontal = parseInt( horizontal );
	result.vertical = parseInt( vertical );
	result.blur = parseInt( blur );

	if ( 'box' === type ) {
		result.spread = parseInt( spread );
		// Rebuild the full shadow string
		result.shadow = `${ horizontal } ${ vertical } ${ blur } ${ spread } ${ color }`;
	}

	return result;
};

const parseCssForTypography = ( value ) => {
	const regex = /^(-?\d*\.?\d+)([a-z%]+)$/i;
	const match = value.match( regex );

	if ( match ) {
		const [ , number, unit ] = match;
		return {
			value: parseFloat( number ),
			unit,
		};
	}
	return value;
};

const parseMarginPadding = ( cssText, styleType ) => {
	cssText = replaceCSSVariablesWithFallback( cssText );
	const styleRegex = new RegExp(
		`${ styleType }(?:-(top|right|bottom|left))?\\s*:\\s*(\\d+)(px|em|rem|%)?`,
		'g'
	);
	const styleValues = { top: null, right: null, bottom: null, left: null };
	let unit = null;
	let shorthand = [];

	let match;
	while ( ( match = styleRegex.exec( cssText ) ) !== null ) {
		const side = match[ 1 ];
		const value = match[ 2 ];
		const currentUnit = match[ 3 ] || 'px';

		if ( ! unit ) {
			unit = currentUnit;
		} else if ( unit !== currentUnit ) {
			return null;
		}

		if ( ! side ) {
			shorthand = cssText
				.match(
					new RegExp(
						`\\b${ styleType }\\s*:\\s*(\\d+)(px|em|rem|%)?(\\s+\\d+(px|em|rem|%)?){0,3}`
					)
				)[ 0 ]
				.replace( new RegExp( `${ styleType }\\s*:\\s*` ), '' )
				.split( /\s+/ );
		} else {
			styleValues[ side ] = value;
		}
	}

	if ( shorthand.length ) {
		const values = shorthand.map( ( v ) => `${ parseInt( v ) }` );
		switch ( values.length ) {
			case 1:
				styleValues.top =
					styleValues.right =
					styleValues.bottom =
					styleValues.left =
						values[ 0 ];
				break;
			case 2:
				styleValues.top = styleValues.bottom = values[ 0 ];
				styleValues.right = styleValues.left = values[ 1 ];
				break;
			case 3:
				styleValues.top = values[ 0 ];
				styleValues.right = styleValues.left = values[ 1 ];
				styleValues.bottom = values[ 2 ];
				break;
			case 4:
				styleValues.top = values[ 0 ];
				styleValues.right = values[ 1 ];
				styleValues.bottom = values[ 2 ];
				styleValues.left = values[ 3 ];
				break;
		}
	}

	if (
		styleValues.top === styleValues.right &&
		styleValues.right === styleValues.bottom &&
		styleValues.bottom === styleValues.left
	) {
		return { common: styleValues.top, unit };
	}

	const result = {
		isLinked: false,
		unit,
	};

	if ( styleValues.top || styleValues.top === 0 ) {
		result.top = styleValues.top;
	}
	if ( styleValues.right || styleValues.right === 0 ) {
		result.right = styleValues.right;
	}
	if ( styleValues.bottom || styleValues.bottom === 0 ) {
		result.bottom = styleValues.bottom;
	}
	if ( styleValues.left || styleValues.left === 0 ) {
		result.left = styleValues.left;
	}

	return result;
};
const parseBorder = ( cssText ) => {
	const borderPattern =
		/border(?:-(top|right|bottom|left))?:\s*(\d*\.?\d+)([a-z%]*)\s*(solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden)\s*(#[0-9a-fA-F]{3,6}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%]+\)|var\([^)]+\s*,\s*([#a-zA-Z0-9(),.%\s]+)\))?/g;

	const colorPattern =
		/#[0-9a-fA-F]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%]+\)/;

	const result = {};
	const matches = [ ...cssText.matchAll( borderPattern ) ];

	let widthUnit = null;

	matches.forEach( ( match ) => {
		const side = match[ 1 ]; // e.g., 'top' or undefined for shorthand 'border'
		const width = match[ 2 ]; // e.g., '2'
		const unit = match[ 3 ]; // e.g., 'px'
		const style = match[ 4 ]; // e.g., 'solid'
		const color = match[ 5 ] || match[ 6 ]; // fallback color if present

		if ( ! widthUnit ) {
			widthUnit = unit;
		}

		// Set common or specific width and isLinkedWidth flag
		if ( ! side ) {
			result.commonWidth = width;
			result.unitWidth = unit;
		} else {
			result[ `${ side }Width` ] = width;
			result.unitWidth = unit;
			result.isLinkedWidth = false;
		}

		// Set border style and color
		result.borderStyle = style;
		if ( color ) {
			result.borderColor = color;
		}
	} );

	if ( result?.borderColor ) {
		result.borderColor = result.borderColor.match( colorPattern )?.[ 0 ];
	}

	return result;
};

const parseBorderRadius = ( cssText ) => {
	const result = {
		unitRadius: null,
		isLinkedRadius: null,
	};

	// Match border-radius shorthand, including var() with fallback
	const borderRadiusRegex =
		/border-radius:\s*(var\([^)]+\)|[\d.]+(?:px|em|rem|%)?)(?:\s+(var\([^)]+\)|[\d.]+(?:px|em|rem|%)?))?(?:\s+(var\([^)]+\)|[\d.]+(?:px|em|rem|%)?))?(?:\s+(var\([^)]+\)|[\d.]+(?:px|em|rem|%)?))?;/;

	// Match individual border-radius properties, including var() with fallback
	const individualRadiusRegex =
		/border-(top-left|top-right|bottom-right|bottom-left)-radius:\s*(var\([^)]+\)|[\d.]+(?:px|em|rem|%));/g;

	// Regex to extract fallback values from var()
	const fallbackRegex = /var\([^,]+,\s*([\d.]+(?:px|em|rem|%))\)/;

	// Helper function to extract fallback value if var() is used
	function extractFallback( value ) {
		const fallbackMatch = value.match( fallbackRegex );
		return fallbackMatch ? fallbackMatch[ 1 ] : value; // Return fallback or original value
	}

	// Extract shorthand border-radius if available
	const shorthandMatch = cssText.match( borderRadiusRegex );

	if ( shorthandMatch ) {
		const [ top, right, bottom, left ] = shorthandMatch;

		// Extract fallback values if var() is used
		const topRadius = extractFallback( top );
		const rightRadius = extractFallback( right || topRadius );
		const bottomRadius = extractFallback( bottom || topRadius );
		const leftRadius = extractFallback( left || rightRadius );

		// Determine the unit (assuming consistent unit)
		const unitMatch = topRadius.match( /(px|em|rem|%)/ );
		result.unitRadius = unitMatch ? unitMatch[ 1 ] : null;

		if ( ! right ) {
			// Single value case (all sides the same)
			result.commonRadius = topRadius.replace( result.unitRadius, '' );
			result.isLinkedRadius = true;
		} else {
			// Multiple value case
			result.topRadius = topRadius.replace( result.unitRadius, '' );
			result.rightRadius = rightRadius.replace( result.unitRadius, '' );
			result.bottomRadius = bottomRadius.replace( result.unitRadius, '' );
			result.leftRadius = leftRadius.replace( result.unitRadius, '' );
			result.isLinkedRadius = false;
		}
		return result;
	}

	// Extract individual side-specific border-radius values
	const individualMatches = [ ...cssText.matchAll( individualRadiusRegex ) ];

	if ( individualMatches.length > 0 ) {
		individualMatches.forEach( ( match ) => {
			const side = match[ 1 ];
			const value = extractFallback( match[ 2 ] );

			const unitMatch = value.match( /(px|em|rem|%)/ );
			result.unitRadius =
				result.unitRadius || ( unitMatch ? unitMatch[ 1 ] : null );

			switch ( side ) {
				case 'top-left':
					result.topRadius = value.replace( result.unitRadius, '' );
					break;
				case 'top-right':
					result.rightRadius = value.replace( result.unitRadius, '' );
					break;
				case 'bottom-right':
					result.bottomRadius = value.replace(
						result.unitRadius,
						''
					);
					break;
				case 'bottom-left':
					result.leftRadius = value.replace( result.unitRadius, '' );
					break;
			}
		} );

		result.isLinkedRadius = false;
		return result;
	}

	// If no border-radius found, return empty result
	return result;
};

const parseCss = ( cssText, controlType ) => {
	let result;
	switch ( controlType ) {
		case 'typography':
			{
				const cssObject = {};
				cssText = replaceCSSVariablesWithFallback( cssText );
				// Remove comments (/* */) from the CSS text
				const cleanedCSSText = cssText
					.replace( /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '' )
					.trim();
				const cssLines = cleanedCSSText
					.split( ';' )
					.map( ( line ) => line.trim() )
					.filter( ( line ) => line );

				cssLines.forEach( ( line ) => {
					let [ property, value ] = line
						.split( ':' )
						.map( ( item ) =>
							item.trim().replace( /[\"\']/g, '' )
						);

					if (
						/font\-family/.test( property ) &&
						value.includes( ',' )
					) {
						value = value.split( ',' )[ 0 ];
					}

					if ( [ property ].includes( property ) ) {
						if ( property && value ) {
							cssObject[ property ] =
								parseCssForTypography( value );
						}
					}
				} );
				result = cssObject;
			}
			break;

		case 'text-shadow':
			{
				result = parseShadow( cssText, 'text' );
			}
			break;

		case 'box-shadow':
			{
				result = parseShadow( cssText, 'box' );
			}
			break;

		case 'color-gradient':
			{
				// Regex to match gradients and capture the entire content inside the parentheses
				const gradientRegex =
					/(linear-gradient|radial-gradient|conic-gradient|repeating-linear-gradient|repeating-radial-gradient)\(([^;]*)\)/i;

				// Regex to match colors (both color and background-color properties), including those wrapped in var() functions
				const colorRegex =
					/(?:color|background(?:-image|-color)?)\s*:\s*(?:var\([^\)]+,\s*)?(#[0-9a-fA-F]{3,8}|rgba?\([^\)]+\)|hsla?\([^\)]+\))/i;

				let extractedValue = '';

				// Match gradients first
				const gradientMatch = cssText.match( gradientRegex );
				if ( gradientMatch ) {
					extractedValue = gradientMatch[ 0 ];
				} else {
					// If no gradient is found, match colors
					const colorMatch = cssText.match( colorRegex );
					if ( colorMatch ) {
						extractedValue = colorMatch[ 1 ]; // Capture only the color part
					}
				}

				result = extractedValue;
			}
			break;

		case 'margin':
			{
				result = parseMarginPadding( cssText, controlType );
			}
			break;

		case 'padding':
			{
				result = parseMarginPadding( cssText, controlType );
			}
			break;

		case 'border':
			{
				result = {
					...( parseBorder( cssText ) || {} ),
					...( parseBorderRadius( cssText ) || {} ),
				};
			}
			break;

		default:
			result = {};
			break;
	}

	return result;
};

export default parseCss;
