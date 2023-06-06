import { useEffect, useRef } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import * as WMS from 'leaflet.wms';

const WMSCustomLayer = ({ layer, url }) => {
  const context = useLeafletContext();
  const layerRef = useRef();
  const layerName = layer['Name'];
  var MySource = WMS.Source.extend({
    showFeatureInfo: function (latlng, info) {
      if (!this._map || !info) {
        return;
      }
      this._map.openPopup(info, latlng);
    },
  });

  useEffect(() => {
    const selectedStyles = layer.StyleSelected?.styleName ?? [];
    const container = context.layerContainer || context.map;

    const source = new MySource(url, {
      format: 'image/png',
      transparent: 'true',
      styles: selectedStyles,
    });

    layerRef.current = source.getLayer(layerName);
    container.addLayer(layerRef.current);
    return () => {
      source.removeSubLayer(layerName);
      container.removeLayer(layerRef.current);
    };
  });

  return null;
};

export default WMSCustomLayer;
