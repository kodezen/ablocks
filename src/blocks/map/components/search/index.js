import React, { useState, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { MapContainer, TileLayer } from 'react-leaflet';
import DraggableMarker from './DraggableMarker';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import { OSM, GM, getMapPosition } from './../../helper';
import PlaceSearch from './PlaceSearch';

const propTypes = {};

export default function Search( { index, attributes, setAttributes } ) {
	const mapRef = useRef();
	const { mapMarkerList } = attributes;
	const [ center, setCenter ] = useState(
		getMapPosition( mapMarkerList, index )
	);

	const setLatLngHandler = ( lat, lng ) => {
		if ( mapRef.current ) {
			mapRef.current.setView( { lat, lng } );
		}
		setCenter( { lat, lng } );
		setAttributes( {
			mapMarkerList: mapMarkerList.reduce( ( acc, item, key ) => {
				if ( index === key ) {
					item.lat = lat;
					item.lng = lng;
				}
				acc.push( item );
				return acc;
			}, [] ),
		} );
	};

	return (
		<React.Fragment>
			<div className="ablocks-block-map-modal-location-search">
				<PlaceSearch setLatLngHandler={ setLatLngHandler } />
				<div className="ablocks-block-map-modal-location-search__map">
					<MapContainer
						style={ {
							width: '100%',
							height: '200px',
						} }
						center={ center }
						zoom={ 13 }
						ref={ mapRef }
					>
						<TileLayer
							url={ attributes.map_type === 'OSM' ? OSM : GM }
						/>
						<DraggableMarker
							center={ center }
							setLatLngHandler={ setLatLngHandler }
						/>
					</MapContainer>
					<span className="ablocks-block-map-note">
						{ __(
							'Draggable Marker, Your can easily change your marker position by Dragging',
							'ablocks'
						) }
					</span>
				</div>
			</div>
		</React.Fragment>
	);
}

Search.propTypes = propTypes;
