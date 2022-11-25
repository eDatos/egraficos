import React, { useEffect, useState, useRef  } from 'react'

export default function Header(props) {
  let[htmlFileString, setHtmlFileString] = useState();
  const divRef = useRef()

  async function fetchHtml() {
    setHtmlFileString(await (await fetch(`https://estadisticas.arte-consultores.com/apps/organisations/istac/apis/header/header.html`)).text());
  }
  useEffect(() => {
    fetchHtml();
    const slotHtml = document.createRange().createContextualFragment(htmlFileString) // Create a 'tiny' document and parse the html string
    divRef.current.innerHTML = '' // Clear the container
    divRef.current.append(slotHtml) // Append the new content
  }, [htmlFileString]);
  return (
    <div ref={divRef}></div>)
}