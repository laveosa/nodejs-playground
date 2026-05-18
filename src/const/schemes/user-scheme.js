import { z } from "zod";
export const UserScheme = z.object({
    id: z.string().min(1).optional().readonly(),
    name: z.string().min(2).max(40),
    age: z.number().min(16).max(100),
    email: z
        .string()
        .email({ message: "Please provide a valid corporate email address" })
        .max(200),
});
//# sourceMappingURL=user-scheme.js.map