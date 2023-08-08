import React from 'react';
import { Col, Row } from 'react-bootstrap';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import Municipalities from '../Municipalities/Municipalities';
import EgraphMapContainer from './EgraphMapContainer';

function WMSMap(props) {
  const center = [28.2, -16.5];
  const zoom = 8;
  return (
    <>
      <Row>
        <Col xs={3} className="pt-3 mb-3">
          <Municipalities
            onChange={(municipality) => {
              if (municipality[0]) {
                props.map.setView(
                  {
                    lat: municipality[0].lati_capi,
                    lng: municipality[0].long_capi,
                  },
                  15
                );
              }
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <EgraphMapContainer
            center={center}
            zoom={zoom}
            setMap={props.setMap}
            sources={props.sources}
          />
        </Col>
      </Row>
    </>
  );
}

export default WMSMap;
