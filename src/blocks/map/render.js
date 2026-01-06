import React, { useEffect, useRef } from 'react';
import metadata from './block.json';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import { OSM, GM, GM_SATELLITE, getMapPosition } from './helper';
import RenderContainer from '@Components/block-container/render2';
import { plugin_root_url } from '@Utils/helper';
const propTypes = {};

export default function Render( props ) {
	const { attributes } = props;
	const { block_id } = attributes;

	const tileLayerRef = useRef( null );
	const mapRef = useRef();
	const {
		mapWidth,
		mapHeight,
		mapMarkerList,
		centerIndex,
		mapType,
		mapZoom,
		scrollWheelZoom,
		iconHeight,
		iconWidth,
	} = attributes;

	const customIconImageUrl = attributes?.iconImageUrl;

	const GMType = mapType === 'GM' ? GM : OSM;
	useEffect( () => {
		if ( mapRef.current ) {
			mapRef.current.invalidateSize();
		}
	}, [ mapWidth?.value, mapHeight?.value ] );

	useEffect( () => {
		if ( tileLayerRef.current ) {
			tileLayerRef.current.setUrl(
				mapType === 'GM_SATELLITE' ? GM_SATELLITE : GMType
			);
		}
	}, [ mapType ] );

	useEffect( () => {
		if ( mapRef.current ) {
			mapRef.current.setView(
				getMapPosition( mapMarkerList, centerIndex )
			);
			mapRef.current.setZoom( mapZoom );
		}
	}, [ centerIndex, mapZoom, mapMarkerList ] );

	useEffect( () => {
		mapMarkerList.forEach( ( item ) => {
			const markerIndex = mapMarkerList?.findIndex(
				( marker ) => marker.id === item.id
			);
			if ( markerIndex !== -1 ) {
				mapMarkerList[ markerIndex ].customIconHeight = iconHeight;
				mapMarkerList[ markerIndex ].customIconWidth = iconWidth;
			}
		} );
	}, [ iconHeight, iconWidth ] );

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div className="ablocks-block-map-base-editor">
					<MapContainer
						id={ block_id }
						className="ablocks-block-map-base-editor__map-container"
						center={ getMapPosition( mapMarkerList, centerIndex ) }
						zoom={ mapZoom }
						scrollWheelZoom={ scrollWheelZoom }
						zoomControl={ false }
						dragging={ false }
						fullscreenControl={ false }
						ref={ mapRef }
					>
						<ZoomControl position="topright" />
						<TileLayer
							ref={ tileLayerRef }
							url={
								mapType === 'GM_SATELLITE'
									? GM_SATELLITE
									: GMType
							}
						/>
						{ mapMarkerList.map( ( item, index ) => (
							<Marker
								key={ index }
								position={ {
									lat: item.lat,
									lng: item.lng,
									zoom: 10,
								} }
								icon={
									new L.Icon( {
										iconUrl:
											item.customIconUrl ||
											customIconImageUrl ||
											plugin_root_url +
												'assets/images/marker-icon.png',
										iconSize: [
											item.customIconWidth,
											item.customIconHeight,
										],
										popupAnchor: [ 0, -15 ],
									} )
								}
							>
								{ item.title !== '' || item.content !== '' ? (
									<Popup>
										<h6>{ item.title }</h6>
										<p
											dangerouslySetInnerHTML={ {
												__html: item.content,
											} }
										></p>
									</Popup>
								) : null }
							</Marker>
						) ) }
					</MapContainer>
				</div>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
