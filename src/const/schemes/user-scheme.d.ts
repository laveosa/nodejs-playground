import { z } from "zod";
export declare const UserScheme: z.ZodObject<{
    id: z.ZodReadonly<z.ZodOptional<z.ZodString>>;
    name: z.ZodString;
    age: z.ZodNumber;
    email: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=user-scheme.d.ts.map