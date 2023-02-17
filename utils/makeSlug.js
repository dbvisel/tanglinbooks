const makeSlug = (name) =>
  encodeURIComponent(
    name
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[?.,/#!$%^&*;:{}=\-_'`~()]/g, "")
      .replace(/\s+/g, "-")
  );

export default makeSlug;
