import { PII_PATTERNS } from "./regexPatterns.js";

export function tokenizePII(detectedPII) {
  const placeholderToValue = {};
  const valueToPlaceholder = {};

  for (const pii of detectedPII) {
    const { type, matches } = pii;
    const { placeholder } = PII_PATTERNS[type];

    matches.forEach((value, index) => {
      const token = `[${placeholder}_${index + 1}]`;

      placeholderToValue[token] = value;
      valueToPlaceholder[value] = token;
    });
  }

  return {
    placeholderToValue,
    valueToPlaceholder,
  };
}