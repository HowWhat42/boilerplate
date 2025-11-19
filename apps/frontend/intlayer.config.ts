import { Locales } from "intlayer";
import type { IntlayerConfig } from "intlayer";


const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH],
  },
  routing: {
    mode: 'prefix-all'
  }
};

export default config;