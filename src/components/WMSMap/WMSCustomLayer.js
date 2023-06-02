import { useEffect, useRef } from 'react'
import { useLeafletContext } from '@react-leaflet/core'
import * as WMS from 'leaflet.wms'

const WMSCustomLayer = ({ layer, url }) => {
  const context = useLeafletContext()
  const layerRef = useRef()
  const layerName = layer['Name']

  useEffect(() => {
    const selectedStyles = layer.StyleSelected?.styleName ?? []
    const source = WMS.source(url, {
      format: 'image/png',
      transparent: 'true',
      styles: selectedStyles,
    })
    const container = context.layerContainer || context.map
    layerRef.current = source.getLayer(layerName)
    container.addLayer(layerRef.current)
    return () => {
      source.removeSubLayer(layerName)
      container.removeLayer(layerRef.current)
    }
  })

  return null
}

export default WMSCustomLayer
