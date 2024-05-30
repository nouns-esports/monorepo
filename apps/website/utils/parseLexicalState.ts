export function parseLexicalState(state: any) {
  let description = "";
  let image = "";

  function traverse(node: any) {
    for (const child of node.children) {
      if (description.length < 300 && child.type === "text") {
        description += `${child.text} `;
      }

      if (!image && child.type === "image") {
        image = child.src;
      }

      if (child.children) traverse(child);
    }
  }

  traverse(JSON.parse(state));

  return { description, image };
}
