import React, { useCallback, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import S from './UrlFetch.module.scss';
import { useTranslation } from 'react-i18next';

export async function fetchData(source, acceptHeader) {
  const response = await fetch(source.url, {
    method: 'GET',
    headers: { Accept: acceptHeader },
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
  const { t } = useTranslation(['translation']);

  const fetchUrl = useCallback(
    async (url) => {
      const source = { type: 'url', url };
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
    <form onSubmit={handleSubmit}>
      <Row>
        <Col xs={3} className="pt-3 mb-3">
          <select
            className="custom-select raw-select"
            value={acceptHeader}
            onChange={setAcceptHeader}
          >
            <option key="csv" value="text/csv">
              text/csv
            </option>
            <option key="tsv" value="text/tab-separated-values">
              text/tab-separated-values
            </option>
          </select>
        </Col>
      </Row>
      <input
        className={classNames('w-100', S['url-input'])}
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <div className="text-right">
        <button
          className="btn btn-sm btn-success mt-3"
          disabled={!url || loading}
          type="submit"
        >
          {t('global.section.loaddata.url.loadButton')}
        </button>
      </div>
    </form>
  );
}
