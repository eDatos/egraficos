import React, { useEffect, useState } from 'react'

// #TODO add commit hash
// const commitHash = process.env.REACT_APP_VERSION || 'dev'

export default function Footer(props) {
  let[htmlFileString, setHtmlFileString] = useState();

  async function fetchHtml() {
    setHtmlFileString(await (await fetch(`https://estadisticas.arte-consultores.com/apps/organisations/istac/common/footer/footer.html`)).text());
  }
  useEffect(() => {
    fetchHtml();
  }, []);
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>)
}
