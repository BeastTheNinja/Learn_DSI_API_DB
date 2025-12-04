// Utility helpers used by seed scripts to generate random year and price values
export const randomYear = (min = 1990, max = new Date().getFullYear()): number => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

// Returns a string formatted with two decimals suitable for Prisma Decimal fields
export const randomPrice = (min = 1000, max = 50000): string => {
  const value = Math.random() * (max - min) + min;
  // Keep two decimals and ensure '.' as decimal separator
  return value.toFixed(2);
};

// Helper to pick a random element from an array
export const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
