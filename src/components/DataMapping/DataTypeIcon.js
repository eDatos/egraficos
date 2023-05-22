import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { dataTypeIcons } from '../../constants'
import styles from './DataMapping.module.scss'

class DataTypeIcon extends React.Component {
  constructor(props) {
    super(props)
    this.iconRef = React.createRef()
  }

  render() {
    const DataTypeIcon = dataTypeIcons[this.props.type]
    const renderTooltip = (props) => (
      <Tooltip id={`tooltip-top`} {...props}>
        Accepts {this.props.type}s
      </Tooltip>
    )

    return (
      <span>
        <OverlayTrigger key="top" placement="top" overlay={renderTooltip}>
          <div ref={this.iconRef} className="d-inline-block">
            <DataTypeIcon className={styles['accepted-type-icon']} />
          </div>
        </OverlayTrigger>
      </span>
    )
  }
}

export default DataTypeIcon
