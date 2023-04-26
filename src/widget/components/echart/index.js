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

    const getChartOptions = (data) => {
      return chart.getChartOptions(
        props.visualOptions,
        data,
        props.mapping,
        props.dataTypes,
        chart.dimensions
      )
    }

    const chart = charts[props.chartIndex]

    const fetchOptions = async () => {
      const data = await fetchData(props.source)
      const [dataType, parsedUserData, error, extra] = parseAndCheckData(data, {
        separator: null,
      })
      return getChartOptions(parsedUserData)
    }

    if (!props.source?.url) {
      setOptions(getChartOptions(props.data))
    } else {
      fetchOptions(props).then((options) => {
        setOptions(options)
      })
    }
  }, [props])

  return (
    <ReactECharts
      option={options}
      opts={{ renderer: props.visualOptions.renderer }}
    />
  )
}

export default EDatosGraph
