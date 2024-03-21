import {get} from 'lodash';
import React, {useCallback, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {
    BsArrowCounterclockwise,
    BsArrowRepeat,
    BsClipboard,
    BsCloud,
    BsFolder,
    BsGift,
    BsMap,
    BsSearch,
    BsUpload,
} from 'react-icons/bs';
import {DATA_LOADER_MODE} from '../../hooks/useDataLoader';
import DataGrid from '../DataGrid/DataGrid';
import DataSamples from '../DataSamples/DataSamples';
import JsonViewer from '../JsonViewer';
import ParsingOptions from '../ParsingOptions';
import styles from './DataLoader.module.scss';
import LoadProject from './loaders/LoadProject';
import Paste from './loaders/Paste';
import UploadFile from './loaders/UploadFile';
import UrlFetch from './loaders/UrlFetch';
import Loading from './loading';
import WarningMessage from '../WarningMessage';
import DataMismatchModal from './DataMismatchModal';
import SparqlFetch from './loaders/SparqlFetch';
import {tsvFormat} from 'd3-dsv';
import {CopyToClipboardButton} from '../CopyToClipboardButton';
import {Trans, useTranslation} from 'react-i18next';
import EDatosFetch from './loaders/EDatosFetch';
import WMSFetch from './loaders/WMSFetch';

function DataLoader({
                        userInput,
                        setUserInput,
                        userData,
                        userDataType,
                        parseError,
                        unstackedColumns,
                        separator,
                        setSeparator,
                        thousandsSeparator,
                        setThousandsSeparator,
                        decimalsSeparator,
                        setDecimalsSeparator,
                        locale,
                        setLocale,
                        stackDimension,
                        dataSource,
                        setDataSource,
                        data,
                        loading,
                        coerceTypes,
                        loadSample,
                        handleInlineEdit,
                        handleStackOperation,
                        setJsonData,
                        resetDataLoader,
                        dataLoaderMode,
                        startDataReplace,
                        cancelDataReplace,
                        commitDataReplace,
                        replaceRequiresConfirmation,
                        hydrateFromProject,
                        initialState,
                    }) {
    const [loadingError, setLoadingError] = useState();
    const [initialOptionState, setInitialOptionState] = useState(null);

    const options = [
        {
            id: 'eDatos',
            name: <Trans i18nKey="global.section.loaddata.edatos.name"></Trans>,
            loader: ([
                    <EDatosFetch
                        setUserInput={(rawInput, source) => setUserInput(rawInput, source)}
                    />,
                    <DataSamples
                        onSampleReady={loadSample}
                        setLoadingError={setLoadingError}
                    />,
                ]
            ),
            icon: BsCloud,
            allowedForReplace: true,
        },
        {
            id: 'files',
            name: <Trans i18nKey="global.section.loaddata.paste.name"></Trans>,
            loader: ([
                    <Paste
                        userInput={userInput}
                        setUserInput={(rawInput) => setUserInput(rawInput)}
                        setLoadingError={setLoadingError}
                    />,
                    <UploadFile
                        userInput={userInput}
                        setUserInput={(rawInput) =>
                            setUserInput(rawInput)
                        }
                        setLoadingError={setLoadingError}
                    />,
                    <UrlFetch
                        userInput={userInput}
                        setUserInput={(rawInput, source) => setUserInput(rawInput, source)}
                        setLoadingError={setLoadingError}
                        initialState={
                            initialOptionState?.type === 'url' ? initialOptionState : null
                        }
                    />
                ]
            ),
            icon: BsClipboard,
            allowedForReplace: true,
        },
        {
            id: 'project',
            name: <Trans i18nKey="global.section.loaddata.sparql.name"></Trans>,
            loader: ([
                // TODO: Implement SparQL fetch ¿DóNDE SE USA O COMO SE LLEGA?
                 /*   <SparqlFetch
                        userInput={userInput}
                        setUserInput={(rawInput, source) => setUserInput(rawInput, source)}
                        setLoadingError={setLoadingError}
                        initialState={
                            initialOptionState?.type === 'sparql' ? initialOptionState : null
                        }
                    />,*/
                    <LoadProject
                        onProjectSelected={hydrateFromProject}
                        setLoadingError={setLoadingError}
                    />,
                ]
            ),
            icon: BsCloud,
            disabled: true,
            allowedForReplace: true,
        },
        {
            id: 'WMS',
            name: <Trans i18nKey="global.section.loaddata.wms.name"></Trans>,
            message: <Trans i18nKey="global.section.loaddata.wms.message"></Trans>,
            loader: <WMSFetch setDataSource={setDataSource}/>,
            icon: BsMap,
            allowedForReplace: false,
        },
    ];
    const [optionId, setOptionId] = useState(initialState);
    const selectedOption = options.filter((option) => option.id === optionId)[0];
    const {t} = useTranslation(['translation']);

    let mainContent;
    if (userData && data) {
        mainContent = (
            <DataGrid
                userDataset={userData}
                errors={data.errors}
                dataTypes={data.dataTypes}
                coerceTypes={coerceTypes}
                onDataUpdate={handleInlineEdit}
            />
        );
    } else if (userDataType === 'json' && userData === null) {
        mainContent = (
            <JsonViewer
                context={JSON.parse(userInput)}
                selectFilter={(ctx) => Array.isArray(ctx)}
                onSelect={(ctx, path) => {
                    setJsonData(ctx, path);
                }}
            />
        );
    } else if (loading && !data) {
        mainContent = <Loading/>;
    } else {
        mainContent = (
            <>
                {selectedOption.loader}
                <p className="mt-3">{selectedOption.message}</p>
            </>
        );
    }

    // #TODO: memoize/move to component?
    function parsingErrors(data) {
        const errors = get(data, 'errors', []);
        const successRows = data.dataset.length - errors.length;
        const row = errors[0].row + 1;
        const column = Object.keys(errors[0].error)[0];
        return (
            <span>
        {t('global.section.loaddata.errors.check')}{' '}
                <span className="font-weight-bold">
          {t('global.section.loaddata.errors.row')} {row}{' '}
        </span>
                {t('global.section.loaddata.errors.column')}{' '}
                <span className="font-weight-bold">{column}</span>.{' '}
                {errors.length === 2 && (
                    <>
                        {' '}
                        {t('global.section.loaddata.errors.issueRow')}{' '}
                        <span className="font-weight-bold">{errors[1].row + 1}</span>.{' '}
                    </>
                )}
                {errors.length > 2 && (
                    <>
                        {' '}
                        {t('global.section.loaddata.errors.issues')}{' '}
                        <span className="font-weight-bold">{errors.length - 1}</span>{' '}
                        {t('global.section.loaddata.errors.rows')}.{' '}
                    </>
                )}
                {successRows > 0 && (
                    <>
                        {t('global.section.loaddata.errors.remaining')}{' '}
                        <span className="font-weight-bold">
              {successRows} {t('global.section.loaddata.errors.row')}
                            {successRows > 1 && <>s</>}
            </span>{' '}
                        {t('global.section.loaddata.errors.look')}
                        {successRows === 1 && <>s</>}{' '}
                        {t('global.section.loaddata.errors.fine')}.
                    </>
                )}
      </span>
        );
    }

    const reloadRAW = useCallback(() => {
        window.location.replace(window.location.pathname);
    }, []);

    const copyToClipboardButton = !!userData ? (
        <CopyToClipboardButton content={tsvFormat(userData)}/>
    ) : null;

    return (
        <>
            <Row>
                {userData && (
                    <Col xs={10} lg={12} className="d-flex flex-column justify-content-start pl-3 pr-0 options">
                        <div className='row-large justify-content-start'>
                            <div className="horizontal-buttons ml-auto" onClick={reloadRAW} >
                                <button className="text-icon-button btn-thin-cancel" type="button" >
                                    <i className="fa-thin fa-arrow-rotate-right"></i>
                                    <span>{t('global.reset').toUpperCase()}</span>
                                </button>
                            </div>
                            <div className="horizontal-buttons ml-auto" onClick={() => {
                                setInitialOptionState(dataSource);
                                const dataSourceIndex = options.findIndex(
                                    (opt) => opt.id === dataSource?.type
                                );
                                setOptionId(options[Math.max(dataSourceIndex, 0)].id);
                                startDataReplace();
                            }}>
                                <button className="text-icon-button btn-thin-default" type="button">
                                    <i className="fa-thin fa-rotate"></i>
                                    <span>{t('global.changedata').toUpperCase()}</span>
                                </button>
                            </div>
                            {copyToClipboardButton}
                        </div>

                        <ParsingOptions
                            locale={locale}
                            setLocale={setLocale}
                            separator={separator}
                            setSeparator={setSeparator}
                            thousandsSeparator={thousandsSeparator}
                            setThousandsSeparator={setThousandsSeparator}
                            decimalsSeparator={decimalsSeparator}
                            setDecimalsSeparator={setDecimalsSeparator}
                            dimensions={data ? unstackedColumns || data.dataTypes : []}
                            stackDimension={stackDimension}
                            setStackDimension={handleStackOperation}
                            userDataType={userDataType}
                            dataSource={dataSource}
                            onDataRefreshed={(rawInput) => setUserInput(rawInput, dataSource)}
                        />

                    </Col>
                )}
                {!userData && dataSource?.sources && (
                    <Col
                        xs={3}
                        lg={2}
                        className="d-flex flex-column justify-content-start pl-3 pr-0 options"
                    >
                        <div
                            className={`w-100 mb-2 d-flex justify-content-center align-items-center ${styles['start-over']} user-select-none cursor-pointer`}
                            onClick={reloadRAW}
                        >
                            <BsArrowRepeat className="mr-2"/>
                            <h4 className="m-0 d-inline-block">
                                <Trans i18nKey="global.reset"></Trans>
                            </h4>
                        </div>
                    </Col>
                )}
                <Col xs={10} lg={12}>
                    <Row className="h-100">
                        <Col className="h-100 data-loader">
                            {mainContent}

                            {data && !parseError && get(data, 'errors', []).length === 0 && (
                                <WarningMessage
                                    variant="success"
                                    message={
                                        <Trans
                                            i18nKey="global.message.loadrows.succes"
                                            values={{
                                                rowsnumber: data.dataset.length,
                                                cellsnumber:
                                                    data.dataset.length *
                                                    Object.keys(data.dataTypes).length,
                                            }}
                                        ></Trans>
                                    }
                                />
                            )}

                            {parseError && (
                                <WarningMessage
                                    variant="danger"
                                    message={parseError}
                                />
                            )}

                            {get(data, 'errors', []).length > 0 && (
                                <WarningMessage
                                    variant="warning"
                                    message={parsingErrors(data)}
                                />
                            )}

                            {loadingError && (
                                <WarningMessage
                                    variant="danger"
                                    message={loadingError}
                                />
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
            {replaceRequiresConfirmation && (
                <DataMismatchModal
                    replaceRequiresConfirmation={replaceRequiresConfirmation}
                    commitDataReplace={commitDataReplace}
                    cancelDataReplace={cancelDataReplace}
                />
            )}
        </>
    );
}

export default React.memo(DataLoader);
