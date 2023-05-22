import { useTranslation } from 'react-i18next'
import { Typeahead } from 'react-bootstrap-typeahead'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Papa from 'papaparse'

function Municipalities(props) {
  const { t } = useTranslation(['translation'])
  const [municipalities, setMunicipalities] = useState([])
  useEffect(() => {
    axios
      .get(
        'https://datos.canarias.es/catalogos/estadisticas/dataset/6dd8baf4-14f4-43a3-88b2-984d034c965c/resource/74237bc8-1e5f-43f1-9f6b-24ef9e073903/download/municipios_desde2007_20170101.csv'
      )
      .then((response) => {
        Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            setMunicipalities(results.data)
          },
        })
      })
  })

  return (
    <Typeahead
      id="select-municipalities"
      labelKey="etiqueta"
      onChange={props.onChange}
      options={municipalities}
      placeholder="Selecciona Municipio"
    />
  )
}

export default Municipalities
