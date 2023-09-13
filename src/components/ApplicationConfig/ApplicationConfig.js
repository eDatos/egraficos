const readConfig = async (baseUrl) => {
  const res = await fetch(`${baseUrl}application.json`);
  return await res.json();
};

export const applicationConfig = (baseUrl = '') => {
  return readConfig(baseUrl);
};
