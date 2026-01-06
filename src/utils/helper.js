import DOMPurify from 'dompurify';
import { useLocation } from 'react-router-dom';
import { dateI18n } from '@wordpress/date';
import { __ } from '@wordpress/i18n';
import axios from 'axios';
import _ from 'lodash';
export const {
	ajax_url,
	namespace,
	plugin_root_path,
	plugin_root_url,
	is_pro,
	route_path,
	menu,
	nonce,
	addons,
	ablocks_nonce,
	rest_url,
	toplevel_menu_icon_url,
	third_party_plugin_status,
	settings,
	site_url,
	blocks_status,
	theme_builder,
	admin_url,
	is_fse_theme,
	post_types,
} = window.ABlocksGlobal ?? {};

export const API = axios.create( {
	baseURL: rest_url,
	headers: {
		'content-type': 'application/json',
		'X-WP-Nonce': nonce,
		'Cache-Control': 'no-cache', // Prevent caching
	},
} );

export const generateSlug = ( value ) => {
	return value
		.toLowerCase()
		.replace( /\s+/g, '-' )
		.replace( /[^a-z0-9-]/g, '' );
};

export const getResponsiveValue = (
	attribute,
	attributeObjectKey,
	device,
	attributeDefaultValue = {}
) => {
	const clean = ( v ) => ( hasValue( v ) ? v : undefined );
	const desktopValue =
		clean( attribute?.[ attributeObjectKey ] ) ??
		clean( attributeDefaultValue?.[ attributeObjectKey ] ) ??
		false;

	const tabletValue =
		clean( attribute?.[ `${ attributeObjectKey }Tablet` ] ) ??
		clean( attributeDefaultValue?.[ `${ attributeObjectKey }Tablet` ] ) ??
		desktopValue;

	const mobileValue =
		clean( attribute?.[ `${ attributeObjectKey }Mobile` ] ) ??
		clean( attributeDefaultValue?.[ `${ attributeObjectKey }Mobile` ] ) ??
		tabletValue;

	switch ( device ) {
		case 'Mobile':
			return mobileValue;
		case 'Tablet':
			return tabletValue;
		default:
			return desktopValue;
	}
};

export const objectUniqueCheck = ( defaultObject, savedObject ) => {
	const changes = {};
	Object.keys( savedObject ).forEach( ( key ) => {
		if ( ! _.isEqual( defaultObject[ key ], savedObject[ key ] ) ) {
			changes[ key ] = savedObject[ key ];
		}
	} );
	return changes;
};

export const getDefaultValueByAttributeName = (
	attributeObject = {},
	attributeName = ''
) => {
	const attribute = attributeObject[ attributeName ];
	return attribute?.default ?? attributeObject;
};

export const getAddonActiveStatus = ( allAddons, addonName, isPro = false ) => {
	// if pro is inactive
	if ( isPro && ! is_pro ) {
		return false;
	}
	if ( allAddons[ addonName ] ) {
		return allAddons[ addonName ] === true;
	}
	return false;
};

export const dateOptions = [
	{ value: 'M j, Y', label: dateI18n( 'M j, Y', new Date() ) },
	{ value: 'F j, Y', label: dateI18n( 'F j, Y', new Date() ) },
	{ value: 'm/d/Y', label: dateI18n( 'm/d/Y', new Date() ) },
	{ value: 'm-d-Y', label: dateI18n( 'm-d-Y', new Date() ) },
	{ value: 'm.d.Y', label: dateI18n( 'm.d.Y', new Date() ) },
	{ value: 'd M Y', label: dateI18n( 'd M Y', new Date() ) },
	{ value: 'd F Y', label: dateI18n( 'd F Y', new Date() ) },
	{ value: 'd-m-Y', label: dateI18n( 'd-m-Y', new Date() ) },
	{ value: 'd.m.Y', label: dateI18n( 'd.m.Y', new Date() ) },
	{ value: 'd/m/Y', label: dateI18n( 'd/m/Y', new Date() ) },
	{ value: 'Y-m-d', label: dateI18n( 'Y-m-d', new Date() ) },
	{ value: 'Y.m.d', label: dateI18n( 'Y.m.d', new Date() ) },
	{ value: 'Y/m/d', label: dateI18n( 'Y/m/d', new Date() ) },
	{ value: 'M, Y', label: dateI18n( 'M, Y', new Date() ) },
	{ value: 'M Y', label: dateI18n( 'M Y', new Date() ) },
	{ value: 'F, Y', label: dateI18n( 'F, Y', new Date() ) },
	{ value: 'F Y', label: dateI18n( 'F Y', new Date() ) },
	{
		value: 'custom',
		label: __( 'Normal Text', 'ablocks' ),
	},
];

