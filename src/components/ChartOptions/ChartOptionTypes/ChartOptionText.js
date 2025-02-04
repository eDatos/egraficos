import React from 'react';
import ChartOptionSelect from './ChartOptionSelect';
import { Col } from 'react-bootstrap';
import styles from './../ChartOptions.module.scss';

const ChartOptionText = ({
  value,
  error,
  onChange,
  default: defaultValue,
  label,
  isEnabled,
  ...props
}) => {
  if (props.options) {
    return (
      <ChartOptionSelect
        value={value}
        error={error}
        onChange={onChange}
        default={defaultValue}
        label={label}
        {...props}
      />
    );
  }
  return (
    <div className={props.className}>
      <Col xs={6} className={styles['chart-option-label']}>
        {label}
      </Col>
      <Col xs={6}>
        <input
          className="form-control"
          type="text"
          value={value ?? ''}
          step={props.step}
          disabled={!isEnabled}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={defaultValue}
        />
        {error && (
          <small>
            <i>{error}</i>
          </small>
        )}
      </Col>
    </div>
  );
};

export default React.memo(ChartOptionText);
