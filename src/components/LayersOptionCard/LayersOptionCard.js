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
  const styles = selectedLayers.flatMap((layer) => [
    {
      [layer.Name]: Object.fromEntries(
        Object.entries(layer).filter(
          ([key]) => key !== 'Name' && key !== 'Title'
        )
      ),
    },
  ])

  return (
    <Card className="mt-3" bg="Primary">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>Configuración de capas</Card.Title>
        <Form>
          <SelectionLayerCombo
            layers={layers}
            selectedLayers={selectedLayers}
            onChange={setSelectedLayers}
          />
          {selectedLayers.map((layer, index) => {
            const options = styles
              .filter((o) => o[layer.Name])
              .flatMap((o) => o[layer.Name])
              .reduce(
                (acc, curr) =>
                  acc.concat(
                    Object.entries(curr).flatMap(([k, v]) =>
                      k !== 'StyleSelected' ? v : []
                    )
                  ),
                []
              )
            if (options.length > 0) {
              return (
                <>
                  <Card.Text className="mt-3"><b>Selecciona estilo para capa: </b>{layer.Title}</Card.Text>
                  <Typeahead
                    id="select-style"
                    labelKey="styleTitle"
                    onChange={(stylesSelected) => {
                      let newSelectedsLayer = [...selectedLayers]
                      layer.StyleSelected = stylesSelected[0]
                      newSelectedsLayer[index] = layer
                      setSelectedLayers(newSelectedsLayer)
                    }}
                    options={options}
                    placeholder="Default style"
                  />
                </>
              )
            }
            return <></>
          })}
        </Form>
      </Card.Body>
    </Card>
  )
}

export default LayersOptionCard
