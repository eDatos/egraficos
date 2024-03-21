import React, {useRef, useEffect} from 'react';
import useDebounce from '../../hooks/useDebounce';
import WarningMessage from '../WarningMessage';
import ReactEcharts from 'echarts-for-react';
import {useTranslation} from 'react-i18next';
import styles from './ChartPreview.module.scss';

const ChartPreview = ({
                          chart,
                          dataset: data,
                          mapping,
                          visualOptions,
                          error,
                          setError,
                          setRawViz,
                      }) => {
    const domRef = useRef(null);
    const vizOptionsDebounced = useDebounce(visualOptions, 200);
    const {t, i18n} = useTranslation();
    useEffect(() => {
        setError(null);

        // control required variables
        // need to create this array because the prop mapping does not return to {} when data is inserted and removed
        const currentlyMapped = [];
        for (let variable in mapping) {
            if (mapping[variable].ids && mapping[variable].ids.length > 0) {
                currentlyMapped.push(variable);
            }
        }

        let requiredVariables = chart.dimensions.filter(
            (d) => d.required && currentlyMapped.indexOf(d.id) === -1
        );

        if (requiredVariables.length > 0) {
            let errorMessage = (
                <span>
          {t('global.section.chartselection.warnings.required')}:{' '}
                    {t('global.section.chartselection.warnings.map')}{' '}
        </span>
            );
            setError({variant: 'secondary', message: errorMessage});
            setRawViz(null);
            while (domRef.current.firstChild) {
                domRef.current.removeChild(domRef.current.firstChild);
            }
            return;
        }

        // control multiple required variables
        const multivaluesVariables = chart.dimensions.filter(
            (d) =>
                d.multiple &&
                d.required &&
                d.minValues &&
                mapping[d.id].ids.length < d.minValues
        );
        if (multivaluesVariables.length > 0) {
            let errorMessage = (
                <span>
          Please map{' '}
                    {multivaluesVariables
                        .map((d) => (
                            <>
                                at least <span className="font-weight-bold">{d.minValues}</span>{' '}
                                dimensions on <span className="font-weight-bold">{d.name}</span>
                            </>
                        ))
                        .reduce((prev, curr) => [prev, ' and ', curr])}
                    .
        </span>
            );
            setError({variant: 'secondary', message: errorMessage});
            setRawViz(null);
            while (domRef.current.firstChild) {
                domRef.current.removeChild(domRef.current.firstChild);
            }
            return;
        }
        // control data-types mismatches
        for (let variable in mapping) {
            if (
                mapping[variable].ids &&
                mapping[variable].ids.length > 0 &&
                !mapping[variable].isValid
            ) {
                const variableObj = chart.dimensions.find((d) => d.id === variable);
                const errorMessage = `Data-type mismatch: you can’t map ${mapping[variable].mappedType}s on ${variableObj.name}.`;
                setError({variant: 'danger', message: errorMessage});
                setRawViz(null);
                while (domRef.current.firstChild) {
                    domRef.current.removeChild(domRef.current.firstChild);
                }
                return;
            }
        }
    }, [setError, vizOptionsDebounced, setRawViz, chart, mapping, t]);

    var options = {};
    try {
        options =
            error === null
                ? chart.getChartOptions(
                    visualOptions,
                    data,
                    mapping,
                    chart.dataTypes,
                    chart.dimensions,
                    i18n.language
                )
                : {};
        if (domRef && domRef.current && !error) {
            domRef.current.getEchartsInstance().setOption(options, true);
            setRawViz(domRef.current?.getEchartsInstance());
        }
    } catch (e) {
        setError({variant: 'danger', message: 'Chart error. ' + e.message});
        setRawViz(null);
    }
    return (
        <div className={'col-8 col-xl-9'}>
            <div
                className={['overflow-auto', 'position-sticky'].join(' ')}
                style={{top: 'calc(15px + var(--header-height))'}}
            >
                {error && (
                    <WarningMessage variant={error.variant} message={error.message}/>
                )}
                <div ref={domRef}>{/* Don't put content in this <div /> */}</div>
            </div>
            <div className={styles.echartsForEcharts}>
                <ReactEcharts
                    option={options}
                    className="echarts-for-echarts"
                    ref={domRef}
                    style={{
                        height: visualOptions.height,
                        backgroundColor: visualOptions.background,
                    }}
                    opts={{renderer: visualOptions.render}}
                />
            </div>
        </div>
    );
};

export default React.memo(ChartPreview);
