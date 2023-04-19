export default function validateData(type, data) {
  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      throw new Error(`Error validating ${type} data for the property ${key}`);
    }
  }

  return data;
}
