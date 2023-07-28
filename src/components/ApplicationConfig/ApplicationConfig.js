const readConfig = async () => {
  const res = await fetch('application.json');
  return await res.json();
};

export const applicationConfig = () => {
  return readConfig();
};
