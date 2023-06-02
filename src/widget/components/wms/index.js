import React from 'react'
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Legend from '../../../components/WMSMap/Legend'
import WMSCustomLayer from '../../../components/WMSMap/WMSCustomLayer'
import * as WMS from 'leaflet.wms'

const EDatosWMS = (props) => {
  const styleMap = { width: '100%', height: '80vh' }
  return (
    <MapContainer
      center={props.center}
      zoom={props.zoom}
      scrollWhellZoom={false}
      style={styleMap}
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
              name={layer['Title']}
              checked
              key={layer['Name']}
            >
              <WMSCustomLayer
                key={layer['Name']}
                layer={layer}
                url={source.url}
              />
            </LayersControl.Overlay>
          ))
        )}
      </LayersControl>
      {props.sources.map((source) =>
        source.selectedLayers.map((layer) => (
          <React.Fragment key={layer['Name']}>
            {layer.showLegend && (
              <Legend
                legendURL={layer.StyleSelected['LegendURL']}
                layer={layer['Name']}
                layerTitle={layer['Title']}
              />
            )}
          </React.Fragment>
        ))
      )}
    </MapContainer>
  )
}

export default EDatosWMS
