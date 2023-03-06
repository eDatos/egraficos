import React from 'react'
import ReactDOM from 'react-dom'
import EDatosGraph from './components/echart'

export default {
  widgets: {
    egraph: {
      render: (config) => {
        ReactDOM.render(
          <React.StrictMode>
            <EDatosGraph options={config.options} renderer={config.renderer} />
          </React.StrictMode>,
          document.querySelector(config.selector)
        )
      },
      unmount: (config) => {
        ReactDOM.unmountComponentAtNode(document.querySelector(config.selector))
      },
    },
  },
}
