export function sanitizeResume(text, valueToPlaceholder) {
  let sanitizedText = text;

  for (const [value, placeholder] of Object.entries(valueToPlaceholder)) {
    sanitizedText = sanitizedText.replaceAll(value, placeholder);
  }

  return sanitizedText;
}