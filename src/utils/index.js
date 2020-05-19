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
