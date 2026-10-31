import z from "zod";

export const queryValidation = ({ sortEnum }: { sortEnum: string[] }) => ({
  take: z.coerce.number().int().min(1).max(100).default(10),
  cursor: z.coerce.number().int().optional(),
  sortBy: z.enum(sortEnum).default(sortEnum[0]),
  orderBy: z.enum(["desc", "asc"]).default("desc"),
});

export const getValidation = ({ by }: { by: string[] }) =>
  z.object({
    by: z.enum(by),
    value: z.coerce.number(),
  });

export const deleteValidation = ({ by }: { by: string[] }) =>
  z.object({
    by: z.enum(by),
    value: z.coerce.number(),
  });
