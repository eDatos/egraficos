import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import styles from './DataSamples.module.scss';
import { useTranslation } from 'react-i18next';

const samplesList = [
  {
    name: 'global.section.sampleData.sample1',
    category: 'global.section.chartselection.barchart.title',
    url: './sample-datasets/Tasa Insercion por edad - canarias.csv',
    delimiter: ',',
    sourceName: 'ISTAC',
    sourceURL:
      'https://www3.gobiernodecanarias.org/aplicaciones/appsistac/ods/4-3-1/',
  },
  {
    name: 'global.section.sampleData.sample2',
    category: 'global.section.chartselection.barchart.title',
    url: './sample-datasets/IPC - canarias.csv',
    delimiter: ',',
    sourceName: 'ISTAC',
    sourceURL:
      'https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/datasets/ISTAC/E30138A_000001/~latest?representation=MEDIDAS[IPC]:TERRITORIO[ES70]:TIME_PERIOD[2023-M04]',
  },
  {
    name: 'global.section.sampleData.sample3',
    category: 'global.section.chartselection.stackedbarchart.title',
    url: './sample-datasets/Consumo energetico por sectores - canarias.csv',
    delimiter: ',',
    sourceName: 'ISTAC',
    sourceURL:
      'https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/datasets/ISTAC/C00022A_000005/~latest?representation=TERRITORIO[ES708|ES704|ES705|ES709|ES706|ES707|ES703]:TIME_PERIOD[2022-12-31]',
  },
  {
    name: 'global.section.sampleData.sample4',
    category: 'global.section.chartselection.piechart.title',
    url: './sample-datasets/Egresos por ramas - canarias.csv',
    delimiter: ',',
    sourceName: 'ISTAC',
    sourceURL:
      'https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/datasets/ISTAC/C00051A_000001/~latest?representation=TIME_PERIOD[2021]:SEXO[_T]:UNIVERSIDADES[UNIVERSIDADES_PUBLICAS_PRESENCIALES]:NIVEL_ACADEMICO[_T]:RAMA_ENSENIANZA[ARTES_HUMANIDADES|CIENCIAS_SOCIALES_JURIDICAS|CIENCIAS_SALUD|CIENCIAS|INGENIERIA_ARQUITECTURA',
  },
  {
    name: 'global.section.sampleData.sample5',
    category: 'global.section.chartselection.donutchart.title',
    url: './sample-datasets/Tabaquismo por edad - canarias.csv',
    delimiter: ',',
    sourceName: 'ISTAC',
    sourceURL:
      'https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/datasets/ISTAC/C00035A_000228/~latest?representation=MEDIDAS[POBLACION]:SEXO[_T]:EDAD[_T]',
  },
  {
    name: 'global.section.sampleData.sample6',
    category: 'global.section.chartselection.halfdonutchart.title',
    url: './sample-datasets/Elecciones autonomicas 2023 - canarias.csv',
    delimiter: ',',
    sourceName: 'ISTAC',
    sourceURL:
      'https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/datasets/ISTAC/C00010A_000055/1.0?dim=TERRITORIO:ES70:CANDIDATURAS:P_PSOE|P_CC|P_PP|P_VOX|P_NC_BC|P_USP|P_DVC|P_UXGC|P_PACMA|P_CS|P_ASG|P_AMF|P_PNC|P_REUNIR_CANARIAS_SOSTENIBLE|P_AHORA_CANARIAS_PCPC|P_HABLEMOS_AHORA|P_MC|P_AT|P_3E_EN_ACCION|P_AHI|P_IXLG|P_PAIS_CON_GESTORES|P_ASAMBLEA_HERRENIA|P_MAE|P_CONTIGO|P_UDC',
  },
  {
    name: 'global.section.sampleData.sample7',
    category: 'global.section.chartselection.linechart.title',
    url: './sample-datasets/Poblacion canaria.csv',
    delimiter: ',',
    sourceName: 'ISTAC',
    sourceURL:
      'https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/datasets/ISTAC/E30245A_000002/~latest?representation=MEDIDAS[POBLACION]:TERRITORIO[ES708|ES704|ES705|ES709|ES706|ES707|ES703]:SEXO[_T]',
  },
  {
    name: 'global.section.sampleData.sample8',
    category: 'global.section.chartselection.treemapchart.title',
    url: './sample-datasets/turistas por paises - canarias.csv',
    delimiter: ',',
    sourceName: 'ISTAC',
    sourceURL:
      'https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/queries/ISTAC/C00065A_000007?representation=TIME_PERIOD[2022-A1]:TERRITORIO[ES70]:MEDIDAS[PERNOCTACIONES]',
  },
];
export default function DataSamples({ onSampleReady, setLoadingError }) {
  const { t } = useTranslation();

  const select = async (sample) => {
    const { delimiter, url } = sample;
    let response;
    try {
      response = await fetch(url);
    } catch (e) {
      setLoadingError('Loading error. ' + e.message);
      return;
    }
    const text = await response.text();
    onSampleReady(text, delimiter);
    setLoadingError(null);
  };
  return (
    <Row>
      {samplesList.map((d, i) => {
        return (
          <Col xs={12} lg={6} xl={6} key={i} style={{ marginBottom: 15 }}>
            <Card className="custom-card cursor-pointer h-100">
              <Card.Body
                onClick={() => {
                  select(d);
                }}
                className="d-flex flex-column"
              >
                <Card.Title className="">
                  <h2 className="">{t(d.name)}</h2>
                  <h4 className="m-0">{t(d.category)}</h4>
                </Card.Title>
              </Card.Body>
              <a
                href={d.sourceURL}
                className={[styles['dataset-source']].join(' ')}
              >
                Source: {d.sourceName}
              </a>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
