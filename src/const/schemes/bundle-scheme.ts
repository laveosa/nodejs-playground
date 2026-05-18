import { z } from "zod";
import { ProductScheme } from "#src/const/schemes/product-scheme.js";

export const BundleScheme = z.object({
  id: z.string().min(1).optional().readonly(),
  products: z.array(ProductScheme),
  addressId: z.string().min(1),
  userId: z.string().min(1),
  discount: z.number().min(0).max(100).optional(),
});
