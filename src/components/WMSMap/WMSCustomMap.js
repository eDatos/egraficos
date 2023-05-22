import React, { useEffect } from 'react'
import * as L from 'leaflet'
import * as WMS from 'leaflet.wms'

function baseMap() {
  // maps.stamen.com
  let attr =
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  return L.tileLayer(
    'http://tile.stamen.com/toner-background/{z}/{x}/{y}.png',
    {
      opacity: 0.1,
      attribution: attr,
    }
  )
}

function blank() {
  let layer = new L.Layer()
  layer.onAdd = layer.onRemove = () => {}
  return layer
}

export default class WMSCustomMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
    }
  }
  componentDidMount() {
    this.setState({
      map: this.createMap(
        'map',
        false,
        this.props.center,
        this.props.zoom,
        this.props.url,
        this.props.layers
      ),
    })
  }

  createMap = (div, tiled, center, zoom, url, layers) => {
    if (this.state.map) return

    let map = L.map(div)
    map.setView(center, zoom)

    const basemaps = {
      Basemap: baseMap().addTo(map),
      Blank: blank(),
    }
    const controlLayers = {}
    const source = WMS.source(url, {
      format: 'image/png',
      transparent: 'true',
      tiled: tiled,
    })
    for (let name of layers) {
      controlLayers[name] = source.getLayer(name).addTo(map)
    }
    L.control.layers(basemaps, controlLayers).addTo(map)

    return map
  }

  render() {
    return <div id="map" />
  }
}
