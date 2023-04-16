export default function validateData<T extends object>(type: string, data: T) {
  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      throw new Error(`Error validating ${type} data for the property ${key}`);
    }
  }

  return data;
}
