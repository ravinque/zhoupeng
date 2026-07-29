export type PreferredLanguage = "zh" | "en" | "ar";

export function detectPreferredLanguage(): PreferredLanguage {
  const candidates = [
    ...(window.navigator.languages || []),
    window.navigator.language,
    Intl.DateTimeFormat().resolvedOptions().locale,
  ].filter(Boolean);

  for (const candidate of candidates) {
    const locale = candidate.toLowerCase();
    if (locale.startsWith("zh")) return "zh";
    if (locale.startsWith("ar")) return "ar";
    if (locale.startsWith("en")) return "en";
  }

  return "en";
}
