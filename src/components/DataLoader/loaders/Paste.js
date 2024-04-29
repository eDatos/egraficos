import React from 'react';
import styles from '../DataLoader.module.scss';
import {useTranslation} from "react-i18next";

export default function Paste({userInput, setUserInput, setLoadingError}) {
    const {t, i18n} = useTranslation('translation');

    return (
        <>
            <div className={ `d-flex ${styles['options-section']}`}>
                <span className={styles['options-section-number']}> {t('global.section.loaddata.options.1')}</span>
                <span className={styles['options-section-text']}> {t('global.section.loaddata.options.label1')}</span>
            </div>
            <textarea
                className={styles['borderBox']}
                value={userInput}
                onChange={(e) => {
                    const str = e.target.value;
                    setUserInput(str);
                    setLoadingError(null);
                }}
            />
        </>
    );
}
