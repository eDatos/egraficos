import React from 'react'
import XMLParser from 'react-xml-parser/xmlParser'
import classNames from 'classnames'
import S from './UrlFetch.module.scss'
import { Translation } from 'react-i18next'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import LayersOptionCard from '../../LayersOptionCard/LayersOptionCard'

export default class WMSFetch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: props.url,
      loading: false,
      sources: [],
    }
  }

  handleSubmit = (event) => {
    event.stopPropagation()
    event.preventDefault()
    this.setState({ loading: true })
    const source = {
      type: 'wms',
      url: this.state.url.split('?')[0],
      title: '',
      layers: [],
    }
    axios
      .get(this.state.url)
      .then((response) => response.data)
      .then((xmlText) => {
        let parseFromString = new XMLParser().parseFromString(xmlText)
        source.title = parseFromString
          .getElementsByTagName('Service')[0]
          .children.filter((child) => 'Title' === child.name)[0].value
        source.layers = parseFromString
          .getElementsByTagName('Layer')
          .map((input) =>
            input.children.flatMap((children) => {
              if (children.name === 'Style') {
                const legendURL = children.children.filter(
                  (element) => element.name === 'LegendURL'
                )[0]
                if (legendURL) {
                  const attributes = legendURL.attributes
                  attributes['url'] = legendURL.children.filter(
                    (element) => element.name === 'OnlineResource'
                  )[0].attributes['xlink:href']
                  return [{ [legendURL.name]: attributes }]
                }
                return []
              }
              return children.name === 'Title' || children.name === 'Name'
                ? [{ [children.name]: children.value }]
                : []
            })
          )
          .filter((input) => input.length > 1)
          .reduce((acc, curr) => {
            const entry = {}
            curr.forEach((value) => {
              Object.keys(value).forEach((key) => (entry[key] = value[key]))
            })
            return [...acc, entry]
          }, [])
        this.props.setLayers(source.layers)
        this.props.setDataSource(source)
        this.setState({ sources: [...this.state.sources, source] })
      })
      .finally(() => this.setState({ loading: false }))
  }

  render() {
    return (
      <Translation ns={'translation'}>
        {(t) => (
          <>
            <Form onSubmit={this.handleSubmit}>
              <input
                className={classNames('w-100', S['url-input'])}
                value={this.state.url}
                onChange={(event) => {
                  this.setState({ url: event.target.value })
                }}
              />
              <div className="text-right">
                <button
                  className="btn btn-sm btn-success mt-3"
                  disabled={!this.state.url || this.state.loading}
                  type="submit"
                >
                  {t('global.section.loaddata.wms.loadButton')}
                </button>
              </div>
            </Form>
            {this.state.sources.map((source) => (
              <LayersOptionCard
                url={source.url}
                title={source.title}
                layers={source.layers}
                selectedLayers={this.props.selectedLayers}
                setSelectedLayers={this.props.setSelectedLayers}
              />
            ))}
          </>
        )}
      </Translation>
    )
  }
}
