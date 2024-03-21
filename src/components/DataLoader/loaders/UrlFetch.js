import React, {useCallback, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import classNames from 'classnames';
import S from './UrlFetch.module.scss';
import {useTranslation} from 'react-i18next';
import styles from "../DataLoader.module.scss";

export async function fetchData(source, acceptHeader = 'text/csv') {
    const response = await fetch(source.url, {
        method: 'GET',
        headers: {Accept: acceptHeader},
    });
    return await response.text();
}

export default function UrlFetch({
                                     userInput,
                                     setUserInput,
                                     setLoadingError,
                                     initialState = null,
                                 }) {
    const [url, setUrl] = useState(initialState?.url);
    const [acceptHeader, setAcceptHeader] = useState('text/csv');
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation(['translation']);

    const fetchUrl = useCallback(
        async (url) => {
            const source = {type: 'url', url};
            setLoading(true);
            let data;
            try {
                data = await fetchData(source, acceptHeader);
                setUserInput(data, source);
                setLoadingError(null);
            } catch (e) {
                setLoadingError('Loading error. ' + e.message);
            }
            setLoading(false);
        },
        [setLoadingError, setUserInput, acceptHeader]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.stopPropagation();
            e.preventDefault();
            fetchUrl(url);
            return false;
        },
        [url, fetchUrl]
    );

    return (
        <>
            <div className={styles.optionsSection}>
                <span className={styles.optionsSectionTitle}> {t('global.section.loaddata.options.3')}</span>
                <span className={styles.optionsSectionText}> {t('global.section.loaddata.options.label3')}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={3} className="pt-3 mb-3">
                        <select
                            className={classNames('custom-select', S.customSelect)}
                            value={acceptHeader}
                            onChange={(event) => setAcceptHeader(event.target.value)}
                        >
                            <option key="csv" value="text/csv">
                                Text/csv
                            </option>
                            <option key="tsv" value="text/tab-separated-values">
                                text/tab-separated-values
                            </option>
                        </select>
                    </Col>
                </Row>
                <input
                    className={classNames('w-100', S['url-input borderBox'])}
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                    }}
                />
                <div className="row justify-content-start ml-auto">
                    <button
                        className="text-icon-button btn-thin-first"
                        disabled={!url || loading}
                        type="submit"
                    >
                        <i className="fa-thin fa-cloud-arrow-up"></i>
                        {t('global.section.loaddata.url.loadButton').toUpperCase()}
                    </button>
                </div>
            </form>
        </>
    );
}