export const getRenderDomElement = ( selector, childSelector = null ) => {
	let domElement = document.querySelector( selector );
	if ( domElement ) {
		if ( childSelector ) {
			return domElement.querySelector( childSelector );
		}
		return domElement; // Return the element itself if no childSelector provided
	}
	const editorCanvas = document.querySelector(
		'iframe[name="editor-canvas"]'
	);
	if ( editorCanvas && editorCanvas.contentDocument ) {
		domElement = editorCanvas.contentDocument.querySelector( selector );
		if ( childSelector ) {
			return domElement?.querySelector( childSelector );
		}
		return domElement; // Return the element itself if no childSelector provided
	}

	return null; // Return null if no element found
};

export const getUnit = ( attributeValue, device = '' ) => {
	return getResponsiveValue( attributeValue, 'unit', device );
};

export const noop = () => {};

export const useQuery = () => {
	return new URLSearchParams( useLocation().search );
};

export const makeRequestByFetchAPI = async ( payload = {}, isRaw = false ) => {
	const form_data = new FormData();
	form_data.append( 'security', ablocks_nonce );

	Object.entries( payload ).forEach( ( [ key, value ] ) => {
		if ( ! isRaw && typeof value === 'object' && value !== null ) {
			form_data.append( key, JSON.stringify( value ) );
		} else {
			form_data.append( key, value );
		}
	} );

	try {
		const response = await fetch( ajax_url, {
			method: 'POST',
			body: form_data,
		} );

		const contentType = response.headers.get( 'Content-Type' ) || '';
		if ( contentType.includes( 'application/json' ) ) {
			const data = await response.json();
			return { status: response.status, data };
		}
		const text = await response.text();
		return { status: response.status, data: text };
	} catch ( error ) {
		return { status: 0, error: error.message };
	}
};

export const makeRequest = async ( payload = {}, isRaw = false ) => {
	let form_data = new FormData(); // eslint-disable-line
	form_data.append( 'security', ablocks_nonce );
	Object.entries( payload ).forEach( ( [ key, value ] ) => {
		if ( ! isRaw && typeof value === 'object' && value !== null ) {
			form_data.append( key, JSON.stringify( value ) );
		} else {
			form_data.append( key, value );
		}
	} );
	return await axios.post( ajax_url, form_data ).then(
		( response ) => {
			return response;
		},
		( error ) => {
			return error.response;
		}
	);
};

