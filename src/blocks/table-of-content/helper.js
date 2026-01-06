export const extractHeadings = ( htmlContent, attributes ) => {
	const { H1, H2, H3, H4, H5, H6 } = attributes;
	// eslint-disable-next-line
	const parser = new DOMParser();
	const doc = parser.parseFromString( htmlContent, 'text/html' );

	let selector = '';
	if ( H1 ) {
		selector += 'h1, ';
	}
	if ( H2 ) {
		selector += 'h2, ';
	}
	if ( H3 ) {
		selector += 'h3, ';
	}
	if ( H4 ) {
		selector += 'h4, ';
	}
	if ( H5 ) {
		selector += 'h5, ';
	}
	if ( H6 ) {
		selector += 'h6, ';
	}

	if ( selector.endsWith( ', ' ) ) {
		selector = selector.slice( 0, -2 );
	}

	const headings = selector ? [ ...doc.querySelectorAll( selector ) ] : [];

	return headings.map( ( heading ) => ( {
		content: heading.textContent,
		anchor: heading.textContent.toLowerCase().replace( /\s+/g, '-' ),
		tag: heading.tagName.toLowerCase(),
	} ) );
};

export const renderHeadings = ( headings ) => {
	const items = [];
	const stack = [];

	headings.forEach( ( heading ) => {
		const headingLevel = parseInt( heading.tag.replace( 'h', '' ), 10 );

		const newItem = {
			element: <a href={ `#${ heading.anchor }` }>{ heading.content }</a>,
			level: headingLevel,
			subItems: [],
		};

		while (
			stack.length &&
			stack[ stack.length - 1 ].level >= headingLevel
		) {
			stack.pop();
		}

		if ( stack.length > 0 ) {
			const lastItem = stack[ stack.length - 1 ];
			lastItem.subItems.push( newItem );
		} else {
			items.push( newItem );
		}

		stack.push( newItem );
	} );

	const buildNestedList = ( listItems ) => {
		return (
			<ol className="ablocks-toc-list">
				{ listItems.map( ( item, index ) => (
					<li key={ index } className="ablocks-toc-item">
						{ item.element }
						{ item.subItems.length > 0 &&
							buildNestedList( item.subItems ) }
					</li>
				) ) }
			</ol>
		);
	};

	return buildNestedList( items );
};

export const markerViewOptions = [
	{ label: 'None', value: 'none' },
	{ label: 'Bullet', value: 'disc' },
	{ label: 'Number', value: 'decimal' },
	{ label: 'Roman Number', value: 'lower-roman' },
	{ label: 'Alphabet', value: 'lower-alpha' },
	{ label: 'Circle', value: 'circle' },
	{ label: 'Square', value: 'square' },
];
