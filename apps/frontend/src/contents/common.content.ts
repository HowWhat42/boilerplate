import {  t } from 'intlayer';
import type {Dictionary} from 'intlayer';

const commonContent = {
  key: 'common',
  content: {
    // NotFound component
    notFound: {
      errorLoading: t({
        en: 'Loading error',
        fr: 'Erreur de chargement',
      }),
      retry: t({
        en: 'Try again',
        fr: 'Réessayer',
      }),
      goBack: t({
        en: 'Go back',
        fr: 'Retourner en arrière',
      }),
    },
    
    // DefaultCatchBoundary component
    defaultCatchBoundary: {
      tryAgain: t({
        en: 'Try Again',
        fr: 'Réessayer',
      }),
      home: t({
        en: 'Home',
        fr: 'Accueil',
      }),
      goBack: t({
        en: 'Go Back',
        fr: 'Retourner en arrière',
      }),
    },
  },
} satisfies Dictionary;

export default commonContent;

