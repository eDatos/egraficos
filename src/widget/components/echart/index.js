import React from 'react';
import ReactECharts from 'echarts-for-react';

const EDatosGraph = (props) => {
  return <ReactECharts 
    option={props.options} 
    opts={{renderer: props.renderer}} />;
};

export default EDatosGraph;
