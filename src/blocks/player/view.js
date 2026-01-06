import ABlocksPlayer from './player';

function initializePlayer() {
	const accordionElements = document.querySelectorAll(
		'.ablocks-block--player'
	);
	accordionElements.forEach( ( element ) => {
		new ABlocksPlayer( element, false );
	} );
}
document.addEventListener( 'DOMContentLoaded', () => {
	initializePlayer();
} );
