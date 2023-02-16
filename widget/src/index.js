import React from 'react';
import ReactDOM from 'react-dom/client';
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
                 const root = ReactDOM.createRoot(document.querySelector(init.selector));
                 root.render(
                   <React.StrictMode>
                       <EDatosGraph options={init.options} renderer={init.renderer}/>
                   </React.StrictMode>
                 );
              }
            }
          }
      }
   }
}

