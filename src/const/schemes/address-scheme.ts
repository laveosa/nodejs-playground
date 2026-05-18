import { z } from "zod";

export const AddressScheme = z.object({
  id: z.string().min(1).optional().readonly(),
  city: z.string().min(2).max(100),
  street: z.string().min(2).max(200),
});
