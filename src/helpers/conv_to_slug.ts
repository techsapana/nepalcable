export const toSlug = (text: string) =>
  text.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
