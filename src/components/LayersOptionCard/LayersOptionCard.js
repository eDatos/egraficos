import { Card, Form } from 'react-bootstrap'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Typeahead, TypeaheadInputMulti } from 'react-bootstrap-typeahead'
import Token from '../WMSMap/Token'

const SelectionLayerCombo = (props) => {
  const { t } = useTranslation(['translation'])
  const styleMap = { zIndex: '1001' }
  const onMove = useCallback(
    (dragIndex, hoverIndex) => {
      console.log('OnMove')
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

function LayersOptionCard({
  url,
  title,
  layers,
  selectedLayers,
  setSelectedLayers,
}) {
  return (
    <Card className="mt-3" bg="Primary">
      <Card.Header>WMS: {url}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Configuración de capas
        </Card.Text>
        <Form>
        <SelectionLayerCombo
          layers={layers}
          selectedLayers={selectedLayers}
          onChange={setSelectedLayers}
        />
          <Card.Text>Mostrar Leyenda</Card.Text>
          {selectedLayers.map((layer) =>
              <Form.Check type="checkbox" className="mt-2">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>{layer.Title}</Form.Check.Label>
              </Form.Check>
          )}
        </Form>
      </Card.Body>
    </Card>
  )
}

export default LayersOptionCard
