import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import charts from '../../../charts'
import { parseAndCheckData } from '../../../hooks/useDataLoaderUtils/parser'

const EDatosGraph = (props) => {
  const [options, setOptions] = useState({})

  useEffect(() => {
    const fetchData = async (source) => {
      const response = await fetch(source.url)
      const text = await response.text()
      return text
    }

    const fetchOptions = async () => {
      const data = await fetchData(props.source)
      const [dataType, parsedUserData, error, extra] = parseAndCheckData(data, {
        separator: null,
      })
      const chart = charts[props.chartIndex]
      return chart.getChartOptions(
        props.visualOptions,
        parsedUserData,
        props.mapping,
        props.dataTypes,
        chart.dimensions
      )
    }

    if (!props.source?.url) {
      setOptions(props.options)
    } else {
      fetchOptions(props).then((options) => {
        setOptions(options)
      })
    }
  }, [props])

  return <ReactECharts option={options} opts={{ renderer: props.renderer }} />
}

export default EDatosGraph
