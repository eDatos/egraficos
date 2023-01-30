import React, { useCallback, useState } from 'react'
import { Button } from 'react-bootstrap'
import { BsClipboard } from 'react-icons/bs'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import style from './style.module.css'
import { useTranslation } from 'react-i18next';


export function CopyToClipboardButton({ content }) {
  const copyToClipboard = useCopyToClipboard()
  const [pending, setPending] = useState(false)

  const handleCopy = useCallback(() => {
    if (!pending) {
      setPending(true)
      copyToClipboard(content)
      setTimeout(() => {
        setPending(false)
      }, 3000)
    }
  }, [content, copyToClipboard, pending])
  const { t } = useTranslation();

  return (
    <Button
      variant="light"
      className={style['copy-to-clipboard-button'] + " d-flex flex-row align-items-center"}
      onClick={handleCopy}
    >
      {pending && (
        <>
          <IoMdCheckmarkCircle className="text-success" />
          <span className="ml-2">{t('global.copiedclipboard')}</span>
        </>
      )}
      {!pending && (
        <>
          <BsClipboard />
          <span className="ml-2">{t('global.copyclipboard')}</span>
        </>
      )}
    </Button>
  )
}
