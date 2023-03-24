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
            <EDatosGraph options={config.options} renderer={config.renderer} />
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
