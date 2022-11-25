import React, { useEffect, useState, useRef } from 'react'

// #TODO add commit hash
// const commitHash = process.env.REACT_APP_VERSION || 'dev'

export default function Footer(props) {
  let[htmlFileString, setHtmlFileString] = useState();
  const divRef = useRef(null)

  async function fetchHtml() {
    setHtmlFileString(await (await fetch(`https://estadisticas.arte-consultores.com/apps/organisations/istac/common/footer/footer.html`)).text());
  }
  useEffect(() => {
    fetchHtml();
    const slotHtml = document.createRange().createContextualFragment(htmlFileString) // Create a 'tiny' document and parse the html string
    divRef.current.innerHTML = '' // Clear the container
    divRef.current.appendChild(slotHtml) // Append the new content
  }, [htmlFileString, divRef]);
  return (
    <div ref={divRef}></div>)
}
