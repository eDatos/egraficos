import React, { useCallback, useState } from 'react';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import WMSCustomLayer from './WMSCustomLayer';
import BingTileLayer from './BingTileLayer';
import 'leaflet/dist/leaflet.css';
import Legend from './Legend';
import { applicationConfig } from '../ApplicationConfig/ApplicationConfig';

export default function EgraphMapContainer(props) {
  const styleMap = { width: '100%', height: '80vh' };
  const [bingKey, setBingKey] = useState(null);
  const [accessToken, setAccesToken] = useState(null);
  applicationConfig(props.baseUrl).then((applicationConfigJson) => {
    setBingKey(applicationConfigJson['maps']['bing_key']);
    setAccesToken(applicationConfigJson['maps']['mapbox_token']);
  });

  const selectedStyles = useCallback((layer) => {
    return layer.StyleSelected ?? [{ styleName: '' }];
  }, []);

  const layerName = useCallback((layer, style) => {
    if (layer.hideStyleName) {
      return layer.Title;
    }
    var name = style.styleName !== '' ? style.styleTitle : layer.Title;
    if (layer.showLayerName && name !== '') {
      return `${layer.Title} - ${name}`;
    }
    return name;
  }, []);

  return (
    <MapContainer
      center={props.center}
      zoom={props.zoom}
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
            source.selectedLayers.map((layer) => {
              return selectedStyles(layer).map((style, index) => (
                <LayersControl.Overlay
                  name={layerName(layer, style)}
                  checked
                  key={layerName(layer, style)}
                >
                  <WMSCustomLayer
                    key={layerName(layer, style)}
                    layer={layer}
                    url={source.url}
                    style={style.styleName}
                    identify={index === 0}
                  />
                </LayersControl.Overlay>
              ));
            })
          )}
        </LayersControl>
      )}
      {props.sources.map((source) =>
        source.selectedLayers.map((layer) => {
          return selectedStyles(layer).map((style) => (
            <React.Fragment key={layerName(layer, style)}>
              {layer.showLegend && (
                <Legend
                  legendURL={style.LegendURL}
                  layer={layerName(layer, style)}
                  layerTitle={layerName(layer, style)}
                />
              )}
            </React.Fragment>
          ));
        })
      )}
    </MapContainer>
  );
}
