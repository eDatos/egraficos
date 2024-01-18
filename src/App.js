import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import {
  getOptionsConfig,
  getDefaultOptionsValues,
  colorPresets,
} from '@rawgraphs/rawgraphs-core';
import Header from './components/Header';
import Section from './components/Section';
import Footer from './components/Footer';
import ScreenSizeAlert from './components/ScreenSizeAlert';
import DataLoader from './components/DataLoader';
import ChartSelector from './components/ChartSelector';
import DataMapping from './components/DataMapping';
import ChartPreviewWithOptions from './components/ChartPreviewWIthOptions';
import Exporter from './components/Exporter';
import get from 'lodash/get';
import find from 'lodash/find';
import usePrevious from './hooks/usePrevious';
import { serializeProject } from '@rawgraphs/rawgraphs-core';
import baseCharts from './charts';
import useSafeCustomCharts from './hooks/useSafeCustomCharts';
import useDataLoader from './hooks/useDataLoader';
import isPlainObject from 'lodash/isPlainObject';
import CustomChartWarnModal from './components/CustomChartWarnModal';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import WMSMap from './components/WMSMap/WMSMap';
import { defaultPalette, grayPalette } from './constants';
import favicon from './hooks/favicon';

//Custom colors
colorPresets.ordinal.defaultPalette = {
  value: defaultPalette,
  label: 'Default Palette',
};
colorPresets.ordinal.grayPalette = {
  value: grayPalette,
  label: 'Gray Palette',
};