export const formatDateTime = ( dateString, format ) => {
	// Parse the date string into a Date object
	const date = new Date( dateString );
	if ( isNaN( date.getTime() ) ) {
		throw new Error( 'Invalid date string' );
	}

	// Helper functions and arrays
	const daysFull = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const daysShort = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
	const monthsFull = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const monthsShort = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	// Helper to get day suffix
	const getDaySuffix = ( day ) => {
		if ( day >= 11 && day <= 13 ) {
			return 'th';
		}
		switch ( day % 10 ) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};

	// Replace format tokens with corresponding values
	const formatted = format.replace(
		/d|j|S|l|D|m|n|F|M|Y|y|a|A|g|h|G|H|i|s|T|c|r|U/g,
		( match ) => {
			switch ( match ) {
				// Day
				case 'd':
					return String( date.getDate() ).padStart( 2, '0' ); // Day with leading zero
				case 'j':
					return date.getDate(); // Day without leading zero
				case 'S':
					return getDaySuffix( date.getDate() ); // Day suffix
				case 'l':
					return daysFull[ date.getDay() ]; // Full weekday name
				case 'D':
					return daysShort[ date.getDay() ]; // Short weekday name

				// Month
				case 'm':
					return String( date.getMonth() + 1 ).padStart( 2, '0' ); // Month with leading zero
				case 'n':
					return date.getMonth() + 1; // Month without leading zero
				case 'F':
					return monthsFull[ date.getMonth() ]; // Full month name
				case 'M':
					return monthsShort[ date.getMonth() ]; // Short month name

				// Year
				case 'Y':
					return date.getFullYear(); // 4-digit year
				case 'y':
					return String( date.getFullYear() ).slice( -2 ); // 2-digit year

				// Time
				case 'a':
					return date.getHours() < 12 ? 'am' : 'pm'; // Lowercase am/pm
				case 'A':
					return date.getHours() < 12 ? 'AM' : 'PM'; // Uppercase AM/PM
				case 'g':
					return date.getHours() % 12 || 12; // 12-hour without leading zero
				case 'h':
					return String( date.getHours() % 12 || 12 ).padStart(
						2,
						'0'
					); // 12-hour with leading zero
				case 'G':
					return date.getHours(); // 24-hour without leading zero
				case 'H':
					return String( date.getHours() ).padStart( 2, '0' ); // 24-hour with leading zero
				case 'i':
					return String( date.getMinutes() ).padStart( 2, '0' ); // Minutes with leading zero
				case 's':
					return String( date.getSeconds() ).padStart( 2, '0' ); // Seconds with leading zero
				case 'T':
					return Intl.DateTimeFormat().resolvedOptions().timeZone; // Timezone abbreviation

				// Full Date/Time
				case 'c':
					return date.toISOString(); // ISO 8601
				case 'r':
					return date.toUTCString(); // RFC 2822
				case 'U':
					return Math.floor( date.getTime() / 1000 ); // Unix timestamp

				default:
					return match; // Return unmatched tokens as is
			}
		}
	);

	return formatted;
};

export const parseAndGetDateTimeValue = ( {
	dynamicAttributeValue: dynamicContentAttribute,
	post,
	isTime = false,
} ) => {
	const {
		dateTimeType,
		dateTimeFormat,
		customDateTimeFormat,
		source,
		DateFormatOfCurrentDateTime,
		customFormatOfCurrentDateTime,
		TimeFormatOfCurrentDateTime,
	} = dynamicContentAttribute || {};

	let format = '';
	let dateString = Date.now();
	if ( 'current-date-time' === source ) {
		const dateFormat = 'F j, Y';
		const timeFormat = 'g:i a';
		if (
			! DateFormatOfCurrentDateTime &&
			! customFormatOfCurrentDateTime &&
			! TimeFormatOfCurrentDateTime
		) {
			format = `${ dateFormat } ${ timeFormat }`;
		} else if ( 'custom' === DateFormatOfCurrentDateTime ) {
			format =
				customFormatOfCurrentDateTime ||
				`${ dateFormat } ${ timeFormat }`;
		} else {
			format = `${ DateFormatOfCurrentDateTime || dateFormat } ${
				TimeFormatOfCurrentDateTime || timeFormat
			}`;
		}
	} else {
		format = dateTimeFormat;
		const defaultFormat = isTime ? 'g:i a' : 'j M, Y';
		if ( ! dateTimeFormat ) {
			format = defaultFormat;
		} else if ( 'custom' === dateTimeFormat ) {
			format = customDateTimeFormat || defaultFormat;
		}

		dateString = post.date;
		if ( 'post_published' === dateTimeType ) {
			dateString = post.date;
		} else if ( 'post_modified' === dateTimeType ) {
			dateString = post.modified;
		}

		if ( ! dateString ) {
			return undefined;
		}
	}
	const result = formatDateTime( dateString, format );
	return result;
};
export const isObject = ( value ) => {
	return value !== null && typeof value === 'object';
};

