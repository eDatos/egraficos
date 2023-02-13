import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import ChartOptions from '../ChartOptions'
import ChartPreview from '../ChartPreview'
import { mapDataInWorker } from '../../worker'
import { WEBWORKER_ACTIVE } from '../../constants'


const ChartPreviewWithOptions = ({
  chart,
  dataset,
  dataTypes,
  mapping,
  visualOptions,
  setVisualOptions,
  setRawViz,
  setMappingLoading,
  setOptions,
}) => {
  const [error, setError] = useState({variant: "secondary", message: "Required chart variables"})

  useEffect(() => {
    try {
      setMappingLoading(true)

      if (WEBWORKER_ACTIVE) {
        mapDataInWorker(chart.metadata.name, {
          data: dataset,
          mapping: mapping,
          dataTypes,
        }, chart.rawCustomChart)
          .then(() => {
            setMappingLoading(false)
          })
          .catch((err) => {
            console.error(err)
            setMappingLoading(false)
          })
      } else {
        setMappingLoading(false)
      }
    } catch (e) {
      console.error(e)
      setMappingLoading(false)
    }
  }, [
    chart,
    mapping,
    dataTypes,
    setError,
    setRawViz,
    setMappingLoading,
    dataset,
  ])

  return (
    <Row>
        <ChartOptions
          chart={chart}
          dataset={dataset}
          mapping={mapping}
          dataTypes={dataTypes}
          visualOptions={visualOptions}
          setVisualOptions={setVisualOptions}
          error={error}
        /> 
        <ChartPreview
          chart={chart}
          dataset={dataset}
          mapping={mapping}
          visualOptions={visualOptions}
          error={error}
          setError={setError}
          setRawViz={setRawViz}
          setOptions={setOptions}
        />
    </Row>
  )
}

export default ChartPreviewWithOptions
