export const formatToUnits = (number, precision = 2) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const value = formatter.format(number);
  return value;
};
