import React from 'react';
import { Col, Row } from 'react-bootstrap';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import EgraphMapContainer from './EgraphMapContainer';

function WMSMap(props) {
  const center = [28.2, -16.5];
  const zoom = 8;
  return (
    <Row>
      <Col className='py-top-20'>
        <EgraphMapContainer
          center={center}
          zoom={zoom}
          setMap={props.setMap}
          sources={props.sources}
          />
      </Col>
    </Row>
  );
}

export default WMSMap;
