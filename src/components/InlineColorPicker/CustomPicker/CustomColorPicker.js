import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { CustomPicker } from 'react-color';
import {
  Saturation,
  Hue,
  Alpha,
  Checkboard,
} from 'react-color/lib/components/common';
import CustomFields from './CustomFields';
import CustomPresetColors from './CustomPresetColors';
import { defaultPalette } from '../../../constants';

export const CustomColorPicker = ({
  width,
  rgb,
  hex,
  hsv,
  hsl,
  onChange,
  onSwatchHover,
  disableAlpha,
  presetPalettes,
  renderers,
  styles: passedStyles = {},
  className = '',
}) => {
  const styles = reactCSS(
    merge(
      {
        default: {
          picker: {
            width,
            padding: '10px 10px 0',
            boxSizing: 'initial',
            background: '#fff',
            borderRadius: '4px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)',
          },
          saturation: {
            width: '100%',
            paddingBottom: '75%',
            position: 'relative',
            overflow: 'hidden',
          },
          Saturation: {
            radius: '3px',
            shadow:
              'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },
          controls: {
            display: 'flex',
          },
          sliders: {
            padding: '4px 0',
            flex: '1',
          },
          color: {
            width: '24px',
            height: '24px',
            position: 'relative',
            marginTop: '4px',
            marginLeft: '4px',
            borderRadius: '3px',
          },
          activeColor: {
            absolute: '0px 0px 0px 0px',
            borderRadius: '2px',
            background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
            boxShadow:
              'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },
          hue: {
            position: 'relative',
            height: '10px',
            overflow: 'hidden',
          },
          Hue: {
            radius: '2px',
            shadow:
              'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },

          alpha: {
            position: 'relative',
            height: '10px',
            marginTop: '4px',
            overflow: 'hidden',
          },
          Alpha: {
            radius: '2px',
            shadow:
              'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },
          ...passedStyles,
        },
        disableAlpha: {
          color: {
            height: '10px',
          },
          hue: {
            height: '10px',
          },
          alpha: {
            display: 'none',
          },
        },
      },
      passedStyles
    ),
    { disableAlpha }
  );

  return (
    <div style={styles.picker} className={`sketch-picker ${className}`}>
      <div style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        />
      </div>
      <div style={styles.controls} className="flexbox-fix">
        <div style={styles.sliders}>
          <div style={styles.hue}>
            <Hue style={styles.Hue} hsl={hsl} onChange={onChange} />
          </div>
          <div style={styles.alpha}>
            <Alpha
              style={styles.Alpha}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
              onChange={onChange}
            />
          </div>
        </div>
        <div style={styles.color}>
          <Checkboard />
          <div style={styles.activeColor} />
        </div>
      </div>

      <CustomFields
        rgb={rgb}
        hsl={hsl}
        hex={hex}
        onChange={onChange}
        disableAlpha={disableAlpha}
      />
      {presetPalettes.map((presetColors) => (
        <div>
          <span>{presetColors.name}</span>
          <CustomPresetColors
            colors={presetColors.value}
            onClick={onChange}
            onSwatchHover={onSwatchHover}
          />
        </div>
      ))}
    </div>
  );
};

CustomColorPicker.propTypes = {
  disableAlpha: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  styles: PropTypes.object,
};

CustomColorPicker.defaultProps = {
  disableAlpha: false,
  width: 200,
  styles: {},
  presetPalettes: [{ name: '', value: defaultPalette.map((e) => e.color) }],
};

export default CustomPicker(CustomColorPicker);
