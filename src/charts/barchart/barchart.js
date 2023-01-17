import { metadata } from './metadata'
import { dimensions } from './dimensions'
import { getChartOptions } from './mapping'
import { render } from './render'
import { visualOptions } from './visualOptions'
import styles from '../styles/base.raw.css'

export const barchart = {
  metadata,
  dimensions,
  getChartOptions,
  //mapData,
  render,
  visualOptions,
  styles,
}