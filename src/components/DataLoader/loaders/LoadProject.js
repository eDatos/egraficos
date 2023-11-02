import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import S from './LoadProject.module.scss';
import { deserializeProject } from '@rawgraphs/rawgraphs-core';
import charts from '../../../charts';
import { useTranslation } from 'react-i18next';

export default function LoadProject({ onProjectSelected, setLoadingError }) {
  const { t } = useTranslation(['translation']);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        try {
          const project = deserializeProject(e.target.result, charts);
          setLoadingError(null);
          onProjectSelected(project);
        } catch (e) {
          setLoadingError(e.message);
        }
      });
      if (acceptedFiles.length) {
        reader.readAsText(acceptedFiles[0]);
      }
    },
    [onProjectSelected, setLoadingError]
  );
  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      onDrop,
      accept: '.edatosgraphs',
      maxFiles: 1,
    });
  return (
    <div
      className={classNames(S.dropzone, {
        [S.reject]: isDragReject,
        [S.accept]: isDragAccept,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <span>{t('global.section.loaddata.project.drag')} </span>
      <Button className={S['browse-button']} color="primary">
        {t('global.section.loaddata.project.browse')}
      </Button>
      <span>{t('global.section.loaddata.project.file')}</span>
      {isDragAccept && <p>{t('global.section.loaddata.project.accepted')}</p>}
      {isDragReject && <p>{t('global.section.loaddata.project.rejected')}</p>}
    </div>
  );
}
