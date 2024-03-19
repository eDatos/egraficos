import React, {useCallback} from 'react';
import {Dropdown} from 'react-bootstrap';
import {Trans} from 'react-i18next';
import styles from "./ParsingOptions.module.scss";

export default function StackSelector({
                                          title,
                                          value,
                                          list,
                                          onChange,
                                          ...props
                                      }) {
    const handleChange = useCallback(
        (nextDimension) => {
            if (onChange) {
                onChange(nextDimension);
            }
        },
        [onChange]
    );

    return (
        <div className={styles.horizontalSeparator}>
            <span className={styles.labelSeparator}>{title}</span>
            <div className={styles.inputSeparator}>
                <Dropdown className="d-inline-block raw-dropdown">
                    <Dropdown.Toggle
                        variant="white"
                        className="truncate-160px"
                        disabled={list.length === 0}
                    >
                        {value ? value : <Trans i18nKey="global.column"></Trans>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {value && (
                            <Dropdown.Item onClick={() => handleChange(null)}>
                                {'Do not stack'}
                            </Dropdown.Item>
                        )}
                        {Object.keys(list).map((d) => {
                            return (
                                <Dropdown.Item key={d} onClick={() => handleChange(d)}>
                                    {d}
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}
