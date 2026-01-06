import ABImageHotspot from './image-hotspot';

function initialImageHotspot() {
	const imageHotspots = document.querySelectorAll(
		'.ablocks-block--image-hotspot'
	);

	imageHotspots.forEach( ( element ) => {
		new ABImageHotspot( element );
	} );
}

document.addEventListener( 'DOMContentLoaded', () => {
	initialImageHotspot();
} );
