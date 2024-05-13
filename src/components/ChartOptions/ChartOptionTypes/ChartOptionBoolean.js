import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from './../ChartOptions.module.scss';
import classNames from 'classnames';

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
      <div className={className}>
        <Col xs={6} className={styles['chart-option-label']}>
          {label}
        </Col>
        <Form className="col-6">
          <Form.Check
            type="switch"
            checked={!!value}
            disabled={!isEnabled}
            className={classNames("d-flex align-items-center", styles['chart-option-label'], styles['chart-option-check'])}
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
      </div>
    )
  );
};

export default React.memo(ChartOptionBoolean);
