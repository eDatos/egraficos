import { useEffect, useRef } from 'react'
import { useLeafletContext } from '@react-leaflet/core'

const WMSCustomLayer = ({ source, layerName }) => {
  const context = useLeafletContext()
  const layerRef = useRef()

  useEffect(() => {
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
