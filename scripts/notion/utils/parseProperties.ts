import downloadImage from "../../utils/downloadImage";

export function parseTitle(property: { title: Array<{ plain_text: string }> }) {
  return property.title[0].plain_text;
}

export async function parseCover(property: {
  cover: { file: { url: string } };
}) {
  return downloadImage(property.cover.file.url);
}

export function parseUrl(property: { url: string }) {
  return property.url;
}

export function parseText(property: { text: Array<{ plain_text: string }> }) {
  return property.text[0].plain_text;
}

export function parseRelation(property: { relation: Array<{ id: string }> }) {
  return property.relation.map((item) => item.id);
}

export function parseSingleRelation(property: {
  relation: Array<{ id: string }>;
}) {
  return property.relation[0].id;
}

export function parseId(property: { id: string }) {
  return property.id;
}

export function parseMultiSelect(property: {
  multi_select: Array<{ name: string }>;
}) {
  return property.multi_select.map((item) => item.name);
}

export function parseSelect(property: { select: { name: string } }) {
  return property.select.name;
}
