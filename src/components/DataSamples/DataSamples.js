import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import styles from './DataSamples.module.scss'

const samplesList = [

  {
    name: 'Netflix Original Series 2013/2017',
    category: 'Bar chart',
    url: './sample-datasets/Bar chart - Netflix Original Series.tsv',
    delimiter: '\t',
    sourceName: 'M. Schroyer via Data World',
    sourceURL: 'https://data.world/mattschroyer/netflix-original-series',
  },

  // {
  //   name: '',
  //   category: '',
  //   url: './sample-datasets/',
  //   delimiter: '\t',
  //   sourceName: '',
  //   sourceURL: '',
  // },
]
export default function DataSamples({ onSampleReady, setLoadingError }) {
  const select = async (sample) => {
    const { delimiter, url } = sample
    let response
    try {
      response = await fetch(url)
    } catch (e) {
      setLoadingError('Loading error. ' + e.message)
      return
    }
    const text = await response.text()
    onSampleReady(text, delimiter)
    setLoadingError(null)
  }
  return (
    <Row>
      {samplesList
        // sort by category name
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((d, i) => {
          return (
            <Col xs={6} lg={4} xl={3} key={i} style={{ marginBottom: 15 }}>
              <Card className="cursor-pointer h-100">
                <Card.Body
                  onClick={() => {
                    select(d)
                  }}
                  className="d-flex flex-column"
                >
                  <Card.Title className="">
                    <h2 className="">{d.name}</h2>
                    <h4 className="m-0">{d.category}</h4>
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
          )
        })}
    </Row>
  )
}
