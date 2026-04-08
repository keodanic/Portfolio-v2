import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Isso tipa normalmente o `requestLocale` como `string | undefined`
  let locale = await requestLocale;

  // Garante que um locale válido seja usado
  if (!locale || !routing.locales.includes(locale as "en" | "pt")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
