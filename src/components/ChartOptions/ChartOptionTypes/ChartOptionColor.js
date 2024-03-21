import React from 'react';
import { Col } from 'react-bootstrap';
import InilineColorPicker from '../../InlineColorPicker';
import ChartOptionSelect from './ChartOptionSelect';
import styles from '../ChartOptions.module.scss';


const ChartOptionColor = ({
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
    <label className={`{props.className + ${styles.chartOptionColor} ' row'}`}>
      <Col xs={6} className="d-flex align-items-center">
        {label}
      </Col>
      <Col xs={6}>
        <InilineColorPicker
          disabled={!isEnabled}
          color={value}
          onChange={onChange}
        />
      </Col>
      {error && (
        <small>
          <i>{error}</i>
        </small>
      )}
    </label>
  );
};

export default React.memo(ChartOptionColor);
