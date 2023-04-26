import React from 'react'
import ReactDOM from 'react-dom/client'
import EDatosGraph from './components/echart'

export default {
  widgets: {
    egraph: {
      render: (config) => {
        const selector = ReactDOM.createRoot(
          document.querySelector(config.selector)
        )
        selector.render(
          <React.StrictMode>
            <EDatosGraph
              source={config.source}
              chartIndex={config.chartIndex}
              visualOptions={config.visualOptions}
              mapping={config.mapping}
              dataTypes={config.dataTypes}
              dimensions={config.dimensions}
              data={config.data}
            />
          </React.StrictMode>
        )
      },
      unmount: (config) => {
        const selector = ReactDOM.createRoot(
          document.querySelector(config.selector)
        )
        selector.unmount()
      },
    },
  },
}
