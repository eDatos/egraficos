import React, { useRef, useEffect } from 'react'
import { chart as rawChart } from '@rawgraphs/rawgraphs-core'
import useDebounce from '../../hooks/useDebounce'
import WarningMessage from '../WarningMessage'
import { onChartRendered } from '../../gaEvents'
import ReactEcharts from "echarts-for-react"
//import { getChartOptions } from '../../charts/utils/echartsOptions';


const ChartPreview = ({
  chart,
  dataset: data,
  dataTypes,
  mapping,
  visualOptions,
  error,
  setError,
  setRawViz,
  mappedData,
}) => {
  const domRef = useRef(null)

  const vizOptionsDebounced = useDebounce(visualOptions, 200)
  console.log('data', data);
  console.log('chart', chart);
  console.log('mapping', mapping);
  console.log('visualOptions', visualOptions);
  useEffect(() => {
    setError(null)

    // control required variables
    // need to create this array because the prop mapping does not return to {} when data is inserted and removed
    const currentlyMapped = []
    for (let variable in mapping) {
      if (mapping[variable].ids && mapping[variable].ids.length > 0) {
        currentlyMapped.push(variable)
      }
    }

    let requiredVariables = chart.dimensions.filter(
      (d) => d.required && currentlyMapped.indexOf(d.id) === -1
    )

    if (requiredVariables.length > 0) {
      let errorMessage = (
        <span>
          Required chart variables: you need to map{' '}
          {requiredVariables
            .map((d, i) => <span key={i} className="font-weight-bold">{d.name}</span>)
            .reduce((prev, curr) => [prev, ' and ', curr])}
        </span>
      )
      setError({ variant: 'secondary', message: errorMessage })
      setRawViz(null)
      while (domRef.current.firstChild) {
        domRef.current.removeChild(domRef.current.firstChild)
      }
      return
    }

    // control multiple required variables
    const multivaluesVariables = chart.dimensions.filter(
      (d) =>
        d.multiple &&
        d.required &&
        d.minValues &&
        mapping[d.id].ids.length < d.minValues
    )
    if (multivaluesVariables.length > 0) {
      let errorMessage = (
        <span>
          Please map{' '}
          {multivaluesVariables
            .map((d) => (
              <>
                at least <span className="font-weight-bold">{d.minValues}</span>{' '}
                dimensions on <span className="font-weight-bold">{d.name}</span>
              </>
            ))
            .reduce((prev, curr) => [prev, ' and ', curr])}
          .
        </span>
      )
      setError({ variant: 'secondary', message: errorMessage })
      setRawViz(null)
      while (domRef.current.firstChild) {
        domRef.current.removeChild(domRef.current.firstChild)
      }
      return
    }
    console.log('recorremos mapping');
    // control data-types mismatches
    for (let variable in mapping) {
      if (
        mapping[variable].ids &&
        mapping[variable].ids.length > 0 &&
        !mapping[variable].isValid
      ) {
        const variableObj = chart.dimensions.find((d) => d.id === variable)
        const errorMessage = `Data-type mismatch: you can’t map ${mapping[variable].mappedType}s on ${variableObj.name}.`
        setError({ variant: 'danger', message: errorMessage })
        setRawViz(null)
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild)
        }
        return
      }
    }
    console.log('currentlyMapped', currentlyMapped);
    if (!mappedData) {

      // console.info('Clearing viz')
      setRawViz(null)
      while (domRef.current.firstChild) {
        domRef.current.removeChild(domRef.current.firstChild)
      }
      return
    }
    // console.info('Updating viz')
    // try {
    //   const viz = rawChart(chart, {
    //     data,
    //     mapping: mapping,
    //     dataTypes,
    //     visualOptions: vizOptionsDebounced,
    //   })
    //   try {
    //     const rawViz = viz.renderToDOM(domRef.current, mappedData)
    //     //domRef.current.innerHTML = "";
    //     //domRef.current.appendChild(container);
    //     setRawViz(rawViz)
    //     setError(null)
    //     onChartRendered(chart.metadata)
    //   } catch (e) {
    //     console.log("chart error", e)
    //     setError({ variant: 'danger', message: 'Chart error. ' + e.message })
    //     setRawViz(null)
    //   }
    // } catch (e) {
    //   while (domRef.current.firstChild) {
    //     domRef.current.removeChild(domRef.current.firstChild)
    //   }
    //   console.log({ e })
    //   setError({ variant: 'danger', message: 'Chart error. ' + e.message })
    //   setRawViz(null)
    // }

  }, [setError, vizOptionsDebounced, setRawViz, mappedData, chart, mapping])
  var options = error === null ? chart.getChartOptions(visualOptions, data,mapping,chart.dataTypes,chart.dimensions) : {}
  console.log('chart.metadata.id', chart.metadata.id)
  if (domRef && domRef.current)
  domRef.current?.getEchartsInstance().setOption(options);
  return (
    <div className={'col-8 col-xl-9'}>
      <div
         className={['overflow-auto', 'position-sticky'].join(' ')}
         style={{ top: 'calc(15px + var(--header-height))' }}
      >
        {error && (
          <WarningMessage variant={error.variant} message={error.message} />
        )}
        <div ref={domRef}>{/* Don't put content in this <div /> */}</div>
      </div>
      <ReactEcharts 
    option={options} className='echarts-for-echarts' ref={domRef}
    style={{width:visualOptions.width,
            height:visualOptions.height,
            marginTop:visualOptions.marginTop,
            marginLeft:visualOptions.marginLeft,
            marginBottom:visualOptions.marginBottom,
            backgroundColor:visualOptions.background,
            marginRight:visualOptions.marginRight}}
            opts={{renderer: 'svg'}}
  />
    </div>
  )
}

export default React.memo(ChartPreview)
