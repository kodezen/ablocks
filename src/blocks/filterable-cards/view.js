import FilterableCards from './filterable';

document.addEventListener( 'DOMContentLoaded', () => {
	const filterableContainers = document.querySelectorAll(
		'.ablocks-block--filterable-cards'
	);

	filterableContainers.forEach( ( element ) => {
		new FilterableCards( element );
	} );
} );
