import React, { useState } from 'react';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Col, Row } from 'react-bootstrap';
import Legend from './Legend';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import WMSCustomLayer from './WMSCustomLayer';
import Municipalities from '../Municipalities/Municipalities';
import { applicationConfig } from '../ApplicationConfig/ApplicationConfig';
import BingTileLayer from './BingTileLayer';

function WMSMap(props) {
  const center = [28.2, -16.5];
  const zoom = 8;
  const styleMap = { width: '100%', height: '80vh' };
  const [bingKey, setBingKey] = useState(null);
  const [accessToken, setAccesToken] = useState(null);
  applicationConfig().then((applicationConfigJson) => {
    setBingKey(applicationConfigJson['maps']['bing_key']);
    setAccesToken(applicationConfigJson['maps']['mapbox_token']);
  });

  return (
    <>
      <Row>
        <Col xs={3} className="pt-3 mb-3">
          <Municipalities
            onChange={(municipality) => {
              if (municipality[0]) {
                props.map.setView(
                  {
                    lat: municipality[0].lati_capi,
                    lng: municipality[0].long_capi,
                  },
                  15
                );
              }
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            style={styleMap}
            ref={props.setMap}
          >
            {bingKey && accessToken && (
              <LayersControl position="topright">
                <LayersControl.BaseLayer name="ISTAC" checked>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a>'
                    url={`https://api.mapbox.com/styles/v1/istac/cjucn2je5190f1ft71y0c829a/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Bing Maps Aerial With Labels">
                  <BingTileLayer
                    bingMapsKey={bingKey}
                    imagerySet="AerialWithLabels"
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Bing Maps Aerial">
                  <BingTileLayer bingMapsKey={bingKey} imagerySet="Aerial" />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Bing Maps Roads">
                  <BingTileLayer bingMapsKey={bingKey} imagerySet="Road" />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Positron (Light)">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Dark Matter">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                </LayersControl.BaseLayer>
                {props.sources.map((source) =>
                  source.selectedLayers.map((layer) => (
                    <LayersControl.Overlay
                      name={layer.Title}
                      checked
                      key={layer.Name}
                    >
                      <WMSCustomLayer
                        key={layer.Name}
                        layer={layer}
                        url={source.url}
                      />
                    </LayersControl.Overlay>
                  ))
                )}
              </LayersControl>
            )}
            {props.sources.map((source) =>
              source.selectedLayers.map((layer) => (
                <React.Fragment key={layer.Name}>
                  {layer.showLegend && (
                    <Legend
                      legendURL={layer.StyleSelected?.LegendURL}
                      layer={layer.Name}
                      layerTitle={layer.Title}
                    />
                  )}
                </React.Fragment>
              ))
            )}
          </MapContainer>
        </Col>
      </Row>
    </>
  );
}

export default WMSMap;
