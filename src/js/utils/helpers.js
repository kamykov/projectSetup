export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const getCurrentIndex = (links, pathname) =>
  Math.max(0, links.indexOf(pathname.substring(1)));
