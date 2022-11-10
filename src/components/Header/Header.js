import React, { useEffect, useState } from 'react'

export default function Header({ menuItems }) {
  let[htmlFileString, setHtmlFileString] = useState();

  async function fetchHtml() {
    setHtmlFileString(await (await fetch(`https://estadisticas.arte-consultores.com/apps/organisations/istac/apis/header/header.html?appName=Prueba APP`)).text());
  }
  useEffect(() => {
    fetchHtml();
  }, []);
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>)
}
