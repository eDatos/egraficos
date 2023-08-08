import { Card, Form, Row } from 'react-bootstrap';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Typeahead, TypeaheadInputMulti } from 'react-bootstrap-typeahead';
import Token from '../WMSMap/Token';
import { BsXCircle } from 'react-icons/bs';

const SelectionLayerCombo = (props) => {
  const { t } = useTranslation(['translation']);
  const styleMap = { zIndex: `10${10 - props.index}` };
  const onMove = useCallback(
    (dragIndex, hoverIndex) => {
      const item = props.selectedLayers[dragIndex];

      const newSelected = props.selectedLayers.slice();
      newSelected.splice(dragIndex, 1);
      newSelected.splice(hoverIndex, 0, item);

      props.onChange(newSelected);
    },
    [props]
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <Form.Group className="mb-2">
        <Typeahead
          id="selection-layer"
          labelKey="Title"
          multiple
          onChange={props.onChange}
          options={props.layers}
          placeholder={t('global.section.wmslayerselection.title')}
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
  );
};

const SelectionStyle = ({
  options,
  layer,
  selectedLayers,
  setSelectedLayers,
  index,
}) => {
  const [styleSelected, setStyleSelected] = useState([]);
  const { t } = useTranslation(['translation']);

  const handleShowLayerNameChange = () => {
    let newSelectedLayers = [...selectedLayers];
    layer.showLayerName = !layer.showLayerName;
    if (!layer.showLayerName) {
      layer.hideStyleName = false;
    }
    newSelectedLayers[index] = layer;
    setSelectedLayers(newSelectedLayers);
  };
  return (
    <>
      <Card.Subtitle className="mt-3 mb-2">
        <b>{t('global.section.wmslayerselection.style.title')}: </b>
        {layer.Title}
      </Card.Subtitle>
      <Typeahead
        clearButton
        id="select-style"
        labelKey="styleTitle"
        multiple
        onChange={(stylesSelected) => {
          let newSelectedLayers = [...selectedLayers];
          layer.StyleSelected = stylesSelected;
          newSelectedLayers[index] = layer;
          setSelectedLayers(newSelectedLayers);
          setStyleSelected(stylesSelected);
        }}
        options={options}
        placeholder={t('global.section.wmslayerselection.style.placeholder')}
        selected={styleSelected}
      />
      <Card.Body>
        <Row>
          <Form.Check
            disabled={styleSelected.length === 0}
            id="showLegend"
            className="mr-4"
            label={t('global.section.wmslayerselection.style.legend')}
            type="switch"
            checked={layer.showLegend}
            onChange={() => {
              let newSelectedLayers = [...selectedLayers];
              layer.showLegend = !layer.showLegend;
              newSelectedLayers[index] = layer;
              setSelectedLayers(newSelectedLayers);
            }}
          />
          <Form.Check
            disabled={styleSelected.length === 0}
            id="showLayerName"
            className="mr-4"
            label={t('global.section.wmslayerselection.style.showlayer')}
            type="switch"
            checked={layer.showLayerName}
            onChange={handleShowLayerNameChange}
          />
          <Form.Check
            disabled={styleSelected.length === 0 || !layer.showLayerName}
            id="hideStyleName"
            label={t('global.section.wmslayerselection.style.hidestyle')}
            type="switch"
            checked={layer.hideStyleName}
            onChange={() => {
              let newSelectedLayers = [...selectedLayers];
              layer.hideStyleName = !layer.hideStyleName;
              newSelectedLayers[index] = layer;
              setSelectedLayers(newSelectedLayers);
            }}
          />
        </Row>
      </Card.Body>
    </>
  );
};

function LayersOptionCard({
  title,
  layers,
  selectedLayers,
  setSelectedLayers,
  index,
  onRemove,
}) {
  const styles = selectedLayers.flatMap((layer) => [
    {
      [layer.Name]: Object.fromEntries(
        Object.entries(layer).filter(
          ([key]) =>
            key !== 'Name' &&
            key !== 'Title' &&
            key !== 'showLegend' &&
            key !== 'showLayerName'
        )
      ),
    },
  ]);

  return (
    <Card className="mt-3" bg="Primary">
      <Card.Header className="d-flex justify-content-between">
        {title}
        <BsXCircle onClick={() => onRemove(index)}>Delete</BsXCircle>
      </Card.Header>
      <Card.Body>
        <Card.Title> Configuración de capas</Card.Title>
        <Form>
          <SelectionLayerCombo
            index={index}
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
              );
            return (
              <React.Fragment key={index}>
                {options.length > 0 && (
                  <SelectionStyle
                    options={options}
                    layer={layer}
                    selectedLayers={selectedLayers}
                    setSelectedLayers={setSelectedLayers}
                    index={index}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LayersOptionCard;
