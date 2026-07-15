import { PII_PATTERNS } from "./regexPatterns.js";

export function detectPII(text) {
  const detectedPII = [];

  for (const pattern of Object.values(PII_PATTERNS)) {
    if (!pattern.anonymize) continue;

    const matches = text.match(pattern.regex);

    if (!matches) continue;

    const uniqueMatches = [...new Set(matches)];

    detectedPII.push({
      type: pattern.type,
      category: pattern.category,
      matches: uniqueMatches,
    });
  }

  return detectedPII;
}