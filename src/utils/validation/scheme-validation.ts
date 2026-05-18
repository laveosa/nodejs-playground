import { z, ZodError } from "zod";

export function schemeValidation<T>(scheme: z.ZodTypeAny, model: unknown): T {
  try {
    return scheme.parse(model) as T;
  } catch (err) {
    if (err instanceof ZodError) {
      const errorDetails = err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      const validationError = new Error("Validation failed");
      (validationError as any).details = errorDetails;
      (validationError as any).isValidationError = true;

      throw validationError;
    }

    throw err;
  }
}
