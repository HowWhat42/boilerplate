
import { useLocation } from '@tanstack/react-router'
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
} from 'intlayer'
import { setLocaleCookie, useLocale } from 'react-intlayer'

import { LocalizedLink } from './localized-link'
import type { To } from './localized-link';
import type { FC } from 'react'

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation()

  const { availableLocales, locale } = useLocale()

  const pathWithoutLocale = getPathWithoutLocale(pathname)

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <LocalizedLink
            aria-current={localeItem === locale ? 'page' : undefined}
            onClick={() => setLocaleCookie(localeItem)}
            params={{ locale: localeItem }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Locale - par ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre locale - par ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale courante - par ex. Francés avec la locale courante définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        ))}
      </div>
    </div>
  )
}