export const showNotice = ( {
	type = 'error',
	message = 'Error! cannot access copied data in "http" protocol. Please use "https"',
	config = {},
} ) => {
	window.wp.data.dispatch( 'core/notices' ).createNotice( type, message, {
		isDismissible: true,
		...config,
	} );
};

export const uploadJsonFile = () => {
	return new Promise( ( resolve ) => {
		const input = document.createElement( 'input' );
		input.type = 'file';
		input.accept = 'application/json';
		input.onchange = ( event ) => {
			const file = event.target.files[ 0 ];
			if ( file ) {
				// eslint-disable-next-line
				const reader = new FileReader();
				reader.onload = ( e ) => {
					resolve( e.target.result );
				};
				reader.readAsText( file );
			}
		};
		input.click();
	} );
};

export const hasValue = function ( value ) {
	if ( value === undefined || value === null ) {
		return false;
	}

	if ( typeof value === 'string' ) {
		return value.trim() !== '';
	}

	if ( Array.isArray( value ) || typeof value === 'object' ) {
		return Object.keys( value ).length > 0;
	}

	if ( typeof value === 'number' ) {
		return true;
	}

	return value !== '';
};

export const parseArgs = ( args, defaults = {} ) => {
	// If args is a string, convert it to an object
	if ( _.isString( args ) ) {
		args = _.fromPairs(
			args
				.split( '&' )
				.map( ( pair ) => pair.split( '=' ).map( decodeURIComponent ) ) // Decode both key and value
		);
	}

	// Merge args with defaults using _.defaults
	return _.defaults( _.isObject( args ) ? args : {}, defaults );
};

// notification system for frontend
export const showNotification = ( type, message ) => {
	let timer = null;
	let closeIn = 5000;
	const closeHandler = ( e ) => {
		// eslint-disable-next-line
		e && e.preventDefault();
		notificationDiv.remove();
		timer = null;
	};

	const checkInterval = () => {
		closeIn -= 1000;
		if ( closeIn <= 0 ) {
			clearInterval( timer );
			closeHandler();
		}
	};

	const notificationDiv = document.createElement( 'div' );

	notificationDiv.className = `ablocks-notification ablocks-notification--dashbaord ${
		type
			? `ablocks-notification--${ type }`
			: `ablocks-notification--success`
	}`;
	notificationDiv.setAttribute( 'aria-live', 'polite' );
	notificationDiv.onmouseenter = () => clearInterval( timer );
	notificationDiv.onmouseleave = () =>
		( timer = setInterval( checkInterval, 1000 ) );

	const messageParagraph = document.createElement( 'p' );
	messageParagraph.className = 'ablocks-notification__message';

	// const iconSpan = document.createElement("span");
	// iconSpan.className = `ablocks-icon ablocks-icon--${icon || "check"}`;
	// iconSpan.setAttribute('aria-hidden', 'true');
	// messageParagraph.appendChild(iconSpan);

	messageParagraph.appendChild( document.createTextNode( message ) );

	notificationDiv.appendChild( messageParagraph );

	const closeButton = document.createElement( 'button' );
	closeButton.className = 'ablocks-btn ablocks-btn--bg-transparent';
	closeButton.setAttribute( 'data-suffix', 'close-notification' );
	closeButton.setAttribute( 'aria-label', __( 'Close', 'ablocks' ) );
	closeButton.innerHTML = `<span class="ablocks-icon ablocks-icon--close" aria-hidden="true"></span>`;
	closeButton.onclick = closeHandler;

	notificationDiv.appendChild( closeButton );

	timer = setInterval( checkInterval, 1000 );

	document.body.appendChild( notificationDiv );
};

