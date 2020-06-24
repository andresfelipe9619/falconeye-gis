export const formatToUnits = (number, decimals = 2) => {
  let totalStr = "";
  let numStr = String(Number(number).toFixed(decimals));
  let parts = numStr.split(".");
  let numLen = parts[0].length;
  for (let i = 0; i < numLen; i++) {
    let y = numLen - i;
    if (i > 0 && y % 3 === 0) {
      totalStr += y >= 6 ? "'" : ",";
    }
    totalStr += parts[0].charAt(i);
  }
  let decimalPart = decimals ? `.${parts[1] || ""}` : "";
  return `$${totalStr}${decimalPart}`;
};

export const formatToAbbreviation = (number, precision = 2) => {
  const abbrev = ["", "k", "m", "b", "t"];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3);
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
  const suffix = abbrev[order];

  return +(number / Math.pow(10, order * 3)).toFixed(precision) + suffix;
};

export const technicalLayers = [
  { value: "default-tech", label: "General" },
  {
    value: "exec-range-tech",
    name: "Espera de Ejecución",
    label: "Pendiente ejecución",
  },
  {
    value: "auth-range-tech",
    name: "Aprobada",
    label: "Pendiente de Autorización",
  },
  {
    value: "appr-range-tech",
    name: "Pendiente de Aprobación",
    label: "Pendiente de Aprobación",
  },
];

export const economicLayers = [
  { value: "default", label: "General" },
  { value: "monetary-range", label: "Monetario" },
  { value: "orders-range", label: "Asistencias" },
];