function App() {
  const [cookies, setCookie] = useCookies();
  const { t, i18n } = useTranslation();
  const [
    customCharts,
    {
      toConfirmCustomChart,
      confirmCustomChartLoad,
      abortCustomChartLoad,
      importCustomChartFromProject,
      exportCustomChart,
    },
  ] = useSafeCustomCharts();
  const charts = useMemo(() => baseCharts, []);

  const dataLoader = useDataLoader();
  const {
    userInput,
    userData,
    userDataType,
    parseError,
    unstackedData,
    unstackedColumns,
    data,
    separator,
    thousandsSeparator,
    decimalsSeparator,
    locale,
    stackDimension,
    dataSource,
    loading,
    hydrateFromSavedProject,
  } = dataLoader;

  /* From here on, we deal with viz state */
  const [currentChart, setCurrentChart] = useState(charts[0]);
  const [mapping, setMapping] = useState({});
  const [visualOptions, setVisualOptions] = useState(() => {
    const options = getOptionsConfig(charts[0]?.visualOptions);
    return getDefaultOptionsValues(options);
  });
  const [rawViz, setRawViz] = useState(null);
  const [mappingLoading, setMappingLoading] = useState(false);
  const dataMappingRef = useRef(null);

  const columnNames = useMemo(() => {
    if (get(data, 'dataTypes')) {
      return Object.keys(data.dataTypes);
    }
  }, [data]);

  const prevColumnNames = usePrevious(columnNames);
  const clearLocalMapping = useCallback(() => {
    if (dataMappingRef.current) {
      dataMappingRef.current.clearLocalMapping();
    }
  }, []);

  useEffect(() => {
    setVisualOptions((visualOptions) => {
      return {
        ...visualOptions,
        ...currentChart?.defaultOptionsValues(mapping),
      };
    });
  }, [mapping, currentChart]);

  useEffect(() => {
    favicon();
  }, []);

  //resetting mapping when column names changes (ex: separator change in parsing)
  useEffect(() => {
    if (prevColumnNames) {
      if (!columnNames) {
        setMapping({});
        clearLocalMapping();
      } else {
        const prevCols = prevColumnNames.join('.');
        const currentCols = columnNames.join('.');
        if (prevCols !== currentCols) {
          setMapping({});
          clearLocalMapping();
        }
      }
    }
  }, [columnNames, prevColumnNames, clearLocalMapping]);

  // update current chart when the related custom charts change under the hood
  // if the related custom chart is removed set the first chart
  useEffect(() => {
    if (currentChart.rawCustomChart) {
      const currentCustom = find(
        customCharts,
        (c) => c.metadata.id === currentChart.metadata.id
      );
      if (!currentCustom) {
        setCurrentChart(baseCharts[0]);
        return;
      }
      if (
        currentCustom.rawCustomChart.source !==
        currentChart.rawCustomChart.source
      ) {
        setCurrentChart(currentCustom);
      }
    }
  }, [customCharts, currentChart]);

  const handleChartChange = useCallback(
    (nextChart) => {
      setMapping({});
      clearLocalMapping();
      setCurrentChart(nextChart);
      const options = getOptionsConfig(nextChart?.visualOptions);
      setVisualOptions(getDefaultOptionsValues(options));
      setRawViz(null);
    },
    [clearLocalMapping]
  );

  const exportProject = useCallback(async () => {
    const customChart = await exportCustomChart(currentChart);
    return serializeProject({
      userInput,
      userData,
      userDataType,
      parseError,
      unstackedData,
      unstackedColumns,
      data,
      separator,
      thousandsSeparator,
      decimalsSeparator,
      locale,
      stackDimension,
      dataSource,
      currentChart,
      mapping,
      visualOptions,
      customChart,
    });
  }, [
    currentChart,
    data,
    dataSource,
    decimalsSeparator,
    locale,
    mapping,
    parseError,
    separator,
    stackDimension,
    thousandsSeparator,
    userData,
    userDataType,
    userInput,
    visualOptions,
    unstackedColumns,
    unstackedData,
    exportCustomChart,
  ]);

  // project import
  const importProject = useCallback(
    async (project, fromUrl) => {
      let nextCurrentChart;
      if (project.currentChart.rawCustomChart) {
        try {
          nextCurrentChart = await importCustomChartFromProject(
            project.currentChart
          );
        } catch (err) {
          if (err.isAbortByUser) {
            if (fromUrl) {
              // NOTE: clean the url when the user abort loading custom js
              window.history.replaceState(null, null, '/');
            }
            return;
          }
          throw err;
        }
      } else {
        nextCurrentChart = project.currentChart;
      }
      hydrateFromSavedProject(project);
      setCurrentChart(nextCurrentChart);
      setMapping(project.mapping);
      // adding "annotations" for color scale:
      // we annotate the incoming options values (complex ones such as color scales)
      // to le the ui know they are coming from a loaded project
      // so we don't have to re-evaluate defaults
      // this is due to the current implementation of the color scale
      const patchedOptions = { ...project.visualOptions };
      Object.keys(patchedOptions).forEach((k) => {
        if (isPlainObject(patchedOptions[k])) {
          patchedOptions[k].__loaded = true;
        }
      });
      setVisualOptions(project.visualOptions);
    },
    [hydrateFromSavedProject, importCustomChartFromProject]
  );

  useEffect(() => {
    i18n.changeLanguage(cookies.chosenLocale);
  }, [setCookie, i18n, cookies.chosenLocale]);

  const [logged, setLogged] = useState(false);

  const chartIndex = charts.findIndex((c) => c === currentChart);
  const [map, setMap] = useState(null);

  const showWMSMap = useCallback(() => {
    return dataLoader.dataSource?.type === 'wms' && !data;
  }, [dataLoader.dataSource, data]);

  const showChartSelector = useCallback(() => {
    return data;
  }, [data]);

  const showChartConfigurator = useCallback(() => {
    return data && currentChart;
  }, [data, currentChart]);

  const showExportOptions = useCallback(() => {
    return ((data && rawViz) || map) && dataLoader.dataSource;
  }, [data, rawViz, map, dataLoader.dataSource]);

  return (
    <div className="App">
      <Header value={i18n.language} setLogged={setLogged} />
      <CustomChartWarnModal
        toConfirmCustomChart={toConfirmCustomChart}
        confirmCustomChartLoad={confirmCustomChartLoad}
        abortCustomChartLoad={abortCustomChartLoad}
      />
      <div className="app-sections">
        {logged && (
          <>
            <Section
              title={t('global.section.loaddata.title')}
              loading={loading}
            >
              <DataLoader {...dataLoader} hydrateFromProject={importProject} />
            </Section>
            {showWMSMap() && (
              <Section title="WMS Map">
                <WMSMap
                  sources={dataLoader.dataSource?.sources}
                  setMap={setMap}
                  map={map}
                />
              </Section>
            )}
            {showChartSelector() && (
              <Section title={t('global.section.chartselection.title')}>
                <ChartSelector
                  availableCharts={charts}
                  currentChart={currentChart}
                  setCurrentChart={handleChartChange}
                />
              </Section>
            )}
            {showChartConfigurator() && (
              <Section
                title={t('global.section.mapping.title')}
                loading={mappingLoading}
              >
                <DataMapping
                  ref={dataMappingRef}
                  dimensions={currentChart.dimensions}
                  dataTypes={data.dataTypes}
                  mapping={mapping}
                  setMapping={setMapping}
                />
              </Section>
            )}
            {showChartConfigurator() && (
              <Section title={t('global.section.customize.title')}>
                <ChartPreviewWithOptions
                  chart={currentChart}
                  dataset={data.dataset}
                  dataTypes={data.dataTypes}
                  mapping={mapping}
                  visualOptions={visualOptions}
                  setVisualOptions={setVisualOptions}
                  setRawViz={setRawViz}
                  setMappingLoading={setMappingLoading}
                />
              </Section>
            )}
            {showExportOptions() && (
              <Section title={t('global.section.export.title')}>
                <Exporter
                  rawViz={rawViz}
                  exportProject={exportProject}
                  userData={dataLoader.userData}
                  dataSource={dataLoader.dataSource}
                  chartIndex={chartIndex}
                  mapping={mapping}
                  visualOptions={visualOptions}
                  dataTypes={data?.dataTypes}
                  dimensions={currentChart.dimensions}
                  locale={i18n.language}
                  decimalsSeparator={dataLoader.decimalsSeparator}
                  thousandsSeparator={dataLoader.thousandsSeparator}
                  map={map}
                />
              </Section>
            )}
          </>
        )}
        <Footer value={i18n.language} />
      </div>
      <ScreenSizeAlert />
    </div>
  );
}

export default App;
