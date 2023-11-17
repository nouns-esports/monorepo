async function t(text) {
  const id = createHash(text);

  const translation = await import(`./dist/en/${id}.json`);

  return text;
}

const build = {
  "30a1e586": {
    en: "This is a title",
    pt: "Este é um título",
  },
};

function myComponent() {
  return (
    <div>
      <h1>{t("This is a title")}</h1>
    </div>
  );
}
