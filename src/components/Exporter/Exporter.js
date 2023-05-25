import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import uuid from 'react-uuid'

function downloadBlob(url, filename) {
  // Create a new anchor element
  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'download'
  a.click()
  return a
}

export default function Exporter({
  rawViz,
  exportProject,
  userData,
  dataSource,
  chartIndex,
  mapping,
  visualOptions,
  dataTypes,
  dimensions,
  locale,
  decimalsSeparator,
  thousandsSeparator,
  selectedLayers,
  map,
}) {
  const download = useCallback(
    (filename, format) => {
      downloadBlob(rawViz.getDataURL({ type: format }), filename)
    },
    [rawViz]
  )

  const downloadProject = useCallback(
    async (filename) => {
      const project = await exportProject()
      const str = JSON.stringify(project)
      const blob = new Blob([str], { type: 'application/json' })
      const DOMURL = window.URL || window.webkitURL || window
      const url = DOMURL.createObjectURL(blob)
      downloadBlob(url, filename)
      DOMURL.revokeObjectURL(url)
    },
    [exportProject]
  )

  const [exportFormats, setExportFormats] = useState(['edatosgraphs'])
  const [currentFormat, setCurrentFormat] = useState('edatosgraphs')
  const [currentFile, setCurrentFile] = useState('viz')
  const [dynamicLoadWidget, setDynamicLoadWidget] = useState(true)
  const [position, setPosition] = useState(() => map?.getCenter())
  const [mapZoom, setMapZoom] = useState(() => map?.getZoom())

  const handleOnChangeDynamicLoadWidget = () => {
    setDynamicLoadWidget(!dynamicLoadWidget)
  }
  const downloadViz = useCallback(() => {
    switch (currentFormat) {
      case 'svg':
        download(`${currentFile}.svg`, 'svg')
        break
      case 'png':
        download(`${currentFile}.png`, 'png')
        break
      case 'edatosgraphs':
        downloadProject(`${currentFile}.edatosgraphs`)
        break
      default:
        break
    }
  }, [currentFile, currentFormat, download, downloadProject])

  const getWidgetHeader = (generatedUUID) =>
    '<div id="chart-container-' +
    generatedUUID +
    '"></div>\n' +
    '<script src="' +
    window.location.href +
    'widget/widget.js"></script>\n'

  function getWidget(type) {
    const generatedUUID = uuid()

    const props =
      type === 'wms'
        ? getWmsWidgetProps(generatedUUID)
        : getEGraphWidgetProps(generatedUUID)
    return (
      getWidgetHeader(generatedUUID) +
      '<script>\n' +
      `    EdatosGraphs.widgets.${type}.render(` +
      JSON.stringify(props) +
      ');\n' +
      '</script>'
    )
  }

  function getWmsWidgetProps(generatedUUID) {
    return {
      selector: '#chart-container-' + generatedUUID,
      layers: selectedLayers,
      url: dataSource.url,
      center: [position.lat, position.lng],
      zoom: mapZoom,
    }
  }

  function getEGraphWidgetProps(generatedUUID) {
    const dataMappings = Object.keys(mapping)
      .map((key) => mapping[key].value)
      .flat(1)
      .filter(Boolean)

    function getFilteredUserData() {
      return userData.map((entry) =>
        Object.keys(entry)
          .filter((key) => dataMappings.includes(key))
          .reduce((obj, key) => {
            obj[key] = entry[key]
            return obj
          }, {})
      )
    }

    function getFilteredDataTypes() {
      return Object.fromEntries(
        Object.entries(dataTypes).filter(([key]) => dataMappings.includes(key))
      )
    }

    return {
      selector: '#chart-container-' + generatedUUID,
      renderer: visualOptions.render,
      chartIndex: chartIndex,
      locale: locale,
      decimalsSeparator: decimalsSeparator,
      thousandsSeparator: thousandsSeparator,
      source: dataSource,
      visualOptions: visualOptions,
      mapping: mapping,
      dataTypes: getFilteredDataTypes(),
      dimensions: dimensions,
      data: !dynamicLoadWidget || !dataSource?.url ? getFilteredUserData() : [],
    }
  }

  useEffect(() => {
    const baseExportFormats = ['edatosgraphs', 'widget']
    const newExportFormats =
      visualOptions.render === 'svg'
        ? [...baseExportFormats, 'svg']
        : [...baseExportFormats, 'png']
    setExportFormats(newExportFormats)
    setCurrentFormat('edatosgraphs')
  }, [visualOptions.render])

  const onMapMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  const onMapZoom = useCallback(() => {
    setMapZoom(map.getZoom())
  }, [map])

  useEffect(() => {
    map?.on('move', onMapMove)
    map?.on('zoom', onMapZoom)
    return () => {
      map?.off('move', onMapMove)
      map?.off('zoom', onMapZoom)
    }
  }, [map, onMapMove, onMapZoom])

  return (
    <>
      <div className="row">
        <div className="col col-sm-3">
          <InputGroup className="mb-3 raw-input-group">
            <input
              type="text"
              className="form-control text-field"
              value={currentFile}
              onChange={(e) => setCurrentFile(e.target.value)}
            ></input>
            <DropdownButton
              as={InputGroup.Append}
              title={`.${currentFormat}`}
              id="input-group-dropdown-1"
              className="raw-dropdown"
            >
              {exportFormats.map((d) => {
                return (
                  <Dropdown.Item key={d} onClick={() => setCurrentFormat(d)}>
                    .{d}
                  </Dropdown.Item>
                )
              })}
            </DropdownButton>
          </InputGroup>
        </div>
        {currentFormat !== 'widget' && (
          <div className="col col-sm-2">
            <button
              className="btn btn-primary btn-block raw-btn"
              onClick={downloadViz}
            >
              Download
            </button>
          </div>
        )}
      </div>
      {currentFormat === 'widget' &&
        dataSource.url &&
        dataSource.type !== 'wms' && (
          <div className="row">
            <div className="col col-sm-12">
              <Form.Check
                id="dynamicLoadWidget"
                label="Generar widget dinámico con carga de datos por url"
                type="switch"
                checked={dynamicLoadWidget}
                onChange={handleOnChangeDynamicLoadWidget}
              />
            </div>
          </div>
        )}
      {currentFormat === 'widget' && (
        <div className="row">
          <div className="col cos-sm-12">
            <textarea
              value={getWidget(dataSource.type !== 'wms' ? 'egraph' : 'wms')}
              style={{
                backgroundColor: 'white',
                border: '1px solid lightgrey',
                borderRadius: 4,
                width: '100%',
                padding: '1rem',
                minHeight: '250px',
                height: '40vh',
              }}
              readOnly
            />
          </div>
        </div>
      )}
    </>
  )
}
