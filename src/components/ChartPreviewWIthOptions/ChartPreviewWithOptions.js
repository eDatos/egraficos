import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ChartOptions from '../ChartOptions';
import ChartPreview from '../ChartPreview';
import { mapDataInWorker } from '../../worker';
import { WEBWORKER_ACTIVE } from '../../constants';


const ChartPreviewWithOptions = ({
  chart,
  dataset,
  dataTypes,
  mapping,
  visualOptions,
  setVisualOptions,
  setRawViz,
  setMappingLoading,
}) => {
  const [error, setError] = useState({
    variant: 'secondary',
    message: 'Required chart variables',
  });

  useEffect(() => {
    try {
      setMappingLoading(true);

      if (WEBWORKER_ACTIVE) {
        mapDataInWorker(
          chart.metadata.name,
          {
            data: dataset,
            mapping: mapping,
            dataTypes,
          },
          chart.rawCustomChart
        )
          .catch((err) => {
            console.error(err);
          })
          .finally(() => setMappingLoading(false));
      } else {
        setMappingLoading(false);
      }
    } catch (e) {
      console.error(e);
      setMappingLoading(false);
    }
  }, [
    chart,
    mapping,
    dataTypes,
    setError,
    setRawViz,
    setMappingLoading,
    dataset,
  ]);

  return (
    <Row>
      <Col xs={4} xl={3} className='py-top-20 py-bottom-10'>
        <ChartOptions
          chart={chart}
          dataset={dataset}
          mapping={mapping}
          dataTypes={dataTypes}
          visualOptions={visualOptions}
          setVisualOptions={setVisualOptions}
          error={error}
        />
      </Col>
      <Col xs={8} xl={9} className='py-top-20'>
      <ChartPreview
        chart={chart}
        dataset={dataset}
        mapping={mapping}
        visualOptions={visualOptions}
        error={error}
        setError={setError}
        setRawViz={setRawViz}
      />
      </Col>
    </Row>
  );
};

export default ChartPreviewWithOptions;
