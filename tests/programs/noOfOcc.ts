function countChars(str: string): Record<string, number> {
  const result: Record<string, number> = {};

  for (const char of str.replace(/[^a-z]/gi, '').toLowerCase()) {
    result[char] = (result[char] || 0) + 1;
  }

  return result;
}

console.log(countChars("Hello TypeScript"));