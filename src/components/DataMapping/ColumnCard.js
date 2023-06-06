import React from 'react';
import { dataTypeIcons } from '../../constants';
import { getTypeName } from '@rawgraphs/rawgraphs-core';

import { useDrag } from 'react-dnd';

import styles from './DataMapping.module.scss';

const ColumnCard = ({
  dimensionName,
  dimensionType,
  commitLocalMapping,
  rollbackLocalMapping,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: () => ({ id: dimensionName, type: 'column' }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        commitLocalMapping();
      } else {
        rollbackLocalMapping();
      }
    },
  });

  const dimType = getTypeName(dimensionType);
  const DataTypeIcon = dataTypeIcons[dimType];

  return (
    <div
      ref={drag}
      className={`column-card ${styles['column-card']} ${
        isDragging ? 'is-dragging' : ''
      }`}
    >
      <DataTypeIcon className={styles['data-type-icon']} />
      <span className={styles['column-title']}>{dimensionName}</span>
    </div>
  );
};

export default ColumnCard;
