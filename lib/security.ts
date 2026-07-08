/**
 * Safely serializes an object to a JSON string for injection into a JSON-LD script tag.
 * It replaces characters like `<` and `>` with their Unicode escape sequences to prevent
 * script tag injection or XSS vulnerabilities, particularly the `</script>` tag breakout.
 */
export function escapeJsonLd(jsonObj: object): string {
  const jsonString = JSON.stringify(jsonObj);
  // Escaping '<' as '\u003c' and '>' as '\u003e'
  return jsonString.replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}
