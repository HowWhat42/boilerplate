import { Locales } from "intlayer";
import type { IntlayerConfig } from "intlayer";


const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH],
  },
};

export default config;