const API_URL = process.env.REACT_APP_API_URL;

const fetchAPI = async (endpoint) => {
  let response = await fetch(`${API_URL}/${endpoint}`);
  let jsonData = await response.json();
  return jsonData;
};

export const getDsLayers = async () => {
  let response = await fetchAPI(`reports/ds-layers`);
  return response;
};

export const getTechnicalReport = async () => {
  let response = await fetchAPI(`reports/technical`);
  return response;
};

export const getTechnicalDeatilReport = async () => {
  let response = await fetchAPI(`reports/technical-detail`);
  return response;
};

export const getEconomicReport = async () => {
  let response = await fetchAPI(`reports/economic`);
  return response;
};

export const getEconomicDeatilReport = async () => {
  let response = await fetchAPI(`reports/economic-detail`);
  return response;
};
