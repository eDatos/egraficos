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
      url: '',
      loading: false,
      sources: [],
      type: 'wms',
    }
  }

  removeWMS = (index) => {
    const newSources = [...this.state.sources]
    newSources.splice(index, 1)
    this.updateSources(newSources)
  }

  setSelectedLayers = (layers, index) => {
    const sources = [...this.state.sources]
    sources[index].selectedLayers = layers
    this.updateSources(sources)
  }

  updateSources(sources) {
    this.setState({ sources: sources })
    this.props.setDataSource({
      type: this.state.type,
      sources: sources,
    })
  }

  handleSubmit = (event) => {
    event.stopPropagation()
    event.preventDefault()
    this.setState({ loading: true })
    const source = {
      url: this.state.url.split('?')[0],
      title: '',
      layers: [],
      selectedLayers: [],
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
                  const styleName = children.children
                    .filter((element) => element.name === 'Name')
                    .map((e) => e.value)[0]
                  const styleTitle = children.children
                    .filter((element) => element.name === 'Title')
                    .map((e) => e.value)[0]
                  const attributes = legendURL.attributes
                  attributes['url'] = legendURL.children.filter(
                    (element) => element.name === 'OnlineResource'
                  )[0].attributes['xlink:href']
                  return [
                    {
                      [styleName]: {
                        styleTitle: styleTitle,
                        styleName: styleName,
                        [legendURL.name]: attributes,
                      },
                    },
                  ]
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
        this.setState({ sources: [...this.state.sources, source] })
        this.props.setDataSource({
          type: this.state.type,
          sources: this.state.sources,
        })
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
            {this.state.sources.map((source, index) => (
              <LayersOptionCard
                key={index}
                index={index}
                title={source.title}
                layers={source.layers}
                selectedLayers={source.selectedLayers}
                setSelectedLayers={(selectedLayers) =>
                  this.setSelectedLayers(selectedLayers, index)
                }
                onRemove={this.removeWMS}
              />
            ))}
          </>
        )}
      </Translation>
    )
  }
}
