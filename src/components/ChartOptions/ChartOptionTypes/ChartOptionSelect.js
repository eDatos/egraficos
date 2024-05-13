import React from 'react';
import {  Col } from 'react-bootstrap';
import isObject from 'lodash/isObject';
import { useTranslation } from 'react-i18next';
import styles from './../ChartOptions.module.scss';

const ChartOptionSelect = ({
  options = [],
  value,
  error,
  onChange,
  default: defaultValue,
  label,
  ...props
}) => {
  const { t } = useTranslation(['visualoptions']);
  return (
    <div className={props.className}>
      <Col xs={6} className={styles['chart-option-label']}>
        {label}
      </Col>
      <Col xs={6}>
        <select
          className="custom-select"
          value={value ?? defaultValue}
          onChange={(e) => {
            const stringValue = e.target.value;
            const value =
              props.type === 'number' ? Number(stringValue) : stringValue;
            onChange(value);
          }}
        >
          {options.map((option) =>
            isObject(option) ? (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ) : (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>
        {error && (
          <small>
            <i>{error}</i>
          </small>
        )}
      </Col>
    </div>
  );
};

export default React.memo(ChartOptionSelect);
