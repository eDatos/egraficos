const readConfig = async (href) => {
  const res = await fetch(`${href ?? ''}application.json`);
  return await res.json();
};

export const applicationConfig = (href) => {
  return readConfig(href);
};
