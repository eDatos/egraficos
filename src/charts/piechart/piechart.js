import { metadata } from './metadata'
import { dimensions } from './dimensions'
import { getChartOptions } from './mapping'
import { colorDomain  } from './render'
import { visualOptions } from './visualOptions'
import styles from '../styles/base.raw.css'

export const piechart = {
  metadata,
  dimensions,
  getChartOptions,
  //mapData,
  colorDomain,
  visualOptions,
  styles,
}