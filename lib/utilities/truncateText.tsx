export function truncateText(text: string, numberOfWords: number): string {
  const listOFWords = text.split(" ");
  const words = listOFWords.slice(0, numberOfWords);
  return words.toString().replaceAll(",", " ");
}
