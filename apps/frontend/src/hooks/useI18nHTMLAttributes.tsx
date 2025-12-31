import { useLocale } from 'react-intlayer'
import { useEffect } from 'react'
import { getHTMLTextDir } from 'intlayer'

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale()

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = getHTMLTextDir(locale)
  }, [locale])
}
