import type { FC } from 'react'
import type { LinkComponentProps } from '@tanstack/react-router'

import { useLocale } from 'react-intlayer'
import { Link } from '@tanstack/react-router'

export const LOCALE_ROUTE = '$locale' as const

// Utilitaire principal
export type RemoveLocaleParam<T> = T extends string ? RemoveLocaleFromString<T> : T

export type To = RemoveLocaleParam<LinkComponentProps['to']>

type CollapseDoubleSlashes<TString extends string> = TString extends `${infer H}//${infer T}`
  ? CollapseDoubleSlashes<`${H}/${T}`>
  : TString

type LocalizedLinkProps = {
  to?: To
} & Omit<LinkComponentProps, 'to'>

// Helpers
type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer H}${TSub}${infer T}` ? RemoveAll<`${H}${T}`, TSub> : TString

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale()

  return (
    <Link
      {...props}
      params={{
        locale,
        ...(typeof props.params === 'object' ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps['to']}
    />
  )
}
