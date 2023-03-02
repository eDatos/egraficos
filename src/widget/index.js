import React from 'react';
import ReactDOM from 'react-dom'
import EDatosGraph from './components/echart';

let init = null;

export default {
   config: (config) => {
      init = config;
   },
   widgets: {
      egraph: {
         new: () => {
            return {
              render: () => {
                  ReactDOM.render(
                      <React.StrictMode>
                          <EDatosGraph options={init.options} renderer={init.renderer}/>
                      </React.StrictMode>, document.querySelector(init.selector));
              }
            }
          }
      }
   }
}

