import React, { useEffect, useState, useRef  } from 'react'
import applicationConfig from '../../application.json'

export default function Header(props) {
  let[htmlFileString, setHtmlFileString] = useState();
  const divRef = useRef()

  async function fetchHtml() {    
    const requestOptions = {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    };        
    const headerUrlData = await fetch(applicationConfig['metadata']['endpoint'] + '/properties/'+applicationConfig['metadata']['navbarPathKey'], requestOptions)
                                  .then(response => response.json())
    setHtmlFileString(await (await fetch(headerUrlData['value'], requestOptions)).text()); 
        
  }
  useEffect(() => {
    fetchHtml();
    //TODO EDATOS REVISAR PQ NO SE ESTA CAMBIANDO EL choosenlocale de la cookie al cambiar el selector. parece que no se está ejecutando algún script
    const slotHtml = document.createRange().createContextualFragment(htmlFileString) // Create a 'tiny' document and parse the html string
    divRef.current.innerHTML = '' // Clear the container
    divRef.current.append(slotHtml) // Append the new content
  }, [htmlFileString]);
  return (
    <div ref={divRef}></div>)
}