import { useMemo, useRef } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { plugin_root_url } from '@Utils/helper';

const propTypes = {};

const defaultProps = {};

export default function DraggableMarker( { setLatLngHandler, center } ) {
	const markerRef = useRef( null );
	const eventHandlers = useMemo(
		() => ( {
			dragend() {
				const marker = markerRef.current;
				if ( marker !== null ) {
					const { lat, lng } = marker.getLatLng();
					setLatLngHandler( lat, lng );
				}
			},
		} ),
		[]
	);

	return (
		<Marker
			draggable={ true }
			eventHandlers={ eventHandlers }
			position={ center }
			icon={
				new L.Icon( {
					iconUrl: plugin_root_url + 'assets/images/marker-icon.png',
					popupAnchor: [ 0, -15 ],
					iconSize: [ 25, 41 ],
				} )
			}
			ref={ markerRef }
		></Marker>
	);
}

DraggableMarker.propTypes = propTypes;
DraggableMarker.defaultProps = defaultProps;
