export const createQueryString = (
  params: Record<string, string | number | boolean | null | undefined>,
  removeEmpty: boolean = true
): string => {
  const filtered = Object.entries(params)
    .filter(([, value]) => !removeEmpty || (value !== undefined && value !== ''))
    .map(([key, value]) => [key, String(value)]);

  return new URLSearchParams(filtered).toString();
};