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
      if (this._map._popup?.isOpen()) {
        const content = this._map._popup.getContent();
        this._map._popup.setContent(`${info}<br><br>${content}`);
      } else {
        this._map.openPopup(info, latlng, {
          maxWidth: '1600',
          keepInView: true,
        });
      }
    },
  });

  useEffect(() => {
    const selectedStyles = layer.StyleSelected?.styleName ?? [];
    const container = context.layerContainer || context.map;

    const source = new MySource(url, {
      format: 'image/png',
      transparent: 'true',
      styles: selectedStyles,
      info_format: 'text/html',
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
