import React, { useCallback } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans } from 'react-i18next'

export default function StackSelector({
  title,
  value,
  list,
  onChange,
  ...props
}) {
  const handleChange = useCallback(
    (nextDimension) => {
      if (onChange) {
        onChange(nextDimension)
      }
    },
    [onChange]
  )

  return (
    <div className="option">
      {title}
      <Dropdown className="d-inline-block raw-dropdown">
        <Dropdown.Toggle
          variant="white"
          className="truncate-160px"
          disabled={list.length === 0}
        >
          {value ? value : <Trans i18nKey="global.column"></Trans>}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {value && (
            <Dropdown.Item onSelect={() => handleChange(null)}>
              {'Do not stack'}
            </Dropdown.Item>
          )}
          {Object.keys(list).map((d) => {
            return (
              <Dropdown.Item key={d} onSelect={() => handleChange(d)}>
                {d}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
