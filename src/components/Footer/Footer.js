import React, { useEffect, useState, useRef } from 'react'
import applicationConfig from '../../application.json'


export default function Footer(props) {
  let[htmlFileString, setHtmlFileString] = useState();
  const divRef = useRef(null)

  async function fetchHtml(chosenLocale) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    };        
    const footerUrlData = await fetch(applicationConfig['metadata']['endpoint'] + '/properties/'+applicationConfig['metadata']['footerPathKey'], requestOptions)
                                  .then(response => response.json())

    setHtmlFileString(await (await fetch(footerUrlData['value']+'?chosenLocale='+chosenLocale, requestOptions)).text());
  }
  useEffect(() => {
    fetchHtml(props.value);
    const slotHtml = document.createRange().createContextualFragment(htmlFileString) // Create a 'tiny' document and parse the html string
    divRef.current.innerHTML = '' // Clear the container
    divRef.current.appendChild(slotHtml) // Append the new content
  }, // eslint-disable-next-line 
  [htmlFileString]); 
  return (
    <div ref={divRef}></div>)
}
