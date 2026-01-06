const ablocksFlipBox = ( element ) => {
	const flipboxWrapper = element.children[ 0 ];

	if ( ! flipboxWrapper ) {
		return;
	}

	// query for the theme class to determine if the block is in the FSE theme
	const theme = document.querySelector( '.ablocks-is-fse-theme' );
	const isFseTheme = theme ? true : false;

	// Destructure the child elements, assuming the front and back elements are at specific positions
	const frontNdBack = flipboxWrapper.querySelectorAll(
		'.ablocks-block--flip-box-child'
	);

	if ( ! frontNdBack || frontNdBack.length < 2 ) {
		element.style.pointerEvents = 'none';
		element.style.cursor = 'default';

		return;
	}

	const frontChild = frontNdBack[ 0 ].children[ 0 ];
	const backChild = frontNdBack[ 1 ].children[ 0 ];

	// Get the .ablocks-block--flip-box-child element and its width
	const blockFlipBoxChild = element.querySelectorAll(
		'.ablocks-block--flip-box-child'
	);
	// const blockFlipBoxChildWidth = blockFlipBoxChild
	// 	? blockFlipBoxChild.offsetWidth
	// 	: 0;
	// there are two .ablocks-block--flip-box-child elements, so we need to get the width of the largest one
	let blockFlipBoxChildWidth = 0;
	blockFlipBoxChild.forEach( ( child ) => {
		const childWidth = child.offsetWidth;
		if ( childWidth > blockFlipBoxChildWidth ) {
			blockFlipBoxChildWidth = childWidth;
		}
	} );

	// Calculate the maximum height of the front and back children
	const frontHeight = frontChild.offsetHeight;
	const backHeight = backChild.offsetHeight;
	const maxHeight = Math.max( frontHeight, backHeight );

	// Calculate the maximum width of the front and back children
	const frontWidth = frontChild.offsetWidth;
	const backWidth = backChild.offsetWidth;
	const maxWidth = Math.max( frontWidth, backWidth );

	// Set the minimum width to be equal to .ablocks-block--flip-box-child if it's larger
	const effectiveWidth = Math.max( maxWidth, blockFlipBoxChildWidth );

	if ( ! isFseTheme ) {
		// set max height to both front and back children
		frontChild.style.height = `${ maxHeight }px`;
		backChild.style.height = `${ maxHeight }px`;

		// set max width to both front and back children
		frontChild.style.width = `${ effectiveWidth }px`;
		backChild.style.width = `${ effectiveWidth }px`;
	} else {
		const frontBorder = frontChild.offsetHeight - frontChild.clientHeight;
		const frontBorderWidth =
			frontChild.offsetWidth - frontChild.clientWidth;

		// Helper function to calculate the total padding of an element
		const getPadding = ( e, direction = 'vertical' ) => {
			const style = window.getComputedStyle( e );
			if ( direction === 'vertical' ) {
				return (
					parseInt( style.paddingTop ) +
					parseInt( style.paddingBottom )
				);
			}
			return (
				parseInt( style.paddingLeft ) + parseInt( style.paddingRight )
			);
		};

		// Calculate the padding for both the front and back child elements
		const frontPaddingVertical = getPadding( frontChild, 'vertical' );
		const backPaddingVertical = getPadding( backChild, 'vertical' );
		const maxPaddingVertical = Math.max(
			frontPaddingVertical,
			backPaddingVertical
		);

		const frontPaddingHorizontal = getPadding( frontChild, 'horizontal' );
		const backPaddingHorizontal = getPadding( backChild, 'horizontal' );
		const maxPaddingHorizontal = Math.max(
			frontPaddingHorizontal,
			backPaddingHorizontal
		);

		// Helper function to adjust the height and width of an element based on padding differences
		const adjustDimensions = ( e, paddingDiffHeight, paddingDiffWidth ) => {
			e.style.height = `${
				maxHeight - frontBorder - maxPaddingVertical + paddingDiffHeight
			}px`;
			e.style.width = `${
				effectiveWidth -
				frontBorderWidth -
				maxPaddingHorizontal +
				paddingDiffWidth
			}px`;
		};

		// Set the adjusted height and width to both the front and back child elements
		adjustDimensions(
			frontChild,
			maxPaddingVertical - frontPaddingVertical,
			maxPaddingHorizontal - frontPaddingHorizontal
		);
		adjustDimensions(
			backChild,
			maxPaddingVertical - backPaddingVertical,
			maxPaddingHorizontal - backPaddingHorizontal
		);
	}
};

export default ablocksFlipBox;
