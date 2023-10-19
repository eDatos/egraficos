import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChartOptionBoolean = ({
  optionId,
  label,
  value,
  error,
  onChange,
  className,
  isEnabled,
  show = true,
}) => {
  const { t } = useTranslation(['visualoptions']);
  return (
    show && (
      <Row className={className}>
        <Col xs={6} className="d-flex align-items-center">
          {label}
        </Col>
        <Form className="col-6 d-flex align-items-center">
          <Form.Check
            type="switch"
            checked={!!value}
            disabled={!isEnabled}
            onChange={(e) => {
              onChange(e.target.checked);
            }}
            id={optionId}
            label={value ? t('yes') : t('no')}
          />
        </Form>
        {error && (
          <div className="col-12">
            <small>
              <i>{error}</i>
            </small>
          </div>
        )}
      </Row>
    )
  );
};

export default React.memo(ChartOptionBoolean);
