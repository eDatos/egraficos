import React, { useEffect, useRef  } from 'react'
import applicationConfig from '../../application.json'

export default function Header(props) {
  const divRef = useRef(null)  

  async function fetchHtml(i18n) {      
     
    const requestOptions = {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    };
    const responseHeaderURL = await fetch(applicationConfig['metadata']['endpoint'] + '/properties/'+applicationConfig['metadata']['navbarPathKey'], requestOptions);    
    const headerUrlData = await responseHeaderURL.json();
    return await (await fetch(headerUrlData['value']+'?appName='+i18n['t']('global.appName')+'&chosenLocale='+i18n.language, requestOptions)).text();
  }
  useEffect(() => {
    const { current } = divRef;

    fetchHtml(props.value).then((htmlContent) => {      
      const slotHtml = document.createRange().createContextualFragment(htmlContent) // Create a 'tiny' document and parse the html string
      current.innerHTML = '' // Clear the container
      current.append(slotHtml) // Append the new content
    });    
  }, [props.value]);
  return (
    <div ref={divRef}></div>
  )
}