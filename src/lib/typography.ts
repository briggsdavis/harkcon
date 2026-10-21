/** Keep a paragraph's closing words together across responsive widths. */
export function keepClosingWords(text: string): string {
  return text.replace(/(\S+)\s+(\S+)\s*$/, "$1\u00a0$2")
}
