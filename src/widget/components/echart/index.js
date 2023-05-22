import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import charts from '../../../charts'
import { parseAndCheckData } from '../../../hooks/useDataLoaderUtils/parser'
import { dateFormats, parseDataset } from '@rawgraphs/rawgraphs-core'
import { get } from 'lodash'
import { localeList } from '../../../constants'

//add custom date formats
dateFormats['YYYY-MMM'] = '%Y-M%m'

const EDatosGraph = (props) => {
  const [options, setOptions] = useState({})

  useEffect(() => {
    const fetchData = async (source) => {
      const response = await fetch(source.url)
      return await response.text()
    }

    const getChartOptions = (data) => {
      const parsedDataset = parseDataset(data, props.dataTypes, {
        locale: props.locale,
        decimal: props.decimalsSeparator,
        group: props.thousandsSeparator,
        dateLocale: get(localeList, props.locale),
      })
      return chart.getChartOptions(
        props.visualOptions,
        parsedDataset.dataset,
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

    if (props.data) {
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
