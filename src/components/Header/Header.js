import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { applicationConfig } from '../ApplicationConfig/ApplicationConfig';

export default function Header({ value, setLogged }) {
  const divRef = useRef(null);
  const { t } = useTranslation(['translation']);
  const appName = t('global.appName');

  useEffect(() => {
    let isSubscribed = true;
    const { current } = divRef;

    // declare the async data fetching function
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: { Accept: 'application/json' },
      };
      const applicationConfigJson = await applicationConfig();
      const responseHeaderURL = await fetch(
        applicationConfigJson['metadata']['endpoint'] +
          '/properties/' +
          applicationConfigJson['metadata']['navbarPathKey'],
        requestOptions
      );
      const headerUrlData = await responseHeaderURL.json();
      return await (
        await fetch(
          `${headerUrlData['value']}?appName=${appName}&chosenLocale=${value}&enableAuthentication`,
          requestOptions
        )
      ).text();
    };

    fetchData().then((htmlContent) => {
      if (isSubscribed) {
        const slotHtml = document
          .createRange()
          .createContextualFragment(htmlContent); // Create a 'tiny' document and parse the html string
        current.innerHTML = ''; // Clear the container
        current.append(slotHtml); // Append the new content
        window.Edatos.UserManagement.getAccount()
          .then(() => setLogged(true))
          .catch(() => {
            window.Edatos.UserManagement.login().then(() => setLogged(true));
          });
        window.Edatos.UserManagement.addOnLogoutListener(() => {
          setLogged(false);
        });
      }
    });

    return () => (isSubscribed = false);
  }, [value, setLogged, appName]);
  return <div ref={divRef}></div>;
}
