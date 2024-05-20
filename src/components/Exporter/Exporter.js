import React, {useCallback, useEffect, useState} from 'react';
import { Row, Col, Dropdown, Form } from 'react-bootstrap';
import uuid from 'react-uuid';
import { CustomToggle } from '../CustomDropdown/CustomDropdownButton';
import styles from './Exporter.module.scss';
import {useTranslation} from "react-i18next";
import {t} from "i18next";
import classNames from 'classnames';


function downloadBlob(url, filename) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const {t, i18n} = useTranslation('translation');
    // Create a new anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    a.click();
    return a;
}

export default function Exporter({
                                     rawViz,
                                     exportProject,
                                     userData,
                                     dataSource,
                                     chartIndex,
                                     mapping,
                                     visualOptions,
                                     dataTypes,
                                     dimensions,
                                     locale,
                                     decimalsSeparator,
                                     thousandsSeparator,
                                     map,
                                 }) {
    const download = useCallback(
        (filename, format) => {
            downloadBlob(rawViz.getDataURL({type: format}), filename);
        },
        [rawViz]
    );

    const downloadProject = useCallback(
        async (filename) => {
            const project = await exportProject();
            const str = JSON.stringify(project);
            const blob = new Blob([str], {type: 'application/json'});
            const DOMURL = window.URL || window.webkitURL || window;
            const url = DOMURL.createObjectURL(blob);
            downloadBlob(url, filename);
            DOMURL.revokeObjectURL(url);
        },
        [exportProject]
    );

    const [exportFormats, setExportFormats] = useState(['edatosgraphs']);
    const [currentFormat, setCurrentFormat] = useState('edatosgraphs');
    const [currentFile, setCurrentFile] = useState('viz');
    const [dynamicLoadWidget, setDynamicLoadWidget] = useState(true);
    const [position, setPosition] = useState(() => map?.getCenter());
    const [mapZoom, setMapZoom] = useState(() => map?.getZoom());

    const handleOnChangeDynamicLoadWidget = () => {
        setDynamicLoadWidget(!dynamicLoadWidget);
    };
    const downloadViz = useCallback((currentFormat) => {
        switch (currentFormat) {
            case 'svg':
                download(`${currentFile}.svg`, 'svg');
                break;
            case 'png':
                download(`${currentFile}.png`, 'png');
                break;
            case 'edatosgraphs':
                downloadProject(`${currentFile}.edatosgraphs`);
                break;
            default:
                break;
        }
    }, [currentFile, currentFormat, download, downloadProject]);

    const getWidgetHeader = (generatedUUID) =>
        `<div id="chart-container-${generatedUUID}"></div>
<script src="${window.location.href}widget/widget.js"></script>`;

    function getWidget(type) {
        const generatedUUID = uuid();

        const props =
            type === 'wms'
                ? getWmsWidgetProps(generatedUUID)
                : getEGraphWidgetProps(generatedUUID);
        return `${getWidgetHeader(generatedUUID)}
<script>
   EdatosGraphs.widgets.${type}.render(${JSON.stringify(props)});
</script>`;
    }

    function getWmsWidgetProps(generatedUUID) {
        return {
            selector: '#chart-container-' + generatedUUID,
            sources: dataSource.sources.flatMap((source) => [
                {url: source.url, selectedLayers: source.selectedLayers},
            ]),
            center: [position.lat, position.lng],
            zoom: mapZoom,
            baseUrl: window.location.href,
        };
    }

    function getEGraphWidgetProps(generatedUUID) {
        const dataMappings = Object.keys(mapping)
            .map((key) => mapping[key].value)
            .flat(1)
            .filter(Boolean);

        function getFilteredUserData() {
            return userData.map((entry) =>
                Object.keys(entry)
                    .filter((key) => dataMappings.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = entry[key];
                        return obj;
                    }, {})
            );
        }

        function getFilteredDataTypes() {
            return Object.fromEntries(
                Object.entries(dataTypes).filter(([key]) => dataMappings.includes(key))
            );
        }

        return {
            selector: '#chart-container-' + generatedUUID,
            renderer: visualOptions.render,
            chartIndex: chartIndex,
            locale: locale,
            decimalsSeparator: decimalsSeparator,
            thousandsSeparator: thousandsSeparator,
            source: dataSource,
            visualOptions: visualOptions,
            mapping: mapping,
            dataTypes: getFilteredDataTypes(),
            dimensions: dimensions,
            data: !dynamicLoadWidget || !dataSource?.url ? getFilteredUserData() : [],
        };
    }

    useEffect(() => {
        if (dataSource.type !== 'wms') {
            const baseExportFormats = ['edatosgraphs', 'widget'];
            const newExportFormats =
                visualOptions.render === 'svg'
                    ? [...baseExportFormats, 'svg']
                    : [...baseExportFormats, 'png'];
            setExportFormats(newExportFormats);
            setCurrentFormat(newExportFormats[0]);
        } else {
            setExportFormats(['widget']);
            setCurrentFormat('widget');
        }
    }, [visualOptions.render, dataSource.type]);

    const onMapMove = useCallback(() => {
        setPosition(map.getCenter());
    }, [map]);

    const onMapZoom = useCallback(() => {
        setMapZoom(map.getZoom());
    }, [map]);

    useEffect(() => {
        map?.on('move', onMapMove);
        map?.on('zoom', onMapZoom);
        return () => {
            map?.off('move', onMapMove);
            map?.off('zoom', onMapZoom);
        };
    }, [map, onMapMove, onMapZoom]);

    return (
        <>
            <Row>
                <Col xs={6} xl={12} className="py-top-20">
                    <div className={`${styles.exportContent}`}>
                        <input
                            type="text"
                            className="form-control"
                            value={currentFile}
                            onChange={(e) => setCurrentFile(e.target.value)}
                        ></input>
                        <Dropdown className="raw-dropdown button" align="end">
                            <Dropdown.Toggle as={CustomToggle}
                                className=" text-icon-button btn-thin-default d-flex align-items-center"
                            >
                                {t('global.download').toUpperCase()}
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
                                {exportFormats.map((d) => {
                                    return (
                                        <Dropdown.Item 
                                            as="button" 
                                            key={d} 
                                            onClick={() => {
                                                setCurrentFormat(d);
                                                downloadViz(d);
                                            }}>
                                            Formato {d.toUpperCase()}
                                        </Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    
                        {currentFormat !== 'widget' && (
                            <div>
                                <button className="text-icon-button btn-thin-default d-flex align-items-center" type="button" onClick={downloadViz}>
                                    <i className="fa-thin fa-save"></i>
                                    <span>{t('global.save').toUpperCase()}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            {currentFormat === 'widget' &&
                dataSource.url &&
                dataSource.type !== 'wms' && (
                    <div className="row">
                        <div className="col col-sm-12">
                            <Form.Check
                                id="dynamicLoadWidget"
                                type="checkbox"
                                className="d-flex align-items-center custom-control custom-checkbox" 
                            >
                                <Form.Check.Input
                                    checked={dynamicLoadWidget}
                                    className="custom-control-input"
                                    onChange={() => {
                                        handleOnChangeDynamicLoadWidget();
                                    }}
                                />
                                <Form.Check.Label 
                                    className={classNames("custom-control-label")}>
                                        {t('global.section.export.dynamicWidget')}
                                </Form.Check.Label>
                            </Form.Check>
                        </div>
                    </div>
                )}
            {currentFormat === 'widget' && (
                <div className="row">
                    <div className="col cos-sm-12">
            <textarea
                value={getWidget(dataSource.type !== 'wms' ? 'egraph' : 'wms')}
                className="form-control"
                readOnly
            />
                    </div>
                </div>
            )}
        </>
    );
}
