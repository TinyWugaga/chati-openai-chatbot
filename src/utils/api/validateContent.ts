import { SENSITIVE_WORDS } from "../constant";

export default function validateContent(content: string) {
  const sensitiveWordsReg = new RegExp(
    `(\\s|^)(${SENSITIVE_WORDS.join("|")})(\\s|$)`,
    "gi"
  );
  const isInvalid =
    !content || content.trim().length === 0 || content.match(sensitiveWordsReg);
  return !isInvalid;
}
