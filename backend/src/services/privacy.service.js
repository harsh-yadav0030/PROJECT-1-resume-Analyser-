import { detectPII } from "../utils/privacy/detectPII.js";
import { tokenizePII } from "../utils/privacy/tokenizer.js";
import { sanitizeResume } from "../utils/privacy/sanitizeResume.js";

export function anonymizeResume(resumeText) {
  console.log("========== PRIVACY LAYER ==========");
  console.log("Privacy layer executed");
  const detectedPII = detectPII(resumeText);

  const mapping = tokenizePII(detectedPII);

  const sanitizedText = sanitizeResume(
    resumeText,
    mapping.valueToPlaceholder
  );

  return {
    originalText: resumeText,
    sanitizedText,
    mapping,
  };
}