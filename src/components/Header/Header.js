import React, { useEffect, useRef } from 'react'
import applicationConfig from '../../application.json'
import { useTranslation } from 'react-i18next'

export default function Header(props) {
  const divRef = useRef(null)
  const { t } = useTranslation(['translation'])
  const appName = t('global.appName')

  useEffect(() => {
    let isSubscribed = true
    const { current } = divRef

    // declare the async data fetching function
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
      const responseHeaderURL = await fetch(
        applicationConfig['metadata']['endpoint'] +
          '/properties/' +
          applicationConfig['metadata']['navbarPathKey'],
        requestOptions
      )
      const headerUrlData = await responseHeaderURL.json()
      return await (
        await fetch(
          headerUrlData['value'] +
            '?appName=' +
            appName +
            '&chosenLocale=' +
            props.value,
          requestOptions
        )
      ).text()
    }

    fetchData().then((htmlContent) => {
      if (isSubscribed) {
        const slotHtml = document
          .createRange()
          .createContextualFragment(htmlContent) // Create a 'tiny' document and parse the html string
        current.innerHTML = '' // Clear the container
        current.append(slotHtml) // Append the new content
      }
    })

    return () => (isSubscribed = false)
  }, [props.value, appName])
  return <div ref={divRef}></div>
}
