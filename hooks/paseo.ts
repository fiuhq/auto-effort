// Paseo wraps a message one agent sends another in `<paseo-system kind="agent-message" …>`: judge the request
// inside, not the envelope's ids and titles. Any other text is the request as written.
const ENVELOPE = /^\s*<paseo-system\b[^>]*\bkind="agent-message"[^>]*>\n?([\s\S]*?)\n?<\/paseo-system>\s*$/

export const requestOf = (text: string) => text.match(ENVELOPE)?.[1] ?? text
