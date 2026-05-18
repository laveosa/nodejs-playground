import { z } from "zod";
import { CurrencyType } from "#src/const/enums/currency-type.js";
export declare const ProductScheme: z.ZodObject<{
    id: z.ZodReadonly<z.ZodOptional<z.ZodString>>;
    brand: z.ZodString;
    title: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodEnum<typeof CurrencyType>;
}, z.core.$strip>;
//# sourceMappingURL=product-scheme.d.ts.map