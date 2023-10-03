import React from 'react';
import classNames from 'classnames';
import { Row, Col, Card } from 'react-bootstrap';
import styles from './ChartSelector.module.scss';
import { useTranslation } from 'react-i18next';

function ChartSelector({ availableCharts, currentChart, setCurrentChart }) {
  const charts = availableCharts;
  const { t } = useTranslation(['translation']);
  return (
    <>
      <Row>
        <Col xs={3} className="pt-3">
          {currentChart && (
            <Card className={styles.currentChart}>
              <Card.Img variant="top" src={currentChart.metadata.thumbnail} />
              <Card.Body>
                <Card.Title className="m-0">
                  <h2 className="m-0">{t(currentChart.metadata.name)}</h2>
                </Card.Title>
                <Card.Subtitle className="m-0">
                  <h4 className="mb-2">{currentChart.metadata.category}</h4>
                </Card.Subtitle>
                <Card.Text>{t(currentChart.metadata.description)}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col>
          <Row>
            {charts.map((d, i) => {
              const categories = d.metadata.categories.map((s) => t(s));
              return (
                <Col xs={4} key={'chart-' + i} className={`p-3`}>
                  <Card
                    onClick={() => {
                      setCurrentChart(d);
                    }}
                    className={classNames(
                      'flex-row h-100 cursor-pointer custom-card',
                      {
                        active: d === currentChart ? 'active' : '',
                        [styles.customChart]: !!d.rawCustomChart,
                      }
                    )}
                  >
                    <div
                      className={`h-100 w-25 ${styles.thumbnail}`}
                      style={{ backgroundImage: `url("${d.metadata.icon}")` }}
                    ></div>
                    <Card.Body className="w-75 px-2 py-3">
                      <Card.Title className="m-0">
                        <h2 className="m-0">{t(d.metadata.name)}</h2>
                      </Card.Title>
                      <Card.Subtitle className="m-0">
                        <h4 className="m-0">
                          {categories.join(', ').charAt(0).toUpperCase() +
                            categories.join(', ').slice(1)}
                        </h4>
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
            <Col xs={4} className={`p-3`}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default React.memo(ChartSelector);
