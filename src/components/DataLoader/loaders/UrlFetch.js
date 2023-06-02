import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import S from './UrlFetch.module.scss'
import { useTranslation } from 'react-i18next'

export async function fetchData(source) {
  const response = await fetch(source.url)
  return await response.text()
}

export default function UrlFetch({
  userInput,
  setUserInput,
  setLoadingError,
  initialState = null,
}) {
  const [url, setUrl] = useState(initialState?.url)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation(['translation'])

  const fetchUrl = useCallback(
    async (url) => {
      const source = { type: 'url', url }
      setLoading(true)
      let data
      try {
        data = await fetchData(source)
        setUserInput(data, source)
        setLoadingError(null)
      } catch (e) {
        setLoadingError('Loading error. ' + e.message)
      }
      setLoading(false)
    },
    [setLoadingError, setUserInput]
  )

  const handleSubmit = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      fetchUrl(url)
      return false
    },
    [url, fetchUrl]
  )

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={classNames('w-100', S['url-input'])}
        value={url}
        onChange={(e) => {
          setUrl(e.target.value)
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
  )
}
