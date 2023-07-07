import { useTranslation } from 'react-i18next';
import { Typeahead } from 'react-bootstrap-typeahead';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import applicationConfig from '../../application.json';

function Municipalities(props) {
  const { t } = useTranslation(['translation']);
  const [municipalities, setMunicipalities] = useState([]);
  useEffect(() => {
    axios
      .get(applicationConfig['municipalities']['endpoint'])
      .then((response) => {
        Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            setMunicipalities(results.data);
          },
        });
      });
  }, [setMunicipalities]);

  return (
    <Typeahead
      id="select-municipalities"
      labelKey="etiqueta"
      onChange={props.onChange}
      options={municipalities}
      placeholder={t('global.section.wmsmunicipalityselection.title')}
    />
  );
}

export default Municipalities;
