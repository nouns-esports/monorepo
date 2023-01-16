import { v4 } from "uuid";

export default function ArrayFromLength(length: number) {
  const array: string[] = [];

  for (let i = 0; i < length; i++) {
    array.push(v4());
  }

  return array;
}
