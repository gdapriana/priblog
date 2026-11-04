export const passwordValidation = (val: string): string | null => {
  if (val.length < 8) return "Password et least min 8 chars";
  return null;
};

export const nameValidation = (val: string): string | null => {
  if (val.length < 2) return "Name must be at least 3 characters";
  if (val.length > 50) return "Name must be less than 50 chars";
  return null;
};
