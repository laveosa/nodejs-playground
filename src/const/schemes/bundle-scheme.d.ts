import { z } from "zod";
export declare const BundleScheme: z.ZodObject<{
    id: z.ZodReadonly<z.ZodOptional<z.ZodString>>;
    products: z.ZodArray<z.ZodObject<{
        id: z.ZodReadonly<z.ZodOptional<z.ZodString>>;
        brand: z.ZodString;
        title: z.ZodString;
        price: z.ZodNumber;
        currency: z.ZodEnum<typeof import("../enums/currency-type.js").CurrencyType>;
    }, z.core.$strip>>;
    addressId: z.ZodString;
    userId: z.ZodString;
    discount: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=bundle-scheme.d.ts.map