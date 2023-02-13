import React, {useCallback, useEffect, useState} from 'react'
import { InputGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import uuid from 'react-uuid'

function downloadBlob(url, filename) {
  // Create a new anchor element
  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'download'
  a.click()
  return a
}

export default function Exporter({ rawViz, exportProject, render, options }) {
  const download = useCallback(
    (filename, format) => {
      downloadBlob(rawViz.getDataURL({type: format}), filename)
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
  }, [
      currentFile,
      currentFormat,
      download,
      downloadProject
  ])

  function getWidget() {
      const generatedUUID = uuid();
      return '<div id="chart-container-' + generatedUUID + '" style="position: relative; height: 100vh; overflow: hidden;"></div>\n' +
          '  <script src="' + window.location.href +'echarts.min.js"></script>\n' +
          '  <script src="' + window.location.href +'edatosgraphs.js"></script>\n' +
          '  <script>\n' +
          '      renderGraph(' + JSON.stringify(options) + ', \'chart-container-' + generatedUUID +'\')\n' +
          '  </script>'
  }

  useEffect(() => {
      const baseExportFormats = ['edatosgraphs', 'widget']
      const newExportFormats = render === 'svg' ? [...baseExportFormats, 'svg'] : [...baseExportFormats, 'png']
      setExportFormats(newExportFormats)
      setCurrentFormat('edatosgraphs')
  },[render])

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
            {exportFormats
                .map(d => {
                  return (
                    <Dropdown.Item key={d} onClick={() => setCurrentFormat(d)}>
                      .{d}
                    </Dropdown.Item>
                  )
            })}
          </DropdownButton>
        </InputGroup>
      </div>
      { currentFormat !== 'widget' && (
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
    { currentFormat === 'widget' && (
        <div className="col cos-sm-12">
              <textarea
                  value = {getWidget()}
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
    )}
    </>
  )
}
