import React, { memo, useEffect, useState } from 'react'

export const sentContent = memo(props => {
    let[htmlFileString, setHtmlFileString] = useState();

    async function fetchHtml() {
      setHtmlFileString(await (await fetch(`https://estadisticas.arte-consultores.com/apps/organisations/istac/apis/header/header.html?appName=Prueba APP`)).text());
    }
    useEffect(() => {
        fetchHtml();
        const executeScript = new Function(props.script);
        executeScript();
    });
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>)
    
})