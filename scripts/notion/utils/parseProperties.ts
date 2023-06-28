import downloadImage from "../../utils/downloadImage.js";

export function parseTitle(property: { title: Array<{ plain_text: string }> }) {
  return property.title[0].plain_text;
}

export async function parseCover(property: { file: { url: string } }) {
  return downloadImage(property.file.url);
}

export function parseUrl(property: { url: string }) {
  return property.url;
}

export function parseText(property: {
  rich_text: Array<{ plain_text: string }>;
}) {
  return property.rich_text[0].plain_text;
}

export function parseRelation(property: { relation: Array<{ id: string }> }) {
  return property.relation.map((item) => item.id);
}

export function parseSingleRelation(property: {
  relation: Array<{ id: string }>;
}) {
  return property.relation[0].id;
}

export function parseMultiSelect(property: {
  multi_select: Array<{ name: string }>;
}) {
  return property.multi_select.map((item) => item.name);
}

export function parseSelect(property: { select: { name: string } }) {
  return property.select.name;
}
