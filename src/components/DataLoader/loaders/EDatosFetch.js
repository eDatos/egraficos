import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form } from 'react-bootstrap';
import { Translation } from 'react-i18next';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { applicationConfig } from '../../ApplicationConfig/ApplicationConfig';

const SelectionCombo = (props) => {
  return (
    <Typeahead
      id={props.id}
      labelKey={props.name}
      onChange={props.onChange}
      options={props.options}
      placeholder={props.placeholder}
    />
  );
};

class DataSetTypeahead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      value: '',
    };
  }
  componentDidMount() {
    applicationConfig().then((applicationConfigJson) => {
      fetch(
        applicationConfigJson['metadata']['endpoint'] +
          '/properties/' +
          applicationConfigJson['metadata']['statisticalResourcesPathKey'],
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }
      )
        .then((response) => response.json())
        .then((urlData) => {
          fetch(
            urlData['value'] +
              "/latest/datasets.json?limit=1000&orderBy=ID ASC&query=STATISTICAL_OPERATION_URN EQ 'urn:siemac:org.siemac.metamac.infomodel.statisticaloperations.Operation=" +
              this.props.operationId +
              "'"
          )
            .then((response) => response.json())
            .then((res) => {
              const collection = res.dataset
                .filter(
                  (value, index, self) =>
                    index === self.findIndex((t) => t.id === value.id)
                )
                .map((o) => {
                  const localizedName = o.name.text?.filter(
                    (text) => text.lang === this.props.language
                  )[0]?.value;
                  return {
                    id: o.id,
                    name: localizedName ? localizedName : o.name.text[0]?.value,
                    url:
                      o.selfLink.href.slice(
                        0,
                        o.selfLink.href.lastIndexOf('/')
                      ) + '/~latest',
                  };
                })
                .sort((a, b) => a.name.localeCompare(b.name));

              this.setState({ collection });
            });
        });
    });
  }
  onChange = (event) => {
    this.setState({ value: event[0] });
    this.props.handleOnChangeDataSet(event[0]?.url);
  };
  render() {
    return (
      <Form.Group>
        <Form.Label>
          {this.props.t('global.section.loaddata.edatos.cubes')}
        </Form.Label>
        <SelectionCombo
          id="cubes"
          name="name"
          options={this.state.collection}
          onChange={this.onChange}
        />
      </Form.Group>
    );
  }
}

class OperationTypeahead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      value: '',
    };
  }
  componentDidMount() {
    applicationConfig().then((applicationConfigJson) => {
      fetch(
        applicationConfigJson['metadata']['endpoint'] +
          '/properties/' +
          applicationConfigJson['metadata']['statisticalOperationsPathKey'],
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }
      )
        .then((response) => response.json())
        .then((urlData) => {
          fetch(
            urlData['value'] +
              '/latest/operations.json?query=STATUS EQ "PRODUCTION"&limit=1000&orderBy=ID ASC'
          )
            .then((response) => response.json())
            .then((res) =>
              this.setState({
                collection: res.operation
                  .map((o) => {
                    const localizedName = o.name.text?.filter(
                      (text) => text.lang === this.props.language
                    )[0]?.value;
                    return {
                      id: o.id,
                      name: localizedName
                        ? localizedName
                        : o.name.text[0]?.value,
                    };
                  })
                  .sort((a, b) => a.name.localeCompare(b.name)),
              })
            );
        });
    });
  }
  onChange = (event) => {
    this.setState({ value: event[0] });
    this.props.handleOnChangeOperation(event[0]?.id);
  };
  render() {
    return (
      <Form.Group>
        <Form.Label>
          {this.props.t('global.section.loaddata.edatos.statisticalOperations')}
        </Form.Label>
        <SelectionCombo
          id="operacion"
          name="name"
          options={this.state.collection}
          onChange={this.onChange}
        />
      </Form.Group>
    );
  }
}

export default class EDatosFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      operationId: null,
      loading: false,
    };
  }
  handleOnChangeOperation = (operationId) => {
    this.setState({ operationId: operationId });
  };
  handleOnChangeDataSet = (url) => {
    this.setState({ url: url });
  };

  handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ loading: true });
    const source = {
      type: 'url',
      url: this.state.url,
    };
    fetch(this.state.url, {
      method: 'GET',
      headers: { Accept: 'text/csv' },
    })
      .then((response) => response.text())
      .then((data) => {
        this.props.setUserInput(data, source);
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <Translation ns={'translation'}>
        {(t, { i18n }) => (
          <Form onSubmit={this.handleSubmit}>
            <OperationTypeahead
              handleOnChangeOperation={this.handleOnChangeOperation}
              t={t}
              language={i18n.language}
            />
            {this.state.operationId && (
              <DataSetTypeahead
                operationId={this.state.operationId}
                handleOnChangeDataSet={this.handleOnChangeDataSet}
                t={t}
                language={i18n.language}
              />
            )}
            <div className="text-right">
              <button
                className="btn btn-sm btn-success mt-3"
                disabled={!this.state.url || this.state.loading}
                type="submit"
              >
                {t('global.section.loaddata.edatos.loadButton')}
              </button>
            </div>
          </Form>
        )}
      </Translation>
    );
  }
}
