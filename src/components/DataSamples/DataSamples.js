import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import styles from './DataSamples.module.scss';
import { useTranslation } from 'react-i18next';
import { applicationSampleDatasets } from '../ApplicationConfig/ApplicationConfig';

export default function DataSamples({ onSampleReady, setLoadingError }) {
  const { t } = useTranslation();
  const [samplesList, setSamplesList] = useState([]);
  useEffect(() => {
    applicationSampleDatasets().then((json) => setSamplesList(json));
  }, [setSamplesList]);

  const select = async (sample) => {
    const { delimiter, url } = sample;
    let response;
    try {
      response = await fetch(url);
    } catch (e) {
      setLoadingError('Loading error. ' + e.message);
      return;
    }
    const text = await response.text();
    onSampleReady(text, delimiter);
    setLoadingError(null);
  };
  return (
    <Row>
      {samplesList.map((d, i) => {
        return (
          <Col xs={12} lg={6} xl={6} key={i} style={{ marginBottom: 15 }}>
            <Card className="custom-card cursor-pointer h-100">
              <Card.Body
                onClick={() => {
                  select(d);
                }}
                className="d-flex flex-column"
              >
                <Card.Title className="">
                  <h2 className="">{t(d.name)}</h2>
                  <h4 className="m-0">{t(d.category)}</h4>
                </Card.Title>
              </Card.Body>
              <a
                href={d.sourceURL}
                className={[styles['dataset-source']].join(' ')}
              >
                Source: {d.sourceName}
              </a>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
