import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware({
  ...routing,
  localePrefix: "always",
});

export const config = {
  // Matcher para todas as rotas exceto api, _next, e arquivos estáticos
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
