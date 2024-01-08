export function splitNumberDecimal(num: number): { before: string; after: string } {
  // Check if the number has decimals
  if (Number.isInteger(num)) {
    // If no decimals, return 00 for everything after the decimal
    return { before: num.toFixed(0), after: "00" };
  }

  // Split the number into the part before and after the decimal
  const [before, after] = num.toString().split(".");

  return { before, after };
}
