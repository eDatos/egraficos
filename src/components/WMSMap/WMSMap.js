import React from 'react';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Col, Row } from 'react-bootstrap';
import Legend from './Legend';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import WMSCustomLayer from './WMSCustomLayer';
import Municipalities from '../Municipalities/Municipalities';

function WMSMap(props) {
  const center = [28.2, -16.5];
  const zoom = 8;
  const styleMap = { width: '100%', height: '80vh' };
  return (
    <>
      <Row>
        <Col xs={3} className="pt-3">
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
        <Col>
          <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            style={styleMap}
            ref={props.setMap}
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="openStreet" checked>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
