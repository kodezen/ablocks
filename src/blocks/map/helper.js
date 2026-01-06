export const OSM = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export const GM =
	'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i349018013!3m9!2sen-US!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0';

export const GM_SATELLITE =
	'https://maps.googleapis.com/maps/vt?lyrs=s&x={x}&y={y}&z={z}&key=YOUR_API_KEY';

export const debounce = ( fn, delay ) => {
	let timer = null;
	return function ( ...args ) {
		const context = this;
		if ( timer ) {
			clearTimeout( timer );
		}
		timer = setTimeout( () => {
			return fn.apply( context, args );
		}, delay );
	};
};

export const getMapPosition = ( markerLists, position ) => {
	if ( markerLists && markerLists?.length ) {
		const index = markerLists[ position ] ? position : 0;
		const marker = markerLists[ index ];
		return {
			lat: marker?.lat,
			lng: marker?.lng,
		};
	}
	return {
		lat: 0,
		lng: 0,
	};
};

export const wpMapBlockToaBlocksMapMigration = ( attributes ) => {
	return {
		mapMarkerList: ( attributes?.map_marker_list || [] ).map(
			( marker, index ) => {
				return {
					id: marker?.id || index,
					label: marker?.title || `Marker ${ index + 1 }`,
					lat: '',
					lng: '',
					title: 'Marker',
					content: '',
					iconType: 'default',
					customIconUrl: '',
					customIconWidth: 25,
					customIconHeight: 40,
					isOpen: true,
					...marker,
					// id: marker?.id || index,
					// label: marker?.title || `Marker ${index + 1}`,
				};
			}
		),
		mapZoom: attributes?.map_zoom,
		mapType: attributes?.map_type,
		scrollWheelZoom: attributes?.scroll_wheel_zoom,
		centerIndex: attributes?.center_index,
	};
};
