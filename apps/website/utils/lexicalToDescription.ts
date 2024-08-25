export function lexicalToDescription(content: string) {
  const root = JSON.parse(content);

  let text = "";

  function traverse(node: any) {
    if (text.length >= 500) return;

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        traverse(child);
      }
    } else if (node.type === "text" && node.text) {
      const remainingChars = 500 - text.length;
      text += node.text.slice(0, remainingChars);
    }
  }

  traverse(root);

  return text;
}
