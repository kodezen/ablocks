/******/ (() => { // webpackBootstrap
/*!********************************!*\
  !*** ./src/blocks/map/view.js ***!
  \********************************/
/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
  if (window?.ABlocksGlobal && window?.ABlocksGlobal?.is_gutenberg_editor) {
    return;
  }
  const MapBlockRender = (element, Settings) => {
    const iconHeight = Settings.iconHeight;
    const iconWidth = Settings.iconWidth;
    const OSM = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const GM = 'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i349018013!3m9!2sen-US!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0';
    const GM_SATELLITE = 'https://maps.googleapis.com/maps/vt?lyrs=s&x={x}&y={y}&z={z}&key=YOUR_API_KEY';
    const cities = L.layerGroup();
    Settings.mapMarkerList.forEach(function (item) {
      let popupHTML = '';
      if (item.title !== '') {
        popupHTML += '<h6>' + item.title + '</h6>';
      }
      if (item.content !== '') {
        popupHTML += '<p>' + item.content + '</p>';
      }
      if (item.iconType === 'custom') {
        const LeafIcon = L.Icon.extend({
          options: {
            iconSize: [item.customIconWidth, item.customIconHeight],
            popupAnchor: [0, -15]
          }
        });
        const icon = new LeafIcon({
          iconUrl: item.customIconUrl
        });
        if (item.title !== '' || item.content !== '') {
          L.marker([item.lat, item.lng], {
            icon
          }).bindPopup(popupHTML).addTo(cities);
        } else {
          L.marker([item.lat, item.lng], {
            icon
          }).addTo(cities);
        }
      } else if (item.title !== '' || item.content !== '') {
        L.marker([item.lat, item.lng], {
          icon: new L.Icon({
            iconUrl: Settings?.defaultMarkerIcon,
            iconSize: [iconWidth, iconHeight],
            popupAnchor: [0, -15]
          })
        }).bindPopup(popupHTML).addTo(cities);
      } else {
        L.marker([item.lat, item.lng], {
          icon: new L.Icon({
            iconUrl: Settings?.defaultMarkerIcon,
            iconSize: [iconWidth, iconHeight],
            popupAnchor: [0, -15]
          })
        }).addTo(cities);
      }
    });
    const GMType = Settings.mapType === 'OSM' ? OSM : GM;
    const mapType = Settings.mapType === 'GM_SATELLITE' ? GM_SATELLITE : GMType;
    const grayscale = L.tileLayer(mapType, {
      id: 'mapbox/light-v9'
    });
    const config = {
      zoom: Settings.mapZoom,
      zoomControl: false,
      layers: [grayscale, cities],
      scrollWheelZoom: Settings.scrollWheelZoom,
      dragging: !L.Browser.mobile,
      tap: !L.Browser.mobile
    };
    if (Settings.mapMarkerList.length && Settings.mapMarkerList[Settings.centerIndex]) {
      config.center = [Settings.mapMarkerList[Settings.centerIndex].lat, Settings.mapMarkerList[Settings.centerIndex].lng];
    }
    const map = L.map(element, config);

    // Add the fullscreen control
    map.addControl(new L.Control.Fullscreen({
      position: 'topleft'
    }));

    // Add zoom control
    L.control.zoom({
      position: 'topright'
    }).addTo(map);
  };
  const mapBlockWrapper = document.querySelectorAll('.ablocks-map-block');
  if (mapBlockWrapper.length) {
    mapBlockWrapper.forEach(element => {
      MapBlockRender(element, JSON.parse(element.getAttribute('data-settings')));
    });
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map