export const deepEqual = ( obj1, obj2 ) => {
	if ( obj1 === obj2 ) {
		return true;
	}
	if (
		typeof obj1 !== 'object' ||
		typeof obj2 !== 'object' ||
		obj1 === null ||
		obj2 === null
	) {
		return false;
	}

	const keys1 = Object.keys( obj1 );
	const keys2 = Object.keys( obj2 );
	if ( keys1.length !== keys2.length ) {
		return false;
	}

	return keys1.every( ( key ) => deepEqual( obj1[ key ], obj2[ key ] ) );
};

export const inputFieldsInitialValues = {
	source: 'current', // other post manage
	source_type: '', // other post type
	source_id: '', // other post id

	group_item: '',

	before: '',
	after: '',
	fallback: '',

	// for 'post-excerpt'
	excerptWords: '',

	// for 'post-date'/'post-date'
	dateTimeType: '',
	dateTimeFormat: '',
	customDateTimeFormat: '',

	// for 'post-terms'
	taxonomy: '',
	termsSeparator: ', ',

	// for post custom field
	metaKey: '',

	// for archive title
	includeContext: '',

	// for archive meta key
	archiveMetaKey: '',

	// for author meta key
	authorMetaKey: '',
};

export const parseStringToDynamicData = ( attributeString = '' ) => {
	if ( typeof attributeString !== 'string' ) {
		return {};
	}
	const match = attributeString.match( /ablocks_dc:(.*?):ablocks_dc/ );
	if ( ! match ) {
		return { isDynamicByNewSolution: false };
	}
	const cleanStr = match[ 1 ];
	let values = [];
	values = cleanStr.split( '|' );

	const source = values[ 0 ] || 'current';
	let source_type = '';
	let source_id = '';
	let group_item = '';
	let before = '';
	let after = '';
	let fallback = '';
	let metaKey = '';
	let dateTimeType = '';
	let dateTimeFormat = '';
	let customDateTimeFormat = '';
	let excerptWords = '';
	let taxonomy = '';
	let termsSeparator = '';
	let authorMetaKey = '';
	let numberOfTopics = '';
	let numberOfReviews = '';
	let numberOfEnrolled = '';
	let totalDuration = '';
	let taxonomyTermsUrlId = '';
	let mediaId = '';
	let authorId = '';
	let TimeFormatOfCurrentDateTime = '';
	let DateFormatOfCurrentDateTime = '';
	let customFormatOfCurrentDateTime = '';
	let requestParamType = '';
	let requestParamName = '';
	let userFieldName = '';
	let userFieldMetaKey = '';
	let shortcode = '';

	before = values[ 4 ] || '';
	after = values[ 5 ] || '';
	fallback = values[ 6 ] || '';

	if ( [ 'current', 'post-type' ].includes( source ) ) {
		source_type = values[ 1 ] || '';
		source_id = values[ 2 ] || '';
		group_item = values[ 3 ] || '';
		switch ( group_item ) {
			case 'post-custom-field': {
				metaKey = values[ 7 ] || '';
				break;
			}
			case 'post-date':
			case 'post-time': {
				dateTimeType = values[ 7 ] || '';
				dateTimeFormat = values[ 8 ] || '';
				if ( 'custom' === dateTimeFormat ) {
					customDateTimeFormat = values[ 9 ] || '';
				}
				break;
			}

			case 'post-excerpt': {
				excerptWords = values[ 7 ] || '';
				break;
			}
			case 'post-terms': {
				taxonomy = values[ 7 ] || '';
				termsSeparator = values[ 8 ] || '';
				break;
			}
			case 'author-meta': {
				authorMetaKey = values[ 7 ] || '';
				break;
			}
			case 'numberOfTopics': {
				numberOfTopics = values[ 7 ] || 0;
				break;
			}
			case 'numberOfReviews': {
				numberOfReviews = values[ 7 ] || 0;
				break;
			}
			case 'numberOfEnrolled': {
				numberOfEnrolled = values[ 7 ] || 0;
				break;
			}
			case 'totalDuration': {
				totalDuration = values[ 7 ] || 0;
				break;
			}
		}
	} else if ( 'link' === source ) {
		group_item = values[ 1 ] || '';

		switch ( group_item ) {
			case 'internal-url-content': {
				source_id = values[ 2 ];
				source_type = values[ 3 ];
				break;
			}
			case 'internal-url-taxonomy': {
				taxonomyTermsUrlId = values[ 2 ];
				break;
			}
			case 'internal-url-media': {
				mediaId = values[ 2 ];
				break;
			}
			case 'internal-url-author': {
				authorId = values[ 2 ];
				break;
			}

			case 'post-date':
			case 'post-time': {
				// dateTimeType = values[7] || '';
				// dateTimeFormat = values[8] || '';
				// if ('custom' === dateTimeFormat) {
				// 	customDateTimeFormat = values[9] || '';
				// }
				break;
			}

			case 'post-excerpt': {
				// excerptWords = values[7] || '';
				break;
			}
			case 'post-terms': {
				// taxonomy = values[7] || '';
				// termsSeparator = values[8] || '';
				break;
			}
			case 'author-meta': {
				// authorMetaKey = values[7] || '';
				break;
			}
		}
	} else if ( 'image' === source ) {
		group_item = values[ 1 ] || '';
	} else if ( 'current-date-time' === source ) {
		TimeFormatOfCurrentDateTime = values[ 1 ];
		DateFormatOfCurrentDateTime = values[ 2 ];
		customFormatOfCurrentDateTime = values[ 3 ];
	} else if ( 'request-parameter' === source ) {
		requestParamType = values[ 1 ];
		requestParamName = values[ 2 ];
	} else if ( 'user-info' === source ) {
		userFieldName = values[ 1 ];
		userFieldMetaKey = values[ 2 ];
	} else if ( 'shortcode' === source ) {
		shortcode = values[ 1 ];
	}

	return {
		isDynamicByNewSolution: true,
		source,
		source_type,
		source_id,
		group_item,
		before,
		after,
		fallback,
		metaKey,
		dateTimeType,
		dateTimeFormat,
		customDateTimeFormat,
		excerptWords,
		taxonomy,
		termsSeparator,
		authorMetaKey,
		numberOfTopics,
		numberOfReviews,
		numberOfEnrolled,
		taxonomyTermsUrlId,
		mediaId,
		authorId,
		TimeFormatOfCurrentDateTime,
		DateFormatOfCurrentDateTime,
		customFormatOfCurrentDateTime,
		requestParamType,
		requestParamName,
		userFieldName,
		userFieldMetaKey,
		shortcode,
	};
};
export const isEnabledBlock = (
	blockName,
	parentBlockName = '',
	plugin_name = ''
) => {
	if ( plugin_name ) {
		return third_party_plugin_status[ plugin_name ] ?? false;
	}
	const name = parentBlockName || blockName;
	const block_name = name.replace( /^ablocks\//, '' );
	if ( blocks_status[ block_name ] ) {
		return blocks_status[ block_name ];
	}
	return false;
};

export const wpKsesPostLike = ( dirtyHtml ) => {
	let sanitized = DOMPurify.sanitize( dirtyHtml, {
		ALLOWED_TAGS: [
			'a',
			'p',
			'br',
			'em',
			'strong',
			'ul',
			'ol',
			'li',
			'blockquote',
			'code',
			'pre',
			'img',
			'b',
			'i',
			'u',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
		],
		ALLOWED_ATTR: [
			'href',
			'src',
			'alt',
			'title',
			'target',
			'rel',
			'class',
		],
		ALLOW_DATA_ATTR: false,
	} );

	// Check if sanitized is a string and matches a number/float pattern exactly
	if (
		typeof sanitized === 'string' &&
		/^-?\d+(\.\d+)?$/.test( sanitized.trim() )
	) {
		sanitized = sanitized.includes( '.' )
			? parseFloat( sanitized )
			: parseInt( sanitized, 10 );
	}

	return String( sanitized );
};

export const getGlobalTypographyValue = ( name = '' ) => {
	if ( name ) {
		return settings.global_typography_list[ name ];
	}
	return {};
};
