import React, { useState } from 'react';
import styles from './InlineColorPicker.module.scss';
import CustomColorPicker from './CustomPicker/CustomColorPicker';
import {
  defaultPalette,
  islandPalette,
  sexPalette,
  territoryPalette,
} from '../../constants';
import { useTranslation } from 'react-i18next';

export default function InlineColorPicker({
  color: maybeColor,
  onChange,
  disabled,
  presetPalette,
}) {
  const { t } = useTranslation(['translation']);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const color = maybeColor ?? '#000000'; // Same as <input type='color' />
  const presetPalettes = [
    { name: '', value: presetPalette ? presetPalette : defaultPalette },
    { name: t('palettes.sex.name'), value: sexPalette },
    { name: t('palettes.island.name'), value: islandPalette },
    { name: t('palettes.territory.name'), value: territoryPalette },
  ];

  return (
    <>
      <div
        className={styles.swatch}
        onClick={() => setDisplayColorPicker(true)}
      >
        <div className={styles.color} style={{ background: color }} />
        {color.toUpperCase()}
      </div>
      {displayColorPicker && (
        <div className={styles.popover}>
          <div
            className={styles.cover}
            onClick={() => setDisplayColorPicker(false)}
          />
          <CustomColorPicker
            disabled={disabled}
            disableAlpha
            color={color}
            onChangeComplete={(color) => onChange(color.hex)}
            presetPalettes={presetPalettes}
          />
        </div>
      )}
    </>
  );
}
