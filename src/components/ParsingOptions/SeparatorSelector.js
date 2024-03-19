import React, {useCallback} from 'react';
import {Dropdown} from 'react-bootstrap';
import {separatorsLabels} from '../../constants';
import {useTranslation} from 'react-i18next';

import styles from './ParsingOptions.module.scss';

export default function SeparatorSelector({
                                              title,
                                              value,
                                              onChange,
                                              ...props
                                          }) {
    const {t} = useTranslation();

    const inputValue = value
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t');

    const handleChange = useCallback(
        (separator) => {
            if (onChange) {
                const nextValue = separator
                    .replace(/\\r/g, '\r')
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t');
                onChange(nextValue);
            }
        },
        [onChange]
    );

    const formatValue = (value) => {
        return (
            <>
        <span className={['small', styles['separator-preview']].join(' ')}>
          {value}
        </span>{' '}
                <span>{t(separatorsLabels[value])}</span>
            </>
        );
    };

    return (
        <>
            <div className={styles.horizontalSeparator}>
                <span className={styles.labelSeparator}>{title}</span>
                <div className={styles.inputSeparator}>
                    <Dropdown className="d-inline-block raw-dropdown">
                        <Dropdown.Toggle
                            variant="white"
                            className="d-flex justify-content-start align-items-center text-truncate"
                        >
                            {formatValue(inputValue)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.keys(separatorsLabels).map((key) => {
                                return (
                                    <Dropdown.Item
                                        key={separatorsLabels[key]}
                                        onClick={() => handleChange(key)}
                                    >
                                        {formatValue(key)}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    );
}
