import React, { useEffect, useState, useRef  } from 'react'

export default function Header(props) {
  let[htmlFileString, setHtmlFileString] = useState();
  const divRef = useRef()

  async function fetchHtml() {
    //TODO EDATOS HAY QUE PARAMETRIZAR LA URL
    setHtmlFileString(await (await fetch(`https://estadisticas.arte-consultores.com/apps/organisations/istac/apis/header/header.html`)).text());
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