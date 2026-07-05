import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import en from "../../new-translations/en.json";
import ru from "../../new-translations/ru.json";
import uz from "../../new-translations/uz.json";

const messages = { en, ru, uz };

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
    timeZone: "Asia/Tashkent",
  };
});
