import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsClipboard } from 'react-icons/bs';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';

export function CopyToClipboardButton({ content }) {
  const copyToClipboard = useCopyToClipboard();
  const [pending, setPending] = useState(false);

  const handleCopy = useCallback(() => {
    if (!pending) {
      setPending(true);
      copyToClipboard(content);
      setTimeout(() => {
        setPending(false);
      }, 3000);
    }
  }, [content, copyToClipboard, pending]);
  const { t } = useTranslation();

  return (
      <div className="horizontal-buttons ml-auto" onClick={handleCopy}>
      {pending && (
        <>
          <button className="text-icon-button btn-thin-default text-success" type="button">
            <i className="fa-thin fa-copy"></i>
            <span>{t('global.copiedclipboard').toUpperCase()}</span>
          </button>
        </>
      )}
      {!pending && (
        <>
          <button className="text-icon-button btn-thin-default" type="button">
            <i className="fa-thin fa-copy"></i>
            <span>{t('global.copyclipboard').toUpperCase()}</span>
          </button>
        </>
      )}

      </div>
  );
}
