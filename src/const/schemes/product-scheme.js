import { z } from "zod";
import { CurrencyType } from "#src/const/enums/currency-type.js";
export const ProductScheme = z.object({
    id: z.string().min(1).optional().readonly(),
    brand: z.string().min(3).max(200),
    title: z.string().min(3).max(200),
    price: z.number().min(2).max(200),
    currency: z.enum(CurrencyType),
});
//# sourceMappingURL=product-scheme.js.map