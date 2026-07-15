export function restoreResume(text, mapping) {
  let restoredText = text;

  for (const [placeholder, value] of Object.entries(
    mapping.placeholderToValue
  )) {
    restoredText = restoredText.replaceAll(placeholder, value);
  }

  return restoredText;
}