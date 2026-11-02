import z from "zod";

export const queryValidation = <
  const T extends readonly [string, ...string[]],
>({
  sortEnum,
}: {
  sortEnum: T;
}) => ({
  take: z.coerce.number().int().min(1).max(100).default(10),
  cursor: z.string().max(500).optional(),
  sortBy: z.enum(sortEnum).default(sortEnum[0] as never),
  orderBy: z.enum(["desc", "asc"]).default("desc"),
});

export const getValidation = ({ by }: { by: string[] }) =>
  z.object({
    by: z.enum(by),
    value: z.string(),
  });

export const deleteValidation = z.object({
  schemaId: z.coerce.number(),
});
