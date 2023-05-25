import React, { useCallback } from 'react'
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Col, Form, Row } from 'react-bootstrap'
import { Typeahead, TypeaheadInputMulti } from 'react-bootstrap-typeahead'
import Token from './Token'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Legend from './Legend'

import 'react-bootstrap-typeahead/css/Typeahead.css'
import { useTranslation } from 'react-i18next'
import WMSCustomLayer from './WMSCustomLayer'
import Municipalities from '../Municipalities/Municipalities'

const SelectionLayerCombo = (props) => {
  const { t } = useTranslation(['translation'])
  const styleMap = { zIndex: '1001' }
  const onMove = useCallback(
    (dragIndex, hoverIndex) => {
      const item = props.selectedLayers[dragIndex]

      const newSelected = props.selectedLayers.slice()
      newSelected.splice(dragIndex, 1)
      newSelected.splice(hoverIndex, 0, item)

      props.onChange(newSelected)
    },
    [props]
  )
  return (
    <DndProvider backend={HTML5Backend}>
      <Form.Group className="mb-2">
        <Typeahead
          id="selection-layer"
          labelKey="Title"
          multiple
          onChange={props.onChange}
          options={props.layers}
          placeholder={t('global.section.wmslayerselection.tittle')}
          style={styleMap}
          renderInput={(inputProps, childProps) => (
            <TypeaheadInputMulti
              {...inputProps}
              selected={props.selectedLayers}
            >
              {props.selectedLayers.map((option, idx) => (
                <Token
                  index={idx}
                  key={option.Title}
                  onMove={onMove}
                  onRemove={childProps.onRemove}
                  option={option}
                >
                  {option.Title}
                </Token>
              ))}
            </TypeaheadInputMulti>
          )}
          selected={props.selectedLayers}
        />
      </Form.Group>
    </DndProvider>
  )
}

function WMSMap(props) {
  const center = [28.2, -16.5]
  const zoom = 8
  const styleMap = { width: '100%', height: '80vh' }
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
                )
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
              {props.selectedLayers.map((layer) => (
                <LayersControl.Overlay
                  name={layer['Title']}
                  checked
                  key={layer['Name']}
                >
                    <WMSCustomLayer
                      key={layer['Name']}
                      layer={layer}
                      url={props.url}
                    />

                </LayersControl.Overlay>
              ))}
            </LayersControl>
            <div>
              {props.selectedLayers.map((layer) => (
                <React.Fragment key={layer['Name']}>
                  {layer.StyleSelected && (
                    <Legend
                      legendURL={layer.StyleSelected['LegendURL']}
                      layer={layer['Name']}
                      layerTitle={layer['Title']}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </MapContainer>
        </Col>
      </Row>
    </>
  )
}

export default WMSMap
